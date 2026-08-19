import { NextResponse } from 'next/server';
import { restaurants } from '../../../data';

export async function GET() {
  return NextResponse.json({ restaurants });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const restaurant = {
      id: `rest-${Date.now()}`,
      name: body.name || 'رستوران جدید',
      description: body.description || 'توضیح اضافه شد.',
      badge: 'جدید',
      eta: '۲۰–۳۰ دقیقه',
      rating: '۴.۹',
    };

    return NextResponse.json({ ok: true, restaurant });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
