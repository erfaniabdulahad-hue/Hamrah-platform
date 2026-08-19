// Lightweight Stripe scaffolding at app/api/payments/stripe.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET;
  if (!secret) {
    const body = await req.json().catch(() => ({}));
    return NextResponse.json({ ok: false, error: 'stripe_not_configured', message: 'STRIPE_SECRET not set. Configure Stripe keys to enable payments.' }, { status: 501 });
  }

  try {
    const Stripe = await import('stripe').then(m => m.default || m);
    const stripe = new Stripe(secret, { apiVersion: '2022-11-15' });

    const { amount, currency = 'AFN', metadata } = await req.json();
    if (!amount) return NextResponse.json({ ok: false, error: 'missing_amount' }, { status: 400 });

    const pi = await stripe.paymentIntents.create({ amount: Number(amount), currency, metadata: metadata || {} });
    return NextResponse.json({ ok: true, clientSecret: pi.client_secret, id: pi.id });
  } catch (err: any) {
    console.error('stripe create error', err?.message || err);
    return NextResponse.json({ ok: false, error: 'stripe_error', message: err?.message || String(err) }, { status: 500 });
  }
}
