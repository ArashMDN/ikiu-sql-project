# 🎓 آموزش سریع و آسان SQL

یک وبسایت کامل برای آموزش و تمرین SQL با دیتابیس‌های واقعی و رابط کاربری مدرن.

## ✨ ویژگی‌ها

### 📚 **محتوای آموزشی کامل**

- منوی کامل موضوعات SQL شامل:
  - مبانی کوئری (SELECT، INSERT، UPDATE، DELETE)
  - فیلترینگ پیشرفته (WHERE، JOIN، GROUP BY، HAVING)
  - توابع SQL (Aggregate، Window، String، Numeric، Date)
  - مدیریت جداول (CREATE، ALTER، Constraints)

### 💻 **محیط تمرین تعاملی**

- اجرای کوئری‌های SQL روی 4 دیتابیس نمونه
- ویرایشگر کد با syntax highlighting
- نمایش نتایج در جدول تعاملی
- اندازه‌گیری زمان اجرا
- کوئری‌های نمونه برای شروع سریع

### 🗄️ **دیتابیس‌های نمونه**

1. **سیستم فروشگاه آنلاین** - مدیریت محصولات، مشتریان، سفارشات
2. **سیستم مدیریت مدرسه** - دانش‌آموزان، معلمان، دروس، نمرات
3. **سیستم مدیریت کتابخانه** - کتاب‌ها، نویسندگان، اعضا، امانات
4. **سیستم مدیریت شرکت** - کارمندان، بخش‌ها، پروژه‌ها، حضور و غیاب

### 🔒 **امنیت**

- محدودیت به کوئری‌های SELECT فقط
- جلوگیری از دستورات مخرب
- اعتبارسنجی کامل ورودی‌ها

### 🎨 **رابط کاربری مدرن**

- طراحی RTL برای زبان فارسی
- پشتیبانی از تم تاریک
- سایدبار قابل جمع‌شدن
- UI components از Ant Design

## 🛠️ تکنولوژی‌ها

- **Frontend:** Next.js 15, React 19, Ant Design, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** SQLite با Prisma ORM
- **Type Safety:** TypeScript-ready structure
- **Styling:** CSS Modules + Tailwind CSS

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها

- Node.js 18+
- npm یا yarn

### مراحل نصب

1. **کلون کردن پروژه:**

```bash
git clone [repository-url]
cd ikiu-sql-project
```

2. **نصب وابستگی‌ها:**

```bash
npm install
```

3. **تنظیم دیتابیس:**

```bash
# ایجاد و مهاجرت دیتابیس
DATABASE_URL="file:./dev.db" npx prisma db push

# پر کردن دیتابیس با داده‌های نمونه
DATABASE_URL="file:./dev.db" node prisma/seed.js
```

4. **اجرای پروژه:**

```bash
DATABASE_URL="file:./dev.db" npm run dev
```

5. **مشاهده نتیجه:**
   باز کردن [http://localhost:3000](http://localhost:3000) در مرورگر

## 📁 ساختار پروژه

```
├── app/
│   ├── api/sql/execute/          # API endpoint برای اجرای کوئری
│   ├── components/
│   │   ├── MainLayout/           # لایوت اصلی
│   │   ├── SQLSidebar/           # سایدبار موضوعات
│   │   └── SQLQueryInterface/    # رابط تمرین SQL
│   ├── data/                     # داده‌های موضوعات SQL
│   ├── practice/                 # صفحه تمرین
│   └── generated/prisma/         # Prisma Client
├── prisma/
│   ├── schema.prisma            # مدل دیتابیس
│   ├── seed.js                  # داده‌های اولیه
│   └── dev.db                   # فایل دیتابیس SQLite
└── public/fonts/                # فونت‌های فارسی
```

## 🎯 نحوه استفاده

### 1. **مرور موضوعات**

- از سایدبار موضوع مورد نظر را انتخاب کنید
- هر موضوع شامل توضیحات و مثال‌هاست

### 2. **تمرین کوئری**

- روی "محیط تمرین" کلیک کنید
- دیتابیس مورد نظر را انتخاب کنید
- کوئری خود را بنویسید یا از نمونه‌ها استفاده کنید
- دکمه "اجرا" را بزنید

### 3. **مشاهده ساختار دیتابیس**

- در تب "ساختار دیتابیس" جداول و ستون‌ها را ببینید
- برای هر جدول، نوع داده و محدودیت‌ها نمایش داده می‌شود

## 🔧 کوئری‌های نمونه

### فروشگاه آنلاین

```sql
-- مشاهده محصولات گران‌قیمت
SELECT name, price FROM products WHERE price > 1000000;

-- تعداد سفارش هر مشتری
SELECT c.firstName, c.lastName, COUNT(o.id) as order_count
FROM customers c
LEFT JOIN orders o ON c.id = o.customerId
GROUP BY c.id;
```

### مدیریت مدرسه

```sql
-- میانگین نمرات دانش‌آموزان
SELECT s.firstName, s.lastName, AVG(g.score) as average_score
FROM students s
JOIN grades g ON s.id = g.studentId
GROUP BY s.id;
```

## 🛡️ امنیت

این سیستم شامل چندین لایه امنیتی است:

- **فیلتر دستورات:** فقط SELECT و WITH مجاز هستند
- **بلاک کردن کلمات خطرناک:** DROP، DELETE، INSERT، UPDATE و غیره
- **محدودیت کوئری چندگانه:** اجرای همزمان چند کوئری ممنوع
- **اعتبارسنجی ورودی:** بررسی کامل syntax و محتوا

## 🤝 مشارکت

برای مشارکت در این پروژه:

1. Fork کنید
2. یک branch جدید ایجاد کنید
3. تغییرات خود را commit کنید
4. Pull Request ارسال کنید

## 📝 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 💡 ایده‌های توسعه

- اضافه کردن تمرین‌های هدفمند برای هر موضوع
- سیستم امتیازدهی و پیشرفت
- صادرات نتایج به CSV/Excel
- حالت مسابقه و چالش
- گراف‌های تجسم داده
- پشتیبانی از چند زبان دیتابیس (MySQL، PostgreSQL)

---

**ساخته شده با ❤️ برای علاقه‌مندان به یادگیری SQL**
