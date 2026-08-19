import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const method = String(body?.method ?? 'card').trim() || 'card';
    const amount = Math.round(Number(body?.amount ?? 0));

    if (!amount || amount <= 0) {
      return NextResponse.json({ ok: false, error: 'invalid_amount' }, { status: 400 });
    }

    // For now, store a payment record as a completed payment (mock). In production, integrate gateway.
    const paymentId = `PAY-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

    return NextResponse.json({ ok: true, paymentId, amount, method, status: 'paid' });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
}
