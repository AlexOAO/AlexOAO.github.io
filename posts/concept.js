// Blog post "full picture" panel: the data is posts/models.json (keyed by the post's file name: title, sub, items
// and a bespoke diagram); the drawing, side column and popups are the shared ConceptModel (assets/js/concept-model.js).
(() => {
  const id = location.pathname.split('/').pop().replace(/\.html$/, '');
  const article = document.querySelector('article.post');
  if (!article || !id) return;
  const run = () => fetch('models.json', { cache: 'no-cache' }).then(r => r.json()).then(all => {
    if (all[id]) ConceptModel.mountSide(article, all[id], { kicker: '這篇文章的全貌', zoom: '放大', close: '關閉' });
  }).catch(() => {});
  if (window.ConceptModel) run();
  else { const s = document.createElement('script'); s.src = '../assets/js/concept-model.js?v=20261126d'; s.onload = run; document.head.appendChild(s); }
})();
