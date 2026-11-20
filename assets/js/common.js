// Shared helpers for index.html and project.html.
const Site = (() => {
  const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // Language: ?lang= wins, then the saved choice, then the browser language.
  function pickLang() {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'en' || q === 'zh') return q;
    try { const s = localStorage.getItem('lang'); if (s === 'en' || s === 'zh') return s; } catch (e) {}
    return (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
  }
  let lang = pickLang();
  const getLang = () => lang;
  function toggleLang() {
    lang = lang === 'en' ? 'zh' : 'en';
    try { localStorage.setItem('lang', lang); } catch (e) {}
    return lang;
  }

  const dataPath = f => lang === 'en' ? `data/en/${f}` : `data/${f}`;
  // "no-cache" re-checks with the server on every load, so an edit shows up without a hard refresh.
  const getJSON = url => fetch(url, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(url); return r.json(); });

  const STAGE_COLOR = { plan: '#3b82f6', tune: '#8b5cf6', build: '#06b6d4', ops: '#10b981', gov: '#f59e0b' };

  // Stage key -> display name. "gov" uses the governance band name without its note in brackets.
  function stageNames(sdlc) {
    const names = {};
    (sdlc?.stages || []).forEach(s => { names[s.key] = s.name; });
    if (sdlc?.governance) names.gov = sdlc.governance.name.split(/[（(]/)[0].trim();
    return names;
  }

  // A project covers one continuous range of lifecycle stages: from its earliest to its latest stage.
  // "gov" is not a column; it places the project in the governance band.
  const STAGE_ORDER = ['plan', 'tune', 'build', 'ops'];
  function stageSpan(p) {
    const idx = (p.sdlc || []).map(k => STAGE_ORDER.indexOf(k)).filter(i => i >= 0);
    return idx.length ? [Math.min(...idx), Math.max(...idx)] : null;
  }
  const isGov = p => (p.sdlc || []).includes('gov');

  // Tags for a card or a project page: one stage range, the governance tag, or the neutral kind.
  function stagePills(p, names) {
    const sp = stageSpan(p), out = [];
    if (sp) {
      const [a, b] = sp.map(i => STAGE_ORDER[i]);
      out.push(`<span class="stage-pill" style="--c:${STAGE_COLOR[a]};--c2:${STAGE_COLOR[b]}">${esc(names[a])}${a !== b ? ` → ${esc(names[b])}` : ''}</span>`);
    }
    if (isGov(p)) out.push(`<span class="stage-pill" style="--c:${STAGE_COLOR.gov};--c2:${STAGE_COLOR.gov}">${esc(names.gov)}</span>`);
    if (!out.length && p.kind) out.push(`<span class="stage-pill" style="--c:#64748b;--c2:#64748b">${esc(p.kind)}</span>`);
    return out.join('');
  }

  // Drop draft projects, then companies left with no projects.
  const visibleGroups = groups => groups
    .map(g => ({ ...g, projects: g.projects.filter(p => !p.draft) }))
    .filter(g => g.projects.length);

  // Quant pipeline layers (Quant Lab): same idea as the AI stages, one range from the earliest to the latest layer.
  const QUANT_ORDER = ['data', 'research', 'test', 'alloc', 'trade'];
  const QUANT_COLOR = { data: '#3b82f6', research: '#8b5cf6', test: '#06b6d4', alloc: '#10b981', trade: '#f43f5e' };
  function quantSpan(p) {
    const idx = (p.layers || []).map(k => QUANT_ORDER.indexOf(k)).filter(i => i >= 0);
    return idx.length ? [Math.min(...idx), Math.max(...idx)] : null;
  }
  function quantPill(p, names) {
    const sp = quantSpan(p);
    if (!sp) return '';
    const [a, b] = sp.map(i => QUANT_ORDER[i]);
    return `<span class="stage-pill" style="--c:${QUANT_COLOR[a]};--c2:${QUANT_COLOR[b]}">${esc(names[a])}${a !== b ? ` → ${esc(names[b])}` : ''}</span>`;
  }

  const COVER_HUES = [['#3b82f6', '#22d3ee'], ['#8b5cf6', '#3b82f6'], ['#06b6d4', '#10b981'], ['#a78bfa', '#22d3ee'], ['#f59e0b', '#8b5cf6']];
  // Blog cover art: a small generated picture per post (orbits, bars or lines), seeded by the post id.
  // Pass n (the post's position, oldest = 0) to give every post its own style and colour pair.
  function blogCover(id, n) {
    let h = 2166136261;
    for (const ch of id) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
    const rnd = () => (h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) / 4294967296;
    const KINDS = 9, hue = n == null ? h % COVER_HUES.length : (n + Math.floor(n / KINDS)) % COVER_HUES.length;
    const [c1, c2] = COVER_HUES[hue], g = `g${id.replace(/\W/g, '')}`;
    const kind = n == null ? Math.floor(rnd() * 3) : n % KINDS;
    let art = '';
    if (kind === 0) {        // orbits
      const cx = 220 + rnd() * 120, cy = 40 + rnd() * 50;
      for (let i = 1; i <= 7; i++) art += `<circle cx="${cx}" cy="${cy}" r="${i * 22}" fill="none" stroke="url(#${g})" stroke-opacity="${0.9 - i * 0.11}" stroke-width="1"/>`;
      art += `<circle cx="${cx}" cy="${cy}" r="5" fill="${c2}"/>`;
    } else if (kind === 1) { // bars, like a small chart
      for (let i = 0; i < 22; i++) { const bh = 14 + rnd() * 92; art += `<rect x="${20 + i * 18}" y="${132 - bh}" width="9" height="${bh}" rx="2" fill="url(#${g})" fill-opacity="${0.25 + rnd() * 0.6}"/>`; }
    } else if (kind === 3) { // dot grid with a few lit points
      for (let x = 0; x < 20; x++) for (let y = 0; y < 7; y++) { const on = rnd() > 0.82;
        art += `<circle cx="${14 + x * 20}" cy="${10 + y * 19}" r="${on ? 3.2 : 1.4}" fill="${on ? c2 : `url(#${g})`}" fill-opacity="${on ? 0.95 : 0.35}"/>`; }
    } else if (kind === 4) { // mountain ridges
      for (let i = 0; i < 5; i++) { let d = `M0 132 L0 ${60 + i * 14}`;
        for (let x = 0; x <= 400; x += 25) d += ` L${x} ${40 + i * 16 + rnd() * 34 - 17}`;
        art += `<path d="${d} L400 132 Z" fill="url(#${g})" fill-opacity="${0.12 + i * 0.12}"/>`; }
    } else if (kind === 5) { // stacked diamonds
      const cx = 80 + rnd() * 240;
      for (let i = 1; i <= 8; i++) { const r = i * 16; art += `<path d="M${cx} ${66 - r} L${cx + r * 1.6} 66 L${cx} ${66 + r} L${cx - r * 1.6} 66 Z" fill="none" stroke="url(#${g})" stroke-opacity="${0.95 - i * 0.1}" stroke-width="1"/>`; }
      art += `<rect x="${cx - 4}" y="62" width="8" height="8" transform="rotate(45 ${cx} 66)" fill="${c2}"/>`;
    } else if (kind === 6) { // candlesticks
      let y = 70;
      for (let i = 0; i < 18; i++) { const o = y, c = Math.max(20, Math.min(112, y + rnd() * 40 - 20)), hi = Math.min(o, c) - 4 - rnd() * 10, lo = Math.max(o, c) + 4 + rnd() * 10, x = 16 + i * 21, up = c < o;
        art += `<line x1="${x + 4}" y1="${hi}" x2="${x + 4}" y2="${lo}" stroke="${up ? c2 : c1}" stroke-opacity="0.7"/><rect x="${x}" y="${Math.min(o, c)}" width="8" height="${Math.max(2, Math.abs(c - o))}" rx="1" fill="${up ? c2 : c1}" fill-opacity="${up ? 0.9 : 0.5}"/>`; y = c; }
    } else if (kind === 7) { // triangle mesh
      for (let r = 0; r < 4; r++) for (let q = 0; q < 12; q++) { const x = q * 36 - (r % 2) * 18, y = r * 36, up = (q + r) % 2;
        art += `<path d="M${x} ${up ? y + 36 : y} L${x + 36} ${up ? y + 36 : y} L${x + 18} ${up ? y : y + 36} Z" fill="url(#${g})" fill-opacity="${0.05 + rnd() * 0.45}" stroke="#0d1527" stroke-width="1.5"/>`; }
    } else if (kind === 8) { // radar sweep
      const cx = 300, cy = 132;
      for (let i = 1; i <= 5; i++) art += `<path d="M${cx - i * 26} ${cy} A${i * 26} ${i * 26} 0 0 1 ${cx + i * 26} ${cy}" fill="none" stroke="url(#${g})" stroke-opacity="0.55"/>`;
      for (let a = 0; a < 7; a++) { const t = Math.PI + a * Math.PI / 6; art += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(t) * 130}" y2="${cy + Math.sin(t) * 130}" stroke="${c1}" stroke-opacity="0.25"/>`; }
      art += `<path d="M${cx} ${cy} L${cx - 130} ${cy} A130 130 0 0 1 ${cx + Math.cos(Math.PI * 1.25) * 130} ${cy + Math.sin(Math.PI * 1.25) * 130} Z" fill="${c2}" fill-opacity="0.18"/>`;
      for (let i = 0; i < 6; i++) { const t = Math.PI + rnd() * Math.PI, r = 30 + rnd() * 95; art += `<circle cx="${cx + Math.cos(t) * r}" cy="${cy + Math.sin(t) * r}" r="3" fill="${c2}"/>`; }
    } else {                 // flowing lines
      for (let i = 0; i < 9; i++) { const y = 20 + i * 12, a = 18 + rnd() * 30; art += `<path d="M-10 ${y} C 110 ${y - a}, 230 ${y + a}, 420 ${y - a / 2}" fill="none" stroke="url(#${g})" stroke-opacity="${0.25 + i * 0.08}" stroke-width="1.2"/>`; }
    }
    return `<svg viewBox="0 0 400 132" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${g}r" cx="0.8" cy="0" r="1"><stop offset="0" stop-color="${c1}" stop-opacity="0.35"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient></defs>
      <rect width="400" height="132" fill="url(#${g}r)"/>${art}</svg>`;
  }

  const arrowSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  return { esc, getLang, toggleLang, dataPath, getJSON, STAGE_COLOR, STAGE_ORDER, stageNames, stageSpan, isGov, stagePills, visibleGroups, QUANT_ORDER, QUANT_COLOR, quantSpan, quantPill, blogCover, arrowSvg };
})();
