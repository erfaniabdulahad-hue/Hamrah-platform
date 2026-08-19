import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { hashPassword, signToken } from '../../../lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? '').trim();
    const password = String(body?.password ?? '').trim();

    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: 'name_too_short' }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ ok: false, error: 'password_too_short' }, { status: 400 });
    }

    // if user exists, reject (simple policy)
    const existing = await prisma.user.findUnique({ where: { name } });
    if (existing) {
      return NextResponse.json({ ok: false, error: 'user_exists' }, { status: 409 });
    }

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({ data: { name, password: hashed } });
    const token = signToken({ sub: user.id, name: user.name });

    return NextResponse.json({ ok: true, user: { id: user.id, name: user.name }, token });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
}
