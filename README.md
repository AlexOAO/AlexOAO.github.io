# alexoao.github.io

李翔緯 (Alex Li) 的個人作品集網站。

**Live:** [https://alexoao.github.io](https://alexoao.github.io)

---

## 專案結構

```
.
├── index.html                  # 網站主頁面（單頁式）
├── assets/
│   ├── images/
│   │   └── profile.jpg         # 個人照片
│   └── docs/
│       └── resume.pdf          # 履歷 PDF
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages 自動部署
└── README.md
```

## 網站區塊

| # | 區塊 | 說明 |
|---|------|------|
| Hero | 首頁橫幅 | 大頭照、姓名、快速連結 |
| 01 | 關於我 | 自我介紹與個人資訊 |
| 02 | 實習與經歷 | 時間軸展示工作經歷 |
| 03 | GitHub 作品集 | 精選 repo 卡片 |
| 04 | 技能專長 | 開發技術、AI/LLM、金融數據等 |
| 05 | 教育背景 | 臺科大財金所、東海 GMBA |
| 06 | 專業證照 | 金融與 AI 相關證照 |
| 07 | 聯絡我 | 聯絡資訊與表單 |

## 部署方式

本站使用 **GitHub Actions** 自動部署：

- 每次 push 至 `main` 分支即自動觸發部署
- 也可於 Actions 頁面手動觸發 (`workflow_dispatch`)

### 首次設定

1. 前往 repo **Settings** > **Pages**
2. Source 選擇 **GitHub Actions**
3. Push 任意 commit 即完成部署

## 維護指南

### 更新履歷

替換 `assets/docs/resume.pdf` 即可。

### 更新照片

替換 `assets/images/profile.jpg`，建議尺寸 400x400 以上的正方形圖片。

### 新增 GitHub 專案卡片

在 `index.html` 的 `#projects` 區塊內複製一個 `.project-card` 並修改內容：

```html
<div class="project-card">
  <div class="project-icon"><!-- emoji --></div>
  <h3>專案名稱</h3>
  <p>專案描述</p>
  <div class="project-tags">
    <span>標籤1</span><span>標籤2</span>
  </div>
  <a href="https://github.com/AlexOAO/repo-name" target="_blank" class="project-link">
    查看專案
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  </a>
</div>
```

### 更新經歷

在 `index.html` 的 `#experience` 區塊內新增 `.timeline-item`。

## 技術棧

- 純 HTML / CSS / JavaScript（無框架依賴）
- Google Fonts (Noto Sans TC, Inter)
- FormSubmit（聯絡表單）
- GitHub Actions（CI/CD）
