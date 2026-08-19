'use client';

import React from 'react';
import { useAuth } from '../components/AuthProvider';

export default function ProfilePage() {
  const { user, signout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="page-shell" dir="rtl">
        <main className="container">
          <p>لطفاً ابتدا وارد شوید.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell" dir="rtl">
      <main className="container">
        <header className="section-heading" style={{ marginTop: 24 }}>
          <div>
            <span className="section-label">پروفایل</span>
            <h2>اطلاعات حساب</h2>
          </div>
        </header>

        <div style={{ marginTop: 18 }}>
          <p><strong>نام:</strong> {user?.name}</p>
          <p><strong>شناسه:</strong> {user?.id}</p>

          <div style={{ marginTop: 12 }}>
            <button type="button" className="secondary-button" onClick={() => signout()}>
              خروج از حساب
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
