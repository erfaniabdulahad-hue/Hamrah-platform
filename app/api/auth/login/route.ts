import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { verifyPassword, signToken } from '../../../lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? '').trim();
    const password = String(body?.password ?? '').trim();

    if (!name || !password) {
      return NextResponse.json({ ok: false, error: 'credentials_required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { name } });
    if (!user || !user.password) {
      return NextResponse.json({ ok: false, error: 'invalid_credentials' }, { status: 401 });
    }

    const ok = await verifyPassword(password, user.password);
    if (!ok) return NextResponse.json({ ok: false, error: 'invalid_credentials' }, { status: 401 });

    const token = signToken({ sub: user.id, name: user.name });
    return NextResponse.json({ ok: true, user: { id: user.id, name: user.name }, token });
  } catch (err) {
    console.error('login error', err);
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : 'invalid_json' }, { status: 400 });
  }
}
