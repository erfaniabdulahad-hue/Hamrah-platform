import Link from 'next/link';
import { restaurants } from '../data';

export const metadata = {
  title: 'رستوران‌ها — همراه',
  description: 'فهرست رستوران‌های موجود در همراه',
};

export default function RestaurantsPage() {
  const featured = restaurants[0];

  return (
    <div className="page-shell" dir="rtl">
      <main className="container">
        <header className="section-heading" style={{ marginTop: 24 }}>
          <div>
            <span className="section-label">رستوران‌ها</span>
            <h2>کشف بهترین رستوران‌های کابل</h2>
          </div>
        </header>

        <section className="feature-card" style={{ marginTop: 12 }}>
          <div className="section-heading" style={{ marginBottom: 0 }}>
            <div>
              <span className="section-label">رستوران منتخب</span>
              <h2 style={{ fontSize: 'clamp(1.7rem, 2vw, 2.2rem)' }}>{featured.name}</h2>
            </div>
            <span className="restaurant-tag">{featured.badge}</span>
          </div>

          <div style={{ display: 'grid', gap: 18, marginTop: 18 }}>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.9 }}>{featured.description}</p>
            <div className="restaurant-meta" style={{ maxWidth: 320 }}>
              <span>{featured.eta}</span>
              <span>⭐ {featured.rating}</span>
            </div>
            <div className="feature-tags">
              <span>تحویل سریع</span>
              <span>منوی متنوع</span>
              <span>پشتیبانی ۲۴ ساعته</span>
            </div>
            <div>
              <Link href={`/restaurants/${featured.id}`} className="primary-button">
                مشاهده منو و سفارش
              </Link>
            </div>
          </div>
        </section>

        <section className="stats-grid" style={{ marginTop: 24 }}>
          <div className="stat-box">
            <strong>{restaurants.length}</strong>
            <span>رستوران فعال</span>
          </div>
          <div className="stat-box">
            <strong>۲۵–۳۵</strong>
            <span>دقیقه تحویل</span>
          </div>
          <div className="stat-box">
            <strong>۴.۸</strong>
            <span>میانگین امتیاز</span>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 20 }}>
          <div className="section-heading">
            <div>
              <span className="section-label">همه رستوران‌ها</span>
              <h2>رستوران‌های محبوب و نزدیک شما</h2>
            </div>
          </div>

          <div className="restaurant-grid" style={{ marginTop: 18 }}>
            {restaurants.map((r) => (
              <article key={r.id} className="restaurant-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <h3 style={{ margin: 0 }}>{r.name}</h3>
                  <span className="restaurant-tag">{r.badge}</span>
                </div>

                <p>{r.description}</p>

                <div className="restaurant-meta">
                  <span>{r.eta}</span>
                  <span>⭐ {r.rating}</span>
                </div>

                <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span className="meta-pill">کباب</span>
                    <span className="meta-pill">اسنک</span>
                    <span className="meta-pill">پلو</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <Link href={`/restaurants/${r.id}`} className="primary-button">
                      مشاهده منو
                    </Link>
                    <Link href="/checkout" className="secondary-button">
                      سفارش سریع
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
