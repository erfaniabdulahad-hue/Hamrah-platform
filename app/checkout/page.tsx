'use client';

import React, { useState } from 'react';
import { useCart } from '../components/CartProvider';

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await (await import('../lib/api-client')).apiFetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({ name, address, items }),
      });
      const json = await res.json();
      setOrderId(json.orderId ?? 'unknown');
      clear();
    } catch (err) {
      // simple error UI
      console.error(err);
      alert('ارسال سفارش با خطا مواجه شد');
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className="page-shell" dir="rtl">
        <main className="container">
          <header className="section-heading" style={{ marginTop: 24 }}>
            <div>
              <span className="section-label">سفارش ثبت شد</span>
              <h2>شناسه سفارش: {orderId}</h2>
            </div>
          </header>
          <p>سفارش شما ثبت شد. متشکریم!</p>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell" dir="rtl">
      <main className="container">
        <header className="section-heading" style={{ marginTop: 24 }}>
          <div>
            <span className="section-label">پرداخت و ارسال</span>
            <h2>اطلاعات ارسال را وارد کنید</h2>
          </div>
        </header>

        <form onSubmit={handleSubmit} style={{ marginTop: 18, display: 'grid', gap: 12 }}>
          <label>
            نام گیرنده
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            آدرس تحویل
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
          </label>

          <div className="summary-row">
            <span>جمع سفارش</span>
            <span>{subtotal.toLocaleString('fa-AF')} AFN</span>
          </div>

          <div>
            <button type="submit" className="primary-button" disabled={loading || items.length === 0}>
              {loading ? 'در حال ارسال...' : 'ثبت سفارش'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
