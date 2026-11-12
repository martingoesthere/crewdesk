# CrewDesk: Project Handoff

_Last updated: 2026-11-12 (Sprint 1)_

## What CrewDesk Is

Job management SaaS for small field-service businesses (HVAC, plumbing, electrical, cleaning):
scheduling, technician dispatch, job tracking, and invoicing. Multi-tenant: each company's data
must stay private from every other company.

## Current State (what actually works)

- Monorepo using npm workspaces (`apps/*`, `packages/*`)
- `apps/web`: Next.js 16 starter app (TypeScript, Tailwind CSS, ESLint, App Router)
- `apps/api`: Express 5 + TypeScript (strict, ES modules) with `GET /health` returning `{ "status": "ok" }` on port 4000
- Root scripts: `dev`, `dev:api`, `build` (all apps), `lint` (web), `typecheck` (api), all verified
- **No product features yet.** No database, no auth, no business endpoints.

## Completed Tickets

- **ENG-001:** Environment verified, repository created, first push
- **ENG-002:** Monorepo + Next.js app (PR #1)
- **ENG-003:** `.gitattributes`, handoff notes, squash-only merging, `main` protected by ruleset (PR #2)

## In Progress

- **ENG-004:** Express API with health-check endpoint

## Key Decisions

| Decision                                                | Why                                                                    |
| ------------------------------------------------------- | ---------------------------------------------------------------------- |
| Separate Express API instead of a Next.js-only backend  | A mobile app for technicians is likely; one API can serve web + mobile |
| PostgreSQL + Prisma (planned)                           | Highly relational data; money needs transactions                       |
| npm workspaces monorepo                                 | Frontend, API, and shared types change together in one PR              |
| TypeScript `strict` mode from day one                   | Turning it on later in a large codebase is expensive                   |
| ES modules (`"type": "module"`, `NodeNext`) for the API | Current Node.js standard                                               |
| Squash-only merges, PR required for `main`              | Clean history; `main` always holds reviewed code                       |

## Known Issues / Tech Debt

- Earlier `npm install` reported 7 moderate vulnerabilities; later installs reported 0. Confirm with `npm audit` in a security ticket
- `eslint@9` deprecation warning from the Next.js generator
- `esbuild` install script is not approved (npm `allowScripts`); `tsx` works without it, so it is left unapproved
- The API has no linter yet (type-checked only)

## Local Environment Notes (Windows)

- Node 24.22.1, npm 11.19.1, Git 2.56, VS Code 1.145
- Use a **normal** (non-admin) PowerShell for all dev work
- If `Could not resolve host` appears: run `Get-DnsClientNrptPolicy`. A leftover VPN rule
  pointing to `10.2.0.1` breaks DNS. Fix: connect, then disconnect the VPN.

## Next Steps

1. Merge ENG-004
2. Set up PostgreSQL locally with Docker
3. Add Prisma and the first database models (companies, users)
