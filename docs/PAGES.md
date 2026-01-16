# Page Specifications

## Pages Overview

| Path         | Name           | Description              |
| ------------ | -------------- | ------------------------ |
| `/`          | Top / Home     | ランディングページ       |
| `/projects/` | Projects Index | プロジェクト一覧         |
| `/about/`    | About          | 自己紹介 (任意・最小構成) |

---

## Global Layout

### Header (sticky)

常に画面上部に表示（スクロールしても残る）

**構成:**
- 左: サイトタイトル (クリックで `/` へ)
- 右: ナビゲーション
  - Home → `/`
  - Projects → `/projects/`
  - About → `/about/` (任意)
  - Theme Toggle (任意・初期実装では不要)

**モバイル対応:**
- ハンバーガーメニュー or 2段構成
- 実装負荷が高ければ初期は非 sticky でも可

### Main

- 余白・幅はテンプレ準拠
- 最大幅を設けて読みやすく

### Footer

**構成:**
- `© {year} {name or username}`
- Build info (任意)
  - `Last updated: YYYY-MM-DD`
  - `Source` → リポジトリへのリンク
- Contact は**置かない方針**

---

## Page: Top (`/`)

### Section: Hero (推奨)

ファーストビューに配置。Projects への導線を明確に。

| Element     | Content                               |
| ----------- | ------------------------------------- |
| Title       | `{name}` または `{username}`          |
| Subtitle    | 短い一文                              |
| CTA Primary | `View Projects` → `/projects/`        |
| CTA Secondary | `GitHub Profile` → GitHub プロフィール |

### Section: Featured / Pinned (任意・後回し可)

- 3〜6 枚のカードで「まず見てほしい」ものを表示
- 初期実装では**省略可**
- 実装する場合はデータは静的（手書き）で良い

### Section: Quick Links (任意)

- GitHub / X / Blog / Docs などのリンク
- 最小なら GitHub のみ

---

## Page: Projects (`/projects/`)

### Data Source

`projects.json` を読み込んで表示

### List UI

**検索:**
- 文字列検索 (name / description)

**ソート (最低限どれか1つ):**
- `updated desc` (推奨)
- `stars desc` (任意)

**フィルタ (任意):**
- `language`
- `topic`

### Card Component

各カードの構成要素:

| Element     | Required | Note                              |
| ----------- | -------- | --------------------------------- |
| Title       | Yes      | repo name                         |
| Description | Yes      | なければ非表示/プレースホルダ     |
| Language    | No       | メタ情報として表示                |
| Stars       | No       | メタ情報として表示                |
| Updated     | No       | メタ情報として表示                |
| Repo Link   | Yes      | 必須                              |
| Demo Link   | No       | `demoUrl` がある時のみ表示        |

### Empty / Error States

| State           | Message                                      |
| --------------- | -------------------------------------------- |
| 0 件            | `No projects found`                          |
| 読み込み失敗    | `Failed to load projects. Please try again later.` |

---

## Page: About (`/about/`)

- 任意・最小構成で良い
- 内容は後から拡張可能

---

## UX Requirements

- Projects への導線は、トップのファーストビュー (Hero) に必ず置く
- ナビは常に迷子にならない程度にシンプルにする

---

## Acceptance Criteria

- [ ] `/` が表示できる
- [ ] Header + Main + Footer が実装されている
- [ ] `/projects/` へ遷移できる導線が明確 (ボタンとナビの両方)
- [ ] 静的ホスティング (GitHub Pages) で動作する
- [ ] `/projects/` でカード一覧が表示される
- [ ] 検索・ソートが機能する
