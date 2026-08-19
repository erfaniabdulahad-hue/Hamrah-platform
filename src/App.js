import './App.css';

const restaurants = [
  {
    id: 'rest-1',
    name: 'رستوران نان و نوش',
    description: 'کباب‌ها و غذاهای خانگی با طعم اصیل کابل',
    badge: 'محبوب',
    eta: '۲۰-۳۰ دقیقه',
  },
  {
    id: 'rest-2',
    name: 'کبابی رحیمی',
    description: 'کباب‌های تازه و پرس‌های گرم برای همه خانواده',
    badge: 'سریع',
    eta: '۱۵-۲۵ دقیقه',
  },
  {
    id: 'rest-3',
    name: 'قهوه‌خانه غزنی',
    description: 'چای تازه، سمبوسه و غذای محلی برای همه ساعت‌ها',
    badge: 'مناسب صبحانه',
    eta: '۱۸-۲۸ دقیقه',
  },
  {
    id: 'rest-4',
    name: 'دکان افغان',
    description: 'منسف، کابلی و غذاهای خیابانی با طعم واقعی',
    badge: 'جدید',
    eta: '۲۲-۳۲ دقیقه',
  },
];

const categories = [
  { id: 'cat-1', title: 'کباب', subtitle: 'غذاهای گوشتی سنتی' },
  { id: 'cat-2', title: 'چلو', subtitle: 'عطر زعفران و برنج تازه' },
  { id: 'cat-3', title: 'منسف', subtitle: 'دسر، ماست و طعم افغان' },
  { id: 'cat-4', title: 'چای‌خانه', subtitle: 'دم‌نوش و شیرینی معمولی' },
  { id: 'cat-5', title: 'خیابانی', subtitle: 'میان‌وعده‌ سریع و محبوب' },
];

const popularFoods = [
  {
    id: 'food-1',
    title: 'چلو کباب مرغه',
    restaurant: 'رستوران نان و نوش',
    price: '۳۲۰ AFN',
    description: 'مرغ آبدار، برنج زعفرانی و سبزی تازه',
  },
  {
    id: 'food-2',
    title: 'منسف سنتی',
    restaurant: 'دکان افغان',
    price: '۳۸۰ AFN',
    description: 'برنج، گوشت گوسفندی و سس ماست خوش‌عطر',
  },
  {
    id: 'food-3',
    title: 'سبزی پلو با ماهی',
    restaurant: 'کبابی رحیمی',
    price: '۳۶۵ AFN',
    description: 'برنج ترش و سبزی با ماهی سرخ‌شده',
  },
  {
    id: 'food-4',
    title: 'آش کدو',
    restaurant: 'قهوه‌خانه غزنی',
    price: '۲۵۰ AFN',
    description: 'آش گرم و پر از سبزیجات محلی',
  },
];

function App() {
  return (
    <div className="app-shell" dir="rtl">
      <a href="#main" className="skip-link">پرش به محتوا</a>
      <header className="site-header">
        <div className="brand-wrap">
          <div className="brand-mark">همراه</div>
          <span className="brand-line">غذاهای کابل</span>
        </div>
        <nav className="main-nav" aria-label="منوی اصلی">
          <ul>
            <li><a href="#home" aria-current="page">خانه</a></li>
            <li><a href="#restaurants">رستوران‌ها</a></li>
            <li><a href="#categories">دسته‌ها</a></li>
            <li><a href="#popular">پرطرفدار</a></li>
          </ul>
        </nav>
        <button type="button" className="cta-button">سفارش الان</button>
      </header>

      <main id="main">
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <div className="eyebrow">سفارش غذای کابل</div>
            <h1>همراه شما در کشف طعم‌های اصیل افغانی</h1>
            <p>با همراه، بهترین رستوران‌های کابل را ببینید، انتخاب کنید و ظرف چند دقیقه سفارش دهید. تازه، محلی و با حسی مثل خانه.</p>
            <div className="hero-actions">
              <button type="button" className="primary-button">شروع سفارش</button>
              <button type="button" className="secondary-button">دیدن رستوران‌ها</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card-card">
              <div className="hero-card-title">رستوران منتخب امروز</div>
              <div className="hero-card-name">کبابی رحیمی</div>
              <div className="hero-card-info">کباب تازه و غذاهای خانگی</div>
              <div className="hero-card-tags">
                <span>سریع</span>
                <span>پیک رایگان</span>
              </div>
            </div>
            <div className="hero-stats-grid">
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
        </section>

        <section className="discover-section" id="restaurants">
          <div className="section-heading">
            <div>
              <span className="section-label">کشف رستوران‌ها</span>
              <h2>بهترین رستوران‌های کابل پیش روی شما</h2>
            </div>
            <a href="#" className="section-link" onClick={(e)=>e.preventDefault()}>همه را ببین</a>
          </div>
          <div className="restaurant-grid">
            {restaurants.map((item) => (
              <div key={item.id} className="restaurant-card">
                <div className="restaurant-tag">{item.badge}</div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="restaurant-meta">{item.eta}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="categories-section" id="categories">
          <div className="section-heading">
            <div>
              <span className="section-label">دسته‌بندی غذا</span>
              <h2>از کباب تا چای‌خانه</h2>
            </div>
            <a href="#" className="section-link" onClick={(e)=>e.preventDefault()}>دیدن همه</a>
          </div>
          <div className="categories-grid">
            {categories.map((category) => (
              <article key={category.id} className="category-card">
                <div className="category-icon">🍽️</div>
                <h3>{category.title}</h3>
                <p>{category.subtitle}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="popular-section" id="popular">
          <div className="section-heading">
            <div>
              <span className="section-label">غذاهای محبوب</span>
              <h2>سفارش‌های پرطرفدار امروز</h2>
            </div>
            <a href="#" className="section-link" onClick={(e)=>e.preventDefault()}>اکنون سفارش دهید</a>
          </div>
          <div className="popular-grid">
            {popularFoods.map((food) => (
              <div key={food.id} className="food-card">
                <img
                  className="food-photo"
                  src={`https://via.placeholder.com/600x360?text=${encodeURIComponent(food.title)}`}
                  alt={`${food.title} — ${food.restaurant}`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="food-info">
                  <h3>{food.title}</h3>
                  <p>{food.description}</p>
                  <div className="food-meta">
                    <span>{food.restaurant}</span>
                    <strong>{food.price}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <div className="brand-mark footer-brand">همراه</div>
            <p>پلتفرم سفارش غذای کابل با تجربه‌ای ساده، سریع و بومی.</p>
          </div>
          <div className="footer-links">
            <a href="#home">خانه</a>
            <a href="#restaurants">رستوران‌ها</a>
            <a href="#categories">دسته‌ها</a>
            <a href="#popular">محبوب</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© ۲۰۲۶ همراه. همه حقوق محفوظ است.</span>
          <span>طراحی شده برای مردم کابل و افغانستان.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
