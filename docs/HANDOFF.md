# CrewDesk: Project Handoff

_Last updated: 2026-11-14 (Sprint 2)_

## What CrewDesk Is

Job management SaaS for small field-service businesses (HVAC, plumbing, electrical, cleaning):
scheduling, technician dispatch, job tracking, and invoicing. **Multi-tenant:** each company's
data must stay private from every other company.

## Current State (what actually works)

- Monorepo with npm workspaces (`apps/*`, `packages/*`)
- `apps/web`: Next.js 16 starter page (TypeScript, Tailwind CSS, ESLint, App Router)
- `apps/api`: Express 5 + TypeScript (strict, ES modules)
  - `GET /health` → `{ status: "ok", database: "ok" }`, or **503** when the database is unreachable
  - `X-Powered-By` header disabled
  - Prisma 7.10 with `@prisma/adapter-pg`; client generated to `src/generated/prisma` (git-ignored)
- PostgreSQL 17 in Docker: `127.0.0.1:5432` only, health check, named volume
- Database tables: `companies`, `users` (`Role` enum: OWNER / DISPATCHER / TECHNICIAN)
- **Not built yet:** authentication, business endpoints, web ↔ API connection, automated tests, CI, deployment

## Completed Tickets

| Ticket  | Summary                                                               | PR  |
| ------- | --------------------------------------------------------------------- | --- |
| ENG-001 | Environment check, repo created, first push                           | n/a |
| ENG-002 | Monorepo + Next.js app                                                | #1  |
| ENG-003 | `.gitattributes`, handoff notes, squash-only merges, protected `main` | #2  |
| ENG-004 | Express API + `/health`                                               | #3  |
| ENG-005 | PostgreSQL in Docker                                                  | #4  |
| ENG-006 | Prisma connection + database health check                             | #5  |
| ENG-007 | Company and User models, first migration                              | #6  |

## Key Decisions

| Decision                                                | Why                                                                                   |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Separate Express API (not Next.js-only)                 | A technician mobile app is likely; one API serves web + mobile                        |
| PostgreSQL + Prisma                                     | Relational data, transactions, type-safe queries                                      |
| **Prisma 7, not 8**                                     | Prisma 8 was still a release candidate (`8.0.0-rc`). Upgrade later in its own ticket  |
| Multi-tenancy via `companyId` on every tenant-owned row | One database, many companies; **every company-data query must filter by `companyId`** |
| UUID primary keys                                       | Not guessable; don't reveal record counts                                             |
| New users default to `TECHNICIAN`                       | Least privilege                                                                       |
| `onDelete: Restrict` on company → users                 | Prevents accidental data loss                                                         |
| Docker DB bound to `127.0.0.1`                          | Not reachable from other devices on the network                                       |
| TypeScript `strict` from day one                        | Cheap now, expensive later                                                            |
| Install scripts (esbuild, Prisma) not approved          | Tools verified working without them                                                   |
| Squash-only merges; PR required for `main`              | Clean history; reviewed code only                                                     |

## Follow-ups / Tech Debt

- **Testing:** automated test for "DB down → API recovers without restart"
- **API:** graceful shutdown (close DB connection on stop); health-check timeout; split liveness vs. readiness
- **Auth ticket:** case-insensitive email uniqueness; password hashing
- **Security:** review `npm audit` results; `eslint@9` deprecation warning
- **Tooling:** API has no linter yet; `db:psql` hard-codes user/db names; DB credentials duplicated in root `.env` and `apps/api/.env`
- **Upgrade:** evaluate Prisma 8 once it is final and proven

## Local Environment Notes (Windows)

- Node 24.22.1, npm 11.19.1, Git 2.56, VS Code 1.145, Docker Desktop 4.99.0
- Use a **normal** (non-admin) PowerShell
- `Could not resolve host`: run `Get-DnsClientNrptPolicy`. A leftover VPN rule pointing to `10.2.0.1` breaks DNS. Fix: connect, then disconnect the VPN.
- Docker `Internal Server Error` / `failed to connect to the docker API`: Docker Desktop is outdated or not running. Update it / start it and wait for "Engine running".

## Next Steps

1. Automated testing for the API (Vitest + Supertest), including the health check
2. Authentication: registration, login, password hashing, sessions
3. First tenant-scoped endpoints (always filtered by `companyId`)
