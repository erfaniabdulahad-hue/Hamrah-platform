import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { restaurants, foods } from '../../data';
import FoodCard from '../FoodCard';

type Props = { params: { id: string } | Promise<{ id: string }> };
export async function generateStaticParams() {
  return restaurants.map((r) => ({ id: r.id }));
}

export default async function RestaurantPage({ params }: Props) {
  const { id } = (await params) as { id: string };
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) return notFound();

  const menu = foods.filter((f) => f.restaurant === restaurant.name);

  return (
    <div className="page-shell" dir="rtl">
      <main className="container">
        <header className="section-heading" style={{ marginTop: 24 }}>
          <div>
            <span className="section-label">{restaurant.name}</span>
            <h2>جزئیات رستوران</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="restaurant-meta">{restaurant.eta} · ⭐ {restaurant.rating}</span>
          </div>
        </header>

        <section className="main-layout" style={{ gap: 20, marginTop: 12 }}>
          <div>
            <div className="feature-card" style={{ padding: 18 }}>
              <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                <div style={{ width: 180, height: 120, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(135deg,#f7d8b9,#efb287)', display: 'grid', placeItems: 'center', fontSize: 48 }} aria-hidden>
                  {restaurant.name.split(' ').map((s) => s[0]).slice(0,2).join('')}
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0 }}>{restaurant.name}</h3>
                  <p style={{ marginTop: 8, color: 'var(--muted)' }}>{restaurant.description}</p>

                  <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="meta-pill">⭐ {restaurant.rating}</span>
                    <span className="meta-pill">ETA {restaurant.eta}</span>
                    <span className="meta-pill">منوی ویژه</span>
                  </div>
                </div>
              </div>
            </div>

            <section className="section" style={{ marginTop: 18 }}>
              <h3 style={{ marginBottom: 12 }}>منو</h3>

              <div className="food-grid">
                {menu.map((item) => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          </div>

          <aside className="cart-panel">
            <div style={{ padding: 12 }}>
              <h3>جزئیات رستوران</h3>
              <p><strong>آدرس:</strong> منطقه مرکزی، کابل</p>
              <p><strong>ساعات کاری:</strong> 10:00 - 22:00</p>
              <p><strong>تماس:</strong> 0700-000000</p>

              <div style={{ marginTop: 12 }}>
                <Link href="/checkout" className="primary-button">سفارش سریع</Link>
                <Link href="/" className="secondary-button" style={{ marginLeft: 8 }}>بازگشت</Link>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
