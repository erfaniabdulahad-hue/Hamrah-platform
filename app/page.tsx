'use client';

import { useMemo, useState } from 'react';
import { restaurants, categories, foods, userCards, type Food } from './data';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<Food[]>([
    { ...foods[0], quantity: 1 },
    { ...foods[4], quantity: 2 },
  ]);

  const visibleFoods = useMemo(
    () =>
      activeCategory === 'all' ? foods : foods.filter((food) => food.category === activeCategory),
    [activeCategory],
  );

  const addToCart = (food: Food) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === food.id);

      if (existing) {
        return current.map((item) =>
          item.id === food.id ? { ...item, quantity: (item.quantity ?? 1) + 1 } : item,
        );
      }

      return [...current, { ...food, quantity: 1 }];
    });
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
  const deliveryFee = subtotal > 0 ? 35 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="page-shell" dir="rtl">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand-wrap">
            <div className="brand-mark">همراه</div>
            <span className="brand-line">غذاهای کابل</span>
          </div>

          <nav className="main-nav" aria-label="منوی اصلی">
            <ul>
              <li><a href="#home">خانه</a></li>
              <li><a href="#restaurants">رستوران‌ها</a></li>
              <li><a href="#categories">دسته‌ها</a></li>
              <li><a href="#popular">محبوب</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            <button type="button" className="secondary-button">ورود</button>
            <button type="button" className="primary-button">سفارش فوری</button>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">سفارش غذای کابل</span>
              <h1>همراه شما در کشف طعم‌های اصیل افغانی</h1>
              <p>
                بهترین رستوران‌های کابل را در یک تجربه ساده پیدا کنید، سفارش آنلاین ثبت کنید و
                در کوتاه‌ترین زمان غذا را درب خانه یا محل کار خود تحویل بگیرید.
              </p>

              <div className="hero-actions">
                <button type="button" className="primary-button">شروع سفارش</button>
                <button type="button" className="secondary-button">دیدن رستوران‌ها</button>
              </div>

              <div className="hero-meta">
                <span className="meta-pill">⚡ تحویل در ۲۰ تا ۳۵ دقیقه</span>
                <span className="meta-pill">💳 پرداخت امن</span>
                <span className="meta-pill">🎯 ۱۵۰۰+ سفارش روزانه</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="feature-card">
                <h3>رستوران منتخب امروز</h3>
                <p>کبابی رحیمی · کباب تازه و غذاهای خانگی</p>
                <div className="feature-tags">
                  <span>سریع</span>
                  <span>پیک رایگان</span>
                  <span>۴.۸ امتیاز</span>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-box">
                  <strong>۱۵+</strong>
                  <span>رستوران برتر</span>
                </div>
                <div className="stat-box">
                  <strong>۱۲۰۰+</strong>
                  <span>سفارش روزانه</span>
                </div>
                <div className="stat-box">
                  <strong>۳۴</strong>
                  <span>غذای محبوب</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="restaurants">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-label">کشف رستوران‌ها</span>
                <h2>بهترین رستوران‌های کابل پیش روی شما</h2>
              </div>
              <a href="#popular" className="section-link">مشاهده همه</a>
            </div>

            <div className="restaurant-grid">
              {restaurants.map((restaurant) => (
                <article key={restaurant.id} className="restaurant-card">
                  <span className="restaurant-tag">{restaurant.badge}</span>
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.description}</p>
                  <div className="restaurant-meta">
                    <span>{restaurant.eta}</span>
                    <span>⭐ {restaurant.rating}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="categories">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-label">دسته‌بندی غذا</span>
                <h2>از کباب تا چای‌خانه</h2>
              </div>
            </div>

            <div className="filter-row">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.icon} {category.title}
                </button>
              ))}
            </div>

            <div className="food-grid" id="popular">
              {visibleFoods.map((food) => (
                <article key={food.id} className="food-card">
                  <div className="food-image" aria-hidden="true">
                    {food.icon}
                  </div>
                  <div>
                    <h3>{food.title}</h3>
                    <p>{food.description}</p>
                  </div>
                  <div className="food-meta">
                    <span>{food.restaurant}</span>
                    <strong>{food.price.toLocaleString('fa-AF')} AFN</strong>
                  </div>
                  <button type="button" className="add-button" onClick={() => addToCart(food)}>
                    + افزودن به سبد
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-label">چرا همراه؟</span>
                <h2>تجربه‌ای ساده برای سفارش‌های روزمره</h2>
              </div>
            </div>

            <div className="features-grid">
              <div className="info-card">
                <h3>دسته‌بندی‌های دقیق</h3>
                <p>با فیلتر کردن بر اساس غذاهای محبوب و دسته‌بندی‌ها، سریع‌تر انتخاب می‌کنید.</p>
              </div>
              <div className="info-card">
                <h3>تحویل مطمئن</h3>
                <p>مسیریابی لحظه‌ای، زمان تحویل دقیق و پشتیبانی برای سفارش‌های شما.</p>
              </div>
              <div className="info-card">
                <h3>پرداخت راحت</h3>
                <p>پرداخت امن با کارت، پول نقد و یا ارسال در محل به‌صورت ساده و سریع.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container main-layout">
            <div className="panel">
              <h3>پروفایل کاربران و تیم</h3>
              <div className="user-list">
                {userCards.map((user) => (
                  <div key={user.name} className="user-item">
                    <div>
                      <strong>{user.name}</strong>
                      <span>{user.role}</span>
                    </div>
                    <span>{user.points}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="cart-panel" aria-label="سبد خرید">
              <h3>سبد خرید</h3>

              <div className="cart-items">
                {cart.length === 0 ? (
                  <p style={{ margin: 0, color: '#5e5752' }}>سبد خرید خالی است.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-details">
                        <strong>{item.title}</strong>
                        <span>تعداد: {item.quantity ?? 1}</span>
                      </div>
                      <strong>{((item.quantity ?? 1) * item.price).toLocaleString('fa-AF')} AFN</strong>
                    </div>
                  ))
                )}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>جمع سفارش</span>
                  <span>{subtotal.toLocaleString('fa-AF')} AFN</span>
                </div>
                <div className="summary-row">
                  <span>هزینه تحویل</span>
                  <span>{deliveryFee.toLocaleString('fa-AF')} AFN</span>
                </div>
                <div className="summary-row total">
                  <span>مبلغ نهایی</span>
                  <span>{total.toLocaleString('fa-AF')} AFN</span>
                </div>
                <button type="button" className="cart-action">
                  ادامه فرایند خرید
                </button>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <div className="brand-mark">همراه</div>
            <p style={{ margin: '12px 0 0', color: '#d9d0c6' }}>
              پلتفرم سفارش غذای کابل با تجربه‌ای ساده، سریع و بومی.
            </p>
          </div>
          <div className="footer-links">
            <a href="#home">خانه</a>
            <a href="#restaurants">رستوران‌ها</a>
            <a href="#categories">دسته‌ها</a>
            <a href="#popular">محبوب</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
