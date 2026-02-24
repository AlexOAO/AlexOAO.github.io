# alexoao.github.io

Alex Li's portfolio & blog.

**Live:** [https://alexoao.github.io](https://alexoao.github.io)

---

## Structure

```
.
├── index.html                  # Main page
├── assets/
│   ├── css/
│   │   └── post.css            # Shared blog post styles
│   ├── images/
│   │   └── profile.jpg         # Profile photo
│   └── docs/
│       └── resume.pdf          # CV
├── posts/
│   ├── posts.json              # Blog index (add entries here)
│   ├── rag-smart-customer-service.html
│   └── multi-agent-investment.html
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deploy on push
└── README.md
```

## Deployment

Push to `main` → GitHub Actions auto-deploys to Pages.

First-time setup: **Settings > Pages > Source > GitHub Actions**

## How to Add a Blog Post

**Step 1:** Create `posts/your-post-slug.html`

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Title | Alex Li</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/post.css">
</head>
<body>
  <nav class="post-nav">
    <a href="../index.html" class="back-link">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"/>
        <polyline points="12 19 5 12 12 5"/>
      </svg>
      Back
    </a>
  </nav>

  <article class="post">
    <header class="post-header">
      <div class="post-meta">
        <time>YYYY-MM-DD</time>
        <div class="post-tags"><span>Tag1</span><span>Tag2</span></div>
      </div>
      <h1>Your Title</h1>
    </header>
    <div class="post-body">
      <!-- Write your content here using h2, p, ul, code, pre, blockquote, img -->
    </div>
  </article>

  <footer class="post-footer">
    <a href="../index.html#blog" class="back-link">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"/>
        <polyline points="12 19 5 12 12 5"/>
      </svg>
      All Posts
    </a>
  </footer>
</body>
</html>
```

**Step 2:** Add an entry to `posts/posts.json`

```json
{
  "id": "your-post-slug",
  "title": "Your Title",
  "date": "YYYY-MM-DD",
  "summary": "A one-liner about this post.",
  "tags": ["Tag1", "Tag2"],
  "file": "posts/your-post-slug.html"
}
```

**Step 3:** Push. Done.

## Other Updates

| What | How |
|------|-----|
| Profile photo | Replace `assets/images/profile.jpg` |
| Resume | Replace `assets/docs/resume.pdf` |
| Project card | Copy a `.project-card` block in `index.html` |
| Experience | Add a `.timeline-item` block in `index.html` |
| Tech marquee | Add a `.marquee-item` span (and its duplicate) |
