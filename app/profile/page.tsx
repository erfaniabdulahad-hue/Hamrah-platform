'use client';

import React, { useMemo } from 'react';
import { useAuth } from '../components/AuthProvider';

export default function ProfilePage() {
  const { user, signout, isAuthenticated } = useAuth();

  const stats = useMemo(() => {
    const lastOrder = (() => {
      try {
        const raw = typeof window !== 'undefined' ? localStorage.getItem('hamrah_last_order') : null;
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    })();

    return {
      memberSince: user ? 'به‌روزرسانی شد' : 'نامشخص',
      lastOrder,
      favoriteCategory: 'کباب و پلو',
      savedAddress: 'کابل، خیابان نواب، پلاک ۴۲',
    };
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="page-shell" dir="rtl">
        <main className="container">
          <div className="panel" style={{ marginTop: 24 }}>
            <p>لطفاً ابتدا وارد شوید تا صفحه پروفایل نمایش داده شود.</p>
          </div>
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
            <h2>داشبورد کاربر</h2>
          </div>
        </header>

        <section className="stats-grid" style={{ marginTop: 18 }}>
          <div className="stat-box">
            <strong>{user?.name}</strong>
            <span>نام کاربر</span>
          </div>
          <div className="stat-box">
            <strong>{stats.memberSince}</strong>
            <span>عضویت</span>
          </div>
          <div className="stat-box">
            <strong>{stats.favoriteCategory}</strong>
            <span>علاقه‌مندی</span>
          </div>
        </section>

        <section className="main-layout" style={{ marginTop: 24 }}>
          <div className="panel">
            <h3>اطلاعات حساب</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <p><strong>نام:</strong> {user?.name}</p>
              <p><strong>شناسه:</strong> {user?.id}</p>
              <p><strong>آدرس پیش‌فرض:</strong> {stats.savedAddress}</p>
              <p><strong>آخرین سفارش:</strong> {stats.lastOrder ? stats.lastOrder.orderId : 'هنوز سفارشی ثبت نشده'}</p>
            </div>
          </div>

          <aside className="cart-panel">
            <h3>دسترسی سریع</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <button type="button" className="primary-button" onClick={() => window.location.href = '/cart'}>
                مشاهده سبد خرید
              </button>
              <button type="button" className="secondary-button" onClick={() => window.location.href = '/checkout'}>
                ادامه خرید
              </button>
              <button type="button" className="secondary-button" onClick={() => signout()}>
                خروج از حساب
              </button>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
