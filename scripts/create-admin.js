#!/usr/bin/env node
// Creates or updates an admin user in the Prisma database.
// Usage examples:
//   ADMIN_NAME=admin ADMIN_PASSWORD=secret npm run db:seed-admin
//   node scripts/create-admin.js --name admin --password secret

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const argv = require('minimist')(process.argv.slice(2));

const prisma = new PrismaClient();

async function main() {
  const name = argv.name || process.env.ADMIN_NAME || 'admin';
  const password = argv.password || process.env.ADMIN_PASSWORD || 'adminpass';

  if (!name || !password) {
    console.error('Admin name and password are required. Provide via --name/--password or ADMIN_NAME/ADMIN_PASSWORD env vars.');
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { name } });
  if (existing) {
    const updated = await prisma.user.update({ where: { id: existing.id }, data: { password: hashed, role: 'ADMIN' } });
    console.log('Updated existing user to ADMIN:', { id: updated.id, name: updated.name });
  } else {
    const created = await prisma.user.create({ data: { name, password: hashed, role: 'ADMIN' } });
    console.log('Created admin user:', { id: created.id, name: created.name });
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
