Deployment checklist for Hamrah Platform

Overview
--------
This document describes production-ready steps to deploy the Hamrah food-ordering Next.js app. The repository is configured as a Next.js app (App Router). The project builds successfully locally with `npm run build`.

Options
-------
1. Vercel (recommended)
   - Pros: native Next.js support, automatic builds, previews, CDN, zero config for most features.
   - Steps:
     1. Connect repository to Vercel or import the project.
     2. Set Environment Variables (see .env.example)
     3. Set build command: `npm run build` and output directory is handled by Next.js
     4. Deploy. Vercel will run builds for PRs and main automatically.

2. Docker (portable, works on most hosts)
   - Pros: self-contained artifact, easy to run on container platforms (AWS ECS, DigitalOcean App Platform, GCP Cloud Run, etc.)
   - Steps:
     1. Build image: `docker build -t hamrah-platform:latest .`
     2. Run locally: `docker run -p 3000:3000 --env-file .env.production -d hamrah-platform:latest`
     3. Use your cloud registry and platform to push & run the image.

3. Manual server (PM2 / systemd)
   - Steps:
     1. Ensure Node.js (>=18) is installed on the server.
     2. Copy repository, install deps: `npm ci`.
     3. Build: `npm run build`.
     4. Start production server: `npm start` (binds to PORT env variable if provided).

Environment variables
---------------------
Create production environment variables (example in .env.example):
- NEXT_PUBLIC_API_URL - base URL for public API endpoints (if separate)
- NODE_ENV=production

Files added
-----------
- Dockerfile — container image for the app
- .env.example — template for environment variables
- .github/workflows/ci.yml — CI workflow to run `npm ci` and `npm run build`

Post-deploy checks
------------------
- Verify the root route `/` returns HTTP 200 and renders correctly.
- Exercise these routes: `/restaurants`, `/cart`, `/checkout`, `/signin`, `/profile`, `/admin`, `/payment`.
- Check server logs for runtime errors.

Security notes
--------------
- Do not commit real secrets. Use environment variables or your host's secret store.
- For production user auth and payments, replace the mock APIs with real providers and secure storage.

Rollback plan
-------------
- Keep the last working image or commit tag. On failure, redeploy the previous artifact and investigate logs.

Contact
-------
If you want, I can prepare a deployment to a specific provider (Vercel, Docker Hub + Cloud Run, or GitHub Actions + your host). Tell me the target provider and any access details (I cannot use secrets — provide them via your provider UI) and I'll generate the required configuration.