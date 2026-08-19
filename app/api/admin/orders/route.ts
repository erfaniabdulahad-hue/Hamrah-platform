import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getUserFromRequest, unauthorizedResponse, forbiddenResponse } from '../../../lib/admin';

export async function GET(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return unauthorizedResponse();
  if (user.role !== 'ADMIN') return forbiddenResponse();

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { items: true },
  });

  return NextResponse.json({ ok: true, orders });
}

export async function PATCH(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return unauthorizedResponse();
  if (user.role !== 'ADMIN') return forbiddenResponse();

  try {
    const body = await req.json();
    const id = String(body?.id ?? '');
    const status = String(body?.status ?? '');
    if (!id || !status) return NextResponse.json({ ok: false, error: 'missing' }, { status: 400 });

    const updated = await prisma.order.update({ where: { id }, data: { status } });
    return NextResponse.json({ ok: true, order: updated });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
}
