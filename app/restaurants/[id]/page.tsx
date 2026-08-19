import { notFound } from 'next/navigation';
import { restaurants, foods } from '../../data';

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
            <h2>منوی رستوران</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="restaurant-meta">{restaurant.eta} · ⭐ {restaurant.rating}</span>
          </div>
        </header>

        <section className="feature-card" style={{ marginTop: 12 }}>
          <p>{restaurant.description}</p>
        </section>

        <section className="section" style={{ marginTop: 18 }}>
          <div className="food-grid">
            {menu.map((item) => (
              <article key={item.id} className="food-card">
                <div className="food-image" aria-hidden="true">
                  {item.icon}
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="food-meta">
                  <strong>{item.price.toLocaleString('fa-AF')} AFN</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
