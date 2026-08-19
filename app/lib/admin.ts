import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_local_jwt_secret_change_me';

export async function getUserFromRequest(req: Request) {
  try {
    const auth = req.headers.get('authorization') || req.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer ')) return null;
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET) as any;
    if (!payload || !payload.sub) return null;
    const user = await prisma.user.findUnique({ where: { id: String(payload.sub) } });
    return user;
  } catch (err) {
    return null;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
}

export function forbiddenResponse() {
  return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
}
