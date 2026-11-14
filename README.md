## Getting Started

```bash
# 1. Install dependencies (run from the repository root)
npm install

# 2. Create your local environment files from the templates
cp .env.example .env                    # PowerShell: Copy-Item .env.example .env
cp apps/api/.env.example apps/api/.env  # PowerShell: Copy-Item apps\api\.env.example apps\api\.env

# 3. Generate the Prisma Client
npm run db:generate

# 4. Start the database (Docker Desktop must be running)
npm run db:up

# 5. Start the web app: http://localhost:3000
npm run dev

# 6. Start the API (in a second terminal): http://localhost:4000/health
npm run dev:api
```
