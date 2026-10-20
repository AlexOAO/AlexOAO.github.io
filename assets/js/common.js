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
  const getJSON = url => fetch(url).then(r => { if (!r.ok) throw new Error(url); return r.json(); });

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

  // Key Progress is derived from milestones, so it is never written by hand.
  function progressOf(milestones = []) {
    return {
      done: milestones.filter(m => m.status === 'done').length,
      total: milestones.length,
      current: milestones.find(m => m.status === 'doing') || null,
      next: milestones.find(m => m.status === 'todo') || null,
    };
  }

  // Drop draft projects, then companies left with no projects.
  const visibleGroups = groups => groups
    .map(g => ({ ...g, projects: g.projects.filter(p => !p.draft) }))
    .filter(g => g.projects.length);

  const PENDING = ['待量測', 'To be measured', '待補充', 'To be added'];
  const arrowSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  return { esc, getLang, toggleLang, dataPath, getJSON, STAGE_COLOR, STAGE_ORDER, stageNames, stageSpan, isGov, stagePills, progressOf, visibleGroups, PENDING, arrowSvg };
})();
