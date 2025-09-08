# 🚀 راهنمای استقرار در لیارا

## چرا لیارا؟
- ✅ پشتیبانی کامل از Next.js 15
- ✅ فایل سیستم دائمی (SQLite کار می‌کند!)
- ✅ بدون محدودیت serverless
- ✅ سرعت بالا در ایران
- ✅ پشتیبانی فارسی

## مراحل استقرار

### 1️⃣ آماده‌سازی پروژه

```bash
# اطمینان از وجود اسکریپت‌های صحیح
npm run build  # تست محلی
```

### 2️⃣ ایجاد حساب در لیارا
- برو به [liara.ir](https://liara.ir)
- ثبت‌نام کن
- ایجاد برنامه جدید > Next.js

### 3️⃣ تنظیمات پروژه

**فایل `liara.json` اضافه کن:**
```json
{
  "platform": "next",
  "app": "ikiu-sql-project",
  "port": 3000,
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  }
}
```

### 4️⃣ استقرار

**روش 1: از طریق CLI**
```bash
# نصب CLI لیارا
npm install -g @liara/cli

# لاگین
liara login

# استقرار
liara deploy
```

**روش 2: از طریق ZIP**
```bash
# ایجاد ZIP (بدون node_modules)
zip -r ikiu-sql-project.zip . -x "node_modules/*" ".next/*" ".git/*"
# آپلود در پنل لیارا
```

### 5️⃣ متغیرهای محیطی

در پنل لیارا تنظیم کن:
```
DATABASE_URL=file:./prisma/dev.db
NODE_ENV=production
```

### 6️⃣ تست

پس از استقرار:
- ✅ سایت باز می‌شود
- ✅ API کار می‌کند
- ✅ دیتابیس در دسترس است

## 💰 هزینه‌ها

- **پلن رایگان**: 1GB RAM, 1GB Storage
- **پلن پایه**: 50,000 تومان/ماه
- **پلن متوسط**: 150,000 تومان/ماه

## 🆘 رفع مشکل

اگر خطا داشتی:
```bash
# چک کردن لاگ‌ها
liara logs --app ikiu-sql-project

# ری‌استارت
liara restart --app ikiu-sql-project
```

## 📞 پشتیبانی

- تلگرام: @LiaraSupport
- ایمیل: support@liara.ir
- تیکت در پنل کاربری
