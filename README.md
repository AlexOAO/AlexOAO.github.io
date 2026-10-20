# xiang-wei-li.com

Alex Li's portfolio & blog.

**Live:** [https://xiang-wei-li.com](https://xiang-wei-li.com) (backup: [alexoao.github.io](https://alexoao.github.io))

---

## Structure

```
.
├── index.html                  # One-page resume (layout only, content from JSON)
├── project.html                # Project story page: project.html?id=<slug>
├── data/
│   ├── about.json              # 01. Proof (AI SDLC chart text)
│   ├── work.json               # 02. Experience: companies and projects
│   ├── experience.json         # 02. Experience: other experience & education
│   └── projects.json           # 03. Side Projects
├── posts/
│   ├── posts.json              # 04. Blog index
│   └── *.html                  # Individual blog posts
├── assets/
│   ├── css/post.css            # Shared blog post and project page styles
│   ├── js/common.js            # Shared helpers (language, data loading, stage colors, progress)
│   ├── images/profile.jpg      # Profile photo
│   └── docs/resume.pdf         # CV
├── data/en/                    # English versions of the data files
├── robots.txt, sitemap.xml, 404.html
├── .github/workflows/deploy.yml
└── README.md
```

## Deployment

Push to `main` → auto-deploys to **Cloudflare Pages** (custom domain `xiang-wei-li.com`; Framework preset None, no build command, output directory = repo root).

GitHub Pages via GitHub Actions stays as a backup (**Settings > Pages > Source > GitHub Actions**).

---

## Editing Guide

All content lives in JSON files. Edit JSON, push, done.

### Languages (中文 / English)

- Chinese: `data/*.json`. English: `data/en/*.json`, with the same structure. When you change one, change the other.
- Blog posts stay in Chinese. Add `title_en` and `summary_en` in `posts/posts.json` for the English card.
- The toggle in the nav remembers the choice. `?lang=en` or `?lang=zh` forces a language.
- `index.html` contains a short static English summary between `<!-- static:... -->` comments. Crawlers that do not run JavaScript read it. Update it when you add a company or a project.

### Where each fact lives

Write each fact once. The homepage shows a summary; the project page shows the detail.

| Place | Shows | Source fields |
|---|---|---|
| 01. Proof | AI SDLC chart: where each project sits | `about.json` → `sdlc`; `work.json` → `short`, `sdlc` |
| 02. Experience card | Title, 1-line summary, up to 5 milestones | `title`, `summary`, `milestones` |
| Project page | Context, problem, goal, approach, milestones, results & KPIs, key progress | all project fields |

Key Progress and goal completion are calculated from `milestones`. Do not write them by hand.

### 01. Proof (`data/about.json`)

```json
{
  "subhead": "One line under the section title",
  "sdlc": {
    "title": "Chart title",
    "note": "How to read the chart",
    "stages": [{ "key": "plan", "name": "業務規劃", "desc": "One sentence." }],
    "governance": { "name": "AI 治理（貫穿全週期）", "desc": "One sentence." }
  }
}
```

Stage keys: `plan`, `tune`, `build`, `ops`. The governance band uses the key `gov`.

`quant` holds the quant trading pipeline chart above Side Projects: title, note, and 5 layers with keys `data`, `research`, `test`, `alloc`, `trade`.

### 02. Experience (`data/work.json`)

Companies, newest first. Each company has its projects:

```json
[
  {
    "org": "Company", "short": "Short name", "role": "Your role", "period": "2026/07 ~ Now", "current": true,
    "lane": "optional: companies with the same value share one row on the AI SDLC chart",
    "scope": "One line: what you are responsible for",
    "other": ["Non-project work, one line each"],
    "projects": [
      {
        "short": "Chart label", "slug": "url-id", "title": "Project name",
        "summary": "One sentence, ≤ 40 characters: verb + result.",
        "sdlc": ["build", "ops"],
        "ownership": "主責",
        "period": "2026/07 ~ Now",
        "background": "One or two sentences.",
        "problem": "One or two sentences.",
        "goal": { "category": "Goal category", "weight": "40%", "target": "Target." },
        "approach": ["Verb-first step."],
        "milestones": [{ "date": "2026/10/12", "text": "≤ 20 characters", "status": "done" }],
        "result": ["Verb-first result."],
        "kpis": [{ "name": "題庫規模", "value": "600 題" }, { "name": "攔截率", "value": "待量測", "note": "How it will be measured" }],
        "tags": ["Tag1"],
        "link": "posts/some-post.html", "linkLabel": "Read more",
        "source": "S2,S3"
      }
    ]
  }
]
```

- `slug`: unique; the project page URL is `project.html?id=<slug>`. Use the same `slug` and `sdlc` in both languages.
- `sdlc`: the stages the project covers. The chart draws one bar from the earliest to the latest stage, so `["plan", "build"]` also covers `tune`. Add `gov` to place the project in the governance band instead of a lane. Use `[]` to keep the project off the chart.
- `ownership`: 主責 / 協作 (English: Lead / Contributor).
- `parent`: optional `slug` of another project in the same company. The project becomes a sub-project: it shows inside the parent's frame on the AI SDLC chart, as an indented card under the parent card, and both project pages link to each other. Put sub-projects right after their parent in the file.
- Card title: a project on the AI SDLC chart shows its `short` label as the card title, so the chart and the card match. The project page shows the full `title`.
- `kind`: optional neutral tag for a project with no AI stage (for example 量化策略). Use `"sdlc": []` to keep it off the AI SDLC chart.
- `layers`: optional quant pipeline layers (`data`, `research`, `test`, `alloc`, `trade`). The project then also shows as a bar on the quant chart, from the earliest to the latest layer.
- `draft`: `true` hides the project everywhere (card, chart, project page). Use it while the content is not ready.
- `milestones[].status`: `done`, `doing`, `todo`. The card shows the first 5.
- A KPI with value `待量測` (English: `To be measured`) shows in gray.
- `link`, `linkLabel`, `weight` (use `—` to hide), `other` are optional. `source` is not displayed; it records which document supports the claim.
- Add a new project to `sitemap.xml` as `https://xiang-wei-li.com/project?id=<slug>`.

### Project stories (`data/stories/<slug>.md`)

Each project page shows a blog-style story, then a facts panel (goal, milestones, KPIs, key progress).

- Chinese: `data/stories/<slug>.md`. English: `data/en/stories/<slug>.md`. The file name is the project's `slug`.
- Supported Markdown: `## ` and `### ` headings, paragraphs, `- ` lists, `> ` quotes, `**bold**`, `` `code` ``, `[text](url)`.
- Suggested outline: why this project → my role → what I did (and why) → results → next steps.
- Write only what a source supports. Mark missing facts as 待補充 / to be added.
- No story file: the page falls back to the structured fields (background, problem, approach, result).

### 02. Experience: other (`data/experience.json`)

Experience and education without a project card:

```json
[{ "title": "Role or degree", "org": "Organization", "date": "2025/09 ~ 12", "note": "One line, optional" }]
```

### 03. Side Projects (`data/projects.json`)

Shown as a numbered list (`icon` is kept but no longer displayed):

```json
[
  {
    "icon": "\uD83E\uDD16",
    "name": "Project Name",
    "desc": "One-line description.",
    "tags": ["Tag1", "Tag2"],
    "url": "https://github.com/AlexOAO/repo-name"
  }
]
```

Emoji reference for `icon`: use any emoji character or unicode escape.

`layers`: quant pipeline layers for the chart above this list (`data`, `research`, `test`, `alloc`, `trade`). Use `[]` to keep a repo off the chart.

`parent`: optional name of another repo. The repo then shows indented right under its parent, in the list and on the chart (for example FinCLI under Vibe-Edge).

### 04. Blog

**Step 1:** Create `posts/your-slug.html` (copy an existing post as template)

**Step 2:** Add entry to `posts/posts.json`:

```json
{
  "id": "your-slug",
  "title": "Post Title",
  "date": "YYYY-MM-DD",
  "summary": "A one-liner shown on the card.",
  "tags": ["Tag1", "Tag2"],
  "file": "posts/your-slug.html"
}
```

**Step 3:** Push.

### Other

| What | How |
|------|-----|
| Profile photo | Replace `assets/images/profile.jpg` |
| Resume | Replace `assets/docs/resume.pdf` |
| Hero text | Edit `heroDesc` in the `I18N` object in `index.html` (both languages) |
| Contact info | Edit the contact HTML in `index.html` |

---

## Writing rules (ASD-STE100, Chinese adaptation)

Every claim on the site must trace to a source document. Write only numbers that the source contains.

1. One sentence, one topic. Project `summary` ≤ 40 characters; milestone `text` ≤ 20 characters. Descriptive sentences ≤ 40 characters; step sentences ≤ 30 characters.
2. Active voice. Start list items with a verb: 建立、驗證、整合、設計.
3. One term, one meaning. Use the glossary below; do not mix variants.
4. No vague words: 大幅、眾多、顯著、優化、提升效率. Use a number, or delete the word.
5. Arabic numerals with units. Dates: `YYYY/MM` or `YYYY/MM/DD`.
6. Separate output from result. Output = what you built (600 題題庫). Result = a business metric (審查時間). If the metric is not measured yet, write its name, set the value to `待量測`, and say how it will be measured.
7. Write only your own work. Mark shared work as `協作`.

| Term | Use | Do not use |
|---|---|---|
| PoC | PoC 驗證 | POC, 試行 |
| Agent | Agent | 代理人, 智能體 |
| Guardrails | Guardrails | 護欄 (in titles) |
| 題庫 | 題庫 | 測資, 測試題 |
| TCO／ROI | TCO／ROI | 總成本／報酬率 (mixed) |
| Milestone | Milestone | 里程碑 (mixed) |
