export type Food = {
  id: string;
  title: string;
  restaurant: string;
  price: number;
  description: string;
  category: string;
  icon: string;
  // optional runtime-only quantity used in cart UI
  quantity?: number;
};

export const restaurants = [
  {
    id: 'rest-1',
    name: 'رستوران نان و نوش',
    description: 'کباب‌ها و غذاهای خانگی با طعم اصیل کابل',
    badge: 'محبوب',
    eta: '۲۰–۳۰ دقیقه',
    rating: '۴.۸',
  },
  {
    id: 'rest-2',
    name: 'کبابی رحیمی',
    description: 'کباب تازه و پرس گرم برای همه خانواده',
    badge: 'سریع',
    eta: '۱۵–۲۵ دقیقه',
    rating: '۴.۷',
  },
  {
    id: 'rest-3',
    name: 'قهوه‌خانه غزنی',
    description: 'چای تازه، سمبوسه و غذاهای محلی شبانه',
    badge: 'صبحانه',
    eta: '۱۸–۲۸ دقیقه',
    rating: '۴.۹',
  },
  {
    id: 'rest-4',
    name: 'دکان افغان',
    description: 'منسف، کابلی و غذاهای خیابانی با طعم واقعی',
    badge: 'جدید',
    eta: '۲۲–۳۲ دقیقه',
    rating: '۴.۶',
  },
];

export const categories = [
  { id: 'all', title: 'همه', icon: '🍽️' },
  { id: 'kebab', title: 'کباب', icon: '🍢' },
  { id: 'pilaf', title: 'چلو', icon: '🍛' },
  { id: 'traditional', title: 'منسف', icon: '🥘' },
  { id: 'drinks', title: 'چای‌خانه', icon: '☕' },
  { id: 'street', title: 'خیابانی', icon: '🥙' },
];

export const foods: Food[] = [
  {
    id: 'food-1',
    title: 'چلو کباب مرغ',
    restaurant: 'رستوران نان و نوش',
    price: 320,
    description: 'مرغ آبدار، برنج زعفرانی و سبزی تازه',
    category: 'kebab',
    icon: '🍗',
  },
  {
    id: 'food-2',
    title: 'منسف سنتی',
    restaurant: 'دکان افغان',
    price: 380,
    description: 'برنج، گوشت گوسفندی و سس ماست خوش‌عطر',
    category: 'traditional',
    icon: '🥘',
  },
  {
    id: 'food-3',
    title: 'سبزی پلو با ماهی',
    restaurant: 'کبابی رحیمی',
    price: 365,
    description: 'برنج ترش و سبزی با ماهی سرخ‌شده',
    category: 'pilaf',
    icon: '🐟',
  },
  {
    id: 'food-4',
    title: 'آش کدو',
    restaurant: 'قهوه‌خانه غزنی',
    price: 250,
    description: 'آش گرم و پر از سبزیجات محلی',
    category: 'drinks',
    icon: '🥣',
  },
  {
    id: 'food-5',
    title: 'سمبوسه سبزی',
    restaurant: 'قهوه‌خانه غزنی',
    price: 140,
    description: 'خمیر ترد و پرکننده از سبزی‌های تازه',
    category: 'street',
    icon: '🥟',
  },
  {
    id: 'food-6',
    title: 'کباب کوبیده',
    restaurant: 'رستوران نان و نوش',
    price: 290,
    description: 'کوبیده ترد، نان تازه و پیاز خام',
    category: 'kebab',
    icon: '🍢',
  },
  {
    id: 'food-7',
    title: 'پلو چلو گوشت',
    restaurant: 'دکان افغان',
    price: 330,
    description: 'برنج زعفرانی با گوشت نرم و سس سرخ',
    category: 'pilaf',
    icon: '🍛',
  },
  {
    id: 'food-8',
    title: 'چای گیاهی',
    restaurant: 'قهوه‌خانه غزنی',
    price: 80,
    description: 'چای تازه و گرم همراه با ادویه محلی',
    category: 'drinks',
    icon: '☕',
  },
];

export const userCards = [
  { name: 'علی‌رضا', role: 'خریدار فعال', points: '۱۲۵۰ امتیاز' },
  { name: 'عطا', role: 'رستوران‌دار', points: '۹۳۰ امتیاز' },
  { name: 'حبیب', role: 'تحویل‌دار', points: '۶۸۰ امتیاز' },
];
