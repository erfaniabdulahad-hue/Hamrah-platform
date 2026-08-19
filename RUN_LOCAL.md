Local setup guide — Hamrah platform

This file shows the exact commands to start a local Postgres, apply Prisma migrations, and seed an admin user. Use the PowerShell script `scripts/run-local.ps1` on Windows or follow the manual steps below for Windows/macOS/Linux.

Prerequisites
- Node.js (v18+ or v20 recommended)
- npm
- Docker Desktop (or docker & docker compose available)
- Optional: GitHub repo with workflows configured (not required locally)

Quick (PowerShell on Windows)
1. From project root (PowerShell):
   ./scripts/run-local.ps1 -AdminName "admin" -AdminPassword "Secret123"

Manual steps (cross-platform)
1. Start Postgres (docker-compose):
   docker compose up -d
   # or: docker-compose up -d

2. Verify Postgres is running (optional):
   # Linux/macOS
   docker run --rm --network host postgres:15 pg_isready -h localhost -p 5432
   # Windows (may need different network flags)

3. Generate prisma client (optional but safe):
   npx prisma generate

4. Create and apply migrations:
   npx prisma migrate dev --name init
   # This will prompt and create migration files under prisma/migrations

5. (Optional) Generate client again:
   npx prisma generate

6. Seed admin user (creates/updates ADMIN user):
   ADMIN_NAME=admin ADMIN_PASSWORD=Secret123 npm run db:seed-admin
   # On PowerShell:
   # $env:ADMIN_NAME='admin'; $env:ADMIN_PASSWORD='Secret123'; npm run db:seed-admin

7. Start dev server:
   npm run dev

Testing admin
- Visit /signin and sign in with the admin credentials used above.
- Visit /admin to manage restaurants and orders.

CI/CD notes
- GitHub workflows are already added to run migrations and build on push to main and to trigger DigitalOcean App Platform deployments.
- Add the required secrets in GitHub: DATABASE_URL, DIGITALOCEAN_ACCESS_TOKEN, DO_APP_ID

Troubleshooting
- If Prisma complains about schema mismatch, run: npx prisma generate then npx prisma migrate dev --name fix
- If Docker isn't available on Windows use WSL2 or Docker Desktop for Windows

If you want, I can produce a short README section to paste into the repo root README.md and a one-liner to create and run the Docker/Postgres containers for Linux/macOS.
