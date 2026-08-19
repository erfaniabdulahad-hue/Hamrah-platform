'use client';

import { useEffect, useMemo, useState } from 'react';
import { foods } from '../data';

type RestaurantWithStatus = {
  id: string;
  name: string;
  description: string;
  badge: string;
  eta: string;
  rating: string | number;
  online: boolean;
  menu?: any[];
};

export default function AdminPage() {
  const [restaurants, setRestaurants] = useState<RestaurantWithStatus[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [orders, setOrders] = useState<any[]>([]);
  const [authWarning, setAuthWarning] = useState<string | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(() => restaurants.find((r:any)=> r.id === selectedId) || restaurants[0] || null, [restaurants, selectedId]);

  const stats = {
    total: restaurants.length,
    online: restaurants.filter((r) => r.online).length,
    menuItems: restaurants.reduce((sum, r:any) => sum + (r.menu?.length || 0), 0),
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

  const fetchRestaurants = async () => {
    try {
      const res = await (await import('../lib/api-client')).apiFetch('/api/admin/restaurants');
      const j = await res.json();
      if (j.ok) setRestaurants(j.restaurants.map((r:any)=> ({ ...r, online: r.online }))); 
      else setRestaurants([]);
    } catch (err) {
      console.error(err);
      setRestaurants([]);
    }
  };


  useEffect(() => { fetchOrders(); fetchRestaurants(); }, []);


  const addRestaurant = async () => {
    if (!name.trim()) return;
    try {
      const res = await (await import('../lib/api-client')).apiFetch('/api/admin/restaurants', {
        method: 'POST',
        body: JSON.stringify({ name: name.trim(), description: description.trim() }),
      });
      const j = await res.json();
      if (j.ok) {
        setRestaurants((current) => [j.restaurant, ...current]);
        setName('');
        setDescription('');
      } else {
        alert('ثبت رستوران با خطا مواجه شد');
      }
    } catch (err) { console.error(err); alert('درخواست شکست خورد'); }
  };

  const toggleOnline = (id: string) => {
    setRestaurants((current) =>
      current.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, online: !restaurant.online } : restaurant,
      ),
    );
  };

  const menu = selected?.menu ?? [];

  const [menuTitle, setMenuTitle] = useState('');
  const [menuPrice, setMenuPrice] = useState('');
  const [menuDescription, setMenuDescription] = useState('');

  const addMenuItem = async () => {
    if (!selected) return alert('ابتدا یک رستوران انتخاب کنید');
    if (!menuTitle.trim()) return;
    try {
      const res = await (await import('../lib/api-client')).apiFetch('/api/admin/restaurants/menu', {
        method: 'POST',
        body: JSON.stringify({ restaurantId: selected.id, title: menuTitle.trim(), description: menuDescription.trim(), price: Number(menuPrice) || 0 }),
      });
      const j = await res.json();
      if (j.ok) {
        setRestaurants((cur) => cur.map((r:any) => r.id === selected.id ? { ...r, menu: [j.item, ...(r.menu||[])] } : r));
        setMenuTitle(''); setMenuPrice(''); setMenuDescription('');
      } else alert('ثبت آیتم منو با خطا مواجه شد');
    } catch (err) { console.error(err); alert('درخواست شکست خورد'); }
  };

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
                <div key={restaurant.id} className="user-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ cursor: 'pointer' }} onClick={() => setSelectedId(restaurant.id)}>
                    <strong>{restaurant.name}</strong>
                    <div style={{ fontSize: 12 }}>{restaurant.eta}</div>
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

              <hr />

              <h4 style={{ marginTop: 12 }}>مدیریت منوی رستوران منتخب</h4>
              {!selected && <div>برای مدیریت منو، یک رستوران از لیست انتخاب کنید.</div>}
              {selected && (
                <div style={{ display: 'grid', gap: 8 }}>
                  <label>
                    عنوان آیتم
                    <input value={menuTitle} onChange={(e) => setMenuTitle(e.target.value)} />
                  </label>
                  <label>
                    توضیح
                    <input value={menuDescription} onChange={(e) => setMenuDescription(e.target.value)} />
                  </label>
                  <label>
                    قیمت
                    <input value={menuPrice} onChange={(e) => setMenuPrice(e.target.value)} />
                  </label>
                  <button type="button" className="primary-button" onClick={addMenuItem}>افزودن آیتم</button>
                </div>
              )}
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
            {menu.map((item:any) => (
              <article key={item.id} className="food-card" style={{ position: 'relative' }}>
                <div className="food-image" aria-hidden="true">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="food-meta">
                  <strong>{(item.price||0).toLocaleString('fa-AF')} AFN</strong>
                </div>
                <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 8 }}>
                  <button type="button" className="secondary-button" onClick={async ()=>{
                    const newTitle = prompt('عنوان جدید', item.title);
                    if (!newTitle) return;
                    try {
                      const res = await (await import('../lib/api-client')).apiFetch('/api/admin/restaurants/menu', { method: 'PATCH', body: JSON.stringify({ id: item.id, title: newTitle }) });
                      const j = await res.json();
                      if (j.ok) setRestaurants((cur)=>cur.map((r:any)=> r.id===selected?.id ? { ...r, menu: r.menu.map((mi:any)=> mi.id===item.id ? j.item : mi) } : r));
                      else alert('ویرایش ناموفق');
                    } catch (err) { console.error(err); alert('درخواست شکست خورد'); }
                  }}>ویرایش</button>
                  <button type="button" className="secondary-button" onClick={async ()=>{
                    if (!confirm('آیا مطمئنید حذف شود؟')) return;
                    try {
                      const res = await (await import('../lib/api-client')).apiFetch('/api/admin/restaurants/menu', { method: 'DELETE', body: JSON.stringify({ id: item.id }) });
                      const j = await res.json();
                      if (j.ok) setRestaurants((cur)=>cur.map((r:any)=> r.id===selected?.id ? { ...r, menu: r.menu.filter((mi:any)=> mi.id!==item.id) } : r));
                      else alert('حذف ناموفق');
                    } catch (err) { console.error(err); alert('درخواست شکست خورد'); }
                  }}>حذف</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
