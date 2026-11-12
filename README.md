# CrewDesk

Job management software for small field-service businesses (HVAC, plumbing, electrical, cleaning).

CrewDesk helps owners and dispatchers schedule jobs, assign technicians,
track work in the field, and invoice customers, all in one place.

> **Status:** Early development (Sprint 1). The web app shows the Next.js starter page, and the API has a health-check endpoint. No product features are implemented yet.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript (REST API)
- **Database (planned):** PostgreSQL with Prisma ORM
- **Testing (planned):** Vitest, React Testing Library, Playwright
- **DevOps (planned):** Docker, GitHub Actions, AWS

## Prerequisites

- Node.js 24 (LTS)
- npm 11+
- Git

## Getting Started

```bash
# 1. Install dependencies (run from the repository root)
npm install

# 2. Start the web app: http://localhost:3000
npm run dev

# 3. Start the API (in a second terminal): http://localhost:4000/health
npm run dev:api
```

## Useful Commands

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start the web app in development mode |
| `npm run dev:api`   | Start the API in development mode     |
| `npm run build`     | Build all apps for production         |
| `npm run lint`      | Lint the web app                      |
| `npm run typecheck` | Type-check the API                    |

## Project Structure

```
crewdesk/
├── apps/
│   ├── web/          # Next.js frontend (React + TypeScript + Tailwind)
│   └── api/          # Express REST API (TypeScript)
├── docs/             # Project documentation (handoff notes)
├── package.json      # Root workspace config and scripts
└── README.md
```

## Author

Martin ([@martingoesthere](https://github.com/martingoesthere))
