'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useCart } from '../components/CartProvider';

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem, clear } = useCart();
  const router = useRouter();

  return (
    <div className="page-shell" dir="rtl">
      <main className="container">
        <header className="section-heading" style={{ marginTop: 24 }}>
          <div>
            <span className="section-label">سبد خرید</span>
            <h2>مرور سفارش شما</h2>
          </div>
        </header>

        <div style={{ marginTop: 18 }}>
          {items.length === 0 ? (
            <p>سبد خرید شما خالی است.</p>
          ) : (
            <div>
              {items.map((it) => (
                <div key={it.id} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <strong>{it.title}</strong>
                    <div style={{ color: 'var(--muted)' }}>{it.restaurant}</div>
                  </div>
                  <div>
                    <input
                      aria-label={`تعداد ${it.title}`}
                      type="number"
                      min={1}
                      value={it.quantity}
                      onChange={(e) => updateQty(it.id, Math.max(1, Number(e.target.value || 1)))}
                      style={{ width: 72 }}
                    />
                  </div>
                  <div>
                    <strong>{(it.price * it.quantity).toLocaleString('fa-AF')} AFN</strong>
                  </div>
                  <div>
                    <button type="button" className="secondary-button" onClick={() => removeItem(it.id)}>
                      حذف
                    </button>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 18 }}>
                <div className="summary-row">
                  <span>جمع سفارش</span>
                  <span>{subtotal.toLocaleString('fa-AF')} AFN</span>
                </div>

                <div style={{ marginTop: 12 }}>
                  <button type="button" className="primary-button" onClick={() => router.push('/checkout')}>
                    ادامه فرایند خرید
                  </button>
                  <button style={{ marginLeft: 8 }} type="button" className="secondary-button" onClick={() => clear()}>
                    پاک کردن سبد
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
