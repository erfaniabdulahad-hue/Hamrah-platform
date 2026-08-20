import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ ok: false, error: 'webhook_not_configured', message: 'STRIPE_WEBHOOK_SECRET is not set.' }, { status: 501 });
  }

  const sig = req.headers.get('stripe-signature') || req.headers.get('Stripe-Signature');
  const raw = await req.text();

  try {
    const Stripe = await import('stripe').then((m) => m.default || m);
    const stripe = new Stripe(process.env.STRIPE_SECRET || '');
    const event = stripe.webhooks.constructEvent(raw, sig || '', webhookSecret);

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as any;
      console.log('Payment succeeded:', intent.id, intent.amount);
      // TODO: persist payment success and update order status
    }

    return NextResponse.json({ ok: true, received: true });
  } catch (err: any) {
    console.error('Webhook verification failed:', err?.message || err);
    return NextResponse.json({ ok: false, error: 'invalid_signature', message: err?.message || 'Invalid signature' }, { status: 400 });
  }
}
