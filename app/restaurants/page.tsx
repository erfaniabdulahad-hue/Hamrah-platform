import Link from 'next/link';
import { restaurants } from '../data';

export const metadata = {
  title: 'رستوران‌ها — همراه',
  description: 'فهرست رستوران‌های موجود در همراه',
};

export default function RestaurantsPage() {
  return (
    <div className="page-shell" dir="rtl">
      <main className="container">
        <header className="section-heading" style={{ marginTop: 24 }}>
          <div>
            <span className="section-label">رستوران‌ها</span>
            <h2>همه رستوران‌ها</h2>
          </div>
        </header>

        <div className="restaurant-grid" style={{ marginTop: 18 }}>
          {restaurants.map((r) => (
            <article key={r.id} className="restaurant-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{r.name}</h3>
                <span className="restaurant-tag">{r.badge}</span>
              </div>
              <p style={{ color: 'var(--muted)' }}>{r.description}</p>
              <div className="restaurant-meta">
                <span>{r.eta}</span>
                <span>⭐ {r.rating}</span>
              </div>

              <div style={{ marginTop: 12 }}>
                <Link href={`/restaurants/${r.id}`} className="primary-button">
                  مشاهده جزئیات
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
