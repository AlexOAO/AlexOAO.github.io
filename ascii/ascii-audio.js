/*
 * ascii-audio.js: tiny shared Web Audio engine for the ASCII gallery pages.
 * No dependencies and no audio files. Every sound is synthesised live.
 *
 * ============================== INTEGRATION GUIDE ==============================
 *
 * 1. Load it before the page script:
 *
 *      <script src="ascii-audio.js"></script>
 *      <script> (() => { ...page code... })(); </script>
 *
 *    The engine adds a "♪ off / ♪ on" pill to the right of the page's
 *    `<a class="back">` pill (it reuses the `.back` class, so it matches each
 *    page's colours, hover and focus styles automatically). Keyboard: M toggles.
 *    Music is OFF on a first visit. The choice is saved in localStorage
 *    ('ascii-music'). If it was ON, sound starts on the first pointer or key
 *    press anywhere, because browsers forbid sound before a user gesture.
 *    Without Web Audio the button is not added and every call is a no-op.
 *
 * 2. Call init once, at the end of the page script (the DOM must exist):
 *
 *      if (window.AsciiAudio) AsciiAudio.init({
 *        bpm: 96,          // tempo for beats (default 100)
 *        master: 0.8,      // overall level, 0..1 (default 0.8; keep it modest)
 *        reverb: 0.25,     // default reverb send per voice, 0..1
 *        reverbTime: 2.4,  // seconds of reverb tail
 *        build(a) { ... }  // write the score here; `a` is the engine
 *      });
 *
 *    build(a) runs once, when the AudioContext is first created (after a
 *    gesture). Do not touch Web Audio before then.
 *
 * 3. Write a score inside build(a). Beats count from the start of the music
 *    (0 = the downbeat). Every instrument takes an AudioContext time `t`, so
 *    always schedule with the `t` you are given, never with Date/performance.
 *
 *      const N = AsciiAudio.notes;      // tiny note notation, see below
 *      const tune = N('E5:1 D5 C5:2 | r:1 G4:.5 A4 C5:2');
 *      a.part(tune, (t, e) => a.musicBox(t, e.note, e.sec * 1.5, { vel: 0.7 }),
 *             { length: 16, offset: 0 });              // loops every 16 beats
 *      a.every(0.5, (t, step) => a.shaker(t, step % 2 ? 0.2 : 0.35)); // 8ths
 *      a.at(32, t => a.chime(t, 'C6', 3));             // one-shot at beat 32
 *
 *    AsciiAudio.notes(str) notation: tokens split by spaces, '|' is ignored.
 *    Token = NOTE[:beats], or NOTE+NOTE+...[:beats] for a chord, or r[:beats]
 *    for a rest. Notes look like C4, F#5, Bb3. Beats may be 1, .5, 1.5, 1/3,
 *    and stay as set until changed. It returns
 *    [{ beat, beats, sec, note, notes }] plus a `.beats` total length.
 *    Note `e.sec` is the duration in seconds at the page tempo.
 *
 *    Parts with the same `length` loop together seamlessly. For generative
 *    parts use every(stepBeats, fn(t, step)) and derive the bar from `step`.
 *
 * 4. Sound effects synced to the animation. Register handlers in build:
 *
 *      a.on('star', (a, data, t) => { a.whoosh(t); a.chime(t, 'G6', 2.5); });
 *      a.on('light', (a, data, t) => a.sparkle(t), { gap: 0.08 }); // throttle
 *
 *    and fire them from the animation loop when the event happens:
 *
 *      window.AsciiAudio && AsciiAudio.event('star', { any: 'data' });
 *
 *    event() is a cheap no-op while music is off, paused, or hidden, so call it
 *    freely. Fire on the frame where a threshold is crossed (prevT < T <= t).
 *
 * 5. Hook pause and replay:
 *
 *      togglePause: AsciiAudio[paused ? 'pause' : 'resume']();
 *      replay:      AsciiAudio.resume(); AsciiAudio.restart(); // music from beat 0
 *
 *    The engine also suspends audio by itself while the tab is hidden.
 *
 * 6. Check a score without speakers (headless Chrome is fine):
 *
 *      AsciiAudio.render(10, { events: [[2.5, 'star']] })
 *        .then(r => console.log(r.peakDb, r.rmsDb));  // aim for a peak near -14 dBFS
 *
 * ================================ ENGINE API ==================================
 *
 * Time helpers: a.now() (ctx seconds), a.beat() (current beat), a.time(beat),
 *   a.spb (seconds per beat), a.beats(n) (n beats in seconds),
 *   a.nextBeat(div = 1) (time of the next 1/div beat, to quantise effects).
 * Instruments, all (t, note, dur, opts). note is a name like 'C5' or a number
 *   in Hz, dur is in seconds. opts: vel 0..1, pan -1..1, wet (reverb send),
 *   bus 'music' or 'sfx':
 *   musicBox, celesta, bell, pad(t, notes[], dur), pluck, bass, lead.
 * Percussion and noise, (t, vel, opts): kick, snare, hat, shaker, jingle,
 *   noise(t, { dur, filter, freq, freqEnd, q, attack, vel }), sweep(t, dur, opts).
 * Effects, (t, opts), on the sfx bus, which restart() does not cut:
 *   pop, sparkle, whoosh, boom, ding(t, note), heart, chime(t, note, dur),
 *   boing, tick({ bell }), thud.
 * Note helpers, also on AsciiAudio: freq('A4') -> 440, midi('C4') -> 60,
 *   mtof(69), transpose('C4', 7) -> 'G4', chord('C4', 'maj7'),
 *   scale('C5', 'pentatonic', 8).
 * AsciiAudio: init, event, pause, resume, restart, toggle(on?), isOn(),
 *   state(), render(sec, opts), available.
 */
(function () {
  'use strict';

  const AC = window.AudioContext || window.webkitAudioContext;
  const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  const STORE = 'ascii-music';
  const LOOKAHEAD = 0.15;   // seconds scheduled in advance
  const TICK_MS = 25;       // scheduler period
  const MIN = 0.0001;       // exponential ramps cannot reach 0

  // ---------- Notes ----------
  const NAMES = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const SHARPS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  function midi(n) {
    if (typeof n === 'number') return n;
    const m = /^([A-Ga-g])(#|b|)(-?\d)$/.exec(String(n).trim());
    if (!m) return 60;
    return 12 * (+m[3] + 1) + NAMES[m[1].toUpperCase()] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
  }
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
  // Strings are note names; numbers are taken as Hz.
  const freq = n => typeof n === 'number' ? n : mtof(midi(n));
  const nameOf = m => SHARPS[((m % 12) + 12) % 12] + (Math.floor(m / 12) - 1);
  const transpose = (n, semis) => nameOf(midi(n) + semis);
  const CHORDS = {
    maj: [0, 4, 7], min: [0, 3, 7], m: [0, 3, 7], dim: [0, 3, 6], aug: [0, 4, 8],
    sus2: [0, 2, 7], sus4: [0, 5, 7], '7': [0, 4, 7, 10], maj7: [0, 4, 7, 11],
    m7: [0, 3, 7, 10], add9: [0, 4, 7, 14], '6': [0, 4, 7, 9]
  };
  const SCALES = {
    major: [0, 2, 4, 5, 7, 9, 11], minor: [0, 2, 3, 5, 7, 8, 10],
    pentatonic: [0, 2, 4, 7, 9], minorPentatonic: [0, 3, 5, 7, 10],
    dorian: [0, 2, 3, 5, 7, 9, 10], lydian: [0, 2, 4, 6, 7, 9, 11], blues: [0, 3, 5, 6, 7, 10]
  };
  const chord = (root, type = 'maj') => (CHORDS[type] || CHORDS.maj).map(i => nameOf(midi(root) + i));
  function scale(root, type = 'major', count) {
    const s = SCALES[type] || SCALES.major, r = midi(root), out = [];
    const n = count || s.length;
    for (let i = 0; i < n; i++) out.push(nameOf(r + s[i % s.length] + 12 * Math.floor(i / s.length)));
    return out;
  }
  function parseBeats(s) {
    if (s.indexOf('/') >= 0) { const [a, b] = s.split('/'); return (+a || 1) / (+b || 1); }
    return +s;
  }
  // Text notation to events; see the guide above. `sec` is filled in by part().
  function notes(str) {
    const out = [];
    let beat = 0, dur = 1;
    String(str).split(/\s+/).forEach(tok => {
      if (!tok || tok === '|') return;
      const [head, d] = tok.split(':');
      if (d !== undefined && d !== '') { const v = parseBeats(d); if (v > 0) dur = v; }
      if (head !== 'r' && head !== '-' && head !== '') {
        const ns = head.split('+');
        out.push({ beat, beats: dur, note: ns[0], notes: ns });
      }
      beat += dur;
    });
    out.beats = beat;
    return out;
  }

  // ---------- Engine (one per AudioContext; the offline renderer makes its own) ----------
  function Engine(ctx, cfg) {
    this.ctx = ctx;
    this.cfg = cfg;
    this.bpm = cfg.bpm || 100;
    this.spb = 60 / this.bpm;
    this.parts = []; this.steps = []; this.ats = []; this.handlers = {};
    this.cursor = 0;   // beats already scheduled
    this.t0 = ctx.currentTime + 0.1;

    // Shared white-noise buffer (2 s, looped).
    const len = ctx.sampleRate * 2;
    this.noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;

    // Master: buses -> input -> compressor -> fade -> level -> speakers.
    // The level is post-compressor, so `master` scales linearly. With master 0.8 a typical
    // dense score peaks around -14 dBFS.
    this.input = ctx.createGain();
    this.input.gain.value = 0.8;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.knee.value = 12; comp.ratio.value = 3;
    comp.attack.value = 0.005; comp.release.value = 0.25;
    this.fade = ctx.createGain();
    this.fade.gain.value = 0;
    const level = ctx.createGain();
    level.gain.value = 0.4 * (cfg.master == null ? 0.8 : cfg.master);
    this.input.connect(comp); comp.connect(this.fade); this.fade.connect(level); level.connect(ctx.destination);

    // Send reverb: a generated decaying stereo noise impulse.
    this.verb = ctx.createConvolver();
    const rt = cfg.reverbTime || 2.4, rl = Math.floor(ctx.sampleRate * rt);
    const ir = ctx.createBuffer(2, rl, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const ch = ir.getChannelData(c);
      for (let i = 0; i < rl; i++) {
        const x = i / rl;
        // Short pre-delay, exponential decay, darker towards the tail.
        ch[i] = i < ctx.sampleRate * 0.012 ? 0 : (Math.random() * 2 - 1) * Math.pow(1 - x, 2.2) * Math.exp(-3 * x);
      }
    }
    this.verb.buffer = ir;
    const verbLevel = ctx.createGain();
    verbLevel.gain.value = 0.5;
    this.verb.connect(verbLevel); verbLevel.connect(this.input);
    this.defWet = cfg.reverb == null ? 0.25 : cfg.reverb;

    this.music = this._bus();
    this.sfxBus = this._bus();
  }

  const E = Engine.prototype;

  E._bus = function () {
    const dry = this.ctx.createGain(), send = this.ctx.createGain();
    dry.connect(this.input); send.connect(this.verb);
    return { dry, send };
  };

  // Voice output: gain -> (panner) -> bus dry + reverb send.
  E._out = function (o, wet, sfx) {
    const ctx = this.ctx, g = ctx.createGain();
    const bus = (o.bus ? o.bus === 'sfx' : sfx) ? this.sfxBus : this.music;
    let node = g;
    if (o.pan && ctx.createStereoPanner) {
      const p = ctx.createStereoPanner();
      p.pan.value = Math.max(-1, Math.min(1, o.pan));
      g.connect(p); node = p;
    }
    node.connect(bus.dry);
    const w = o.wet == null ? wet : o.wet;
    if (w > 0) { const s = ctx.createGain(); s.gain.value = w; node.connect(s); s.connect(bus.send); }
    return g;
  };

  E._osc = function (type, f, t, end, dest, detune) {
    const o = this.ctx.createOscillator();
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (detune) o.detune.value = detune;
    o.connect(dest); o.start(t); o.stop(end);
    return o;
  };

  E._noise = function (t, end, dest) {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noiseBuf; s.loop = true;
    s.connect(dest); s.start(t, Math.random() * 1.5); s.stop(end);
    return s;
  };

  // Percussive envelope: linear attack to `peak`, then exponential decay with time constant tau.
  function perc(param, t, a, peak, tau) {
    param.setValueAtTime(0, t);
    param.linearRampToValueAtTime(peak, t + a);
    param.setTargetAtTime(0, t + a, tau);
    return t + a + tau * 7;
  }

  // ---------- Time ----------
  E.now = function () { return this.ctx.currentTime; };
  E.time = function (beat) { return this.t0 + beat * this.spb; };
  E.beat = function () { return (this.ctx.currentTime - this.t0) / this.spb; };
  E.beats = function (n) { return n * this.spb; };
  E.nextBeat = function (div = 1) {
    const b = Math.ceil(this.beat() * div - 1e-6) / div;
    return Math.max(this.ctx.currentTime, this.time(b));
  };

  // ---------- Sequencing ----------
  // part(events, play(t, e, a), { length = events.beats (loops), offset = 0, loop = true })
  E.part = function (events, play, o = {}) {
    const spb = this.spb;
    events.forEach(e => { if (e.sec == null) e.sec = (e.beats || 1) * spb; });
    this.parts.push({
      events, play, offset: o.offset || 0,
      length: o.loop === false ? Infinity : (o.length || events.beats || 4)
    });
  };
  // every(stepBeats, fn(t, step, a), { offset = 0 }): fn for each step, forever.
  E.every = function (stepBeats, fn, o = {}) {
    this.steps.push({ step: stepBeats, fn, offset: o.offset || 0 });
  };
  // at(beat, fn(t, a)): one-shot, cleared by restart().
  E.at = function (beat, fn) { this.ats.push({ beat, fn }); };
  // on(name, fn(a, data, t), { gap }): sound-effect handler for AsciiAudio.event.
  E.on = function (name, fn, o = {}) { this.handlers[name] = { fn, gap: o.gap || 0, last: -1e9 }; };

  E._fire = function (name, data, t) {
    const h = this.handlers[name];
    if (!h || t - h.last < h.gap) return;
    h.last = t;
    try { h.fn(this, data, t); } catch (e) { /* a broken handler must not stop the page */ }
  };

  // Schedule everything whose start falls in [cursor, beat at now + horizon).
  E._tick = function (horizon) {
    const ctx = this.ctx, spb = this.spb;
    const end = (ctx.currentTime + horizon - this.t0) / spb;
    const b0 = this.cursor;
    if (end <= b0) return;
    const floor = ctx.currentTime;
    const run = (fn, beat, ...args) => {
      const t = Math.max(floor, this.t0 + beat * spb);
      try { fn(t, ...args); } catch (e) { /* keep the clock running */ }
    };
    for (const p of this.parts) {
      for (const e of p.events) {
        const base = p.offset + e.beat;
        let k = p.length === Infinity ? 0 : Math.max(0, Math.ceil((b0 - base) / p.length - 1e-9));
        for (;;) {
          const b = base + (p.length === Infinity ? 0 : k * p.length);
          if (b >= end) break;
          if (b >= b0) run(p.play, b, e, this);
          if (p.length === Infinity) break;
          k++;
        }
      }
    }
    for (const s of this.steps) {
      let k = Math.max(0, Math.ceil((b0 - s.offset) / s.step - 1e-9));
      for (let b = s.offset + k * s.step; b < end; k++, b = s.offset + k * s.step) run(s.fn, b, k, this);
    }
    if (this.ats.length) {
      this.ats = this.ats.filter(a => {
        if (a.beat >= end) return true;
        if (a.beat >= b0) run(a.fn, a.beat, this);
        return false;
      });
    }
    this.cursor = end;
  };

  // Restart the score from beat 0: fade out what is already queued on the music bus.
  E._restart = function () {
    const ctx = this.ctx, old = this.music, now = ctx.currentTime;
    [old.dry, old.send].forEach(g => {
      g.gain.cancelScheduledValues(now);
      g.gain.setValueAtTime(g.gain.value, now);
      g.gain.linearRampToValueAtTime(0, now + 0.25);
    });
    setTimeout(() => { try { old.dry.disconnect(); old.send.disconnect(); } catch (e) {} }, 400);
    this.music = this._bus();
    this.ats = [];
    this.t0 = now + 0.12;
    this.cursor = 0;
  };

  // ---------- Pitched instruments: (t, note, dur seconds, opts) ----------
  // Music box: bright tine (sine plus inharmonic partials), instant attack, long ring.
  E.musicBox = function (t, note, dur = 1.5, o = {}) {
    const f = freq(note), vel = o.vel == null ? 0.6 : o.vel;
    const out = this._out(o, this.defWet);
    const tau = Math.max(0.25, Math.min(dur, 3)) * 0.45;
    const P = [[1, 1, 1], [2, 0.16, 0.5], [3.01, 0.08, 0.3], [5.4, 0.05, 0.12], [8.1, 0.025, 0.06]];
    let end = t;
    for (const [r, amp, dk] of P) {
      if (f * r > 16000) continue;
      const g = this.ctx.createGain(); g.connect(out);
      const e = perc(g.gain, t, 0.002, vel * 0.2 * amp, tau * dk);
      this._osc('sine', f * r, t, e, g);
      end = Math.max(end, e);
    }
    // A tiny metallic click at the start of the note.
    const cg = this.ctx.createGain(), hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 5000;
    hp.connect(cg); cg.connect(out);
    perc(cg.gain, t, 0.001, vel * 0.03, 0.006);
    this._noise(t, t + 0.06, hp);
  };

  // Celesta: rounder and softer than the music box (sine plus octave, gentle attack).
  E.celesta = function (t, note, dur = 1, o = {}) {
    const f = freq(note), vel = o.vel == null ? 0.5 : o.vel;
    const out = this._out(o, this.defWet);
    const tau = Math.max(0.2, Math.min(dur, 2.5)) * 0.4;
    [[1, 1, 1], [2, 0.3, 0.45], [4, 0.06, 0.2]].forEach(([r, amp, dk]) => {
      const g = this.ctx.createGain(); g.connect(out);
      const e = perc(g.gain, t, 0.006, vel * 0.16 * amp, tau * dk);
      this._osc(r === 1 ? 'triangle' : 'sine', f * r, t, e, g);
    });
  };

  // Bell: inharmonic partials with shorter decays for higher ones.
  E.bell = function (t, note, dur = 2.5, o = {}) {
    const f = freq(note), vel = o.vel == null ? 0.5 : o.vel;
    const out = this._out(o, this.defWet + 0.15);
    const tau = Math.max(0.3, dur) * 0.35;
    [[1, 1, 1], [2, 0.5, 0.7], [2.76, 0.35, 0.5], [5.4, 0.2, 0.3], [8.93, 0.1, 0.18]].forEach(([r, amp, dk]) => {
      if (f * r > 16000) return;
      const g = this.ctx.createGain(); g.connect(out);
      const e = perc(g.gain, t, 0.003, vel * 0.14 * amp, tau * dk);
      this._osc('sine', f * r, t, e, g);
    });
  };

  // Pad: two detuned saws per note through a lowpass, slow attack and release.
  E.pad = function (t, ns, dur = 4, o = {}) {
    ns = Array.isArray(ns) ? ns : [ns];
    const ctx = this.ctx, vel = o.vel == null ? 0.4 : o.vel;
    const a = o.attack == null ? 0.6 : o.attack, rel = o.release == null ? 1.2 : o.release;
    const out = this._out(o, this.defWet + 0.2);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = o.cutoff || 1100; lp.Q.value = 0.6;
    const g = ctx.createGain();
    lp.connect(g); g.connect(out);
    const peak = vel * 0.07 / Math.sqrt(ns.length);
    const hold = Math.max(t + a, t + dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + a);
    g.gain.setValueAtTime(peak, hold);
    g.gain.linearRampToValueAtTime(0, hold + rel);
    const end = hold + rel + 0.05;
    for (const n of ns) {
      const f = freq(n);
      this._osc('sawtooth', f, t, end, lp, -7);
      this._osc('sawtooth', f, t, end, lp, 7);
    }
  };

  // Pluck: saw or triangle with a fast-closing lowpass (a cheap Karplus-Strong stand-in).
  E.pluck = function (t, note, dur = 0.6, o = {}) {
    const ctx = this.ctx, f = freq(note), vel = o.vel == null ? 0.5 : o.vel;
    const out = this._out(o, this.defWet * 0.7);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.Q.value = 1;
    lp.frequency.setValueAtTime(Math.min(12000, f * 10 + 2500 * vel), t);
    lp.frequency.setTargetAtTime(f * 1.5 + 200, t, 0.06);
    const g = ctx.createGain();
    lp.connect(g); g.connect(out);
    const e = perc(g.gain, t, 0.003, vel * 0.18, Math.max(0.08, dur * 0.35));
    this._osc(o.type || 'sawtooth', f, t, e, lp);
  };

  // Bass: sine plus a little triangle, short attack, held, soft release.
  E.bass = function (t, note, dur = 0.8, o = {}) {
    const ctx = this.ctx, f = freq(note), vel = o.vel == null ? 0.5 : o.vel;
    const out = this._out(o, 0.05);
    const g = ctx.createGain(); g.connect(out);
    const peak = vel * 0.32, end = t + Math.max(0.05, dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + 0.012);
    g.gain.setTargetAtTime(peak * 0.7, t + 0.012, 0.2);
    g.gain.setTargetAtTime(0, end, 0.06);
    this._osc('sine', f, t, end + 0.4, g);
    const tg = ctx.createGain(); tg.gain.value = 0.18; tg.connect(g);
    this._osc('triangle', f, t, end + 0.4, tg);
  };

  // Lead: triangle (or opts.type) with delayed vibrato and a gentle lowpass.
  E.lead = function (t, note, dur = 0.5, o = {}) {
    const ctx = this.ctx, f = freq(note), vel = o.vel == null ? 0.5 : o.vel;
    const out = this._out(o, this.defWet);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = o.cutoff || 3200;
    const g = ctx.createGain(); lp.connect(g); g.connect(out);
    const peak = vel * (o.type === 'square' ? 0.07 : 0.15), end = t + Math.max(0.06, dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + 0.03);
    g.gain.setTargetAtTime(peak * 0.8, t + 0.03, 0.3);
    g.gain.setTargetAtTime(0, end, 0.05);
    const osc = this._osc(o.type || 'triangle', f, t, end + 0.35, lp);
    const lfo = ctx.createOscillator(), lg = ctx.createGain();
    lfo.frequency.value = 5.5;
    lg.gain.setValueAtTime(0, t);
    lg.gain.linearRampToValueAtTime(f * 0.006, t + Math.min(0.35, dur));
    lfo.connect(lg); lg.connect(osc.frequency);
    lfo.start(t); lfo.stop(end + 0.35);
  };

  // ---------- Noise and percussion ----------
  // noise(t, { dur, filter, freq, freqEnd, q, attack, vel, pan, wet, bus })
  E.noise = function (t, o = {}) {
    const ctx = this.ctx, dur = o.dur || 0.1, vel = o.vel == null ? 0.5 : o.vel;
    const out = this._out(o, o.wet == null ? 0.1 : o.wet);
    const f = ctx.createBiquadFilter();
    f.type = o.filter || 'bandpass'; f.Q.value = o.q || 1;
    f.frequency.setValueAtTime(o.freq || 2000, t);
    if (o.freqEnd) f.frequency.exponentialRampToValueAtTime(o.freqEnd, t + dur);
    const g = ctx.createGain(); f.connect(g); g.connect(out);
    const a = o.attack || 0.003;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vel * 0.3, t + a);
    g.gain.exponentialRampToValueAtTime(MIN, t + Math.max(a + 0.01, dur));
    this._noise(t, t + dur + 0.05, f);
  };
  E.sweep = function (t, dur = 1.5, o = {}) {
    this.noise(t, Object.assign({ dur, filter: 'bandpass', freq: o.from || 300, freqEnd: o.to || 5000,
      q: 2, attack: dur * 0.8, vel: 0.35, wet: 0.3 }, o));
  };
  E.shaker = function (t, vel = 0.3, o = {}) {
    this.noise(t, Object.assign({ dur: 0.07, filter: 'highpass', freq: 6500, attack: 0.008, vel: vel * 0.6, wet: 0.08 }, o));
  };
  E.hat = function (t, vel = 0.3, o = {}) {
    this.noise(t, Object.assign({ dur: 0.04, filter: 'highpass', freq: 8000, vel: vel * 0.6, wet: 0.05 }, o));
  };
  // Sleigh bell: bright shaker plus a few random high inharmonic pings.
  E.jingle = function (t, vel = 0.3, o = {}) {
    this.noise(t, Object.assign({ dur: 0.12, filter: 'bandpass', freq: 7500, q: 1.5, attack: 0.004, vel: vel * 0.7, wet: 0.15 }, o));
    const out = this._out(o, 0.2);
    for (let i = 0; i < 3; i++) {
      const g = this.ctx.createGain(); g.connect(out);
      const tt = t + Math.random() * 0.02;
      const e = perc(g.gain, tt, 0.001, vel * 0.025, 0.05);
      this._osc('sine', 3000 + Math.random() * 2500, tt, e, g);
    }
  };
  E.kick = function (t, vel = 0.6, o = {}) {
    const ctx = this.ctx, out = this._out(o, 0.02);
    const g = ctx.createGain(); g.connect(out);
    const osc = this._osc('sine', 150, t, t + 0.6, g);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    perc(g.gain, t, 0.002, vel * 0.6, 0.12);
  };
  E.snare = function (t, vel = 0.5, o = {}) {
    this.noise(t, Object.assign({ dur: 0.18, filter: 'bandpass', freq: 1800, q: 0.7, vel: vel * 0.8, wet: 0.15 }, o));
    const g = this.ctx.createGain(); g.connect(this._out(o, 0.05));
    perc(g.gain, t, 0.001, vel * 0.18, 0.04);
    this._osc('triangle', 185, t, t + 0.3, g);
  };

  // ---------- Sound effects (default to the sfx bus) ----------
  const fx = o => Object.assign({ bus: 'sfx' }, o);
  E.pop = function (t, o = {}) {
    o = fx(o);
    const ctx = this.ctx, g = ctx.createGain(); g.connect(this._out(o, 0.1));
    const f0 = o.freq || 420, vel = o.vel == null ? 0.5 : o.vel;
    const osc = this._osc('sine', f0, t, t + 0.25, g);
    osc.frequency.exponentialRampToValueAtTime(f0 * 2.4, t + 0.05);
    perc(g.gain, t, 0.002, vel * 0.3, 0.03);
  };
  const SPARK = ['C6', 'D6', 'E6', 'G6', 'A6', 'C7', 'D7', 'E7'];
  E.sparkle = function (t, o = {}) {
    o = fx(o);
    const ns = o.notes || SPARK, n = o.count || 3, vel = o.vel == null ? 0.35 : o.vel;
    for (let i = 0; i < n; i++) {
      this.bell(t + i * (o.spread || 0.045) + Math.random() * 0.02, ns[(Math.random() * ns.length) | 0], 0.8,
        { vel: vel * (1 - i * 0.15), bus: 'sfx', pan: (Math.random() - 0.5) * 0.8, wet: 0.45 });
    }
  };
  E.whoosh = function (t, o = {}) {
    o = fx(o);
    const dur = o.dur || 0.9;
    this.noise(t, Object.assign({ dur, filter: 'bandpass', freq: 350, freqEnd: 3200, q: 1.2, attack: dur * 0.4, vel: 0.45, wet: 0.3 }, o));
  };
  E.boom = function (t, o = {}) {
    o = fx(o);
    const ctx = this.ctx, vel = o.vel == null ? 0.6 : o.vel, g = ctx.createGain();
    g.connect(this._out(o, 0.35));
    const osc = this._osc('sine', 90, t, t + 2, g);
    osc.frequency.exponentialRampToValueAtTime(32, t + 1.2);
    perc(g.gain, t, 0.01, vel * 0.55, 0.35);
    this.noise(t, { dur: 1.2, filter: 'lowpass', freq: 600, freqEnd: 80, vel: vel * 0.6, bus: o.bus, wet: 0.3 });
  };
  E.ding = function (t, note = 'A6', o = {}) { this.bell(t, note, o.dur || 1.6, fx(o)); };
  E.chime = function (t, note = 'C6', dur = 2.5, o = {}) {
    // Shimmering chord: root, fifth, octave, tenth, slightly strummed.
    o = fx(o);
    const r = midi(note), vel = o.vel == null ? 0.45 : o.vel;
    [0, 7, 12, 16, 19].forEach((iv, i) =>
      this.bell(t + i * 0.035, mtof(r + iv), dur, { vel: vel * (1 - i * 0.1), bus: o.bus, pan: (i - 2) * 0.2, wet: 0.5 }));
  };
  E.heart = function (t, o = {}) {
    o = fx(o);
    const r = midi(o.note || 'E6'), vel = o.vel == null ? 0.4 : o.vel;
    this.bell(t, mtof(r), 1.4, { vel, bus: o.bus, wet: 0.4 });
    this.bell(t + 0.12, mtof(r + 4), 1.8, { vel: vel * 0.9, bus: o.bus, wet: 0.4 });
  };
  E.boing = function (t, o = {}) {
    o = fx(o);
    const ctx = this.ctx, f0 = o.freq || 220, vel = o.vel == null ? 0.5 : o.vel, g = ctx.createGain();
    g.connect(this._out(o, 0.1));
    const osc = this._osc('triangle', f0, t, t + 0.5, g);
    osc.frequency.exponentialRampToValueAtTime(f0 * 2.8, t + 0.14);
    osc.frequency.exponentialRampToValueAtTime(f0 * 2.2, t + 0.3);
    perc(g.gain, t, 0.005, vel * 0.3, 0.09);
  };
  // Typewriter key: short click; with { bell: true } also the carriage bell.
  E.tick = function (t, o = {}) {
    o = fx(o);
    const vel = o.vel == null ? 0.4 : o.vel;
    this.noise(t, { dur: 0.025, filter: 'highpass', freq: 2500, vel: vel * 0.9, bus: o.bus, wet: 0.05 });
    this.noise(t, { dur: 0.04, filter: 'bandpass', freq: 900, q: 3, vel: vel * 0.5, bus: o.bus, wet: 0.05 });
    if (o.bell) this.bell(t + 0.01, o.note || 'A6', 1.8, { vel: vel * 1.1, bus: o.bus, wet: 0.35 });
  };
  E.thud = function (t, o = {}) {
    o = fx(o);
    const ctx = this.ctx, vel = o.vel == null ? 0.5 : o.vel, g = ctx.createGain();
    g.connect(this._out(o, 0.08));
    const osc = this._osc('sine', o.freq || 140, t, t + 0.4, g);
    osc.frequency.exponentialRampToValueAtTime((o.freq || 140) * 0.4, t + 0.12);
    perc(g.gain, t, 0.003, vel * 0.45, 0.05);
    this.noise(t, { dur: 0.08, filter: 'lowpass', freq: 500, vel: vel * 0.5, bus: o.bus, wet: 0.05 });
  };

  // ---------- Live controller (singleton) ----------
  let cfg = null, ctx = null, engine = null, timer = 0, btn = null;
  let enabled = false, pagePaused = false, fadeToken = 0;
  try { enabled = localStorage.getItem(STORE) === '1'; } catch (e) {}

  const shouldRun = () => enabled && !pagePaused && !document.hidden;

  function ensureEngine() {
    if (engine || !cfg) return !!engine;
    // Only create the context after the user has interacted (avoids autoplay warnings).
    const ua = navigator.userActivation;
    if (ua && !ua.hasBeenActive) return false;
    try {
      ctx = new AC();
      engine = new Engine(ctx, cfg);
      if (cfg.build) cfg.build(engine);
    } catch (e) { engine = null; ctx = null; return false; }
    return true;
  }

  function fadeTo(v, sec) {
    const g = engine.fade.gain, now = ctx.currentTime;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(v, now + sec);
  }

  // Bring the audio graph in line with shouldRun(). Safe to call often.
  function apply(fadeOut = 0.35) {
    if (!cfg) return;
    const token = ++fadeToken;
    if (shouldRun()) {
      if (!ensureEngine()) return;
      const p = ctx.state === 'running' ? null : ctx.resume();
      const go = () => {
        if (token !== fadeToken || !shouldRun()) return;
        fadeTo(1, 0.6);
        if (!timer) timer = setInterval(() => { if (ctx.state === 'running') engine._tick(LOOKAHEAD); }, TICK_MS);
        engine._tick(LOOKAHEAD);
      };
      if (p && p.then) p.then(go, () => {}); else go();
    } else if (engine) {
      if (ctx.state !== 'running') return;
      fadeTo(0, fadeOut);
      setTimeout(() => {
        if (token !== fadeToken || shouldRun()) return;
        clearInterval(timer); timer = 0;
        ctx.suspend().catch(() => {});
      }, fadeOut * 1000 + 60);
    }
  }

  function setEnabled(on) {
    enabled = !!on;
    try { localStorage.setItem(STORE, enabled ? '1' : '0'); } catch (e) {}
    updateButton();
    apply();
  }

  function updateButton() {
    if (!btn) return;
    btn.textContent = enabled ? '♪ on' : '♪ off';
    btn.setAttribute('aria-pressed', String(enabled));
  }

  function placeButton() {
    const back = document.querySelector('.back');
    if (!btn || !back) return;
    const r = back.getBoundingClientRect();
    btn.style.left = Math.round(r.right + 8) + 'px';
    btn.style.top = Math.round(r.top) + 'px';
  }

  function makeButton() {
    const css = document.createElement('style');
    css.textContent =
      '.ascii-music{font-family:inherit;line-height:inherit;margin:0;cursor:pointer;' +
      'touch-action:manipulation;-webkit-tap-highlight-color:transparent;-webkit-appearance:none;appearance:none}' +
      '.ascii-music[aria-pressed="false"]{opacity:.7}' +
      '.ascii-music:not(.back){position:fixed;top:14px;left:14px;z-index:2;padding:6px 12px;border-radius:999px;' +
      'border:1px solid rgba(59,130,246,.45);background:rgba(59,130,246,.12);color:#e6edf6;font-size:13px;font-weight:600}';
    document.head.appendChild(css);
    const back = document.querySelector('.back');
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = back ? 'back ascii-music' : 'ascii-music';
    btn.setAttribute('aria-label', 'Music');
    btn.title = 'Music (M)';
    updateButton();
    // Keep taps on the button away from the page's canvas and window handlers.
    ['pointerdown', 'pointerup', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'dblclick'].forEach(ev =>
      btn.addEventListener(ev, e => e.stopPropagation()));
    btn.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') e.stopPropagation(); // not the page's Space = pause
    });
    btn.addEventListener('click', e => {
      e.stopPropagation();
      setEnabled(!enabled);
      // After a mouse or touch click, drop focus so Space still pauses the page.
      if (e.detail > 0) btn.blur();
    });
    if (back && back.nextSibling) back.parentNode.insertBefore(btn, back.nextSibling);
    else document.body.appendChild(btn);
    placeButton();
    addEventListener('resize', placeButton);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeButton, () => {});
  }

  // A gesture anywhere unlocks audio when music was remembered as ON.
  function onGesture(e) {
    if (btn && e.target === btn) return;
    if (enabled && shouldRun() && (!ctx || ctx.state !== 'running')) apply();
  }

  function onKey(e) {
    if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
    const tg = e.target, tag = tg && tg.tagName;
    if ((e.key === 'm' || e.key === 'M') && !(tag === 'INPUT' || tag === 'TEXTAREA' || (tg && tg.isContentEditable))) {
      setEnabled(!enabled);
      return;
    }
    onGesture(e);
  }

  function setup() {
    makeButton();
    ['pointerdown', 'pointerup', 'touchend', 'click'].forEach(ev => addEventListener(ev, onGesture, true));
    addEventListener('keydown', onKey, true);
    document.addEventListener('visibilitychange', () => apply(0.05));
  }

  const NOOP = () => {};
  const api = {
    available: !!AC,
    init(c) {
      if (cfg || !AC) return;
      cfg = c || {};
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
      else setup();
    },
    event(name, data) {
      if (!engine || ctx.state !== 'running' || !shouldRun()) return;
      engine._fire(name, data, ctx.currentTime + 0.005);
    },
    pause() { if (pagePaused) return; pagePaused = true; apply(0.08); },
    resume() { if (!pagePaused) return; pagePaused = false; apply(); },
    restart() { if (engine) { engine._restart(); if (ctx.state === 'running') engine._tick(LOOKAHEAD); } },
    toggle(on) { setEnabled(on == null ? !enabled : on); },
    isOn() { return enabled; },
    // 'none' before the first gesture, else the AudioContext state ('running', 'suspended').
    state() { return ctx ? ctx.state : 'none'; },
    // Offline check: render `sec` seconds of the score (+ events [[sec, name, data]]).
    render(sec = 8, o = {}) {
      if (!OAC || !cfg) return Promise.reject(new Error('unavailable'));
      const sr = o.sampleRate || 44100;
      const oc = new OAC(2, Math.ceil(sr * sec), sr);
      const en = new Engine(oc, cfg);
      en.t0 = 0.05;
      en.fade.gain.value = 1;
      if (cfg.build) cfg.build(en);
      en._tick(sec);
      (o.events || []).forEach(([s, name, data]) => en._fire(name, data, s));
      return oc.startRendering().then(buf => {
        let peak = 0, sum = 0, n = 0;
        for (let c = 0; c < buf.numberOfChannels; c++) {
          const d = buf.getChannelData(c);
          for (let i = 0; i < d.length; i++) { const v = Math.abs(d[i]); if (v > peak) peak = v; sum += d[i] * d[i]; n++; }
        }
        const rms = Math.sqrt(sum / n), db = v => v > 0 ? 20 * Math.log10(v) : -Infinity;
        return { buffer: buf, peak, rms, peakDb: db(peak), rmsDb: db(rms) };
      });
    },
    freq, midi, mtof, transpose, chord, scale, notes
  };
  if (!AC) ['event', 'pause', 'resume', 'restart', 'toggle'].forEach(k => { api[k] = NOOP; });
  window.AsciiAudio = api;
})();
