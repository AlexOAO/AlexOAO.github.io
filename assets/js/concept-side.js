// Concept diagram in a column beside an article (blog posts and project pages).
// Wide screens: a sticky column left of the article. Narrow screens: above the article.
// Every node is tied to an element in the article: clicking jumps there, and the node for the part being read lights up.
//
//   ConceptSide.mount(article, {
//     kicker, title, hint, type: 'flow' | 'layers' | 'hub' | 'outline',
//     nodes: [{ label, el, kind }],   // kind (outline only): 'sec' for a section, 'step' for a phase inside it
//     center: { label, el },          // hub only
//     end: { label, el }              // optional link under the diagram (e.g. the conclusion)
//   });
const ConceptSide = (() => {
  const css = `
  .cm-wrap { max-width: 720px; margin: 0 auto; }
  .cm-side { margin: 0 1.5rem 1rem; padding: 1rem; border: 1px solid rgba(148,163,184,0.18); border-radius: 16px; background: #0f172a; }
  .cm-k { font-size: 0.72rem; letter-spacing: 0.1em; color: #60a5fa; font-weight: 700; margin: 0 0 0.2rem; }
  .cm-t { font-size: 1.05rem; font-weight: 800; color: #f1f5f9; margin: 0 0 0.7rem; line-height: 1.4; }
  .cm-side svg { width: 100%; height: auto; display: block; }
  .cm-n { cursor: pointer; outline: none; }
  .cm-n rect, .cm-n circle { transition: fill 0.25s, stroke 0.25s; }
  .cm-n text { pointer-events: none; transition: fill 0.25s; }
  .cm-n:hover rect, .cm-n:focus-visible rect { stroke: #60a5fa; }
  .cm-n.on rect { fill: #1d4ed8; stroke: #93c5fd; }
  .cm-n.on text { fill: #fff; }
  .cm-n.on circle { fill: #f59e0b; }
  .cm-hint { font-size: 0.75rem; color: #64748b; margin: 0.6rem 0 0; }
  .cm-end { display: block; margin-top: 0.6rem; font-size: 0.8rem; color: #fbbf24; text-decoration: none; }
  .post-body h2, .post-body p { scroll-margin-top: 1.5rem; }
  .cm-hit { color: #fbbf24 !important; }
  @media (min-width: 1180px) {
    .cm-wrap { max-width: 1100px; display: grid; grid-template-columns: 300px minmax(0, 720px); gap: 48px; align-items: start; }
    .cm-side { position: sticky; top: 1.5rem; margin: 3.5rem 0 0; max-height: calc(100vh - 3rem); overflow: auto; }
    .cm-wrap > article.post { margin: 0; }
  }`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const W = 280;
  // Wrap a label onto two lines when it doesn't fit: break at a space or punctuation near the middle, never inside a word.
  const width = (t, size) => [...t].reduce((w, ch) => w + (/[\x00-\xff]/.test(ch) ? 0.56 : 1) * size, 0);
  const split = (t, max, size) => {
    if (width(t, size) <= max) return [t];
    const mid = t.length / 2; let best = -1;
    [...t].forEach((ch, i) => { if (i && /[ ，、＋×≠：]/.test(ch) && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i; });
    if (best < 0) { best = Math.round(mid); while (best > 0 && /[A-Za-z0-9]/.test(t[best - 1]) && /[A-Za-z0-9]/.test(t[best])) best--; if (!best) best = Math.round(mid); }
    const cut = t[best] === ' ' ? 1 : 0, keep = /[，、：]/.test(t[best]) ? 1 : 0;
    return [t.slice(0, best + keep).trim(), t.slice(best + keep + cut).trim()];
  };
  const label = (x, y, t, size, anchor = 'start', fill = '#e2e8f0', max = 200) => {
    const ls = split(t, max, size);
    return ls.map((s, k) => `<text x="${x}" y="${y + (k - (ls.length - 1) / 2) * (size + 3) + size * 0.35}" text-anchor="${anchor}" font-size="${size}" font-weight="700" fill="${fill}">${esc(s)}</text>`).join('');
  };
  const node = (k, inner) => `<g class="cm-n" role="link" tabindex="0" data-k="${k}">${inner}</g>`;

  // Vertical chain: numbered boxes joined by arrows.
  function flow(c) {
    const h = 46, gap = 20; let g = '';
    c.nodes.forEach((n, k) => {
      const y = 6 + k * (h + gap);
      if (k) g += `<path d="M${W / 2} ${y - gap + 2} V${y - 4}" stroke="#475569" stroke-width="2"/><polygon points="${W / 2 - 5},${y - 9} ${W / 2 + 5},${y - 9} ${W / 2},${y - 3}" fill="#475569"/>`;
      g += node(k, `<rect x="2" y="${y}" width="${W - 4}" height="${h}" rx="10" fill="#111a2e" stroke="#334155" stroke-width="2"/>
        <circle cx="26" cy="${y + h / 2}" r="13" fill="#2563eb"/><text x="26" y="${y + h / 2 + 5}" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">${k + 1}</text>
        ${label(48, y + h / 2, n.label, 14, 'start', '#e2e8f0', W - 60)}`);
    });
    return { g, h: 12 + c.nodes.length * (h + gap) - gap };
  }
  // Pyramid of layers: narrow on top, widest at the base.
  function layers(c) {
    const h = 42, gap = 6, N = c.nodes.length; let g = '';
    c.nodes.forEach((n, k) => {
      const w = 160 + (W - 164) * (k / Math.max(1, N - 1)), x = (W - w) / 2, y = 4 + k * (h + gap);
      g += node(k, `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#111a2e" stroke="#334155" stroke-width="2"/>
        <circle cx="${x + 15}" cy="${y + h / 2}" r="5" fill="#2563eb"/>${label(W / 2 + 6, y + h / 2, n.label, 13, 'middle', '#e2e8f0', w - 40)}`);
    });
    return { g, h: 8 + N * (h + gap) };
  }
  // One core idea on top, branches below in two columns.
  function hub(c) {
    const ch = 54, bh = 46, gap = 14, colW = (W - 14) / 2, N = c.nodes.length; let g = '';
    const rows = Math.ceil(N / 2), top = ch + 34;
    c.nodes.forEach((n, k) => {
      const col = k % 2, row = Math.floor(k / 2), x = 2 + col * (colW + 10), y = top + row * (bh + gap);
      g += `<path d="M${W / 2} ${ch + 4} V${ch + 18} H${x + colW / 2} V${y}" fill="none" stroke="#475569" stroke-width="2"/>`;
      g += node(k + 1, `<rect x="${x}" y="${y}" width="${colW}" height="${bh}" rx="10" fill="#111a2e" stroke="#334155" stroke-width="2"/>${label(x + colW / 2, y + bh / 2, n.label, 13, 'middle', '#e2e8f0', colW - 16)}`);
    });
    g = node(0, `<rect x="2" y="4" width="${W - 4}" height="${ch}" rx="12" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>${label(W / 2, 4 + ch / 2, c.center.label, 15, 'middle', '#fde68a', W - 30)}`) + g;
    return { g, h: top + rows * (bh + gap) };
  }
  // Project outline: sections as coloured boxes on a spine; phases as numbered steps indented under their section.
  function outline(c) {
    const color = t => /結果|成果|Result|Outcome/i.test(t) ? '#16a34a' : /為什麼|Why/i.test(t) ? '#f59e0b' : /角色|role/i.test(t) ? '#a855f7'
      : /怎麼做|做了什麼|How|What I did/i.test(t) ? '#2563eb' : '#64748b';
    let g = `<line x1="12" y1="10" x2="12" y2="{H}" stroke="#334155" stroke-width="2"/>`, y = 4, sec = '#2563eb', step = 0;
    c.nodes.forEach((n, k) => {
      if (n.kind === 'step') {
        const h = 34, x = 34;
        step += 1;
        g += `<path d="M12 ${y + h / 2} H${x}" stroke="#334155" stroke-width="2"/>` + node(k, `<rect x="${x}" y="${y}" width="${W - x - 2}" height="${h}" rx="8" fill="#111a2e" stroke="#334155" stroke-width="2"/>
          <circle cx="${x + 16}" cy="${y + h / 2}" r="10" fill="${sec}"/><text x="${x + 16}" y="${y + h / 2 + 4}" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">${step}</text>
          ${label(x + 34, y + h / 2, n.label, 13, 'start', '#e2e8f0', W - x - 44)}`);
        y += h + 8;
      } else {
        const h = 40; sec = color(n.label); step = 0;
        g += node(k, `<rect x="2" y="${y}" width="${W - 4}" height="${h}" rx="10" fill="#111a2e" stroke="${sec}" stroke-width="2"/>
          <circle cx="12" cy="${y + h / 2}" r="6" fill="${sec}"/>${label(28, y + h / 2, n.label, 14, 'start', '#f1f5f9', W - 40)}`);
        y += h + 10;
      }
    });
    return { g: g.replace('{H}', y - 20), h: y };
  }

  let styled = false, state = null;
  function onScroll() {
    if (!state) return;
    let cur = -1;
    state.targets.forEach((t, k) => { if (t && t.getBoundingClientRect().top < innerHeight * 0.35) cur = k; });
    state.nodes.forEach(n => n.classList.toggle('on', +n.dataset.k === cur));
  }
  function go(el) {
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('cm-hit'); setTimeout(() => el.classList.remove('cm-hit'), 1600);
  }

  function mount(article, c) {
    if (!article || !c || !(c.nodes || []).length) return;
    if (!styled) { const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); styled = true; addEventListener('scroll', onScroll, { passive: true }); }
    const items = c.type === 'hub' ? [c.center, ...c.nodes] : c.nodes;
    const { g, h } = (c.type === 'hub' ? hub : c.type === 'layers' ? layers : c.type === 'outline' ? outline : flow)(c);
    let wrap = article.parentNode.classList.contains('cm-wrap') ? article.parentNode : null;
    if (!wrap) { wrap = document.createElement('div'); wrap.className = 'cm-wrap'; article.parentNode.insertBefore(wrap, article); wrap.appendChild(article); }
    wrap.querySelectorAll(':scope > .cm-side').forEach(x => x.remove());
    const side = document.createElement('aside');
    side.className = 'cm-side';
    side.setAttribute('aria-label', c.kicker || '');
    side.innerHTML = `<p class="cm-k">${esc(c.kicker || '')}</p><p class="cm-t">${esc(c.title || '')}</p>
      <svg viewBox="0 0 ${W} ${h}" role="group" aria-label="${esc(c.title || '')}">${g}</svg>
      ${c.hint ? `<p class="cm-hint">${esc(c.hint)}</p>` : ''}
      ${c.end && c.end.el ? `<a class="cm-end" href="#" data-end>→ ${esc(c.end.label)}</a>` : ''}`;
    wrap.insertBefore(side, article);
    const nodes = [...side.querySelectorAll('.cm-n')];
    nodes.forEach(n => {
      const it = items[+n.dataset.k];
      n.setAttribute('aria-label', it.label);
      n.addEventListener('click', () => go(it.el));
      n.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(it.el); } });
    });
    const endLink = side.querySelector('[data-end]');
    if (endLink) endLink.addEventListener('click', e => { e.preventDefault(); go(c.end.el); });
    state = { nodes, targets: items.map(it => it.el) };
    onScroll();
  }

  // Build a project outline from a story: its <h2> sections, plus the "第一階段｜…" / "Phase 1 | …" markers inside them.
  function fromStory(body) {
    const nodes = [];
    body.querySelectorAll(':scope > h2, :scope > p').forEach(el => {
      if (el.tagName === 'H2') { nodes.push({ label: el.textContent.trim(), el, kind: 'sec' }); return; }
      const s = el.querySelector(':scope > strong:first-child');
      const m = s && s.textContent.trim().match(/^(?:第.{1,3}階段|Phase\s*\d+)\s*[｜|]\s*(.+?)[。.]?$/);
      if (m) nodes.push({ label: m[1].trim(), el, kind: 'step' });
    });
    return nodes;
  }

  return { mount, fromStory };
})();
