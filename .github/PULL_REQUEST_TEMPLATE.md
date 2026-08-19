### Summary

This PR completes the Hamrah platform: adds Prisma DB models (Restaurant, MenuItem), DB-backed auth, admin CRUD for restaurants and menu items, and CI/test scaffolding.

### Changes
- Prisma schema: added Restaurant and MenuItem models, and online flag
- Admin APIs: GET/POST /api/admin/restaurants and menu CRUD at /api/admin/restaurants/menu
- Admin UI: app/admin page updated to manage restaurants and menus
- Payments: Stripe scaffolding endpoints (app/api/payments/stripe.ts and webhook)
- CI: .github/workflows/ci.yml — runs tests, prisma generate, and build
- Added a unit test script scripts/db-crud-test.js

### Checklist
- [ ] Tests pass in CI
- [ ] PR reviewer verifies database migrations
- [ ] Set repository secrets: DATABASE_URL, JWT_SECRET, STRIPE_SECRET, STRIPE_WEBHOOK_SECRET, DIGITALOCEAN_ACCESS_TOKEN, DO_APP_ID
- [ ] Run `npx prisma migrate deploy` in production or let CI do it

### Notes
- This PR includes dynamic imports for `stripe` to avoid requiring the package in dev; in production install `stripe` package and set STRIPE_SECRET and STRIPE_WEBHOOK_SECRET.
- Local dev uses SQLite (DATABASE_URL=file:./dev.db). To run locally use `npm run db:generate` and `npm run db:seed-admin`.

/cc @maintainer