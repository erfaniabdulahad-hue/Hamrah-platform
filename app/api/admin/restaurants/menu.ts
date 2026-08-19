import { NextResponse } from 'next/server';
import prisma from '../../../../app/lib/prisma';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const restaurantId = url.searchParams.get('restaurantId');
  if (!restaurantId) return NextResponse.json({ ok: false, error: 'missing_restaurantId' }, { status: 400 });
  const items = await prisma.menuItem.findMany({ where: { restaurantId } });
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.restaurantId) return NextResponse.json({ ok: false, error: 'missing_restaurantId' }, { status: 400 });
    const item = await prisma.menuItem.create({ data: {
      restaurantId: body.restaurantId,
      title: body.title || 'آیتم جدید',
      description: body.description || null,
      price: Number(body.price) || 0,
      icon: body.icon || null,
    }});
    return NextResponse.json({ ok: true, item });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) return NextResponse.json({ ok: false, error: 'missing_id' }, { status: 400 });
    const item = await prisma.menuItem.update({ where: { id: body.id }, data: { title: body.title, description: body.description, price: body.price ? Number(body.price) : undefined, icon: body.icon } });
    return NextResponse.json({ ok: true, item });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) return NextResponse.json({ ok: false, error: 'missing_id' }, { status: 400 });
    await prisma.menuItem.delete({ where: { id: body.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
}
