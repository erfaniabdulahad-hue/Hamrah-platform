'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';

export default function SignInPage() {
  const { signin } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    // call API
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    });
    const j = await res.json();
    if (j.ok) {
      signin(j.token, j.user);
      router.push('/profile');
    } else {
      alert('ورود ناموفق: ' + (j.error || 'خطا'));
    }
  };

  return (
    <div className="page-shell" dir="rtl">
      <main className="container">
        <header className="section-heading" style={{ marginTop: 24 }}>
          <div>
            <span className="section-label">ورود</span>
            <h2>وارد حساب خود شوید</h2>
          </div>
        </header>

        <form onSubmit={handle} style={{ marginTop: 18, display: 'grid', gap: 12 }}>
          <label>
            نام کاربری
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            رمز عبور
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <div>
            <button type="submit" className="primary-button">ورود</button>
          </div>
        </form>
      </main>
    </div>
  );
}
