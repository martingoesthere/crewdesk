# CrewDesk: Project Handoff

_Last updated: 2026-11-11 (Sprint 0)_

## What CrewDesk Is

Job management SaaS for small field-service businesses (HVAC, plumbing, electrical, cleaning):
scheduling, technician dispatch, job tracking, and invoicing. Multi-tenant: each company's data
must stay private from every other company.

## Current State (what actually works)

- Monorepo using npm workspaces (`apps/*`, `packages/*`)
- `apps/web`: Next.js 16 starter app (TypeScript, Tailwind CSS, ESLint, App Router)
- Root scripts: `npm run dev`, `npm run lint`, `npm run build` (all verified passing)
- **No product features implemented yet.** No API, no database, no auth.

## Completed Tickets

- **ENG-001:** Environment verified, repository created, first commit pushed to GitHub
- **ENG-002:** Monorepo + Next.js app scaffolded (PR #1, merged)

## In Progress

- **ENG-003:** Repository hygiene (`.gitattributes`, this handoff file, GitHub merge settings)

## Key Decisions

| Decision                                                       | Why                                                                                      |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Separate Express API (planned) instead of Next.js-only backend | A mobile app for technicians is likely; one API can serve web + mobile                   |
| PostgreSQL + Prisma (planned)                                  | Highly relational data (company → customers → jobs → invoices); money needs transactions |
| npm workspaces monorepo                                        | Frontend, API, and shared types change together in one PR                                |
| Tailwind CSS                                                   | Consistent design across many screens                                                    |
| Conventional Commits + feature branches + PR review            | Readable history; `main` always holds reviewed code                                      |

## Known Issues / Tech Debt

- `npm install` reports 7 moderate vulnerabilities (needs a security review ticket; do not auto-fix)
- `eslint@9` deprecation warning from the generator
- `npm install` is slow on this machine (likely antivirus scanning `node_modules`)

## Local Environment Notes (Windows)

- Node 24.22.1, npm 11.19.1, Git 2.56, VS Code 1.145
- Use a **normal** (non-admin) PowerShell for all dev work
- If `Could not resolve host` appears: run `Get-DnsClientNrptPolicy`. A leftover VPN rule
  pointing to `10.2.0.1` breaks DNS. Fix: connect, then disconnect the VPN.

## How to Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Next Steps

1. Finish ENG-003 and merge with **Squash and merge**
2. Set up the Express API in `apps/api`
3. Set up PostgreSQL (Docker) and Prisma
