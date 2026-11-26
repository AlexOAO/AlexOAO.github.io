// Blog post concept diagram: the data is posts/concepts.json (keyed by the post's file name);
// the drawing and the sticky column are the shared ConceptSide component (assets/js/concept-side.js).
(() => {
  const id = location.pathname.split('/').pop().replace(/\.html$/, '');
  const article = document.querySelector('article.post');
  if (!article || !id) return;
  const run = () => fetch('concepts.json', { cache: 'no-cache' }).then(r => r.json()).then(all => {
    const c = all[id]; if (!c) return;
    const heads = [...article.querySelectorAll('.post-body h2')];
    const find = start => heads.find(h => h.textContent.trim().startsWith(start));
    const at = n => ({ label: n.label, el: find(n.heading) });
    const end = heads.find(x => /^學到的事|^反思/.test(x.textContent.trim()));
    const nodes = c.nodes.map(at), center = c.center ? at(c.center) : null;
    const used = [center, ...nodes].filter(Boolean).map(n => n.el);
    ConceptSide.mount(article, { kicker: '概念架構', title: c.title, hint: '點任一格跳到該段；讀到哪一段，圖上就亮哪一格。', type: c.type, nodes, center,
      end: end && !used.includes(end) ? { label: end.textContent.trim(), el: end } : null });
  }).catch(() => {});
  if (window.ConceptSide) run();
  else { const s = document.createElement('script'); s.src = '../assets/js/concept-side.js?v=20261126b'; s.onload = run; document.head.appendChild(s); }
})();
