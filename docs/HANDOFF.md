# CrewDesk: Project Handoff

_Last updated: 2026-11-12 (Sprint 1)_

## What CrewDesk Is

Job management SaaS for small field-service businesses (HVAC, plumbing, electrical, cleaning):
scheduling, technician dispatch, job tracking, and invoicing. Multi-tenant: each company's data
must stay private from every other company.

## Current State (what actually works)

- Monorepo using npm workspaces (`apps/*`, `packages/*`)
- `apps/web`: Next.js 16 starter app (TypeScript, Tailwind CSS, ESLint, App Router)
- `apps/api`: Express 5 + TypeScript (strict, ES modules); `GET /health` → `{ "status": "ok" }` on port 4000; `X-Powered-By` header disabled
- Local PostgreSQL 17 in Docker (`docker-compose.yml`): bound to `127.0.0.1:5432` only, health check, named volume for data
- Credentials come from `.env` (ignored by Git); `.env.example` is the committed template
- Root scripts: `dev`, `dev:api`, `build`, `lint`, `typecheck`, `db:up`, `db:down`, `db:psql`, all verified
- **No product features yet.** The API is not connected to the database. No Prisma, no auth.

## Completed Tickets

- **ENG-001:** Environment verified, repository created, first push
- **ENG-002:** Monorepo + Next.js app (PR #1)
- **ENG-003:** `.gitattributes`, handoff notes, squash-only merging, protected `main` (PR #2)
- **ENG-004:** Express API with health check (PR #3)

## In Progress

- **ENG-005:** Local PostgreSQL with Docker

## Key Decisions

| Decision                                               | Why                                                                    |
| ------------------------------------------------------ | ---------------------------------------------------------------------- |
| Separate Express API instead of a Next.js-only backend | A mobile app for technicians is likely; one API can serve web + mobile |
| PostgreSQL                                             | Highly relational data; money needs transactions                       |
| Docker for the local database                          | Every engineer gets the identical database with one command            |
| Pinned image `postgres:17-alpine`                      | Reproducible setup; no surprise upgrades                               |
| Database port bound to `127.0.0.1`                     | Not reachable from other devices on the network                        |
| npm workspaces monorepo                                | Frontend, API, and shared types change together in one PR              |
| TypeScript `strict` from day one                       | Turning it on later is expensive                                       |
| Squash-only merges, PR required for `main`             | Clean history; `main` always holds reviewed code                       |

## Known Issues / Tech Debt

- Confirm npm vulnerability status with `npm audit` (an earlier install reported 7 moderate; later installs reported 0)
- `eslint@9` deprecation warning from the Next.js generator
- `esbuild` install script left unapproved (`tsx` works without it)
- The API has no linter yet (type-checked only)
- No automated tests yet

## Local Environment Notes (Windows)

- Node 24.22.1, npm 11.19.1, Git 2.56, VS Code 1.145, Docker Desktop 4.99.0
- Use a **normal** (non-admin) PowerShell for all dev work
- `Could not resolve host`: run `Get-DnsClientNrptPolicy`. A leftover VPN rule pointing to
  `10.2.0.1` breaks DNS. Fix: connect, then disconnect the VPN.
- Docker `Internal Server Error`: the old Docker Desktop (2024) engine was failing. Fixed by updating Docker Desktop.

## Next Steps

1. Merge ENG-005
2. Add Prisma to the API and connect it to PostgreSQL
3. Design the first models (companies, users) with multi-tenancy in mind
