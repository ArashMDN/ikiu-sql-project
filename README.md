# 🎓 آموزش سریع و آسان SQL

یک وبسایت کامل برای آموزش و تمرین SQL با دیتابیس‌های واقعی و رابط کاربری مدرن.

## ✨ ویژگی‌ها

### 📚 **محتوای آموزشی کامل**

- منوی کامل موضوعات SQL شامل:
  - مبانی کوئری (SELECT، INSERT، UPDATE، DELETE)
  - فیلترینگ پیشرفته (WHERE، JOIN، GROUP BY، HAVING، DISTINCT، EXISTS)
  - توابع SQL (Aggregate، Window، String، Numeric، Date)
  - مدیریت جداول (CREATE، ALTER، Constraints، Primary Key، Foreign Key)

### 💻 **محیط تمرین تعاملی**

- اجرای کوئری‌های SQL روی 4 دیتابیس نمونه با Prisma ORM
- ویرایشگر کد پیشرفته با Monaco Editor
- نمایش نتایج در جدول تعاملی با Ant Design
- سؤالات تمرینی با سطوح مختلف دشواری (مبتدی، متوسط، پیشرفته)
- بررسی پاسخ‌ها و نمایش پیشنهادات
- نمایش ساختار دیتابیس برای هر schema

### 🗄️ **دیتابیس‌های نمونه**

1. **سیستم فروشگاه آنلاین (E-commerce)** - مشتریان، محصولات، دسته‌بندی‌ها، سفارشات، اقلام سفارش، نظرات
2. **سیستم مدیریت مدرسه (School)** - دانش‌آموزان، معلمان، دروس، ثبت‌نام‌ها، نمرات
3. **سیستم مدیریت کتابخانه (Library)** - کتاب‌ها، نویسندگان، ناشران، اعضا، امانات، ارتباط کتاب-نویسنده
4. **سیستم مدیریت شرکت (Company)** - کارمندان، بخش‌ها، پروژه‌ها، مکان‌های بخش، کار روی پروژه، وابستگان

### 🔒 **امنیت**

- محدودیت به کوئری‌های SELECT و WITH فقط
- بلاکه کردن دستورات مخرب (DROP، DELETE، INSERT، UPDATE، ALTER و غیره)
- اعتبارسنجی کامل ورودی‌ها
- جلوگیری از اجرای چندین کوئری همزمان

### 🎨 **رابط کاربری مدرن**

- طراحی RTL کامل برای زبان فارسی
- پشتیبانی از تم تاریک با کلاس‌های Tailwind
- سایدبار قابل جمع‌شدن و responsive
- UI components پیشرفته از Ant Design v5
- فونت‌های فارسی (Yekan Bakh) با وزن‌های مختلف
- انیمیشن‌ها و Loading states

## 🛠️ تکنولوژی‌ها

- **Frontend:** Next.js 15.5.2, React 19.1.0, Ant Design 5.27.3
- **Styling:** Tailwind CSS 3.4.17, CSS Custom Properties
- **Code Editor:** Monaco Editor (VS Code Editor)
- **State Management:** Zustand 5.0.8
- **API Calls:** Axios 1.11.0, TanStack React Query 5.86.0
- **Database:** SQLite با Prisma ORM 6.15.0
- **Backend:** Next.js API Routes
- **Notifications:** React Toastify 11.0.5
- **Loading UI:** React Spinners 0.17.0
- **Progress Bar:** Next13 ProgressBar
- **Fonts:** Custom Persian Fonts (Yekan Bakh)

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
│   ├── api/sql/execute/route.js     # API endpoint برای اجرای کوئری SQL
│   ├── components/
│   │   ├── AntConfigProvider/       # تنظیمات Ant Design
│   │   ├── MainLayout/              # لایوت اصلی responsive
│   │   ├── SQLSidebar/              # سایدبار موضوعات SQL
│   │   ├── SQLPracticeInterface/    # رابط اصلی تمرین SQL
│   │   ├── SQLQueryInterface/       # رابط اجرای کوئری
│   │   ├── SQLLearningModal/        # مودال آموزش موضوعات
│   │   ├── BlobColors.jsx           # افکت‌های بصری
│   │   ├── Loading.jsx              # کامپوننت لودینگ
│   │   └── ToastWrapper.jsx         # تنظیمات نوتیفیکیشن
│   ├── data/
│   │   ├── practiceQuestions.js     # سؤالات تمرینی با پاسخ
│   │   ├── databaseSchemas.js       # ساختار دیتابیس‌ها
│   │   └── sqlTopics.js             # موضوعات آموزشی SQL
│   ├── utils/
│   │   ├── store.js                 # State management با Zustand
│   │   ├── Providers.jsx            # React Query Provider
│   │   └── AntWrapper.jsx           # Styled Components Registry
│   ├── generated/prisma/            # Prisma Client تولید شده
│   ├── practice/                    # دایرکتوری برای صفحات تمرین (خالی)
│   ├── globals.css                  # استایل‌های سراسری
│   ├── layout.jsx                   # Root Layout
│   └── page.jsx                     # صفحه اصلی
├── prisma/
│   ├── schema.prisma               # مدل‌های دیتابیس (4 دیتابیس)
│   ├── seed.js                     # داده‌های اولیه
│   └── dev.db                      # فایل دیتابیس SQLite
├── public/fonts/                   # فونت‌های فارسی Yekan Bakh
├── tailwind.config.js              # تنظیمات Tailwind CSS
└── next.config.mjs                 # تنظیمات Next.js
```

## 🎯 نحوه استفاده

### 1. **مرور موضوعات آموزشی**

- از سایدبار موضوع مورد نظر را انتخاب کنید
- هر موضوع شامل توضیحات، syntax و مثال‌های عملی است
- موضوعات به دسته‌های مختلف تقسیم شده‌اند (Query Basics، Functions، Tables)

### 2. **حل سؤالات تمرینی**

- دیتابیس مورد نظر را انتخاب کنید (فروشگاه، مدرسه، کتابخانه، شرکت)
- سطح دشواری را انتخاب کنید (مبتدی، متوسط، پیشرفته)
- سؤال ارائه شده را بخوانید و کوئری خود را بنویسید
- کوئری را اجرا کنید و پاسخ صحیح را با پاسخ خود مقایسه کنید
- از قابلیت "مشاهده پاسخ" برای یادگیری بهتر استفاده کنید

### 3. **اجرای کوئری آزاد**

- در تب "محیط تمرین" کوئری‌های دلخواه خود را بنویسید
- از Monaco Editor با syntax highlighting استفاده کنید
- نتایج را در جدول تعاملی مشاهده کنید
- از کوئری‌های نمونه برای شروع سریع استفاده کنید

### 4. **مشاهده ساختار دیتابیس**

- در تب "ساختار دیتابیس" تمام جداول را ببینید
- برای هر جدول، نام ستون‌ها، نوع داده، قیود و توضیحات نمایش داده می‌شود
- روابط بین جداول (Foreign Keys) مشخص شده‌اند

## 🔧 کوئری‌های نمونه

### فروشگاه آنلاین (E-commerce)

```sql
-- مشاهده محصولات گران‌قیمت
SELECT name, price, stock FROM products WHERE price > 500000;

-- تعداد سفارش هر مشتری
SELECT c.firstName, c.lastName, COUNT(o.id) as order_count
FROM customers c
LEFT JOIN orders o ON c.id = o.customerId
GROUP BY c.id, c.firstName, c.lastName;

-- محصولات پرفروش
SELECT p.name, SUM(oi.quantity) as total_sold
FROM products p
JOIN orderItems oi ON p.id = oi.productId
GROUP BY p.id, p.name
ORDER BY total_sold DESC;
```

### مدیریت مدرسه (School)

```sql
-- میانگین نمرات دانش‌آموزان
SELECT s.firstName, s.lastName, AVG(g.score) as average_score
FROM students s
JOIN grades g ON s.id = g.studentId
GROUP BY s.id, s.firstName, s.lastName;

-- دروس هر معلم
SELECT t.firstName, t.lastName, COUNT(c.id) as course_count
FROM teachers t
LEFT JOIN courses c ON t.id = c.teacherId
GROUP BY t.id, t.firstName, t.lastName;
```

### کتابخانه (Library)

```sql
-- کتاب‌های در دسترس
SELECT b.title, b.author, b.availableCopies
FROM books b
WHERE b.availableCopies > 0;

-- اعضای فعال با امانات جاری
SELECT m.firstName, m.lastName, COUNT(l.id) as active_loans
FROM members m
JOIN loans l ON m.id = l.memberId
WHERE l.status = 'active'
GROUP BY m.id, m.firstName, m.lastName;
```

### شرکت (Company)

```sql
-- کارمندان هر بخش
SELECT d.Dname, COUNT(e.Ssn) as employee_count
FROM DEPARTMENT d
LEFT JOIN EMPLOYEE e ON d.Dnumber = e.Dno
GROUP BY d.Dnumber, d.Dname;

-- پروژه‌های در حال اجرا
SELECT p.Pname, p.Plocation, d.Dname
FROM PROJECT p
JOIN DEPARTMENT d ON p.Dnum = d.Dnumber;
```

## 🛡️ امنیت

این سیستم شامل چندین لایه امنیتی است:

- **فیلتر دستورات:** فقط SELECT و WITH (CTEs) مجاز هستند
- **بلاک کردن کلمات خطرناک:** DROP، DELETE، INSERT، UPDATE، ALTER، CREATE، TRUNCATE، REPLACE، MERGE، CALL، EXEC، EXECUTE، PRAGMA
- **محدودیت کوئری چندگانه:** اجرای همزمان چند کوئری ممنوع (سمی‌کولن محدود شده)
- **اعتبارسنجی ورودی:** بررسی کامل syntax و محتوا قبل از اجرا
- **محیط امن:** استفاده از Prisma ORM برای جلوگیری از SQL Injection
- **محدودیت منابع:** timeout مناسب برای جلوگیری از کوئری‌های طولانی

## 🤝 مشارکت

برای مشارکت در این پروژه:

1. Fork کنید
2. یک branch جدید ایجاد کنید
3. تغییرات خود را commit کنید
4. Pull Request ارسال کنید

## 📝 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 💡 ایده‌های توسعه آینده

- **سیستم امتیازدهی:** ردیابی پیشرفت کاربران و اعطای نشان‌ها
- **تمرین‌های پیشرفته‌تر:** اضافه کردن سؤالات پیچیده‌تر و challenging queries
- **صادرات نتایج:** دانلود نتایج کوئری به فرمت CSV، Excel، JSON
- **حالت چالش:** مسابقات زمان‌دار و رقابتی
- **تجسم داده:** نمودارها و گراف‌های تعاملی برای نتایج
- **پشتیبانی چند دیتابیس:** افزودن MySQL، PostgreSQL، SQL Server
- **ویرایشگر پیشرفته‌تر:** auto-completion، error highlighting، query optimization tips
- **سیستم ذخیره:** ذخیره کوئری‌های کاربران و تاریخچه
- **حالت آموزش تعاملی:** step-by-step guided tutorials
- **API برای توسعه‌دهندگان:** ارائه API برای ادغام با سایر پلتفرم‌ها

---

**ساخته شده با ❤️ برای علاقه‌مندان به یادگیری SQL**
