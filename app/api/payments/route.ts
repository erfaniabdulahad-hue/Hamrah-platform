import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const method = String(body?.method ?? 'card').trim() || 'card';
    const amount = Math.round(Number(body?.amount ?? 0));

    if (!amount || amount <= 0) {
      return NextResponse.json({ ok: false, error: 'invalid_amount' }, { status: 400 });
    }

    if (process.env.STRIPE_SECRET) {
      return NextResponse.json({ ok: true, paymentId: `STRIPE-${Date.now()}`, amount, method, status: 'paid', note: 'Stripe configured; real intent creation is handled by /api/payments/stripe' });
    }

    const paymentId = `PAY-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    return NextResponse.json({ ok: true, paymentId, amount, method, status: 'paid' });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
}
