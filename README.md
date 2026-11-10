# CrewDesk

Job management software for small field-service businesses (HVAC, plumbing, electrical, cleaning).

CrewDesk helps owners and dispatchers schedule jobs, assign technicians,
track work in the field, and invoice customers, all in one place.

> **Status:** Early development (Sprint 0). The web app runs locally and shows the Next.js starter page. No product features are implemented yet.

## Planned Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript (REST API)
- **Database:** PostgreSQL with Prisma ORM
- **Testing:** Vitest, React Testing Library, Playwright
- **DevOps:** Docker, GitHub Actions, AWS

## Prerequisites

- Node.js 24 (LTS)
- npm 11+
- Git

## Getting Started

```bash
# 1. Install dependencies (run from the repository root)
npm install

# 2. Start the web app in development mode
npm run dev
```

Then open http://localhost:3000.

## Project Structure

```
crewdesk/
├── apps/
│   └── web/          # Next.js frontend (React + TypeScript + Tailwind)
├── package.json      # Root workspace config and scripts
└── README.md
```

## Author

Martin ([@martingoesthere](https://github.com/martingoesthere))
