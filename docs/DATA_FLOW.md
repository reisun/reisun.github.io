# Data Flow: Projects

## Overview

GitHub の public repositories から情報を取得し、`/projects/` に一覧を表示する。

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   GitHub API    │────▶│  Build Script   │────▶│  projects.json  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │ React Component │
                                                └─────────────────┘
```

## Architecture Decision

### 推奨: ビルド時取得 → JSON 静的化

ビルド中に GitHub API から取得 → `projects.json` を生成 → フロントはそれを読む

**メリット:**
- クライアント直叩きより API レート制限や CORS の心配が少ない
- 初回表示が速い
- GitHub Pages で安定運用しやすい

### 代替: クライアント直接 API 呼び出し (非推奨)

- 実装は簡単だがレート制限・失敗時の UX・キャッシュ戦略が必要
- 最小構成なら「失敗したら静的メッセージを出す」でも可

---

## Data Source

### GitHub REST API

```
GET https://api.github.com/users/{username}/repos?per_page=100&sort=updated
```

### 取得項目

| Field              | Description                    |
| ------------------ | ------------------------------ |
| `name`             | リポジトリ名                   |
| `description`      | 説明                           |
| `html_url`         | リポジトリ URL                 |
| `homepage`         | デモ URL (設定されている場合)  |
| `language`         | 主要言語                       |
| `topics`           | トピックタグ (追加取得が必要な場合あり) |
| `stargazers_count` | スター数                       |
| `updated_at`       | 最終更新日時                   |
| `archived`         | アーカイブ済みフラグ           |
| `fork`             | フォークフラグ                 |

---

## Filtering Rules

| Condition              | Action           |
| ---------------------- | ---------------- |
| `archived == true`     | 除外 (または任意) |
| `fork == true`         | 除外 (または任意) |
| `description` が空     | 表示可 (UI で対応) |
| `homepage` が空        | Demo リンク非表示、または `https://{username}.github.io/{repo}/` を推測 (任意) |

---

## Output Format

### File Location

`public/projects.json` または `assets/projects.json`

### Schema

```json
{
  "generatedAt": "2024-01-01T00:00:00.000Z",
  "items": [
    {
      "name": "repo-name",
      "description": "Repository description",
      "repoUrl": "https://github.com/username/repo-name",
      "demoUrl": "https://username.github.io/repo-name/",
      "language": "TypeScript",
      "topics": ["react", "typescript"],
      "stars": 42,
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Field Specifications

| Field       | Type     | Required | Note                    |
| ----------- | -------- | -------- | ----------------------- |
| generatedAt | string   | Yes      | ISO 8601 形式           |
| items       | array    | Yes      | プロジェクト配列        |
| name        | string   | Yes      |                         |
| description | string   | No       | null 許容               |
| repoUrl     | string   | Yes      |                         |
| demoUrl     | string   | No       | 存在する場合のみ        |
| language    | string   | No       |                         |
| topics      | string[] | No       |                         |
| stars       | number   | Yes      |                         |
| updatedAt   | string   | Yes      | ISO 8601 形式           |

---

## Build Implementation

### GitHub Actions Workflow

1. GitHub Actions でビルド時に `projects.json` を生成
2. `GITHUB_TOKEN` を使用 (レート制限緩和)
3. 生成した JSON を成果物に含めて Pages へデプロイ

### Script Example (概要)

```javascript
// scripts/fetch-projects.js
// 1. GitHub API を呼び出し
// 2. フィルタリング (archived, fork)
// 3. 必要なフィールドを抽出・変換
// 4. JSON ファイルとして出力
```

---

## Acceptance Criteria

- [ ] ビルド時に `projects.json` が生成される
- [ ] `projects.json` が Pages に配置される
- [ ] `/projects/` は `projects.json` を読み、カード一覧を表示できる
- [ ] `archived` / `fork` の除外が仕様通りに機能する
- [ ] `Demo` リンクは存在する時のみ表示される
