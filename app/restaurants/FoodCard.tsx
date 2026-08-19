'use client';

import React from 'react';
import type { Food } from '../data';
import { useCart } from '../components/CartProvider';

export default function FoodCard({ item }: { item: Food & { quantity?: number } }) {
  const { addItem } = useCart();

  return (
    <article className="food-card" style={{ display: 'grid', gap: 12 }}>
      <div className="food-image" aria-hidden="true" style={{ height: 160 }}>
        <span style={{ fontSize: 48 }}>{item.icon}</span>
      </div>

      <div>
        <h3 style={{ margin: '0 0 6px' }}>{item.title}</h3>
        <p style={{ margin: 0, color: 'var(--muted)' }}>{item.description}</p>
      </div>

      <div className="food-meta" style={{ marginTop: 8 }}>
        <strong>{item.price.toLocaleString('fa-AF')} AFN</strong>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            type="button"
            className="add-button"
            onClick={() => addItem(item, 1)}
            aria-label={`افزودن ${item.title} به سبد`}
          >
            + افزودن
          </button>
        </div>
      </div>
    </article>
  );
}
