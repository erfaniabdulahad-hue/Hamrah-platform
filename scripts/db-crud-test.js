const { PrismaClient } = require('@prisma/client');

async function run() {
  const prisma = new PrismaClient();
  try {
    // Create a restaurant
    const r = await prisma.restaurant.create({ data: { name: 'test-rest-' + Date.now(), description: 'test', badge: 'تست', eta: '10-20', rating: 4.5 } });
    console.log('created restaurant', r.id);

    // Create menu item
    const item = await prisma.menuItem.create({ data: { restaurantId: r.id, title: 'test-item', description: 'desc', price: 100, icon: '🍛' } });
    console.log('created menu item', item.id);

    // Read
    const items = await prisma.menuItem.findMany({ where: { restaurantId: r.id } });
    if (items.length !== 1) throw new Error('unexpected items length');

    // Update
    const updated = await prisma.menuItem.update({ where: { id: item.id }, data: { price: 200 } });
    if (updated.price !== 200) throw new Error('update failed');

    // Delete
    await prisma.menuItem.delete({ where: { id: item.id } });
    const remaining = await prisma.menuItem.findMany({ where: { restaurantId: r.id } });
    if (remaining.length !== 0) throw new Error('delete failed');

    // Cleanup restaurant
    await prisma.restaurant.delete({ where: { id: r.id } });

    console.log('DB CRUD test passed');
    process.exit(0);
  } catch (err) {
    console.error('DB CRUD test failed', err);
    process.exit(2);
  } finally {
    try { await prisma.$disconnect(); } catch (e) {}
  }
}

run();
