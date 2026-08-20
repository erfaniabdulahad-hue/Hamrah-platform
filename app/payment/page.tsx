'use client';

import { useState } from 'react';
import { useCart } from '../components/CartProvider';

export default function PaymentPage() {
  const { items, subtotal, clear } = useCart();
  const [method, setMethod] = useState('card');
  const [status, setStatus] = useState<string | null>(null);

  const pay = async () => {
    try {
      const response = await (await import('../lib/api-client')).apiFetch('/api/payments/stripe', {
        method: 'POST',
        body: JSON.stringify({ method, items, amount: subtotal, currency: 'AFN' }),
      });

      const json = await response.json();
      if (json.ok) {
        setStatus(`درگاه Stripe آماده شد — شناسه ${json.id || 'intent'}`);
        clear();
      } else {
        setStatus(json.message || 'پرداخت ناموفق بود');
      }
    } catch (err) {
      console.error(err);
      setStatus('پرداخت ناموفق بود');
    }
  };

  return (
    <div className="page-shell" dir="rtl">
      <main className="container">
        <header className="section-heading" style={{ marginTop: 24 }}>
          <div>
            <span className="section-label">پرداخت</span>
            <h2>انتخاب روش پرداخت</h2>
          </div>
        </header>

        <div className="panel" style={{ marginTop: 18 }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <label>
              <input
                type="radio"
                checked={method === 'card'}
                onChange={() => setMethod('card')}
              />
              {' '}کارت بانکی
            </label>
            <label>
              <input
                type="radio"
                checked={method === 'cash'}
                onChange={() => setMethod('cash')}
              />
              {' '}پرداخت نقدی
            </label>

            <div className="summary-row">
              <span>مبلغ نهایی</span>
              <span>{subtotal.toLocaleString('fa-AF')} AFN</span>
            </div>

            <button type="button" className="primary-button" onClick={pay}>
              تایید پرداخت
            </button>

            {status && <p>{status}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
