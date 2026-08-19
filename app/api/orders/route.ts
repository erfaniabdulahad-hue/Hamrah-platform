import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const customerName = String(body?.name ?? '').trim();
    const address = String(body?.address ?? '').trim();
    const items = Array.isArray(body?.items) ? body.items : [];

    if (!customerName || !address || items.length === 0) {
      return NextResponse.json({ ok: false, error: 'missing_order_details' }, { status: 400 });
    }

    const total = items.reduce((s: number, it: any) => s + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0);

    const order = await prisma.order.create({
      data: {
        customerName,
        address,
        total: Math.round(total),
        status: 'pending',
        items: {
          create: items.map((it: any) => ({
            title: String(it.title ?? 'غذا'),
            price: Math.round(Number(it.price) || 0),
            quantity: Math.max(1, Number(it.quantity) || 1),
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ ok: true, orderId: order.id, status: order.status, total: order.total });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'invalid_json', details: String(err) }, { status: 400 });
  }
}
