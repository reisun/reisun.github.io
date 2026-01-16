# Architecture Overview

## Project Goal

`https://{username}.github.io/` のポートフォリオサイトを構築する。
GitHub の public repositories を動的に取得し、プロジェクト一覧として表示する。

## Tech Stack

| Layer       | Technology           |
| ----------- | -------------------- |
| Framework   | Vite + React         |
| Styling     | TBD (CSS Modules等)  |
| Hosting     | GitHub Pages         |
| CI/CD       | GitHub Actions       |
| Data Source | GitHub REST API      |

## Development Environment

- Docker Compose でローカル起動可能
- Hot reload 対応

## Directory Structure (想定)

```
/
├── docs/                  # ドキュメント
├── public/
│   └── projects.json      # ビルド時生成
├── src/
│   ├── components/
│   ├── pages/
│   └── ...
├── scripts/
│   └── fetch-projects.js  # JSON生成スクリプト
├── docker-compose.yml
├── vite.config.js
└── package.json
```

## Key Architecture Decisions

### 1. 静的サイト生成 (SSG) アプローチ

GitHub API からのデータ取得は**ビルド時**に行い、`projects.json` として静的化する。

**理由:**
- クライアント直叩きより API レート制限や CORS の心配が少ない
- 初回表示が速い
- GitHub Pages で安定運用しやすい

### 2. ページ構成

- `/` - トップページ (Hero + 導線)
- `/projects/` - プロジェクト一覧
- `/about/` - About (任意・最小構成)

詳細: [PAGES.md](./PAGES.md)

### 3. データフロー

GitHub API → ビルドスクリプト → `projects.json` → React コンポーネント

詳細: [DATA_FLOW.md](./DATA_FLOW.md)

## Non-goals (スコープ外)

- フル CMS
- お問い合わせフォーム
- 高度なアニメーション
- ダークモード (必要なら後で追加)
