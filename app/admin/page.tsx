'use client';

import { useEffect, useMemo, useState } from 'react';
import { foods, restaurants as seedRestaurants } from '../data';

type RestaurantWithStatus = {
  id: string;
  name: string;
  description: string;
  badge: string;
  eta: string;
  rating: string;
  online: boolean;
};

export default function AdminPage() {
  const [restaurants, setRestaurants] = useState<RestaurantWithStatus[]>(
    seedRestaurants.map((restaurant) => ({ ...restaurant, online: true })),
  );
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [orders, setOrders] = useState<any[]>([]);
  const [authWarning, setAuthWarning] = useState<string | null>(null);

  const selected = useMemo(() => restaurants[0], [restaurants]);

  const stats = {
    total: restaurants.length,
    online: restaurants.filter((r) => r.online).length,
    menuItems: foods.length,
    orders: orders.length,
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem('hamrah_token');
    if (!token) {
      setAuthWarning('برای دیدن سفارش‌ها باید ابتدا وارد حساب مدیر شوید.');
      setOrders([]);
      return;
    }

    try {
      setAuthWarning(null);
      const res = await (await import('../lib/api-client')).apiFetch('/api/admin/orders');
      const j = await res.json();
      if (j.ok) setOrders(j.orders);
      else {
        setOrders([]);
        setAuthWarning(j.error === 'forbidden' ? 'این حساب دسترسی مدیر ندارد.' : 'توکن نامعتبر یا منقضی شده است.');
      }
    } catch (err) {
      console.error(err);
      setAuthWarning('درخواست سفارش‌ها ناموفق بود.');
    }
  };

  useEffect(() => { fetchOrders(); }, []);


  const addRestaurant = () => {
    if (!name.trim()) return;

    setRestaurants((current) => [
      ...current,
      {
        id: `rest-${Date.now()}`,
        name: name.trim(),
        description: description.trim() || 'رستوران جدید ثبت شده است.',
        badge: 'جدید',
        eta: '۲۰–۳۰ دقیقه',
        rating: '۴.۹',
        online: true,
      },
    ]);

    setName('');
    setDescription('');
  };

  const toggleOnline = (id: string) => {
    setRestaurants((current) =>
      current.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, online: !restaurant.online } : restaurant,
      ),
    );
  };

  const menu = foods.filter((item) => item.restaurant === selected?.name).slice(0, 4);

  return (
    <div className="page-shell" dir="rtl">
      <main className="container">
        <header className="section-heading" style={{ marginTop: 24 }}>
          <div>
            <span className="section-label">داشبورد مدیر</span>
            <h2>مدیریت رستوران‌ها و منو</h2>
          </div>
        </header>

        {authWarning && (
          <div className="panel" style={{ marginTop: 18, borderColor: '#f59e0b' }}>
            <strong>توجه:</strong> {authWarning}
          </div>
        )}

        <section className="stats-grid" style={{ marginTop: 18 }}>
          <div className="stat-box">
            <strong>{stats.total}</strong>
            <span>رستوران‌ها</span>
          </div>
          <div className="stat-box">
            <strong>{stats.online}</strong>
            <span>آنلاین</span>
          </div>
          <div className="stat-box">
            <strong>{stats.menuItems}</strong>
            <span>آیتم‌های منو</span>
          </div>
        </section>

        <section className="main-layout" style={{ marginTop: 24 }}>
          <div className="panel">
            <h3>لیست رستوران‌ها</h3>
            <div className="user-list">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="user-item">
                  <div>
                    <strong>{restaurant.name}</strong>
                    <span>{restaurant.eta}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button type="button" className="secondary-button" onClick={() => toggleOnline(restaurant.id)}>
                      {restaurant.online ? 'غیرفعال' : 'فعال'}
                    </button>
                    <span>{restaurant.online ? 'آنلاین' : 'آفلاین'}</span>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ marginTop: 18 }}>سفارشات اخیر</h3>
            <div className="user-list">
              {orders.length === 0 && <div>سفارشی یافت نشد (ممکن است برای دیدن سفارشات باید وارد شده و نقش admin داشته باشید)</div>}
              {orders.map((o) => (
                <div key={o.id} className="user-item">
                  <div>
                    <strong>{o.customerName}</strong>
                    <div style={{ fontSize: 12 }}>{new Date(o.createdAt).toLocaleString()}</div>
                    <div style={{ fontSize: 12 }}>{o.items?.length ?? 0} آیتم — مجموع: {o.total} AFN</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <select defaultValue={o.status} onChange={async (e) => {
                      const newStatus = e.target.value;
                      try {
                        const res = await (await import('../lib/api-client')).apiFetch('/api/admin/orders', {
                          method: 'PATCH',
                          body: JSON.stringify({ id: o.id, status: newStatus }),
                        });
                        const j = await res.json();
                        if (j.ok) fetchOrders();
                        else alert('خطا: ' + (j.error || 'ناتوانی'));
                      } catch (err) { console.error(err); alert('درخواست شکست خورد'); }
                    }}>
                      <option value="pending">pending</option>
                      <option value="paid">paid</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="cart-panel">
            <h3>افزودن رستوران</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <label>
                نام رستوران
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label>
                توضیح
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
              </label>
              <button type="button" className="primary-button" onClick={addRestaurant}>
                ثبت رستوران
              </button>
            </div>
          </aside>
        </section>

        <section className="section" style={{ marginTop: 12 }}>
          <div className="section-heading">
            <div>
              <span className="section-label">منوی منتخب</span>
              <h2>{selected?.name}</h2>
            </div>
          </div>

          <div className="food-grid">
            {menu.map((item) => (
              <article key={item.id} className="food-card">
                <div className="food-image" aria-hidden="true">{item.icon}</div>
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
