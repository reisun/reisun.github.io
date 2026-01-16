# Implementation Tasks

## Overview

GitHub Pages ポートフォリオサイトの実装タスク一覧

---

## Tasks

| # | Task | Description | Group | Dependencies | Status |
|---|------|-------------|-------|--------------|--------|
| 1 | 環境構築 | Vite + React プロジェクト初期化、Docker Compose 設定 | A | - | [x] |
| 2 | 共通レイアウト | Header (sticky) / Footer コンポーネント | A | 1 | [x] |
| 3 | ルーティング | React Router 設定 (`/`, `/projects/`, `/about/`) | A | 1 | [x] |
| 4 | トップページ | Hero セクション (Title, Subtitle, CTA ボタン) | C-1 | 2, 3 | [ ] |
| 5 | データ取得スクリプト | `scripts/fetch-projects.js` (GitHub API → JSON) | B | 1 | [x] |
| 6 | Projects ページ | カード一覧 + 検索/ソート機能 | C-2 | 2, 3, 5 | [ ] |
| 7 | About ページ | 最小構成で実装 | C-3 | 2, 3 | [ ] |
| 8 | CI/CD | GitHub Actions ワークフロー (ビルド + デプロイ) | B | 5 | [x] |
| 9 | スタイリング | Figma デザインの適用 | D | 2-7 | [ ] |

---

## Task Details

### 1. 環境構築

- [x] Vite + React (TypeScript) プロジェクト作成
- [x] `package.json` 設定
- [x] `docker-compose.yml` 作成
- [x] `Dockerfile` 作成 (開発用)
- [x] `.gitignore` 更新
- [x] ローカルで `docker compose up` で起動確認

**成果物:**
- `package.json`
- `vite.config.ts`
- `docker-compose.yml`
- `Dockerfile`
- `src/main.tsx`
- `src/App.tsx`

---

### 2. 共通レイアウト

- [x] `Layout` コンポーネント作成
- [x] `Header` コンポーネント (sticky)
  - サイトタイトル (左)
  - ナビゲーション (右): Home, Projects, About
- [x] `Footer` コンポーネント
  - Copyright
  - Build info (optional)
- [ ] モバイル対応 (後回し可)

**成果物:**
- `src/components/Layout.tsx`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`

---

### 3. ルーティング

- [x] `react-router-dom` 導入
- [x] ルート定義
  - `/` → Home
  - `/projects/` → Projects
  - `/about/` → About
- [ ] 404 ページ (optional)

**成果物:**
- `src/router.tsx` または `src/App.tsx` 内で設定

---

### 4. トップページ

- [ ] `HomePage` コンポーネント
- [ ] `Hero` セクション
  - Title
  - Subtitle
  - CTA Primary: "View Projects" → `/projects/`
  - CTA Secondary: "GitHub Profile" → external link
- [ ] Featured セクション (optional, 後回し可)
- [ ] Quick Links セクション (optional)

**成果物:**
- `src/pages/HomePage.tsx`
- `src/components/Hero.tsx`

---

### 5. データ取得スクリプト

- [x] `scripts/fetch-projects.js` 作成
- [x] GitHub REST API 呼び出し
  - `GET /users/{username}/repos?per_page=100&sort=updated`
- [x] フィルタリング
  - `archived === true` → 除外
  - `fork === true` → 除外
- [x] データ変換 (schema に従う)
- [x] `public/projects.json` 出力
- [x] npm script 追加: `"fetch-projects": "node scripts/fetch-projects.js"`

**成果物:**
- `scripts/fetch-projects.js`
- `public/projects.json` (生成物)

**Schema:**
```json
{
  "generatedAt": "ISO8601",
  "items": [
    {
      "name": "string",
      "description": "string | null",
      "repoUrl": "string",
      "demoUrl": "string | null",
      "language": "string | null",
      "topics": ["string"],
      "stars": "number",
      "updatedAt": "ISO8601"
    }
  ]
}
```

---

### 6. Projects ページ

- [ ] `ProjectsPage` コンポーネント
- [ ] `projects.json` 読み込み
- [ ] `ProjectCard` コンポーネント
  - Title (name)
  - Description
  - Language badge
  - Stars
  - Updated date
  - Repo link (required)
  - Demo link (if exists)
- [ ] 検索機能 (name / description)
- [ ] ソート機能 (updated desc)
- [ ] Empty state: "No projects found"
- [ ] Error state: "Failed to load projects"

**成果物:**
- `src/pages/ProjectsPage.tsx`
- `src/components/ProjectCard.tsx`
- `src/components/SearchInput.tsx`
- `src/components/SortSelect.tsx`

---

### 7. About ページ

- [ ] `AboutPage` コンポーネント
- [ ] 最小構成で実装
  - 名前
  - 簡単な自己紹介

**成果物:**
- `src/pages/AboutPage.tsx`

---

### 8. CI/CD

- [x] `.github/workflows/deploy.yml` 作成
- [x] Workflow steps:
  1. Checkout
  2. Setup Node.js
  3. Install dependencies
  4. Run `fetch-projects` script (with GITHUB_TOKEN)
  5. Build
  6. Deploy to GitHub Pages
- [x] トリガー: push to main

**成果物:**
- `.github/workflows/deploy.yml`

---

### 9. スタイリング

- [ ] CSS 方針決定 (CSS Modules / Tailwind / etc.)
- [ ] Figma デザインをコンポーネントに適用
- [ ] レスポンシブ対応
- [ ] カラーパレット / タイポグラフィ統一

**成果物:**
- 各コンポーネントのスタイル

---

## Parallel Work Groups

並行作業可能なグループ分け:

```
Group A (Frontend Foundation)     Group B (Data Layer)
├── 1. 環境構築                    ├── 5. データ取得スクリプト
├── 2. 共通レイアウト              └── 8. CI/CD
└── 3. ルーティング
        ✅ 完了                            ✅ 完了

                    ↓ (A, B 完了後)

Group C (Page Implementation) - 並行作業可能
├── C-1: 4. トップページ      (独立)
├── C-2: 6. Projects ページ   (独立)
└── C-3: 7. About ページ      (独立)

                    ↓ (C 完了後)

Group D (Polish)
└── 9. スタイリング
```

---

## Notes

- 詳細仕様は [docs/](docs/) を参照
- Figma デザインは MCP 経由で取得可能
