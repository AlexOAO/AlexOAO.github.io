// Concept model block: a diagram that explains an idea (left) and its concepts as buttons (right); diagram nodes and
// buttons open a popup. Data shape: data/models.json. Types: pipeline, layers, iceberg, matrix, cycle, hub, equation,
// compare, funnel.
//
//   const html = ConceptModel.html(model, { kicker });   // insert into the page
//   ConceptModel.bind(model, rootElement);               // after inserting: wires clicks and the popup
const ConceptModel = (() => {
  const css = `
  .cmod { margin: 2.2rem 0 2.4rem; }
  .cmod-k { font-size: 0.75rem; letter-spacing: 0.1em; color: #60a5fa; font-weight: 700; margin: 0 0 0.2rem !important; }
  .cmod h2.cmod-t, .cmod .cmod-t { margin: 0.1rem 0 0.4rem !important; font-size: 1.35rem; font-weight: 800; color: #f1f5f9; }
  .cmod-sub { color: #94a3b8; margin: 0 0 1rem !important; line-height: 1.7; }
  .cmod-grid { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 1.2rem; align-items: center; }
  .cmod-fig { border-radius: 14px; background: #0f172a; border: 1px solid rgba(148,163,184,0.16); padding: 0.6rem; }
  .cmod-fig svg { width: 100%; height: auto; display: block; }
  .cmod-fig text { font-family: 'Noto Sans TC', 'Inter', sans-serif; pointer-events: none; }
  .cmod-n { cursor: pointer; outline: none; }
  .cmod-n > :first-child { transition: filter 0.2s; }
  .cmod-n:hover > :first-child, .cmod-n:focus-visible > :first-child { filter: brightness(1.25); }
  .cmod-n:focus-visible > :first-child { stroke: #fbbf24; stroke-width: 4; }
  .cmod-btns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.45rem; }
  .cmod-btns button { text-align: left; padding: 0.55rem 0.75rem; border-radius: 10px; border: 1px solid rgba(148,163,184,0.18); border-left: 4px solid var(--c);
    background: #0f1a30; color: #e2e8f0; cursor: pointer; font: inherit; }
  .cmod-btns button:hover, .cmod-btns button:focus-visible { border-color: var(--c); }
  .cmod-btns b { display: block; font-size: 0.92rem; } .cmod-btns span { display: block; font-size: 0.78rem; color: #94a3b8; line-height: 1.5; margin-top: 0.15rem; }
  dialog.cmod-dlg { margin: auto; width: min(560px, calc(100vw - 2rem)); padding: 0; border: 1px solid rgba(148,163,184,0.2); border-radius: 16px; background: #111a2e; color: #e2e8f0; }
  dialog.cmod-dlg::backdrop { background: rgba(2, 6, 23, 0.7); }
  .cmod-dh { padding: 1.1rem 1.3rem 0.8rem; border-top: 5px solid var(--c); border-radius: 16px 16px 0 0; display: flex; gap: 0.8rem; align-items: flex-start; }
  .cmod-dh div { flex: 1; } .cmod-dh h3 { margin: 0; font-size: 1.25rem; } .cmod-dh p { margin: 0.25rem 0 0; color: #94a3b8; font-size: 0.9rem; }
  .cmod-x { background: none; border: 0; color: #94a3b8; font-size: 1.5rem; line-height: 1; cursor: pointer; padding: 0.2rem 0.4rem; }
  .cmod-db { padding: 0 1.3rem 1.2rem; } .cmod-db ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 0.5rem; }
  .cmod-db li { padding: 0.6rem 0.8rem; border-radius: 10px; background: #0b1426; border-left: 3px solid var(--c); line-height: 1.6; font-size: 0.95rem; }
  /* Side column: the model sits beside the article (sticky on wide screens, above it on narrow ones). */
  .cmod-wrap { max-width: 720px; margin: 0 auto; }
  .cmod-side { margin: 0 1.5rem 1.2rem; padding: 1rem; border: 1px solid rgba(148,163,184,0.18); border-radius: 16px; background: #0f172a; }
  .cmod-side .cmod { margin: 0; }
  .cmod-side .cmod-t { font-size: 1.1rem; }
  .cmod-side .cmod-sub { font-size: 0.85rem; margin-bottom: 0.7rem !important; }
  .cmod-side .cmod-grid { grid-template-columns: minmax(0, 1fr); gap: 0.7rem; }
  .cmod-side .cmod-fig { padding: 0.3rem; }
  .cmod-side .cmod-btns { grid-template-columns: minmax(0, 1fr); gap: 0.35rem; }
  .cmod-side .cmod-btns button { padding: 0.45rem 0.65rem; }
  .cmod-side .cmod-btns b { font-size: 0.86rem; } .cmod-side .cmod-btns span { font-size: 0.74rem; }
  @media (min-width: 1180px) {
    .cmod-wrap { max-width: 1140px; display: grid; grid-template-columns: 340px minmax(0, 720px); gap: 44px; align-items: start; }
    .cmod-side { position: sticky; top: 1.5rem; margin: 3.5rem 0 0; max-height: calc(100vh - 3rem); overflow: auto; }
    .cmod-wrap > article.post { margin: 0; }
  }
  @media (min-width: 761px) and (max-width: 1179px) { .cmod-side .cmod-grid { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); } }
  @media (max-width: 760px) { .cmod-grid { grid-template-columns: minmax(0, 1fr); } .cmod-btns { grid-template-columns: minmax(0, 1fr); } }`;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const PAL = ['#2563eb', '#0891b2', '#7c3aed', '#d97706', '#16a34a', '#db2777'];
  const ACC = '#f59e0b';
  const zh = () => document.documentElement.lang !== 'en';

  // Text that fits a width: wraps to two lines at a space or punctuation, never inside an English word.
  const tw = (t, size) => [...t].reduce((w, ch) => w + (/[\x00-\xff]/.test(ch) ? 0.56 : 1) * size, 0);
  function lines(t, max, size) {
    t = String(t);
    if (tw(t, size) <= max) return [t];
    const mid = t.length / 2; let best = -1;
    [...t].forEach((ch, i) => { if (i && /[ ，、＋×：/·]/.test(ch) && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i; });
    if (best < 0) { best = Math.round(mid); while (best > 0 && /[A-Za-z0-9]/.test(t[best - 1]) && /[A-Za-z0-9]/.test(t[best])) best--; if (!best) best = Math.round(mid); }
    const cut = t[best] === ' ' ? 1 : 0, keep = /[，、：]/.test(t[best]) ? 1 : 0;
    return [t.slice(0, best + keep).trim(), t.slice(best + keep + cut).trim()];
  }
  function txt(x, y, t, size, opt = {}) {
    const ls = lines(t, opt.max || 200, size), fill = opt.fill || '#f1f5f9', anc = opt.anchor || 'middle', wt = opt.weight || 800;
    return ls.map((s, k) => `<text x="${x}" y="${y + (k - (ls.length - 1) / 2) * (size + 4) + size * 0.36}" text-anchor="${anc}" font-size="${size}" font-weight="${wt}" fill="${fill}">${esc(s)}</text>`).join('');
  }
  const nd = (id, label, inner) => `<g class="cmod-n" role="button" tabindex="0" data-cm="${id}" aria-label="${esc(label)}">${inner}</g>`;
  const fs = () => (zh() ? 18 : 14);

  const draw = {
    pipeline(m) {   // stages top to bottom as chevron bands
      const N = m.items.length, h = Math.min(64, 340 / N), gap = 10, W = 560, x0 = 20; let g = '';
      m.items.forEach((it, k) => {
        const y = 14 + k * (h + gap), c = PAL[k % PAL.length];
        g += nd(k, it.name, `<path d="M${x0} ${y} H${x0 + W - 30} L${x0 + W} ${y + h / 2} L${x0 + W - 30} ${y + h} H${x0} L${x0 + 26} ${y + h / 2} Z" fill="${c}"/>
          <text x="${x0 + 44}" y="${y + h / 2 + 6}" font-size="17" font-weight="800" fill="#ffffff99">${k + 1}</text>
          ${txt(x0 + 74, y + h / 2, it.name, fs(), { anchor: 'start', max: 200 })}${txt(x0 + W - 46, y + h / 2, it.desc, 13, { anchor: 'end', fill: '#e0e7ff', weight: 500, max: 250 })}`);
      });
      return { g, h: 28 + N * (h + gap) };
    },
    layers(m) {     // pyramid: top narrow, bottom wide
      const N = m.items.length, h = Math.min(66, 360 / N), cx = 300; let g = '';
      m.items.forEach((it, k) => {
        const y = 14 + k * (h + 6), wt = 160 + 420 * (k / N), wb = 160 + 420 * ((k + 1) / N), c = PAL[k % PAL.length];
        g += nd(k, it.name, `<path d="M${cx - wt / 2} ${y} H${cx + wt / 2} L${cx + wb / 2} ${y + h} H${cx - wb / 2} Z" fill="${c}"/>${txt(cx, y + h / 2, it.name, fs(), { max: wt - 30 })}`);
      });
      return { g, h: 28 + N * (h + 6) };
    },
    iceberg(m) {
      const up = m.items.filter(i => i.level === 'above'), dn = m.items.filter(i => i.level !== 'above'); let g = '';
      g += `<rect x="0" y="0" width="600" height="150" fill="#13213b"/><rect x="0" y="150" width="600" height="300" fill="#0b3354"/>
        <polygon points="214,150 262,62 300,36 342,68 390,150" fill="#d6ecf7"/><polygon points="140,150 460,150 515,262 440,420 262,436 100,292" fill="#4f97bd"/>
        <line x1="0" y1="150" x2="600" y2="150" stroke="#93c5fd" stroke-width="2" stroke-dasharray="8 6"/>`;
      const place = (arr, ys) => arr.forEach((it, k) => {
        const per = Math.min(arr.length, 2), row = Math.floor(k / 2), col = k % 2, n = Math.min(per, arr.length - row * 2);
        const x = n === 1 ? 300 : 300 + (col ? 78 : -78), y = ys[row] || ys[ys.length - 1], i = m.items.indexOf(it), r = zh() ? 46 : 50;
        g += nd(i, it.name, `<circle cx="${x}" cy="${y}" r="${r}" fill="${it.level === 'above' ? '#f8fafc' : '#e0f2fe'}" stroke="${it.level === 'above' ? '#0ea5e9' : ACC}" stroke-width="3"/>${txt(x, y, it.name, zh() ? 17 : 13, { fill: '#0b2265', max: r * 1.7 })}`);
      });
      place(up, [100]); place(dn, [228, 338]);
      return { g, h: 450 };
    },
    matrix(m) {
      const L = 60, T = 20, S = 250, pos = { tl: [0, 0], tr: [1, 0], bl: [0, 1], br: [1, 1] }; let g = '';
      m.items.forEach((it, k) => {
        const [cx, cy] = pos[it.pos] || [k % 2, Math.floor(k / 2)], x = L + cx * (S + 10), y = T + cy * (S - 60 + 10), hot = it.pos === 'tr';
        g += nd(k, it.name, `<rect x="${x}" y="${y}" width="${S}" height="${S - 60}" rx="14" fill="${hot ? '#3a2a0b' : '#111a2e'}" stroke="${hot ? ACC : PAL[k % PAL.length]}" stroke-width="3"/>
          ${txt(x + S / 2, y + (S - 60) / 2 - 12, it.name, fs() + 2, { max: S - 30, fill: hot ? '#fde68a' : '#f1f5f9' })}${txt(x + S / 2, y + (S - 60) / 2 + 26, it.desc, 13, { max: S - 30, fill: '#cbd5e1', weight: 500 })}`);
      });
      const H = 2 * (S - 60) + 10;
      g += `<text x="${L + S + 5}" y="${T + H + 34}" text-anchor="middle" font-size="14" fill="#94a3b8">${esc((m.axes || {}).x || '')} →</text>
        <text transform="translate(24 ${T + H / 2}) rotate(-90)" text-anchor="middle" font-size="14" fill="#94a3b8">${esc((m.axes || {}).y || '')} →</text>`;
      return { g, h: T + H + 48 };
    },
    cycle(m) {
      const N = m.items.length, cx = 300, cy = 220, R = 150; let g = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#334155" stroke-width="4"/>`;
      for (let k = 0; k < N; k++) {
        const a = -Math.PI / 2 + (k + 0.5) * 2 * Math.PI / N, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a), tx = -Math.sin(a), ty = Math.cos(a);
        g += `<polygon points="${x + tx * 11},${y + ty * 11} ${x - tx * 6 + Math.cos(a) * 9},${y - ty * 6 + Math.sin(a) * 9} ${x - tx * 6 - Math.cos(a) * 9},${y - ty * 6 - Math.sin(a) * 9}" fill="${ACC}"/>`;
      }
      m.items.forEach((it, k) => {
        const a = -Math.PI / 2 + k * 2 * Math.PI / N, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
        g += nd(k, it.name, `<circle cx="${x}" cy="${y}" r="52" fill="${PAL[k % PAL.length]}" stroke="#0b1120" stroke-width="4"/>${txt(x, y, it.name, zh() ? 16 : 13, { max: 92 })}`);
      });
      g += `<circle cx="${cx}" cy="${cy}" r="72" fill="#111a2e" stroke="#475569" stroke-width="2"/>${txt(cx, cy, m.title, zh() ? 17 : 14, { max: 128 })}`;
      return { g, h: 440 };
    },
    hub(m) {
      const N = m.items.length, cx = 300, cy = 220, R = 160; let g = '';
      m.items.forEach((it, k) => {
        const a = -Math.PI / 2 + k * 2 * Math.PI / N, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
        g += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#475569" stroke-width="3"/>`;
      });
      m.items.forEach((it, k) => {
        const a = -Math.PI / 2 + k * 2 * Math.PI / N, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
        g += nd(k, it.name, `<rect x="${x - 70}" y="${y - 30}" width="140" height="60" rx="14" fill="${PAL[k % PAL.length]}"/>${txt(x, y, it.name, zh() ? 16 : 13, { max: 126 })}`);
      });
      const c = m.center || { name: m.title };
      g += nd('c', c.name, `<circle cx="${cx}" cy="${cy}" r="78" fill="#3a2a0b" stroke="${ACC}" stroke-width="4"/>${txt(cx, cy, c.name, zh() ? 18 : 14, { max: 136, fill: '#fde68a' })}`);
      return { g, h: 440 };
    },
    equation(m) {
      const N = m.items.length, op = m.op || '×', r = N > 2 ? 62 : 74, slots = N + 1, step = 600 / slots, cy = 170; let g = '';
      m.items.forEach((it, k) => {
        const x = step * (k + 0.5);
        if (k) g += `<text x="${x - step / 2}" y="${cy + 14}" text-anchor="middle" font-size="40" font-weight="800" fill="${ACC}">${esc(op)}</text>`;
        g += nd(k, it.name, `<circle cx="${x}" cy="${cy}" r="${r}" fill="${PAL[k % PAL.length]}"/>${txt(x, cy, it.name, zh() ? 17 : 13, { max: r * 1.65 })}`);
        g += txt(x, cy + r + 30, it.desc, 13, { max: step - 10, fill: '#cbd5e1', weight: 500 });
      });
      const xr = step * (N + 0.5), res = m.result || { name: '' };
      g += `<text x="${xr - step / 2}" y="${cy + 14}" text-anchor="middle" font-size="40" font-weight="800" fill="${ACC}">=</text>`;
      g += nd('r', res.name, `<rect x="${xr - r}" y="${cy - r}" width="${2 * r}" height="${2 * r}" rx="18" fill="#3a2a0b" stroke="${ACC}" stroke-width="4"/>${txt(xr, cy, res.name, zh() ? 17 : 13, { max: 2 * r - 16, fill: '#fde68a' })}`);
      g += txt(xr, cy + r + 30, res.desc || '', 13, { max: step - 10, fill: '#fde68a', weight: 500 });
      return { g, h: 300 };
    },
    compare(m) {
      let g = '';
      m.items.slice(0, 2).forEach((it, k) => {
        const x = k ? 320 : 20, c = k ? ACC : '#64748b', pts = (it.points || []).slice(0, 3);
        g += nd(k, it.name, `<rect x="${x}" y="14" width="260" height="380" rx="16" fill="${k ? '#3a2a0b' : '#111a2e'}" stroke="${c}" stroke-width="3"/>
          ${txt(x + 130, 52, it.name, fs() + 2, { max: 236, fill: k ? '#fde68a' : '#f1f5f9' })}${txt(x + 130, 92, it.desc, 13, { max: 236, fill: '#cbd5e1', weight: 500 })}
          <line x1="${x + 20}" y1="118" x2="${x + 240}" y2="118" stroke="${c}" stroke-width="1"/>
          ${pts.map((p, j) => `<circle cx="${x + 26}" cy="${150 + j * 82}" r="5" fill="${c}"/>` + txt(x + 40, 150 + j * 82, p, 13, { anchor: 'start', max: 205, fill: '#e2e8f0', weight: 500 })).join('')}`);
      });
      g += `<circle cx="300" cy="204" r="24" fill="#0b1120" stroke="#475569" stroke-width="2"/><text x="300" y="211" text-anchor="middle" font-size="16" font-weight="800" fill="#e2e8f0">vs</text>`;
      return { g, h: 410 };
    },
    funnel(m) {
      const N = m.items.length, h = Math.min(74, 380 / N), cx = 300; let g = '';
      m.items.forEach((it, k) => {
        const y = 14 + k * (h + 6), wt = 560 - 380 * (k / N), wb = 560 - 380 * ((k + 1) / N), c = PAL[k % PAL.length];
        g += nd(k, it.name, `<path d="M${cx - wt / 2} ${y} H${cx + wt / 2} L${cx + wb / 2} ${y + h} H${cx - wb / 2} Z" fill="${c}"/>${txt(cx, y + h / 2, it.name, fs(), { max: wb - 20 })}`);
      });
      return { g, h: 28 + N * (h + 6) };
    }
  };

  // Every clickable thing: items, plus the hub's centre ('c') and the equation's result ('r').
  function entries(m) {
    const out = m.items.map((it, k) => ({ id: String(k), color: m.type === 'compare' ? (k ? ACC : '#64748b') : m.type === 'matrix' && it.pos === 'tr' ? ACC : PAL[k % PAL.length], it }));
    if (m.type === 'hub' && m.center) out.unshift({ id: 'c', color: ACC, it: m.center });
    if (m.type === 'equation' && m.result) out.push({ id: 'r', color: ACC, it: m.result });
    return out;
  }

  let styled = false;
  function html(m, opt = {}) {
    if (!m || !draw[m.type]) return '';
    if (!styled) { const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); styled = true; }
    const { g, h } = draw[m.type](m);
    const btns = entries(m).map(e => `<button data-cm="${e.id}" style="--c:${e.color}"><b>${esc(e.it.name)}</b>${e.it.desc ? `<span>${esc(e.it.desc)}</span>` : ''}</button>`).join('');
    return `<section class="cmod">${opt.kicker ? `<p class="cmod-k">${esc(opt.kicker)}</p>` : ''}<h2 class="cmod-t">${esc(m.title)}</h2>
      ${m.sub ? `<p class="cmod-sub">${esc(m.sub)}</p>` : ''}
      <div class="cmod-grid"><div class="cmod-fig"><svg viewBox="0 0 600 ${h}" role="group" aria-label="${esc(m.title)}">${g}</svg></div><div class="cmod-btns">${btns}</div></div></section>`;
  }

  function bind(m, root, opt = {}) {
    if (!m || !root) return;
    let dlg = document.getElementById('cmod-dlg');
    if (!dlg) {
      dlg = document.createElement('dialog'); dlg.id = 'cmod-dlg'; dlg.className = 'cmod-dlg'; document.body.appendChild(dlg);
      dlg.addEventListener('click', e => { if (e.target === dlg || e.target.closest('[data-x]')) dlg.close(); });
    }
    const map = Object.fromEntries(entries(m).map(e => [e.id, e]));
    const open = id => {
      const e = map[id]; if (!e) return;
      dlg.style.setProperty('--c', e.color);
      dlg.innerHTML = `<div class="cmod-dh"><div><h3>${esc(e.it.name)}</h3>${e.it.desc ? `<p>${esc(e.it.desc)}</p>` : ''}</div>
        <button class="cmod-x" data-x aria-label="${esc(opt.close || 'Close')}">×</button></div>
        <div class="cmod-db"><ul>${(e.it.points || []).map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>`;
      dlg.showModal();
    };
    root.querySelectorAll('.cmod [data-cm]').forEach(el => {
      el.addEventListener('click', () => open(el.dataset.cm));
      if (el.tagName === 'g') el.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); open(el.dataset.cm); } });
    });
  }

  // Put the model in a column beside the article and wire it up. Safe to call again (re-render, language switch).
  function mountSide(article, m, opt = {}) {
    if (!article) return;
    let wrap = article.parentNode.classList.contains('cmod-wrap') ? article.parentNode : null;
    if (wrap) wrap.querySelectorAll(':scope > .cmod-side').forEach(x => x.remove());
    if (!m || !draw[m.type]) return;
    if (!wrap) { wrap = document.createElement('div'); wrap.className = 'cmod-wrap'; article.parentNode.insertBefore(wrap, article); wrap.appendChild(article); }
    const side = document.createElement('aside');
    side.className = 'cmod-side';
    side.innerHTML = html(m, opt).replace('<h2 class="cmod-t">', '<p class="cmod-t h2like">').replace(/<\/h2>/, '</p>');
    wrap.insertBefore(side, article);
    bind(m, side, opt);
  }

  return { html, bind, mountSide, types: Object.keys(draw) };
})();
