import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'stripe_not_configured', message: 'STRIPE_SECRET is not set. Configure Stripe to enable real payments.' }, { status: 501 });
  }

  try {
    const { amount, currency = 'AFN', metadata } = await req.json();
    if (!amount) {
      return NextResponse.json({ ok: false, error: 'missing_amount' }, { status: 400 });
    }

    const Stripe = await import('stripe').then((m) => m.default || m);
    const stripe = new Stripe(secret);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency,
      metadata: metadata || {},
    });

    return NextResponse.json({ ok: true, clientSecret: paymentIntent.client_secret, id: paymentIntent.id });
  } catch (err: any) {
    console.error('Stripe create intent error:', err?.message || err);
    return NextResponse.json({ ok: false, error: 'stripe_error', message: err?.message || 'Payment failed' }, { status: 500 });
  }
}
