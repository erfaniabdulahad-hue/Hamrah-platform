import { NextResponse } from 'next/server';
import prisma from '../../../../app/lib/prisma';

export async function GET() {
  const restaurants = await prisma.restaurant.findMany({ orderBy: { createdAt: 'desc' }, include: { menu: true } });
  return NextResponse.json({ ok: true, restaurants });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const r = await prisma.restaurant.create({
      data: {
        name: body.name || 'رستوران جدید',
        description: body.description || null,
        badge: body.badge || 'جدید',
        eta: body.eta || '۲۰–۳۰ دقیقه',
        rating: body.rating ? Number(body.rating) : 4.9,
        online: typeof body.online === 'boolean' ? body.online : true,
      },
    });

    return NextResponse.json({ ok: true, restaurant: r });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
}
