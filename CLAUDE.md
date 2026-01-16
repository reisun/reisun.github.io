# CLAUDE.md
Claude Code Repository Rules

## Project Documentation

実装仕様は以下のドキュメントを参照:

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - 全体アーキテクチャ
- [docs/PAGES.md](docs/PAGES.md) - ページ仕様
- [docs/DATA_FLOW.md](docs/DATA_FLOW.md) - プロジェクトデータフロー

---

This repository follows the **global Claude environment and workflow policy**:

`~/claude-policy/ENVIRONMENT.md`
`~/claude-policy/WORKFLOW.md`

If there is any conflict, **the rules in this file take precedence for this repository**.

---

## 1. Repository Scope

- Claude Code may operate **only within this repository**
- External repositories, submodules, or shared volumes require **human confirmation**

---

## 2. Docker Compose Rules (Repository-specific)

### 2.1 Allowed (no volume deletion)
- `docker compose up -d`
- `docker compose stop`
- `docker compose start`
- `docker compose restart`
- `docker compose ps`
- `docker compose logs`
- `docker compose build`
- `docker compose up -d --build`

### 2.2 Human confirmation required
- `docker compose down -v`
- Any volume / image removal
- Database reset or destructive migration

---

## 3. Ports and Network

- Ports must be bound to `127.0.0.1` unless explicitly approved
- Do not change port exposure without explaining the risk

---

## 4. Environment Variables

- `.env` files must NOT be committed
- Secrets must not appear in logs or output
- `.env.example` may be created using dummy values only

---

## 5. Git Rules (Repository-specific)

- Work on feature branches only
- Commit changes in small, reviewable units
- No force push without human approval

---

## 6. Pre-execution Protocol (Mandatory)

Before executing any command that changes state, Claude Code must present:

1. Purpose
2. Exact command
3. Impact scope (files / services / data loss)

---

## 7. Prohibited Actions (Reiteration)

- `sudo`
- Access to `/mnt/c`
- Destructive Docker operations without approval
- History rewriting without approval

---

End of repository-specific rules.
