'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';

export default function SignUpPage() {
  const { signin } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    });
    const j = await res.json();
    if (j.ok) {
      signin(j.token, j.user);
      router.push('/profile');
    } else {
      alert('ثبت‌نام ناموفق: ' + (j.error || 'خطا'));
    }
  };

  return (
    <div className="page-shell" dir="rtl">
      <main className="container">
        <header className="section-heading" style={{ marginTop: 24 }}>
          <div>
            <span className="section-label">ثبت‌نام</span>
            <h2>یک حساب بسازید</h2>
          </div>
        </header>

        <form onSubmit={handle} style={{ marginTop: 18, display: 'grid', gap: 12 }}>
          <label>
            نام
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            رمز عبور
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <div>
            <button type="submit" className="primary-button">ثبت‌نام</button>
          </div>
        </form>
      </main>
    </div>
  );
}
