# CrewDesk

Job management software for small field-service businesses (HVAC, plumbing, electrical, cleaning).

CrewDesk helps owners and dispatchers schedule jobs, assign technicians,
track work in the field, and invoice customers, all in one place.

> **Status:** Early development (Sprint 1). The web app shows the Next.js starter page, the API has a health-check endpoint, and a local PostgreSQL database runs in Docker. No product features are implemented yet.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript (REST API)
- **Database:** PostgreSQL 17 (Docker for local development); Prisma ORM planned
- **Testing (planned):** Vitest, React Testing Library, Playwright
- **DevOps (planned):** GitHub Actions, AWS

## Prerequisites

- Node.js 24 (LTS)
- npm 11+
- Git
- Docker Desktop (with the engine running)

## Getting Started

```bash
# 1. Install dependencies (run from the repository root)
npm install

# 2. Create your local environment file from the template
cp .env.example .env        # PowerShell: Copy-Item .env.example .env

# 3. Start the database
npm run db:up

# 4. Start the web app: http://localhost:3000
npm run dev

# 5. Start the API (in a second terminal): http://localhost:4000/health
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
| `npm run db:up`     | Start the local PostgreSQL database   |
| `npm run db:down`   | Stop the database (data is kept)      |
| `npm run db:psql`   | Open a SQL prompt in the database     |

## Project Structure

```
crewdesk/
├── apps/
│   ├── web/              # Next.js frontend (React + TypeScript + Tailwind)
│   └── api/              # Express REST API (TypeScript)
├── docs/                 # Project documentation (handoff notes)
├── docker-compose.yml    # Local PostgreSQL database
├── .env.example          # Environment variable template (copy to .env)
├── package.json          # Root workspace config and scripts
└── README.md
```

## Author

Martin ([@martingoesthere](https://github.com/martingoesthere))
