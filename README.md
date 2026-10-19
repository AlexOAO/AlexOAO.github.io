# xiang-wei-li.com

Alex Li's portfolio & blog.

**Live:** [https://xiang-wei-li.com](https://xiang-wei-li.com) (backup: [alexoao.github.io](https://alexoao.github.io))

---

## Structure

```
.
├── index.html                  # Main page (layout only, content from JSON)
├── data/
│   ├── about.json              # 01. Proof + About
│   ├── work.json               # 02. Work (PM-style project records)
│   ├── experience.json         # 03. Experience
│   └── projects.json           # 04. Side Projects
├── posts/
│   ├── posts.json              # 05. Blog index
│   └── *.html                  # Individual blog posts
├── assets/
│   ├── css/post.css            # Shared blog post styles
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
- English status values: `Done`, `In progress`, `Handed over`, `Planned`, `Not started`.
- The toggle in the nav remembers the choice. `?lang=en` or `?lang=zh` forces a language.
- `index.html` contains a short static English summary between `<!-- static:... -->` comments. Crawlers that do not run JavaScript read it. Update it when you add a company or a project.

### 01. Proof + About (`data/about.json`)

```json
{
  "subhead": "One line under the section title",
  "proof": [
    { "value": "600", "unit": "題", "label": "Guardrails 驗證題庫", "context": "One sentence: how the number was produced." },
    { "auto": "delivered", "unit": "個", "label": "AI 專案交付或驗證", "context": "..." }
  ],
  "paragraphs": ["Short intro paragraph..."],
  "cards": [{ "label": "Currently", "value": "Your current role" }]
}
```

`sdlc` holds the chart title, note, and the 4 stage names and descriptions. The chart places projects from `work.json` automatically.

`"auto": "delivered"` counts projects in `work.json` with status 已完成、進行中 or 已移交. Use it instead of a fixed number.

### 02. Work (`data/work.json`)

Projects are grouped by company. Each project has the PM record fields:

```json
[
  {
    "org": "Company",
    "role": "Your role",
    "period": "2026/07 ~ Now",
    "current": true,
    "projects": [
      {
        "title": "Project name",
        "phase": "PoC 驗證",
        "status": "進行中",
        "ownership": "主責",
        "period": "2026/07 ~ Now",
        "background": "One or two sentences.",
        "problem": "One or two sentences.",
        "approach": ["Verb-first step.", "Verb-first step."],
        "result": ["Verb-first result."],
        "kpis": [{ "name": "題庫規模", "value": "600 題" }, { "name": "攔截率", "value": "待量測", "note": "How it will be measured" }],
        "keyProgress": "Current progress.",
        "goal": { "category": "Goal category", "weight": "40%", "target": "Target.", "achievement": "Status." },
        "milestones": [{ "date": "2026/10/12", "text": "Milestone", "status": "done" }],
        "tags": ["Tag1"],
        "link": "posts/some-post.html",
        "linkLabel": "Read more",
        "source": "S2,S3"
      }
    ]
  }
]
```

- `status`: 已完成, 進行中, 已移交, 規劃中, 未啟動 (each has its own badge color).
- `phase`: 需求分析, PoC 驗證, 評測選型, 建置開發, 上線維運, 移交.
- `ownership`: 主責 or 協作.
- `short`: short label shown on the AI SDLC chart (project and company level).
- `sdlc`: lifecycle stages for the AI SDLC chart in Proof, main stage first: `plan` (業務規劃), `tune` (模型調教), `build` (開發部署), `ops` (營運監控). The first stage shows as a solid tag; others show as dashed tags.
- `milestones[].status`: `done`, `doing`, `todo`.
- A KPI with value `待量測` shows in gray.
- `link`, `linkLabel`, `weight` (use `—` to hide) are optional. `source` is not displayed; it records which document supports the claim.

### 03. Experience (`data/experience.json`)

Array of entries, newest first:

```json
[
  {
    "title": "Company | Role",  // shown as two lines: company, then role
    "subtitle": "Optional one-liner",
    "date": "2026/02 ~ Now",
    "items": [
      "What you did",
      "Another thing you did"
    ]
  }
]
```

`subtitle` is optional — omit the field to skip it.

### 04. Side Projects (`data/projects.json`)

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

### 05. Blog

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
| Tech marquee | Edit the marquee HTML in `index.html` |
| Hero text | Edit the hero HTML in `index.html` |
| Contact info | Edit the contact HTML in `index.html` |

---

## Writing rules (ASD-STE100, Chinese adaptation)

Every claim on the site must trace to a source document. Write only numbers that the source contains.

1. One sentence, one topic. Descriptive sentences ≤ 40 characters; step sentences ≤ 30 characters.
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
