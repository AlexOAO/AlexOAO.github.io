# alexoao.github.io

Alex Li's portfolio & blog.

**Live:** [https://alexoao.github.io](https://alexoao.github.io)

---

## Structure

```
.
├── index.html                  # Main page (layout only, content from JSON)
├── data/
│   ├── about.json              # 01. About section
│   ├── experience.json         # 02. Experience section
│   └── projects.json           # 03. Projects section
├── posts/
│   ├── posts.json              # 04. Blog index
│   └── *.html                  # Individual blog posts
├── assets/
│   ├── css/post.css            # Shared blog post styles
│   ├── images/profile.jpg      # Profile photo
│   └── docs/resume.pdf         # CV
├── .github/workflows/deploy.yml
└── README.md
```

## Deployment

Push to `main` → auto-deploys via GitHub Actions.

First-time: **Settings > Pages > Source > GitHub Actions**

---

## Editing Guide

All content lives in JSON files. Edit JSON, push, done.

### 01. About (`data/about.json`)

```json
{
  "paragraphs": [
    "First paragraph...",
    "Second paragraph..."
  ],
  "cards": [
    { "label": "Currently", "value": "Your current role" },
    { "label": "Education", "value": "Your school" },
    { "label": "Focus", "value": "Your focus area" },
    { "label": "Fun fact", "value": "Something personal" }
  ]
}
```

### 02. Experience (`data/experience.json`)

Array of entries, newest first:

```json
[
  {
    "title": "Company | Role",
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

### 03. Projects (`data/projects.json`)

Array of project cards:

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
| Tech marquee | Edit the marquee HTML in `index.html` |
| Hero text | Edit the hero HTML in `index.html` |
| Contact info | Edit the contact HTML in `index.html` |
