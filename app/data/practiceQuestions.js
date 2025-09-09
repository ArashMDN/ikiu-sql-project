export const practiceQuestions = {
  ecommerce: {
    name: "سیستم فروشگاه آنلاین",
    description: "مدیریت محصولات، مشتریان، سفارشات و نظرات",
    tables: [
      "customers",
      "categories",
      "products",
      "orders",
      "order_items",
      "reviews",
    ],
    questions: {
      beginner: [
        {
          id: "ecom_basic_1",
          title: "نمایش همه مشتریان",
          description: "لیست تمام مشتریان موجود در سیستم را نمایش دهید.",
          expectedColumns: ["id", "firstName", "lastName", "email"],
          hints: [
            "از جدول customers استفاده کنید",
            "دستور SELECT را برای انتخاب همه ستون‌ها استفاده کنید",
            "نیازی به شرط WHERE نیست",
          ],
          solution: "SELECT * FROM customers;",
          explanation:
            "این کوئری تمام رکوردهای جدول customers را بازمی‌گرداند. علامت * به معنای انتخاب همه ستون‌ها است.",
          difficulty: "beginner",
          points: 10,
        },
        {
          id: "ecom_basic_2",
          title: "محصولات گران‌قیمت",
          description:
            "محصولاتی که قیمت آن‌ها بالای 1,000,000 تومان است را نمایش دهید.",
          expectedColumns: ["name", "price"],
          hints: [
            "از جدول products استفاده کنید",
            "فقط name و price را انتخاب کنید",
            "شرط WHERE برای قیمت بالای 1000000 اضافه کنید",
          ],
          solution: "SELECT name, price FROM products WHERE price > 1000000;",
          explanation:
            "این کوئری محصولاتی را نمایش می‌دهد که قیمت آن‌ها بیشتر از 1 میلیون تومان است. عملگر > برای مقایسه استفاده شده است.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "ecom_basic_3",
          title: "تعداد محصولات",
          description: "تعداد کل محصولات موجود در سیستم را محاسبه کنید.",
          expectedColumns: ["total_products"],
          hints: [
            "از تابع COUNT استفاده کنید",
            "جدول products را استفاده کنید",
            "از AS برای نام‌گذاری ستون نتیجه استفاده کنید",
          ],
          solution: "SELECT COUNT(*) AS total_products FROM products;",
          explanation:
            "تابع COUNT(*) تعداد تمام رکوردهای جدول را محاسبه می‌کند. AS برای دادن نام مستعار به ستون نتیجه استفاده شده است.",
          difficulty: "beginner",
          points: 20,
        },
        {
          id: "ecom_basic_4",
          title: "مشتریان تهرانی",
          description:
            "لیست مشتریانی که در شهر تهران زندگی می‌کنند را نمایش دهید.",
          expectedColumns: ["firstName", "lastName", "city"],
          hints: [
            "از جدول customers استفاده کنید",
            "شرط WHERE برای city استفاده کنید",
            "مقدار 'تهران' را در کوتیشن قرار دهید",
          ],
          solution:
            "SELECT firstName, lastName, city FROM customers WHERE city = 'تهران';",
          explanation:
            "این کوئری مشتریانی را فیلتر می‌کند که در ستون city مقدار 'تهران' دارند. برای مقایسه رشته‌ها از کوتیشن استفاده می‌شود.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "ecom_basic_5",
          title: "محصولات ارزان",
          description:
            "محصولاتی که قیمت آن‌ها کمتر از 500,000 تومان است را به ترتیب قیمت نمایش دهید.",
          expectedColumns: ["name", "price"],
          hints: [
            "از WHERE برای فیلتر کردن قیمت استفاده کنید",
            "از ORDER BY برای مرتب کردن استفاده کنید",
            "برای مرتب کردن صعودی نیازی به ASC نیست",
          ],
          solution:
            "SELECT name, price FROM products WHERE price < 500000 ORDER BY price;",
          explanation:
            "این کوئری محصولات ارزان را فیلتر کرده و سپس بر اساس قیمت مرتب می‌کند. ORDER BY به طور پیش‌فرض صعودی (ASC) است.",
          difficulty: "beginner",
          points: 25,
        },
        {
          id: "ecom_basic_6",
          title: "محصولات فعال",
          description: "فقط محصولات فعال (isActive = 1) را نمایش دهید.",
          expectedColumns: ["name", "price", "isActive"],
          hints: [
            "از جدول products استفاده کنید",
            "شرط WHERE برای isActive = 1 اضافه کنید",
            "در SQLite مقدار true به صورت 1 ذخیره می‌شود",
          ],
          solution:
            "SELECT name, price, isActive FROM products WHERE isActive = 1;",
          explanation:
            "این کوئری فقط محصولاتی را نمایش می‌دهد که فعال هستند. در SQLite مقادیر boolean به صورت 0 و 1 ذخیره می‌شوند.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "ecom_basic_7",
          title: "مشتریان با ایمیل",
          description:
            "مشتریانی که ایمیل آن‌ها شامل 'gmail' است را نمایش دهید.",
          expectedColumns: ["firstName", "lastName", "email"],
          hints: [
            "از عملگر LIKE استفاده کنید",
            "برای جست‌وجو در بخشی از رشته از % استفاده کنید",
            "فرمت: WHERE email LIKE '%gmail%'",
          ],
          solution:
            "SELECT firstName, lastName, email FROM customers WHERE email LIKE '%gmail%';",
          explanation:
            "عملگر LIKE برای جست‌وجو در رشته‌ها استفاده می‌شود. % نشان‌دهنده هر تعداد کاراکتر است.",
          difficulty: "beginner",
          points: 20,
        },
        {
          id: "ecom_basic_8",
          title: "محصولات موجود",
          description:
            "محصولاتی که موجودی آن‌ها بیشتر از صفر است را نمایش دهید.",
          expectedColumns: ["name", "stock"],
          hints: [
            "از جدول products استفاده کنید",
            "شرط WHERE برای stock > 0 اضافه کنید",
            "فقط name و stock را انتخاب کنید",
          ],
          solution: "SELECT name, stock FROM products WHERE stock > 0;",
          explanation:
            "این کوئری محصولاتی را نمایش می‌دهد که موجودی آن‌ها بیشتر از صفر است.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "ecom_basic_9",
          title: "دسته‌بندی‌ها",
          description:
            "نام تمام دسته‌بندی‌ها را به ترتیب حروف الفبا نمایش دهید.",
          expectedColumns: ["name"],
          hints: [
            "از جدول categories استفاده کنید",
            "فقط ستون name را انتخاب کنید",
            "از ORDER BY name برای مرتب‌سازی استفاده کنید",
          ],
          solution: "SELECT name FROM categories ORDER BY name;",
          explanation:
            "این کوئری نام دسته‌بندی‌ها را به ترتیب حروف الفبا مرتب می‌کند.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "ecom_basic_10",
          title: "محصولات بین دو قیمت",
          description:
            "محصولاتی که قیمت آن‌ها بین 100,000 تا 500,000 تومان است را نمایش دهید.",
          expectedColumns: ["name", "price"],
          hints: [
            "از عملگر BETWEEN استفاده کنید",
            "فرمت: WHERE price BETWEEN 100000 AND 500000",
            "BETWEEN شامل مقادیر ابتدا و انتها است",
          ],
          solution:
            "SELECT name, price FROM products WHERE price BETWEEN 100000 AND 500000;",
          explanation:
            "عملگر BETWEEN برای فیلتر کردن مقادیر در یک بازه استفاده می‌شود و شامل مقادیر ابتدا و انتها نیز می‌شود.",
          difficulty: "beginner",
          points: 20,
        },
      ],
      intermediate: [
        {
          id: "ecom_inter_1",
          title: "میانگین قیمت محصولات هر دسته",
          description: "میانگین قیمت محصولات را برای هر دسته‌بندی محاسبه کنید.",
          expectedColumns: ["category_name", "avg_price"],
          hints: [
            "نیاز به JOIN بین products و categories دارید",
            "از GROUP BY برای دسته‌بندی استفاده کنید",
            "از تابع AVG برای میانگین استفاده کنید",
          ],
          solution:
            "SELECT c.name AS category_name, AVG(p.price) AS avg_price FROM products p JOIN categories c ON p.categoryId = c.id GROUP BY c.id, c.name;",
          explanation:
            "این کوئری جداول products و categories را با هم ترکیب کرده و میانگین قیمت هر دسته را محاسبه می‌کند.",
          difficulty: "intermediate",
          points: 35,
        },
        {
          id: "ecom_inter_2",
          title: "مشتریان پرسفارش",
          description:
            "مشتریانی که بیش از 2 سفارش داده‌اند را همراه با تعداد سفارشاتشان نمایش دهید.",
          expectedColumns: ["firstName", "lastName", "order_count"],
          hints: [
            "از JOIN بین customers و orders استفاده کنید",
            "از GROUP BY روی مشتری استفاده کنید",
            "از HAVING برای فیلتر کردن نتیجه GROUP BY استفاده کنید",
          ],
          solution:
            "SELECT c.firstName, c.lastName, COUNT(o.id) AS order_count FROM customers c JOIN orders o ON c.id = o.customerId GROUP BY c.id, c.firstName, c.lastName HAVING COUNT(o.id) > 2;",
          explanation:
            "این کوئری مشتریان و سفارشاتشان را ترکیب کرده و فقط کسانی را نمایش می‌دهد که بیش از 2 سفارش داشته‌اند.",
          difficulty: "intermediate",
          points: 40,
        },
        {
          id: "ecom_inter_3",
          title: "محصولات محبوب",
          description:
            "محصولاتی که بیش از 3 نظر دریافت کرده‌اند را همراه با میانگین امتیازشان نمایش دهید.",
          expectedColumns: ["product_name", "review_count", "avg_rating"],
          hints: [
            "از JOIN بین products و reviews استفاده کنید",
            "از GROUP BY روی محصول استفاده کنید",
            "از HAVING برای فیلتر کردن تعداد نظرات استفاده کنید",
          ],
          solution:
            "SELECT p.name AS product_name, COUNT(r.id) AS review_count, AVG(r.rating) AS avg_rating FROM products p JOIN reviews r ON p.id = r.productId GROUP BY p.id, p.name HAVING COUNT(r.id) > 3;",
          explanation:
            "این کوئری محصولات پرنظر را پیدا کرده و میانگین امتیاز آن‌ها را محاسبه می‌کند.",
          difficulty: "intermediate",
          points: 45,
        },
        {
          id: "ecom_inter_4",
          title: "سفارشات پردرآمد",
          description:
            "سفارشاتی که مبلغ کل آن‌ها بالای 2,000,000 تومان است را همراه با اطلاعات مشتری نمایش دهید.",
          expectedColumns: ["order_id", "customer_name", "total_amount"],
          hints: [
            "از JOIN بین orders و customers استفاده کنید",
            "از CONCAT برای ترکیب نام و نام خانوادگی استفاده کنید",
            "شرط WHERE برای فیلتر مبلغ اضافه کنید",
          ],
          solution:
            "SELECT o.id AS order_id, c.firstName || ' ' || c.lastName AS customer_name, o.totalAmount AS total_amount FROM orders o JOIN customers c ON o.customerId = c.id WHERE o.totalAmount > 2000000;",
          explanation:
            "این کوئری سفارشات پردرآمد را با اطلاعات مشتری نمایش می‌دهد. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "intermediate",
          points: 35,
        },
        {
          id: "ecom_inter_5",
          title: "تعداد محصولات هر دسته",
          description: "تعداد محصولات موجود در هر دسته‌بندی را محاسبه کنید.",
          expectedColumns: ["category_name", "product_count"],
          hints: [
            "از JOIN بین categories و products استفاده کنید",
            "از GROUP BY روی دسته‌بندی استفاده کنید",
            "از COUNT برای شمارش استفاده کنید",
          ],
          solution:
            "SELECT c.name AS category_name, COUNT(p.id) AS product_count FROM categories c LEFT JOIN products p ON c.id = p.categoryId GROUP BY c.id, c.name;",
          explanation:
            "این کوئری تعداد محصولات هر دسته را محاسبه می‌کند. LEFT JOIN استفاده شده تا دسته‌هایی که محصولی ندارند نیز نمایش داده شوند.",
          difficulty: "intermediate",
          points: 40,
        },
        {
          id: "ecom_inter_6",
          title: "آخرین سفارش هر مشتری",
          description: "آخرین سفارش هر مشتری را همراه با تاریخ آن نمایش دهید.",
          expectedColumns: ["customer_name", "last_order_date"],
          hints: [
            "از JOIN بین customers و orders استفاده کنید",
            "از GROUP BY روی مشتری استفاده کنید",
            "از تابع MAX برای آخرین تاریخ استفاده کنید",
          ],
          solution:
            "SELECT c.firstName || ' ' || c.lastName AS customer_name, MAX(o.orderDate) AS last_order_date FROM customers c JOIN orders o ON c.id = o.customerId GROUP BY c.id, c.firstName, c.lastName;",
          explanation:
            "این کوئری آخرین سفارش هر مشتری را با استفاده از تابع MAX پیدا می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "intermediate",
          points: 40,
        },
        {
          id: "ecom_inter_7",
          title: "مشتریان بدون سفارش",
          description: "مشتریانی که هیچ سفارشی نداده‌اند را نمایش دهید.",
          expectedColumns: ["firstName", "lastName", "email"],
          hints: [
            "از LEFT JOIN بین customers و orders استفاده کنید",
            "از WHERE برای فیلتر NULL استفاده کنید",
            "شرط: WHERE o.id IS NULL",
          ],
          solution:
            "SELECT c.firstName, c.lastName, c.email FROM customers c LEFT JOIN orders o ON c.id = o.customerId WHERE o.id IS NULL;",
          explanation:
            "این کوئری با استفاده از LEFT JOIN مشتریانی را پیدا می‌کند که هیچ سفارشی ندارند.",
          difficulty: "intermediate",
          points: 45,
        },
        {
          id: "ecom_inter_8",
          title: "مجموع فروش هر دسته",
          description:
            "مجموع درآمد حاصل از فروش محصولات هر دسته‌بندی را محاسبه کنید.",
          expectedColumns: ["category_name", "total_revenue"],
          hints: [
            "نیاز به JOIN بین categories, products, order_items دارید",
            "از GROUP BY روی دسته‌بندی استفاده کنید",
            "مجموع = قیمت × تعداد",
          ],
          solution:
            "SELECT c.name AS category_name, SUM(p.price * oi.quantity) AS total_revenue FROM categories c JOIN products p ON c.id = p.categoryId JOIN order_items oi ON p.id = oi.productId GROUP BY c.id, c.name;",
          explanation:
            "این کوئری پیچیده درآمد هر دسته را با ترکیب سه جدول محاسبه می‌کند.",
          difficulty: "intermediate",
          points: 50,
        },
        {
          id: "ecom_inter_9",
          title: "محصولات بدون نظر",
          description: "محصولاتی که هیچ نظری دریافت نکرده‌اند را نمایش دهید.",
          expectedColumns: ["name", "price"],
          hints: [
            "از LEFT JOIN بین products و reviews استفاده کنید",
            "از WHERE برای فیلتر NULL استفاده کنید",
            "شرط: WHERE r.id IS NULL",
          ],
          solution:
            "SELECT p.name, p.price FROM products p LEFT JOIN reviews r ON p.id = r.productId WHERE r.id IS NULL;",
          explanation:
            "این کوئری محصولاتی را پیدا می‌کند که هیچ نظری دریافت نکرده‌اند.",
          difficulty: "intermediate",
          points: 40,
        },
        {
          id: "ecom_inter_10",
          title: "بهترین مشتریان",
          description:
            "5 مشتری برتر بر اساس مجموع مبلغ خریدهایشان را نمایش دهید.",
          expectedColumns: ["customer_name", "total_spent"],
          hints: [
            "از JOIN بین customers و orders استفاده کنید",
            "از GROUP BY و SUM استفاده کنید",
            "از ORDER BY و LIMIT برای 5 نفر اول استفاده کنید",
          ],
          solution:
            "SELECT c.firstName || ' ' || c.lastName AS customer_name, SUM(o.totalAmount) AS total_spent FROM customers c JOIN orders o ON c.id = o.customerId GROUP BY c.id, c.firstName, c.lastName ORDER BY total_spent DESC LIMIT 5;",
          explanation:
            "این کوئری مشتریان را بر اساس مجموع خریدهایشان مرتب کرده و 5 نفر اول را نمایش می‌دهد. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "intermediate",
          points: 45,
        },
      ],
      advanced: [
        {
          id: "ecom_adv_1",
          title: "تحلیل فروش ماهانه",
          description:
            "مجموع فروش ماهانه را همراه با تعداد سفارشات هر ماه محاسبه کنید.",
          expectedColumns: ["month", "year", "total_sales", "order_count"],
          hints: [
            "از توابع تاریخ برای استخراج ماه و سال استفاده کنید",
            "از GROUP BY روی ماه و سال استفاده کنید",
            "از SUM برای مجموع مبلغ استفاده کنید",
          ],
          solution:
            "SELECT strftime('%m', orderDate) AS month, strftime('%Y', orderDate) AS year, SUM(totalAmount) AS total_sales, COUNT(*) AS order_count FROM orders GROUP BY strftime('%Y', orderDate), strftime('%m', orderDate) ORDER BY year, month;",
          explanation:
            "این کوئری پیچیده از توابع تاریخ SQLite برای گروه‌بندی سفارشات بر اساس ماه و سال استفاده می‌کند.",
          difficulty: "advanced",
          points: 60,
        },
        {
          id: "ecom_adv_2",
          title: "مقایسه فروش ماهانه",
          description: "درصد تغییر فروش هر ماه نسبت به ماه قبل را محاسبه کنید.",
          expectedColumns: [
            "month",
            "year",
            "current_sales",
            "previous_sales",
            "growth_percentage",
          ],
          hints: [
            "از Window Function LAG استفاده کنید",
            "ابتدا فروش ماهانه را محاسبه کنید",
            "سپس با LAG فروش ماه قبل را بدست آورید",
          ],
          solution:
            "WITH monthly_sales AS (SELECT strftime('%Y-%m', orderDate) AS month_year, strftime('%m', orderDate) AS month, strftime('%Y', orderDate) AS year, SUM(totalAmount) AS sales FROM orders GROUP BY strftime('%Y-%m', orderDate)) SELECT month, year, sales AS current_sales, LAG(sales, 1, 0) OVER (ORDER BY month_year) AS previous_sales, ROUND(((sales - LAG(sales, 1, 0) OVER (ORDER BY month_year)) * 100.0 / LAG(sales, 1, 0) OVER (ORDER BY month_year)), 2) AS growth_percentage FROM monthly_sales;",
          explanation:
            "این کوئری از CTE و Window Function برای محاسبه رشد ماهانه فروش استفاده می‌کند.",
          difficulty: "advanced",
          points: 80,
        },
        {
          id: "ecom_adv_3",
          title: "تحلیل RFM مشتریان",
          description:
            "برای هر مشتری Recency (آخرین خرید)، Frequency (تعداد خرید) و Monetary (مبلغ خرید) را محاسبه کنید.",
          expectedColumns: [
            "customer_name",
            "recency_days",
            "frequency",
            "monetary",
          ],
          hints: [
            "Recency = تفاوت روز آخرین خرید تا امروز",
            "Frequency = تعداد سفارشات",
            "Monetary = مجموع مبلغ خریدها",
          ],
          solution:
            "SELECT c.firstName || ' ' || c.lastName AS customer_name, julianday('now') - julianday(MAX(o.orderDate)) AS recency_days, COUNT(o.id) AS frequency, SUM(o.totalAmount) AS monetary FROM customers c JOIN orders o ON c.id = o.customerId GROUP BY c.id, c.firstName, c.lastName ORDER BY monetary DESC;",
          explanation:
            "این کوئری تحلیل RFM مشتریان را برای بخش‌بندی و تحلیل رفتار مشتریان انجام می‌دهد. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "advanced",
          points: 70,
        },
        {
          id: "ecom_adv_4",
          title: "محصولات پرفروش با رتبه‌بندی",
          description:
            "رتبه‌بندی محصولات بر اساس تعداد فروش و درصد سهم از کل فروش را محاسبه کنید.",
          expectedColumns: [
            "product_name",
            "total_sold",
            "rank",
            "sales_percentage",
          ],
          hints: [
            "از RANK() OVER استفاده کنید",
            "برای درصد، تعداد فروش محصول را بر کل فروش تقسیم کنید",
            "نیاز به محاسبه کل فروش در یک CTE دارید",
          ],
          solution:
            "WITH product_sales AS (SELECT p.name, SUM(oi.quantity) AS total_sold FROM products p JOIN order_items oi ON p.id = oi.productId GROUP BY p.id, p.name), total_sales AS (SELECT SUM(total_sold) AS grand_total FROM product_sales) SELECT ps.name AS product_name, ps.total_sold, RANK() OVER (ORDER BY ps.total_sold DESC) AS rank, ROUND((ps.total_sold * 100.0 / ts.grand_total), 2) AS sales_percentage FROM product_sales ps CROSS JOIN total_sales ts ORDER BY ps.total_sold DESC;",
          explanation:
            "این کوئری پیچیده از CTE و Window Function برای تحلیل عملکرد محصولات استفاده می‌کند.",
          difficulty: "advanced",
          points: 75,
        },
        {
          id: "ecom_adv_5",
          title: "تحلیل سبد خرید",
          description:
            "میانگین تعداد اقلام و میانگین ارزش سبد خرید را برای هر ماه محاسبه کنید.",
          expectedColumns: [
            "month",
            "year",
            "avg_items_per_order",
            "avg_order_value",
          ],
          hints: [
            "نیاز به محاسبه تعداد اقلام هر سفارش دارید",
            "از GROUP BY روی ماه و سال استفاده کنید",
            "میانگین تعداد اقلام = SUM(quantity) / COUNT(DISTINCT order_id)",
          ],
          solution:
            "SELECT strftime('%m', o.orderDate) AS month, strftime('%Y', o.orderDate) AS year, ROUND(SUM(oi.quantity) * 1.0 / COUNT(DISTINCT o.id), 2) AS avg_items_per_order, ROUND(AVG(o.totalAmount), 2) AS avg_order_value FROM orders o JOIN order_items oi ON o.id = oi.orderId GROUP BY strftime('%Y', o.orderDate), strftime('%m', o.orderDate) ORDER BY year, month;",
          explanation:
            "این کوئری تحلیل رفتار خرید مشتریان را از نظر تعداد اقلام و ارزش سبد خرید ارائه می‌دهد.",
          difficulty: "advanced",
          points: 65,
        },
        {
          id: "ecom_adv_6",
          title: "تحلیل کوهورت مشتریان",
          description:
            "مشتریان را بر اساس ماه اولین خریدشان گروه‌بندی کرده و نرخ بازگشت را محاسبه کنید.",
          expectedColumns: [
            "cohort_month",
            "customers_count",
            "returning_customers",
            "retention_rate",
          ],
          hints: [
            "ابتدا ماه اولین خرید هر مشتری را پیدا کنید",
            "سپس ببینید چند نفر خرید مجدد داشته‌اند",
            "نرخ بازگشت = (مشتریان بازگشتی / کل مشتریان) × 100",
          ],
          solution:
            "WITH first_purchase AS (SELECT customerId, strftime('%Y-%m', MIN(orderDate)) AS cohort_month FROM orders GROUP BY customerId), returning_customers AS (SELECT fp.cohort_month, COUNT(DISTINCT fp.customerId) AS total_customers, COUNT(DISTINCT CASE WHEN o2.customerId IS NOT NULL THEN fp.customerId END) AS returning_count FROM first_purchase fp LEFT JOIN orders o2 ON fp.customerId = o2.customerId AND strftime('%Y-%m', o2.orderDate) > fp.cohort_month GROUP BY fp.cohort_month) SELECT cohort_month, total_customers AS customers_count, returning_count AS returning_customers, ROUND((returning_count * 100.0 / total_customers), 2) AS retention_rate FROM returning_customers ORDER BY cohort_month;",
          explanation:
            "این کوئری پیچیده تحلیل کوهورت مشتریان را برای بررسی وفاداری مشتریان انجام می‌دهد.",
          difficulty: "advanced",
          points: 90,
        },
        {
          id: "ecom_adv_7",
          title: "تشخیص مشتریان در معرض ریزش",
          description:
            "مشتریانی که بیش از 90 روز خرید نکرده‌اند و قبلاً مشتری فعال بوده‌اند را شناسایی کنید.",
          expectedColumns: [
            "customer_name",
            "last_order_date",
            "days_since_last_order",
            "total_orders",
          ],
          hints: [
            "مشتری فعال = بیش از 2 سفارش داشته باشد",
            "از julianday برای محاسبه تفاوت روز استفاده کنید",
            "شرط: آخرین خرید > 90 روز پیش",
          ],
          solution:
            "WITH customer_activity AS (SELECT c.id, c.firstName || ' ' || c.lastName AS customer_name, MAX(o.orderDate) AS last_order_date, COUNT(o.id) AS total_orders FROM customers c JOIN orders o ON c.id = o.customerId GROUP BY c.id, c.firstName, c.lastName HAVING COUNT(o.id) > 2) SELECT customer_name, last_order_date, ROUND(julianday('now') - julianday(last_order_date)) AS days_since_last_order, total_orders FROM customer_activity WHERE julianday('now') - julianday(last_order_date) > 90 ORDER BY days_since_last_order DESC;",
          explanation:
            "این کوئری مشتریان در معرض ریزش را شناسایی می‌کند تا بتوان استراتژی بازگرداندن آن‌ها را اعمال کرد. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "advanced",
          points: 75,
        },
        {
          id: "ecom_adv_8",
          title: "تحلیل ترکیبی محصولات",
          description:
            "محصولاتی که اغلب با هم خریداری می‌شوند را پیدا کنید (Market Basket Analysis).",
          expectedColumns: ["product1", "product2", "times_bought_together"],
          hints: [
            "نیاز به self join روی order_items دارید",
            "محصولات مختلف در یک سفارش باید پیدا شوند",
            "از COUNT برای شمارش تعداد دفعات استفاده کنید",
          ],
          solution:
            "SELECT p1.name AS product1, p2.name AS product2, COUNT(*) AS times_bought_together FROM order_items oi1 JOIN order_items oi2 ON oi1.orderId = oi2.orderId AND oi1.productId < oi2.productId JOIN products p1 ON oi1.productId = p1.id JOIN products p2 ON oi2.productId = p2.id GROUP BY p1.id, p1.name, p2.id, p2.name HAVING COUNT(*) > 1 ORDER BY times_bought_together DESC LIMIT 10;",
          explanation:
            "این کوئری تحلیل سبد بازار را انجام می‌دهد تا الگوهای خرید مشتریان را شناسایی کند.",
          difficulty: "advanced",
          points: 85,
        },
        {
          id: "ecom_adv_9",
          title: "پیش‌بینی فروش بر اساس روند",
          description:
            "بر اساس روند فروش 6 ماه گذشته، فروش ماه آینده را تخمین بزنید.",
          expectedColumns: [
            "prediction_month",
            "predicted_sales",
            "trend_slope",
          ],
          hints: [
            "از Linear Regression ساده استفاده کنید",
            "محاسبه شیب خط روند",
            "اعمال شیب برای پیش‌بینی ماه بعد",
          ],
          solution:
            "WITH monthly_data AS (SELECT ROW_NUMBER() OVER (ORDER BY strftime('%Y-%m', orderDate)) AS month_num, strftime('%Y-%m', orderDate) AS month, SUM(totalAmount) AS sales FROM orders WHERE orderDate >= date('now', '-6 months') GROUP BY strftime('%Y-%m', orderDate)), stats AS (SELECT COUNT(*) AS n, AVG(month_num) AS avg_x, AVG(sales) AS avg_y, SUM((month_num - (SELECT AVG(month_num) FROM monthly_data)) * (sales - (SELECT AVG(sales) FROM monthly_data))) AS sum_xy, SUM((month_num - (SELECT AVG(month_num) FROM monthly_data)) * (month_num - (SELECT AVG(month_num) FROM monthly_data))) AS sum_x2 FROM monthly_data) SELECT date('now', '+1 month', 'start of month') AS prediction_month, ROUND(avg_y + (sum_xy / sum_x2) * ((SELECT MAX(month_num) FROM monthly_data) + 1 - avg_x)) AS predicted_sales, ROUND(sum_xy / sum_x2, 2) AS trend_slope FROM stats;",
          explanation:
            "این کوئری پیشرفته از روش رگرسیون خطی برای پیش‌بینی فروش ماه آینده استفاده می‌کند.",
          difficulty: "advanced",
          points: 95,
        },
        {
          id: "ecom_adv_10",
          title: "تحلیل ارزش طول عمر مشتری (CLV)",
          description:
            "ارزش طول عمر مشتری را بر اساس میانگین فروش و فرکانس خرید محاسبه کنید.",
          expectedColumns: [
            "customer_name",
            "avg_order_value",
            "purchase_frequency",
            "customer_lifespan",
            "clv",
          ],
          hints: [
            "CLV = میانگین ارزش سفارش × فرکانس خرید × طول عمر مشتری",
            "طول عمر = تفاوت بین اولین و آخرین خرید",
            "فرکانس = تعداد سفارشات / طول عمر (به ماه)",
          ],
          solution:
            "WITH customer_metrics AS (SELECT c.id, c.firstName || ' ' || c.lastName AS customer_name, AVG(o.totalAmount) AS avg_order_value, COUNT(o.id) AS total_orders, (julianday(MAX(o.orderDate)) - julianday(MIN(o.orderDate))) / 30.0 AS lifespan_months FROM customers c JOIN orders o ON c.id = o.customerId GROUP BY c.id, c.firstName, c.lastName HAVING COUNT(o.id) > 1) SELECT customer_name, ROUND(avg_order_value, 2) AS avg_order_value, ROUND(total_orders / NULLIF(lifespan_months, 0), 2) AS purchase_frequency, ROUND(lifespan_months, 1) AS customer_lifespan, ROUND(avg_order_value * (total_orders / NULLIF(lifespan_months, 0)) * lifespan_months, 2) AS clv FROM customer_metrics WHERE lifespan_months > 0 ORDER BY clv DESC LIMIT 10;",
          explanation:
            "این کوئری پیچیده ارزش طول عمر مشتری را محاسبه می‌کند که برای استراتژی‌های بازاریابی حیاتی است. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "advanced",
          points: 100,
        },
      ],
    },
  },
  school: {
    name: "سیستم مدیریت مدرسه",
    description: "مدیریت دانش‌آموزان، معلمان، دروس و نمرات",
    tables: ["students", "teachers", "courses", "enrollments", "grades"],
    questions: {
      beginner: [
        {
          id: "school_basic_1",
          title: "لیست همه دانش‌آموزان",
          description: "تمام دانش‌آموزان ثبت شده در سیستم را نمایش دهید.",
          expectedColumns: ["id", "firstName", "lastName", "email"],
          hints: [
            "از جدول students استفاده کنید",
            "از SELECT * برای انتخاب همه ستون‌ها استفاده کنید",
          ],
          solution: "SELECT * FROM students;",
          explanation:
            "این کوئری ساده تمام اطلاعات دانش‌آموزان را از جدول students بازمی‌گرداند.",
          difficulty: "beginner",
          points: 10,
        },
        {
          id: "school_basic_2",
          title: "معلمان بخش علوم",
          description:
            "معلمانی که در بخش علوم (Science) فعالیت می‌کنند را نمایش دهید.",
          expectedColumns: ["firstName", "lastName", "department"],
          hints: [
            "از جدول teachers استفاده کنید",
            "شرط WHERE برای department استفاده کنید",
          ],
          solution:
            "SELECT firstName, lastName, department FROM teachers WHERE department = 'Science';",
          explanation:
            "این کوئری معلمان را بر اساس بخش فعالیتشان فیلتر می‌کند.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "school_basic_3",
          title: "تعداد دانش‌آموزان",
          description: "تعداد کل دانش‌آموزان ثبت شده در سیستم را محاسبه کنید.",
          expectedColumns: ["total_students"],
          hints: [
            "از تابع COUNT استفاده کنید",
            "جدول students را استفاده کنید",
            "از AS برای نام‌گذاری ستون نتیجه استفاده کنید",
          ],
          solution: "SELECT COUNT(*) AS total_students FROM students;",
          explanation:
            "تابع COUNT(*) تعداد تمام رکوردهای جدول را محاسبه می‌کند.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "school_basic_4",
          title: "دروس فعال",
          description: "لیست دروسی که در حال حاضر ارائه می‌شوند را نمایش دهید.",
          expectedColumns: ["courseName", "credits"],
          hints: [
            "از جدول courses استفاده کنید",
            "فقط courseName و credits را انتخاب کنید",
            "نیازی به شرط WHERE نیست",
          ],
          solution: "SELECT courseName, credits FROM courses;",
          explanation:
            "این کوئری نام دروس و تعداد واحدهای آن‌ها را نمایش می‌دهد.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "school_basic_5",
          title: "معلمان با حقوق بالا",
          description:
            "معلمانی که حقوق آن‌ها بالای 50,000,000 ریال است را نمایش دهید.",
          expectedColumns: ["firstName", "lastName", "salary"],
          hints: [
            "از جدول teachers استفاده کنید",
            "شرط WHERE برای salary > 50000000 اضافه کنید",
            "فقط firstName, lastName و salary را انتخاب کنید",
          ],
          solution:
            "SELECT firstName, lastName, salary FROM teachers WHERE salary > 50000000;",
          explanation: "این کوئری معلمان را بر اساس میزان حقوق فیلتر می‌کند.",
          difficulty: "beginner",
          points: 20,
        },
        {
          id: "school_basic_6",
          title: "دانش‌آموزان به ترتیب نام",
          description: "دانش‌آموزان را به ترتیب حروف الفبای نام نمایش دهید.",
          expectedColumns: ["firstName", "lastName"],
          hints: [
            "از ORDER BY firstName استفاده کنید",
            "فقط firstName و lastName را انتخاب کنید",
            "برای مرتب‌سازی صعودی نیازی به ASC نیست",
          ],
          solution:
            "SELECT firstName, lastName FROM students ORDER BY firstName;",
          explanation:
            "ORDER BY به طور پیش‌فرض به صورت صعودی (alphabetical) مرتب می‌کند.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "school_basic_7",
          title: "دروس 3 واحدی",
          description: "دروسی که دارای 3 واحد هستند را نمایش دهید.",
          expectedColumns: ["courseName", "credits"],
          hints: [
            "از جدول courses استفاده کنید",
            "شرط WHERE برای credits = 3 اضافه کنید",
            "courseName و credits را انتخاب کنید",
          ],
          solution:
            "SELECT courseName, credits FROM courses WHERE credits = 3;",
          explanation: "این کوئری دروس را بر اساس تعداد واحد فیلتر می‌کند.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "school_basic_8",
          title: "نمرات بالای 18",
          description: "نمراتی که بالای 18 هستند را نمایش دهید.",
          expectedColumns: ["score", "gradeDate"],
          hints: [
            "از جدول grades استفاده کنید",
            "شرط WHERE برای score > 18 اضافه کنید",
            "score و gradeDate را انتخاب کنید",
          ],
          solution: "SELECT score, gradeDate FROM grades WHERE score > 18;",
          explanation: "این کوئری نمرات عالی را از جدول grades فیلتر می‌کند.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "school_basic_9",
          title: "معلمان بخش ریاضی",
          description:
            "معلمانی که در بخش ریاضی (Mathematics) تدریس می‌کنند را نمایش دهید.",
          expectedColumns: ["firstName", "lastName", "department"],
          hints: [
            "از جدول teachers استفاده کنید",
            "شرط WHERE برای department = 'Mathematics' اضافه کنید",
            "نام و نام خانوادگی معلم را نمایش دهید",
          ],
          solution:
            "SELECT firstName, lastName, department FROM teachers WHERE department = 'Mathematics';",
          explanation: "این کوئری معلمان ریاضی را از سایر بخش‌ها جدا می‌کند.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "school_basic_10",
          title: "دانش‌آموزان با ایمیل دانشگاهی",
          description:
            "دانش‌آموزانی که ایمیل آن‌ها شامل 'university' است را نمایش دهید.",
          expectedColumns: ["firstName", "lastName", "email"],
          hints: [
            "از عملگر LIKE استفاده کنید",
            "برای جست‌وجو در بخشی از رشته از % استفاده کنید",
            "فرمت: WHERE email LIKE '%university%'",
          ],
          solution:
            "SELECT firstName, lastName, email FROM students WHERE email LIKE '%university%';",
          explanation: "عملگر LIKE برای جست‌وجو در رشته‌ها استفاده می‌شود.",
          difficulty: "beginner",
          points: 20,
        },
      ],
      intermediate: [
        {
          id: "school_inter_1",
          title: "میانگین نمرات هر دانش‌آموز",
          description: "میانگین نمرات هر دانش‌آموز را محاسبه کنید.",
          expectedColumns: ["firstName", "lastName", "average_score"],
          hints: [
            "نیاز به JOIN بین students و grades دارید",
            "از GROUP BY روی دانش‌آموز استفاده کنید",
            "از تابع AVG استفاده کنید",
          ],
          solution:
            "SELECT s.firstName, s.lastName, AVG(g.score) AS average_score FROM students s JOIN grades g ON s.id = g.studentId GROUP BY s.id, s.firstName, s.lastName;",
          explanation:
            "این کوئری دانش‌آموزان را با نمراتشان ترکیب کرده و میانگین نمرات هر دانش‌آموز را محاسبه می‌کند.",
          difficulty: "intermediate",
          points: 35,
        },
        {
          id: "school_inter_2",
          title: "تعداد دانش‌آموزان هر درس",
          description:
            "تعداد دانش‌آموزان ثبت نام شده در هر درس را محاسبه کنید.",
          expectedColumns: ["courseName", "student_count"],
          hints: [
            "نیاز به JOIN بین courses و enrollments دارید",
            "از GROUP BY روی درس استفاده کنید",
            "از COUNT برای شمارش استفاده کنید",
          ],
          solution:
            "SELECT c.courseName, COUNT(e.studentId) AS student_count FROM courses c JOIN enrollments e ON c.id = e.courseId GROUP BY c.id, c.courseName;",
          explanation:
            "این کوئری دروس را با ثبت نام‌ها ترکیب کرده و تعداد دانش‌آموزان هر درس را محاسبه می‌کند.",
          difficulty: "intermediate",
          points: 40,
        },
        {
          id: "school_inter_3",
          title: "معلمان با بیشترین حقوق",
          description: "5 معلم با بالاترین حقوق را همراه با بخششان نمایش دهید.",
          expectedColumns: ["firstName", "lastName", "department", "salary"],
          hints: [
            "از ORDER BY salary DESC استفاده کنید",
            "از LIMIT 5 برای محدود کردن نتایج استفاده کنید",
            "همه ستون‌های مورد نیاز را انتخاب کنید",
          ],
          solution:
            "SELECT firstName, lastName, department, salary FROM teachers ORDER BY salary DESC LIMIT 5;",
          explanation:
            "این کوئری معلمان را بر اساس حقوق مرتب کرده و 5 نفر اول را نمایش می‌دهد.",
          difficulty: "intermediate",
          points: 30,
        },
        {
          id: "school_inter_4",
          title: "دانش‌آموزان با نمره بالا",
          description:
            "دانش‌آموزانی که حداقل یک نمره بالای 19 دارند را نمایش دهید.",
          expectedColumns: ["firstName", "lastName", "max_score"],
          hints: [
            "از JOIN بین students و grades استفاده کنید",
            "از GROUP BY روی دانش‌آموز استفاده کنید",
            "از HAVING برای فیلتر بر اساس MAX استفاده کنید",
          ],
          solution:
            "SELECT s.firstName, s.lastName, MAX(g.score) AS max_score FROM students s JOIN grades g ON s.id = g.studentId GROUP BY s.id, s.firstName, s.lastName HAVING MAX(g.score) > 19;",
          explanation:
            "این کوئری دانش‌آموزان را گروه‌بندی کرده و فقط کسانی را نمایش می‌دهد که حداکثر نمره آن‌ها بالای 19 است.",
          difficulty: "intermediate",
          points: 45,
        },
        {
          id: "school_inter_5",
          title: "درس‌های پرطرفدار",
          description:
            "دروسی که بیش از 10 دانش‌آموز در آن‌ها ثبت نام کرده‌اند را نمایش دهید.",
          expectedColumns: ["courseName", "student_count"],
          hints: [
            "از JOIN بین courses و enrollments استفاده کنید",
            "از GROUP BY روی درس استفاده کنید",
            "از HAVING برای فیلتر تعداد استفاده کنید",
          ],
          solution:
            "SELECT c.courseName, COUNT(e.studentId) AS student_count FROM courses c JOIN enrollments e ON c.id = e.courseId GROUP BY c.id, c.courseName HAVING COUNT(e.studentId) > 10;",
          explanation:
            "این کوئری دروس پرطرفدار را با استفاده از HAVING پیدا می‌کند.",
          difficulty: "intermediate",
          points: 40,
        },
        {
          id: "school_inter_6",
          title: "میانگین حقوق هر بخش",
          description: "میانگین حقوق معلمان را برای هر بخش محاسبه کنید.",
          expectedColumns: ["department", "avg_salary"],
          hints: [
            "از جدول teachers استفاده کنید",
            "از GROUP BY روی department استفاده کنید",
            "از تابع AVG برای محاسبه میانگین استفاده کنید",
          ],
          solution:
            "SELECT department, AVG(salary) AS avg_salary FROM teachers GROUP BY department;",
          explanation:
            "این کوئری معلمان را بر اساس بخش گروه‌بندی کرده و میانگین حقوق هر بخش را محاسبه می‌کند.",
          difficulty: "intermediate",
          points: 35,
        },
        {
          id: "school_inter_7",
          title: "دانش‌آموزان بدون نمره",
          description:
            "دانش‌آموزانی که هیچ نمره‌ای دریافت نکرده‌اند را نمایش دهید.",
          expectedColumns: ["firstName", "lastName", "email"],
          hints: [
            "از LEFT JOIN بین students و grades استفاده کنید",
            "از WHERE برای فیلتر NULL استفاده کنید",
            "شرط: WHERE g.id IS NULL",
          ],
          solution:
            "SELECT s.firstName, s.lastName, s.email FROM students s LEFT JOIN grades g ON s.id = g.studentId WHERE g.id IS NULL;",
          explanation:
            "این کوئری با استفاده از LEFT JOIN دانش‌آموزانی را پیدا می‌کند که هیچ نمره‌ای ندارند.",
          difficulty: "intermediate",
          points: 45,
        },
        {
          id: "school_inter_8",
          title: "دروس با معلم",
          description: "لیست دروس را همراه با نام معلم آن‌ها نمایش دهید.",
          expectedColumns: ["courseName", "teacher_name"],
          hints: [
            "از JOIN بین courses و teachers استفاده کنید",
            "از CONCAT برای ترکیب نام و نام خانوادگی استفاده کنید",
            "فرض کنید courses جدول teacherId دارد",
          ],
          solution:
            "SELECT c.courseName, CONCAT(t.firstName, ' ', t.lastName) AS teacher_name FROM courses c JOIN teachers t ON c.teacherId = t.id;",
          explanation:
            "این کوئری دروس را با معلمان آن‌ها ترکیب می‌کند و نام کامل معلم را نمایش می‌دهد.",
          difficulty: "intermediate",
          points: 35,
        },
        {
          id: "school_inter_9",
          title: "تعداد واحدهای ثبت نامی هر دانش‌آموز",
          description:
            "مجموع واحدهای ثبت نام شده توسط هر دانش‌آموز را محاسبه کنید.",
          expectedColumns: ["student_name", "total_credits"],
          hints: [
            "نیاز به JOIN بین students, enrollments و courses دارید",
            "از GROUP BY روی دانش‌آموز استفاده کنید",
            "از SUM برای مجموع واحدها استفاده کنید",
          ],
          solution:
            "SELECT CONCAT(s.firstName, ' ', s.lastName) AS student_name, SUM(c.credits) AS total_credits FROM students s JOIN enrollments e ON s.id = e.studentId JOIN courses c ON e.courseId = c.id GROUP BY s.id, s.firstName, s.lastName;",
          explanation:
            "این کوئری دانش‌آموزان، ثبت نام‌ها و دروس را ترکیب کرده و مجموع واحدها را محاسبه می‌کند.",
          difficulty: "intermediate",
          points: 50,
        },
        {
          id: "school_inter_10",
          title: "آخرین امتحان هر درس",
          description: "آخرین تاریخ امتحان برای هر درس را نمایش دهید.",
          expectedColumns: ["courseName", "last_grade_date"],
          hints: [
            "از JOIN بین courses, enrollments و grades استفاده کنید",
            "از GROUP BY روی درس استفاده کنید",
            "از تابع MAX برای آخرین تاریخ استفاده کنید",
          ],
          solution:
            "SELECT c.courseName, MAX(g.gradeDate) AS last_grade_date FROM courses c JOIN enrollments e ON c.id = e.courseId JOIN grades g ON e.studentId = g.studentId AND e.courseId = g.courseId GROUP BY c.id, c.courseName;",
          explanation:
            "این کوئری پیچیده آخرین تاریخ امتحان هر درس را با ترکیب چندین جدول محاسبه می‌کند.",
          difficulty: "intermediate",
          points: 45,
        },
      ],
      advanced: [
        {
          id: "school_adv_1",
          title: "رتبه‌بندی دانش‌آموزان",
          description:
            "دانش‌آموزان را بر اساس میانگین نمراتشان رتبه‌بندی کنید.",
          expectedColumns: ["firstName", "lastName", "average_score", "rank"],
          hints: [
            "از Window Function استفاده کنید",
            "از RANK() OVER استفاده کنید",
            "ابتدا میانگین نمرات را محاسبه کنید",
          ],
          solution:
            "SELECT firstName, lastName, average_score, RANK() OVER (ORDER BY average_score DESC) AS rank FROM (SELECT s.firstName, s.lastName, AVG(g.score) AS average_score FROM students s JOIN grades g ON s.id = g.studentId GROUP BY s.id, s.firstName, s.lastName);",
          explanation:
            "این کوئری پیچیده ابتدا میانگین نمرات را محاسبه کرده سپس با استفاده از Window Function رتبه‌بندی انجام می‌دهد.",
          difficulty: "advanced",
          points: 70,
        },
        {
          id: "school_adv_2",
          title: "تحلیل عملکرد ترم",
          description:
            "میانگین نمرات هر ماه را همراه با تغییرات نسبت به ماه قبل محاسبه کنید.",
          expectedColumns: [
            "month",
            "year",
            "avg_score",
            "previous_avg",
            "improvement",
          ],
          hints: [
            "از Window Function LAG استفاده کنید",
            "ابتدا میانگین ماهانه را محاسبه کنید",
            "سپس تغییرات نسبت به ماه قبل را بدست آورید",
          ],
          solution:
            "WITH monthly_avg AS (SELECT strftime('%Y-%m', gradeDate) AS month_year, strftime('%m', gradeDate) AS month, strftime('%Y', gradeDate) AS year, AVG(score) AS avg_score FROM grades GROUP BY strftime('%Y-%m', gradeDate)) SELECT month, year, avg_score, LAG(avg_score) OVER (ORDER BY month_year) AS previous_avg, ROUND(avg_score - LAG(avg_score) OVER (ORDER BY month_year), 2) AS improvement FROM monthly_avg;",
          explanation:
            "این کوئری از CTE و Window Function برای تحلیل روند عملکرد ماهانه استفاده می‌کند.",
          difficulty: "advanced",
          points: 80,
        },
        {
          id: "school_adv_3",
          title: "تحلیل توزیع نمرات",
          description:
            "توزیع نمرات را در بازه‌های مختلف (A, B, C, D, F) محاسبه کنید.",
          expectedColumns: ["grade_category", "student_count", "percentage"],
          hints: [
            "از CASE WHEN برای تعریف بازه‌ها استفاده کنید",
            "A: 18-20, B: 15-17, C: 12-14, D: 10-11, F: زیر 10",
            "درصد را بر اساس کل دانش‌آموزان محاسبه کنید",
          ],
          solution:
            "WITH grade_distribution AS (SELECT CASE WHEN score >= 18 THEN 'A' WHEN score >= 15 THEN 'B' WHEN score >= 12 THEN 'C' WHEN score >= 10 THEN 'D' ELSE 'F' END AS grade_category FROM grades), total_count AS (SELECT COUNT(*) AS total FROM grade_distribution) SELECT gd.grade_category, COUNT(*) AS student_count, ROUND((COUNT(*) * 100.0 / tc.total), 2) AS percentage FROM grade_distribution gd CROSS JOIN total_count tc GROUP BY gd.grade_category, tc.total ORDER BY CASE gd.grade_category WHEN 'A' THEN 1 WHEN 'B' THEN 2 WHEN 'C' THEN 3 WHEN 'D' THEN 4 ELSE 5 END;",
          explanation:
            "این کوئری پیچیده از CASE WHEN و CTE برای تحلیل توزیع نمرات استفاده می‌کند.",
          difficulty: "advanced",
          points: 85,
        },
        {
          id: "school_adv_4",
          title: "معلمان پرکار",
          description:
            "معلمانی که بیش از 3 درس تدریس می‌کنند را همراه با بار کاری‌شان نمایش دهید.",
          expectedColumns: [
            "teacher_name",
            "course_count",
            "total_credits",
            "total_students",
          ],
          hints: [
            "نیاز به JOIN بین teachers, courses و enrollments دارید",
            "از GROUP BY روی معلم استفاده کنید",
            "بار کاری = مجموع واحدها + تعداد دانش‌آموزان",
          ],
          solution:
            "SELECT CONCAT(t.firstName, ' ', t.lastName) AS teacher_name, COUNT(DISTINCT c.id) AS course_count, SUM(c.credits) AS total_credits, COUNT(e.studentId) AS total_students FROM teachers t JOIN courses c ON t.id = c.teacherId JOIN enrollments e ON c.id = e.courseId GROUP BY t.id, t.firstName, t.lastName HAVING COUNT(DISTINCT c.id) > 3;",
          explanation:
            "این کوئری تحلیل بار کاری معلمان را با ترکیب چندین جدول انجام می‌دهد.",
          difficulty: "advanced",
          points: 75,
        },
        {
          id: "school_adv_5",
          title: "پیش‌بینی موفقیت دانش‌آموزان",
          description:
            "بر اساس روند نمرات، دانش‌آموزانی که در معرض افت تحصیلی هستند را شناسایی کنید.",
          expectedColumns: [
            "student_name",
            "recent_avg",
            "overall_avg",
            "trend",
          ],
          hints: [
            "میانگین 3 نمره اخیر با میانگین کل را مقایسه کنید",
            "اگر میانگین اخیر 2 نمره کمتر از میانگین کل باشد، در معرض خطر است",
            "از Window Function برای رتبه‌بندی تاریخ‌ها استفاده کنید",
          ],
          solution:
            "WITH recent_grades AS (SELECT studentId, score, ROW_NUMBER() OVER (PARTITION BY studentId ORDER BY gradeDate DESC) AS rn FROM grades), student_stats AS (SELECT s.id, CONCAT(s.firstName, ' ', s.lastName) AS student_name, AVG(CASE WHEN rg.rn <= 3 THEN rg.score END) AS recent_avg, AVG(g.score) AS overall_avg FROM students s JOIN grades g ON s.id = g.studentId JOIN recent_grades rg ON s.id = rg.studentId GROUP BY s.id, s.firstName, s.lastName) SELECT student_name, ROUND(recent_avg, 2) AS recent_avg, ROUND(overall_avg, 2) AS overall_avg, CASE WHEN recent_avg < overall_avg - 2 THEN 'در معرض خطر' WHEN recent_avg > overall_avg + 1 THEN 'رو به بهبود' ELSE 'پایدار' END AS trend FROM student_stats WHERE recent_avg IS NOT NULL;",
          explanation:
            "این کوئری پیشرفته از چندین CTE و Window Function برای تحلیل روند عملکرد دانش‌آموزان استفاده می‌کند.",
          difficulty: "advanced",
          points: 95,
        },
        {
          id: "school_adv_6",
          title: "تحلیل همبستگی دروس",
          description:
            "دروسی که دانش‌آموزان معمولاً با هم ثبت نام می‌کنند را پیدا کنید.",
          expectedColumns: ["course1", "course2", "co_enrollment_count"],
          hints: [
            "نیاز به self join روی enrollments دارید",
            "دروس مختلف توسط یک دانش‌آموز باید پیدا شوند",
            "از COUNT برای شمارش هم‌ثبت نام‌ها استفاده کنید",
          ],
          solution:
            "SELECT c1.courseName AS course1, c2.courseName AS course2, COUNT(*) AS co_enrollment_count FROM enrollments e1 JOIN enrollments e2 ON e1.studentId = e2.studentId AND e1.courseId < e2.courseId JOIN courses c1 ON e1.courseId = c1.id JOIN courses c2 ON e2.courseId = c2.id GROUP BY c1.id, c1.courseName, c2.id, c2.courseName HAVING COUNT(*) > 5 ORDER BY co_enrollment_count DESC;",
          explanation:
            "این کوئری تحلیل الگوهای ثبت نام را برای شناسایی دروس مرتبط انجام می‌دهد.",
          difficulty: "advanced",
          points: 80,
        },
        {
          id: "school_adv_7",
          title: "تحلیل بازده تدریس معلمان",
          description:
            "معلمان را بر اساس میانگین نمرات دانش‌آموزانشان رتبه‌بندی کنید.",
          expectedColumns: [
            "teacher_name",
            "avg_student_score",
            "student_count",
            "efficiency_rank",
          ],
          hints: [
            "نیاز به JOIN بین teachers, courses, enrollments و grades دارید",
            "میانگین نمرات دانش‌آموزان هر معلم را محاسبه کنید",
            "از RANK() برای رتبه‌بندی استفاده کنید",
          ],
          solution:
            "WITH teacher_performance AS (SELECT t.id, CONCAT(t.firstName, ' ', t.lastName) AS teacher_name, AVG(g.score) AS avg_student_score, COUNT(DISTINCT e.studentId) AS student_count FROM teachers t JOIN courses c ON t.id = c.teacherId JOIN enrollments e ON c.id = e.courseId JOIN grades g ON e.studentId = g.studentId AND e.courseId = g.courseId GROUP BY t.id, t.firstName, t.lastName) SELECT teacher_name, ROUND(avg_student_score, 2) AS avg_student_score, student_count, RANK() OVER (ORDER BY avg_student_score DESC) AS efficiency_rank FROM teacher_performance ORDER BY avg_student_score DESC;",
          explanation:
            "این کوئری عملکرد تدریس معلمان را بر اساس موفقیت دانش‌آموزانشان ارزیابی می‌کند.",
          difficulty: "advanced",
          points: 90,
        },
        {
          id: "school_adv_8",
          title: "تحلیل ظرفیت کلاس‌ها",
          description:
            "بهینه‌سازی تخصیص دانش‌آموز به کلاس‌ها بر اساس محبوبیت دروس.",
          expectedColumns: [
            "courseName",
            "current_students",
            "optimal_capacity",
            "capacity_utilization",
          ],
          hints: [
            "ظرفیت بهینه = میانگین ثبت نام × 1.2",
            "درصد استفاده = تعداد فعلی / ظرفیت بهینه × 100",
            "دروس با استفاده بالای 90% نیاز به ظرفیت بیشتر دارند",
          ],
          solution:
            "WITH course_stats AS (SELECT c.courseName, COUNT(e.studentId) AS current_students, AVG(COUNT(e.studentId)) OVER () AS avg_enrollment FROM courses c LEFT JOIN enrollments e ON c.id = e.courseId GROUP BY c.id, c.courseName) SELECT courseName, current_students, ROUND(avg_enrollment * 1.2) AS optimal_capacity, ROUND((current_students * 100.0 / (avg_enrollment * 1.2)), 2) AS capacity_utilization FROM course_stats ORDER BY capacity_utilization DESC;",
          explanation:
            "این کوئری تحلیل ظرفیت را برای بهینه‌سازی منابع آموزشی انجام می‌دهد.",
          difficulty: "advanced",
          points: 85,
        },
        {
          id: "school_adv_9",
          title: "شناسایی استعدادهای برتر",
          description:
            "دانش‌آموزانی که در چندین زمینه عملکرد فوق‌العاده دارند را شناسایی کنید.",
          expectedColumns: [
            "student_name",
            "top_subjects",
            "overall_avg",
            "consistency_score",
          ],
          hints: [
            "استعداد برتر = میانگین بالای 18 در حداقل 3 درس",
            "پایداری = انحراف معیار نمرات کم",
            "از Window Function برای محاسبه‌های آماری استفاده کنید",
          ],
          solution:
            "WITH student_performance AS (SELECT s.id, CONCAT(s.firstName, ' ', s.lastName) AS student_name, c.courseName, AVG(g.score) AS course_avg FROM students s JOIN enrollments e ON s.id = e.studentId JOIN courses c ON e.courseId = c.id JOIN grades g ON s.id = g.studentId AND e.courseId = g.courseId GROUP BY s.id, s.firstName, s.lastName, c.id, c.courseName), top_performers AS (SELECT student_name, COUNT(*) AS top_subjects, AVG(course_avg) AS overall_avg, ROUND(SQRT(AVG((course_avg - AVG(course_avg) OVER (PARTITION BY student_name)) * (course_avg - AVG(course_avg) OVER (PARTITION BY student_name)))), 2) AS consistency_score FROM student_performance WHERE course_avg >= 18 GROUP BY student_name HAVING COUNT(*) >= 3) SELECT * FROM top_performers ORDER BY overall_avg DESC, consistency_score ASC;",
          explanation:
            "این کوئری پیچیده دانش‌آموزان برتر را بر اساس معیارهای چندگانه شناسایی می‌کند.",
          difficulty: "advanced",
          points: 100,
        },
        {
          id: "school_adv_10",
          title: "تحلیل اثربخشی برنامه درسی",
          description:
            "ارزیابی موثر بودن ترتیب ارائه دروس بر اساس عملکرد دانش‌آموزان.",
          expectedColumns: [
            "course_sequence",
            "avg_improvement",
            "success_rate",
          ],
          hints: [
            "دروس پیش‌نیاز را با دروس بعدی مقایسه کنید",
            "بهبود = نمره درس بعدی - نمره درس پیش‌نیاز",
            "نرخ موفقیت = درصد دانش‌آموزان با بهبود مثبت",
          ],
          solution:
            "WITH course_progression AS (SELECT e1.studentId, c1.courseName AS prereq_course, c2.courseName AS next_course, AVG(g1.score) AS prereq_avg, AVG(g2.score) AS next_avg FROM enrollments e1 JOIN enrollments e2 ON e1.studentId = e2.studentId JOIN courses c1 ON e1.courseId = c1.id JOIN courses c2 ON e2.courseId = c2.id JOIN grades g1 ON e1.studentId = g1.studentId AND e1.courseId = g1.courseId JOIN grades g2 ON e2.studentId = g2.studentId AND e2.courseId = g2.courseId WHERE c1.credits < c2.credits GROUP BY e1.studentId, c1.id, c1.courseName, c2.id, c2.courseName), sequence_analysis AS (SELECT CONCAT(prereq_course, ' → ', next_course) AS course_sequence, AVG(next_avg - prereq_avg) AS avg_improvement, COUNT(CASE WHEN next_avg > prereq_avg THEN 1 END) * 100.0 / COUNT(*) AS success_rate FROM course_progression GROUP BY prereq_course, next_course) SELECT course_sequence, ROUND(avg_improvement, 2) AS avg_improvement, ROUND(success_rate, 2) AS success_rate FROM sequence_analysis WHERE success_rate > 60 ORDER BY avg_improvement DESC;",
          explanation:
            "این کوئری پیشرفته اثربخشی ترتیب دروس را برای بهبود برنامه درسی تحلیل می‌کند.",
          difficulty: "advanced",
          points: 100,
        },
      ],
    },
  },
  library: {
    name: "سیستم مدیریت کتابخانه",
    description: "مدیریت کتاب‌ها، نویسندگان، اعضا و امانات",
    tables: [
      "books",
      "authors",
      "members",
      "loans",
      "publishers",
      "book_authors",
    ],
    questions: {
      beginner: [
        {
          id: "lib_basic_1",
          title: "لیست همه کتاب‌ها",
          description: "تمام کتاب‌های موجود در کتابخانه را نمایش دهید.",
          expectedColumns: ["id", "title", "isbn", "publishDate"],
          hints: ["از جدول books استفاده کنید", "از SELECT * استفاده کنید"],
          solution: "SELECT * FROM books;",
          explanation:
            "این کوئری تمام کتاب‌های ثبت شده در سیستم کتابخانه را نمایش می‌دهد.",
          difficulty: "beginner",
          points: 10,
        },
        {
          id: "lib_basic_2",
          title: "اعضای کتابخانه",
          description: "لیست همه اعضای کتابخانه را نمایش دهید.",
          expectedColumns: ["firstName", "lastName", "email"],
          hints: [
            "از جدول members استفاده کنید",
            "فقط نام، نام خانوادگی و ایمیل را انتخاب کنید",
          ],
          solution: "SELECT firstName, lastName, email FROM members;",
          explanation:
            "این کوئری اطلاعات اساسی اعضای کتابخانه را نمایش می‌دهد.",
          difficulty: "beginner",
          points: 10,
        },
        {
          id: "lib_basic_3",
          title: "کتاب‌های قدیمی",
          description:
            "کتاب‌هایی که قبل از سال 2000 منتشر شده‌اند را نمایش دهید.",
          expectedColumns: ["title", "publishDate"],
          hints: [
            "از جدول books استفاده کنید",
            "شرط WHERE برای سال انتشار قبل از 2000 اضافه کنید",
          ],
          solution:
            "SELECT title, publishDate FROM books WHERE strftime('%Y', publishDate) < '2000';",
          explanation:
            "این کوئری کتاب‌های کلاسیک و قدیمی کتابخانه را فیلتر می‌کند.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "lib_basic_4",
          title: "تعداد کتاب‌ها",
          description: "تعداد کل کتاب‌های موجود در کتابخانه را محاسبه کنید.",
          expectedColumns: ["total_books"],
          hints: [
            "از تابع COUNT استفاده کنید",
            "از AS برای نام‌گذاری ستون استفاده کنید",
          ],
          solution: "SELECT COUNT(*) AS total_books FROM books;",
          explanation:
            "این کوئری تعداد کل کتاب‌های موجود در مجموعه کتابخانه را محاسبه می‌کند.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "lib_basic_5",
          title: "کتاب‌های جدید",
          description:
            "کتاب‌هایی که بعد از سال 2010 منتشر شده‌اند را به ترتیب سال نمایش دهید.",
          expectedColumns: ["title", "publishDate"],
          hints: [
            "شرط WHERE برای سال انتشار بعد از 2010 اضافه کنید",
            "از ORDER BY برای مرتب‌سازی استفاده کنید",
          ],
          solution:
            "SELECT title, publishDate FROM books WHERE strftime('%Y', publishDate) > '2010' ORDER BY publishDate;",
          explanation:
            "این کوئری کتاب‌های جدید را فیلتر کرده و بر اساس سال انتشار مرتب می‌کند.",
          difficulty: "beginner",
          points: 20,
        },
        {
          id: "lib_basic_6",
          title: "اعضای با ایمیل خاص",
          description: "اعضایی که ایمیل آن‌ها شامل 'gmail' است را نمایش دهید.",
          expectedColumns: ["firstName", "lastName", "email"],
          hints: [
            "از عملگر LIKE استفاده کنید",
            "برای جست‌وجو در رشته از % استفاده کنید",
          ],
          solution:
            "SELECT firstName, lastName, email FROM members WHERE email LIKE '%gmail%';",
          explanation:
            "این کوئری اعضایی را پیدا می‌کند که از سرویس Gmail استفاده می‌کنند.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "lib_basic_7",
          title: "امانت‌های فعال",
          description: "امانت‌هایی که هنوز برگردانده نشده‌اند را نمایش دهید.",
          expectedColumns: ["loanDate", "dueDate"],
          hints: [
            "از جدول loans استفاده کنید",
            "شرط WHERE برای status = 'active' اضافه کنید",
          ],
          solution:
            "SELECT loanDate, dueDate FROM loans WHERE status = 'active';",
          explanation: "این کوئری امانت‌های فعال کتابخانه را نمایش می‌دهد.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "lib_basic_8",
          title: "کتاب‌های با ISBN",
          description: "کتاب‌هایی که ISBN آن‌ها شامل '978' است را نمایش دهید.",
          expectedColumns: ["title", "isbn"],
          hints: [
            "از عملگر LIKE برای جست‌وجو در ISBN استفاده کنید",
            "978 معمولاً در ابتدای ISBN کتاب‌های جدید است",
          ],
          solution: "SELECT title, isbn FROM books WHERE isbn LIKE '978%';",
          explanation:
            "این کوئری کتاب‌هایی را پیدا می‌کند که دارای ISBN استاندارد جدید هستند.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "lib_basic_9",
          title: "امانت‌های اخیر",
          description: "امانت‌هایی که در سال جاری انجام شده‌اند را نمایش دهید.",
          expectedColumns: ["loanDate"],
          hints: [
            "از تابع strftime برای استخراج سال استفاده کنید",
            "سال جاری را با 'now' بدست آورید",
          ],
          solution:
            "SELECT loanDate FROM loans WHERE strftime('%Y', loanDate) = strftime('%Y', 'now');",
          explanation:
            "این کوئری امانت‌های انجام شده در سال جاری را فیلتر می‌کند.",
          difficulty: "beginner",
          points: 20,
        },
        {
          id: "lib_basic_10",
          title: "کتاب‌های دهه 90",
          description:
            "کتاب‌هایی که بین سال‌های 1990 تا 1999 منتشر شده‌اند را نمایش دهید.",
          expectedColumns: ["title", "publishDate"],
          hints: [
            "از عملگر BETWEEN و strftime برای استخراج سال استفاده کنید",
            "بازه 1990 تا 1999 را تعریف کنید",
          ],
          solution:
            "SELECT title, publishDate FROM books WHERE strftime('%Y', publishDate) BETWEEN '1990' AND '1999';",
          explanation:
            "این کوئری کتاب‌های منتشر شده در دهه 1990 را با استفاده از BETWEEN فیلتر می‌کند.",
          difficulty: "beginner",
          points: 20,
        },
      ],
      intermediate: [
        {
          id: "lib_inter_1",
          title: "کتاب‌های قرض داده شده",
          description:
            "کتاب‌هایی که در حال حاضر قرض داده شده‌اند را نمایش دهید.",
          expectedColumns: ["title", "member_name", "loan_date"],
          hints: [
            "نیاز به JOIN بین books, loans و members دارید",
            "شرط WHERE برای وضعیت returned استفاده کنید",
          ],
          solution:
            "SELECT b.title, CONCAT(m.firstName, ' ', m.lastName) AS member_name, l.loanDate AS loan_date FROM books b JOIN loans l ON b.id = l.bookId JOIN members m ON l.memberId = m.id WHERE l.status = 'active';",
          explanation:
            "این کوئری کتاب‌هایی را نمایش می‌دهد که هنوز برگردانده نشده‌اند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "intermediate",
          points: 40,
        },
        {
          id: "lib_inter_2",
          title: "اعضای پرامانت",
          description: "اعضایی که بیش از 5 کتاب قرض گرفته‌اند را نمایش دهید.",
          expectedColumns: ["member_name", "loan_count"],
          hints: [
            "از JOIN بین members و loans استفاده کنید",
            "از GROUP BY روی عضو استفاده کنید",
            "از HAVING برای فیلتر تعداد استفاده کنید",
          ],
          solution:
            "SELECT CONCAT(m.firstName, ' ', m.lastName) AS member_name, COUNT(l.id) AS loan_count FROM members m JOIN loans l ON m.id = l.memberId GROUP BY m.id, m.firstName, m.lastName HAVING COUNT(l.id) > 5;",
          explanation:
            "این کوئری اعضای فعال کتابخانه را بر اساس تعداد امانت‌هایشان شناسایی می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "intermediate",
          points: 45,
        },
        {
          id: "lib_inter_3",
          title: "کتاب‌های محبوب",
          description:
            "کتاب‌هایی که بیش از 3 بار قرض داده شده‌اند را نمایش دهید.",
          expectedColumns: ["title", "loan_count"],
          hints: [
            "از JOIN بین books و loans استفاده کنید",
            "از GROUP BY روی کتاب استفاده کنید",
            "از HAVING برای فیلتر تعداد استفاده کنید",
          ],
          solution:
            "SELECT b.title, COUNT(l.id) AS loan_count FROM books b JOIN loans l ON b.id = l.bookId GROUP BY b.id, b.title HAVING COUNT(l.id) > 3 ORDER BY loan_count DESC;",
          explanation:
            "این کوئری کتاب‌های پرطرفدار کتابخانه را بر اساس تعداد امانت شناسایی می‌کند.",
          difficulty: "intermediate",
          points: 40,
        },
        {
          id: "lib_inter_4",
          title: "اعضای بدون امانت",
          description: "اعضایی که هیچ کتابی قرض نگرفته‌اند را نمایش دهید.",
          expectedColumns: ["firstName", "lastName", "email"],
          hints: [
            "از LEFT JOIN بین members و loans استفاده کنید",
            "از WHERE برای فیلتر NULL استفاده کنید",
            "شرط: WHERE l.id IS NULL",
          ],
          solution:
            "SELECT m.firstName, m.lastName, m.email FROM members m LEFT JOIN loans l ON m.id = l.memberId WHERE l.id IS NULL;",
          explanation:
            "این کوئری اعضایی را پیدا می‌کند که هنوز از خدمات امانت استفاده نکرده‌اند.",
          difficulty: "intermediate",
          points: 45,
        },
        {
          id: "lib_inter_5",
          title: "میانگین سال انتشار کتاب‌ها",
          description: "میانگین سال انتشار کتاب‌های هر نویسنده را محاسبه کنید.",
          expectedColumns: ["author_name", "avg_publish_year"],
          hints: [
            "نیاز به JOIN بین authors, book_authors و books دارید",
            "از GROUP BY روی نویسنده استفاده کنید",
            "از تابع AVG و strftime برای استخراج سال استفاده کنید",
          ],
          solution:
            "SELECT CONCAT(a.firstName, ' ', a.lastName) AS author_name, AVG(strftime('%Y', b.publishDate)) AS avg_publish_year FROM authors a JOIN book_authors ba ON a.id = ba.authorId JOIN books b ON ba.bookId = b.id GROUP BY a.id, a.firstName, a.lastName;",
          explanation:
            "این کوئری میانگین دوره فعالیت هر نویسنده را بر اساس کتاب‌هایش محاسبه می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "intermediate",
          points: 35,
        },
        {
          id: "lib_inter_6",
          title: "امانت‌های معوقه",
          description:
            "امانت‌هایی که از تاریخ سررسیدشان گذشته است را نمایش دهید.",
          expectedColumns: ["title", "member_name", "due_date", "days_overdue"],
          hints: [
            "نیاز به JOIN بین books, loans و members دارید",
            "شرط WHERE برای dueDate < 'now' اضافه کنید",
            "روزهای تأخیر را با تفاضل تاریخ‌ها محاسبه کنید",
          ],
          solution:
            "SELECT b.title, CONCAT(m.firstName, ' ', m.lastName) AS member_name, l.dueDate AS due_date, julianday('now') - julianday(l.dueDate) AS days_overdue FROM books b JOIN loans l ON b.id = l.bookId JOIN members m ON l.memberId = m.id WHERE l.status = 'active' AND l.dueDate < date('now');",
          explanation:
            "این کوئری امانت‌های معوقه را شناسایی کرده و تعداد روزهای تأخیر را محاسبه می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "intermediate",
          points: 50,
        },
        {
          id: "lib_inter_7",
          title: "آخرین امانت هر عضو",
          description: "آخرین کتابی که هر عضو قرض گرفته است را نمایش دهید.",
          expectedColumns: ["member_name", "last_book", "last_loan_date"],
          hints: [
            "از JOIN بین members, loans و books استفاده کنید",
            "از GROUP BY روی عضو استفاده کنید",
            "از تابع MAX برای آخرین تاریخ استفاده کنید",
          ],
          solution:
            "WITH ranked_loans AS (SELECT l.*, b.title, ROW_NUMBER() OVER(PARTITION BY l.memberId ORDER BY l.loanDate DESC) as rn FROM loans l JOIN books b ON l.bookId = b.id) SELECT m.firstName || ' ' || m.lastName AS member_name, rl.title AS last_book, rl.loanDate AS last_loan_date FROM members m JOIN ranked_loans rl ON m.id = rl.memberId WHERE rl.rn = 1;",
          explanation:
            "این کوئری آخرین فعالیت امانت هر عضو را ردیابی می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "intermediate",
          points: 45,
        },
        {
          id: "lib_inter_8",
          title: "تعداد کتاب‌های هر نویسنده",
          description: "تعداد کتاب‌های موجود از هر نویسنده را محاسبه کنید.",
          expectedColumns: ["author_name", "book_count"],
          hints: [
            "نیاز به JOIN بین authors, book_authors و books دارید",
            "از GROUP BY روی نویسنده استفاده کنید",
            "از COUNT برای شمارش استفاده کنید",
          ],
          solution:
            "SELECT CONCAT(a.firstName, ' ', a.lastName) AS author_name, COUNT(b.id) AS book_count FROM authors a LEFT JOIN book_authors ba ON a.id = ba.authorId LEFT JOIN books b ON ba.bookId = b.id GROUP BY a.id, a.firstName, a.lastName ORDER BY book_count DESC;",
          explanation:
            "این کوئری تولیدات هر نویسنده را در کتابخانه شمارش می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "intermediate",
          points: 35,
        },
        {
          id: "lib_inter_9",
          title: "امانت‌های طولانی مدت",
          description:
            "امانت‌هایی که بیش از 30 روز طول کشیده‌اند را نمایش دهید.",
          expectedColumns: ["title", "member_name", "loan_duration"],
          hints: [
            "مدت امانت = تاریخ برگشت - تاریخ امانت",
            "برای امانت‌های فعال از تاریخ فعلی استفاده کنید",
            "از CASE WHEN برای تشخیص وضعیت امانت استفاده کنید",
          ],
          solution:
            "SELECT b.title, CONCAT(m.firstName, ' ', m.lastName) AS member_name, CASE WHEN l.returnDate IS NOT NULL THEN julianday(l.returnDate) - julianday(l.loanDate) ELSE julianday('now') - julianday(l.loanDate) END AS loan_duration FROM books b JOIN loans l ON b.id = l.bookId JOIN members m ON l.memberId = m.id WHERE (CASE WHEN l.returnDate IS NOT NULL THEN julianday(l.returnDate) - julianday(l.loanDate) ELSE julianday('now') - julianday(l.loanDate) END) > 30;",
          explanation:
            "این کوئری امانت‌های طولانی مدت را برای بررسی الگوهای استفاده شناسایی می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "intermediate",
          points: 55,
        },
        {
          id: "lib_inter_10",
          title: "نویسندگان پربازده",
          description:
            "نویسندگانی که کتاب‌هایشان بیش از 10 بار قرض داده شده است را نمایش دهید.",
          expectedColumns: ["author_name", "total_loans"],
          hints: [
            "نیاز به JOIN بین authors, book_authors, books و loans دارید",
            "از GROUP BY روی نویسنده استفاده کنید",
            "از HAVING برای فیلتر تعداد امانت استفاده کنید",
          ],
          solution:
            "SELECT CONCAT(a.firstName, ' ', a.lastName) AS author_name, COUNT(l.id) AS total_loans FROM authors a JOIN book_authors ba ON a.id = ba.authorId JOIN books b ON ba.bookId = b.id JOIN loans l ON b.id = l.bookId GROUP BY a.id, a.firstName, a.lastName HAVING COUNT(l.id) > 10 ORDER BY total_loans DESC;",
          explanation:
            "این کوئری نویسندگان محبوب را بر اساس تعداد امانت کتاب‌هایشان شناسایی می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "intermediate",
          points: 50,
        },
      ],
      advanced: [
        {
          id: "lib_adv_1",
          title: "آمار امانت ماهانه",
          description: "تعداد امانت‌های داده شده در هر ماه را محاسبه کنید.",
          expectedColumns: ["month", "year", "loan_count"],
          hints: [
            "از توابع تاریخ استفاده کنید",
            "از GROUP BY روی ماه و سال استفاده کنید",
          ],
          solution:
            "SELECT strftime('%m', loanDate) AS month, strftime('%Y', loanDate) AS year, COUNT(*) AS loan_count FROM loans GROUP BY strftime('%Y', loanDate), strftime('%m', loanDate) ORDER BY year, month;",
          explanation:
            "این کوئری آمار ماهانه امانت‌ها را با استفاده از توابع تاریخ SQLite محاسبه می‌کند.",
          difficulty: "advanced",
          points: 55,
        },
        {
          id: "lib_adv_2",
          title: "تحلیل روند امانت",
          description:
            "درصد تغییر تعداد امانت‌ها در هر ماه نسبت به ماه قبل را محاسبه کنید.",
          expectedColumns: [
            "month",
            "year",
            "current_loans",
            "previous_loans",
            "growth_rate",
          ],
          hints: [
            "از Window Function LAG استفاده کنید",
            "ابتدا تعداد امانت ماهانه را محاسبه کنید",
            "سپس تغییرات نسبت به ماه قبل را بدست آورید",
          ],
          solution:
            "WITH monthly_loans AS (SELECT strftime('%Y-%m', loanDate) AS month_year, strftime('%m', loanDate) AS month, strftime('%Y', loanDate) AS year, COUNT(*) AS loan_count FROM loans GROUP BY strftime('%Y-%m', loanDate)) SELECT month, year, loan_count AS current_loans, LAG(loan_count, 1, 0) OVER (ORDER BY month_year) AS previous_loans, ROUND(((loan_count - LAG(loan_count, 1, 0) OVER (ORDER BY month_year)) * 100.0 / LAG(loan_count, 1, 0) OVER (ORDER BY month_year)), 2) AS growth_rate FROM monthly_loans;",
          explanation:
            "این کوئری از CTE و Window Function برای تحلیل روند رشد امانت‌ها استفاده می‌کند.",
          difficulty: "advanced",
          points: 75,
        },
        {
          id: "lib_adv_3",
          title: "تحلیل الگوی خواندن اعضا",
          description: "الگوی خواندن اعضا را بر اساس ژانر کتاب‌ها تحلیل کنید.",
          expectedColumns: [
            "member_name",
            "favorite_genre",
            "genre_percentage",
          ],
          hints: [
            "فرض کنید جدول books ستون genre دارد",
            "برای هر عضو، ژانر محبوبش را پیدا کنید",
            "درصد علاقه به هر ژانر را محاسبه کنید",
          ],
          solution:
            "WITH member_genre_stats AS (SELECT m.id, CONCAT(m.firstName, ' ', m.lastName) AS member_name, b.genre, COUNT(*) AS genre_count FROM members m JOIN loans l ON m.id = l.memberId JOIN books b ON l.bookId = b.id GROUP BY m.id, m.firstName, m.lastName, b.genre), member_totals AS (SELECT id, member_name, SUM(genre_count) AS total_loans FROM member_genre_stats GROUP BY id, member_name), top_genres AS (SELECT mgs.id, mgs.member_name, mgs.genre AS favorite_genre, mgs.genre_count, mt.total_loans, ROW_NUMBER() OVER (PARTITION BY mgs.id ORDER BY mgs.genre_count DESC) AS rn FROM member_genre_stats mgs JOIN member_totals mt ON mgs.id = mt.id) SELECT member_name, favorite_genre, ROUND((genre_count * 100.0 / total_loans), 2) AS genre_percentage FROM top_genres WHERE rn = 1 AND total_loans > 3 ORDER BY genre_percentage DESC;",
          explanation:
            "این کوئری پیچیده الگوهای مطالعه اعضا را تحلیل کرده و ژانر مورد علاقه هر عضو را شناسایی می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "advanced",
          points: 90,
        },
        {
          id: "lib_adv_4",
          title: "شناسایی کتاب‌های کمتر استفاده",
          description:
            "کتاب‌هایی که کمتر از میانگین امانت شده‌اند و نیاز به تبلیغ دارند را شناسایی کنید.",
          expectedColumns: [
            "title",
            "author_name",
            "loan_count",
            "avg_loans",
            "underperformance",
          ],
          hints: [
            "میانگین امانت همه کتاب‌ها را محاسبه کنید",
            "کتاب‌هایی که زیر میانگین هستند را پیدا کنید",
            "میزان کمبود امانت را محاسبه کنید",
          ],
          solution:
            "WITH book_loan_stats AS (SELECT b.id, b.title, CONCAT(a.firstName, ' ', a.lastName) AS author_name, COUNT(l.id) AS loan_count FROM books b LEFT JOIN loans l ON b.id = l.bookId LEFT JOIN book_authors ba ON b.id = ba.bookId LEFT JOIN authors a ON ba.authorId = a.id GROUP BY b.id, b.title, a.firstName, a.lastName), avg_stats AS (SELECT AVG(loan_count) AS avg_loans FROM book_loan_stats) SELECT bls.title, bls.author_name, bls.loan_count, ROUND(avgs.avg_loans, 2) AS avg_loans, ROUND((avgs.avg_loans - bls.loan_count), 2) AS underperformance FROM book_loan_stats bls CROSS JOIN avg_stats avgs WHERE bls.loan_count < avgs.avg_loans ORDER BY underperformance DESC;",
          explanation:
            "این کوئری کتاب‌های کمتر استفاده شده را برای برنامه‌ریزی تبلیغات شناسایی می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "advanced",
          points: 80,
        },
        {
          id: "lib_adv_5",
          title: "تحلیل زمان‌بندی بازگشت",
          description:
            "الگوی بازگشت کتاب‌ها را تحلیل کرده و میانگین مدت نگهداری برای هر ژانر محاسبه کنید.",
          expectedColumns: [
            "genre",
            "avg_loan_duration",
            "on_time_percentage",
            "late_percentage",
          ],
          hints: [
            "مدت امانت = تاریخ برگشت - تاریخ امانت",
            "به موقع = برگشت قبل از سررسید",
            "دیر = برگشت بعد از سررسید",
          ],
          solution:
            "WITH loan_analysis AS (SELECT b.genre, julianday(l.returnDate) - julianday(l.loanDate) AS loan_duration, CASE WHEN l.returnDate <= l.dueDate THEN 1 ELSE 0 END AS on_time FROM loans l JOIN books b ON l.bookId = b.id WHERE l.returnDate IS NOT NULL) SELECT genre, ROUND(AVG(loan_duration), 2) AS avg_loan_duration, ROUND((SUM(on_time) * 100.0 / COUNT(*)), 2) AS on_time_percentage, ROUND(((COUNT(*) - SUM(on_time)) * 100.0 / COUNT(*)), 2) AS late_percentage FROM loan_analysis GROUP BY genre ORDER BY avg_loan_duration DESC;",
          explanation:
            "این کوئری الگوهای بازگشت کتاب را بر اساس ژانر تحلیل می‌کند.",
          difficulty: "advanced",
          points: 85,
        },
        {
          id: "lib_adv_6",
          title: "پیش‌بینی تقاضای کتاب",
          description:
            "بر اساس روند امانت، کتاب‌هایی که در ماه آینده تقاضای بالایی خواهند داشت را پیش‌بینی کنید.",
          expectedColumns: [
            "title",
            "recent_trend",
            "predicted_demand",
            "recommendation",
          ],
          hints: [
            "روند اخیر = امانت 3 ماه اخیر / امانت 3 ماه قبل از آن",
            "تقاضای پیش‌بینی شده = آخرین ماه × روند",
            "توصیه = اگر روند بالا باشد، تهیه نسخه بیشتر",
          ],
          solution:
            "WITH monthly_book_loans AS (SELECT b.id, b.title, strftime('%Y-%m', l.loanDate) AS month, COUNT(*) AS monthly_loans FROM books b JOIN loans l ON b.id = l.bookId GROUP BY b.id, b.title, strftime('%Y-%m', l.loanDate)), recent_trends AS (SELECT id, title, AVG(CASE WHEN month >= date('now', '-3 months', 'start of month') THEN monthly_loans END) AS recent_avg, AVG(CASE WHEN month < date('now', '-3 months', 'start of month') AND month >= date('now', '-6 months', 'start of month') THEN monthly_loans END) AS previous_avg FROM monthly_book_loans GROUP BY id, title), trend_analysis AS (SELECT title, COALESCE(recent_avg, 0) AS recent_trend, COALESCE(recent_avg / NULLIF(previous_avg, 0), 1) AS growth_factor FROM recent_trends WHERE recent_avg > 0) SELECT title, ROUND(recent_trend, 2) AS recent_trend, ROUND(recent_trend * growth_factor, 2) AS predicted_demand, CASE WHEN growth_factor > 1.5 THEN 'تهیه نسخه اضافی' WHEN growth_factor > 1.2 THEN 'نظارت دقیق' ELSE 'وضعیت عادی' END AS recommendation FROM trend_analysis WHERE recent_trend > 1 ORDER BY predicted_demand DESC LIMIT 10;",
          explanation:
            "این کوئری پیشرفته تقاضای آتی کتاب‌ها را بر اساس روندهای گذشته پیش‌بینی می‌کند.",
          difficulty: "advanced",
          points: 95,
        },
        {
          id: "lib_adv_7",
          title: "تحلیل شبکه اجتماعی خوانندگان",
          description:
            "اعضایی که سلیقه مشابه در انتخاب کتاب دارند را شناسایی کنید.",
          expectedColumns: [
            "member1",
            "member2",
            "shared_books",
            "similarity_score",
          ],
          hints: [
            "کتاب‌های مشترک بین اعضا را پیدا کنید",
            "امتیاز شباهت = کتاب‌های مشترک / کل کتاب‌های خوانده شده",
            "فقط جفت‌هایی با بیش از 3 کتاب مشترک را نمایش دهید",
          ],
          solution:
            "WITH member_books AS (SELECT DISTINCT m.id AS member_id, CONCAT(m.firstName, ' ', m.lastName) AS member_name, l.bookId FROM members m JOIN loans l ON m.id = l.memberId), member_pairs AS (SELECT mb1.member_id AS member1_id, mb1.member_name AS member1, mb2.member_id AS member2_id, mb2.member_name AS member2, COUNT(*) AS shared_books FROM member_books mb1 JOIN member_books mb2 ON mb1.bookId = mb2.bookId AND mb1.member_id < mb2.member_id GROUP BY mb1.member_id, mb1.member_name, mb2.member_id, mb2.member_name), member_totals AS (SELECT member_id, COUNT(*) AS total_books FROM member_books GROUP BY member_id) SELECT mp.member1, mp.member2, mp.shared_books, ROUND((mp.shared_books * 2.0 / (mt1.total_books + mt2.total_books)) * 100, 2) AS similarity_score FROM member_pairs mp JOIN member_totals mt1 ON mp.member1_id = mt1.member_id JOIN member_totals mt2 ON mp.member2_id = mt2.member_id WHERE mp.shared_books >= 3 ORDER BY similarity_score DESC, shared_books DESC;",
          explanation:
            "این کوئری پیچیده شبکه اجتماعی خوانندگان را تحلیل کرده و اعضای هم‌سلیقه را شناسایی می‌کند.",
          difficulty: "advanced",
          points: 100,
        },
        {
          id: "lib_adv_8",
          title: "بهینه‌سازی موجودی کتابخانه",
          description:
            "استراتژی خرید کتاب جدید را بر اساس تحلیل شکاف در مجموعه موجود ارائه دهید.",
          expectedColumns: [
            "missing_genre",
            "demand_gap",
            "recommended_books",
            "priority_level",
          ],
          hints: [
            "ژانرهایی که کم هستند را شناسایی کنید",
            "شکاف تقاضا = تقاضا - عرضه موجود",
            "اولویت بر اساس میزان شکاف تعیین شود",
          ],
          solution:
            "WITH genre_demand AS (SELECT b.genre, COUNT(l.id) AS total_demand FROM books b JOIN loans l ON b.id = l.bookId WHERE l.loanDate >= date('now', '-1 year') GROUP BY b.genre), genre_supply AS (SELECT genre, COUNT(*) AS available_books FROM books GROUP BY genre), demand_gap_analysis AS (SELECT COALESCE(gd.genre, gs.genre) AS genre, COALESCE(gd.total_demand, 0) AS demand, COALESCE(gs.available_books, 0) AS supply, COALESCE(gd.total_demand, 0) - COALESCE(gs.available_books, 0) AS demand_gap FROM genre_demand gd FULL OUTER JOIN genre_supply gs ON gd.genre = gs.genre) SELECT genre AS missing_genre, demand_gap, CASE WHEN demand_gap > 20 THEN 10 WHEN demand_gap > 10 THEN 5 WHEN demand_gap > 5 THEN 3 ELSE 1 END AS recommended_books, CASE WHEN demand_gap > 20 THEN 'بسیار بالا' WHEN demand_gap > 10 THEN 'بالا' WHEN demand_gap > 5 THEN 'متوسط' ELSE 'پایین' END AS priority_level FROM demand_gap_analysis WHERE demand_gap > 0 ORDER BY demand_gap DESC;",
          explanation:
            "این کوئری استراتژی تکمیل مجموعه کتابخانه را بر اساس تحلیل عرضه و تقاضا ارائه می‌دهد.",
          difficulty: "advanced",
          points: 90,
        },
        {
          id: "lib_adv_9",
          title: "تحلیل چرخه حیات کتاب",
          description:
            "مراحل مختلف محبوبیت کتاب‌ها را از ابتدای ورود تا کاهش تقاضا تحلیل کنید.",
          expectedColumns: [
            "title",
            "lifecycle_stage",
            "months_since_acquisition",
            "current_demand",
            "trend",
          ],
          hints: [
            "مرحله چرخه حیات = بر اساس الگوی امانت در طول زمان",
            "رشد = امانت در حال افزایش",
            "بلوغ = امانت پایدار",
            "کاهش = امانت در حال کاهش",
          ],
          solution:
            "WITH book_timeline AS (SELECT b.id, b.title, b.publishDate as acquisitionDate, COUNT(l.id) AS total_loans, AVG(CASE WHEN l.loanDate >= date('now', '-3 months') THEN 1 ELSE 0 END) * COUNT(l.id) AS recent_activity, AVG(CASE WHEN l.loanDate >= date('now', '-6 months') AND l.loanDate < date('now', '-3 months') THEN 1 ELSE 0 END) * COUNT(l.id) AS previous_activity FROM books b LEFT JOIN loans l ON b.id = l.bookId GROUP BY b.id, b.title, b.publishDate), lifecycle_analysis AS (SELECT title, ROUND((julianday('now') - julianday(acquisitionDate)) / 30.0, 1) AS months_since_acquisition, total_loans AS current_demand, CASE WHEN recent_activity > previous_activity * 1.2 THEN 'رشد' WHEN recent_activity >= previous_activity * 0.8 THEN 'بلوغ' WHEN recent_activity > 0 THEN 'کاهش' ELSE 'خواب' END AS lifecycle_stage, CASE WHEN recent_activity > previous_activity THEN 'صعودی' WHEN recent_activity < previous_activity THEN 'نزولی' ELSE 'ثابت' END AS trend FROM book_timeline WHERE months_since_acquisition > 3) SELECT title, lifecycle_stage, months_since_acquisition, current_demand, trend FROM lifecycle_analysis ORDER BY CASE lifecycle_stage WHEN 'رشد' THEN 1 WHEN 'بلوغ' THEN 2 WHEN 'کاهش' THEN 3 ELSE 4 END, current_demand DESC;",
          explanation:
            "این کوئری پیشرفته چرخه حیات کتاب‌ها را تحلیل کرده و مرحله فعلی هر کتاب را مشخص می‌کند.",
          difficulty: "advanced",
          points: 100,
        },
        {
          id: "lib_adv_10",
          title: "سیستم توصیه کتاب هوشمند",
          description:
            "بر اساس تاریخچه امانت و سلایق اعضا، کتاب‌هایی که هر عضو احتمالاً دوست خواهد داشت را پیش‌بینی کنید.",
          expectedColumns: [
            "member_name",
            "recommended_book",
            "recommendation_score",
            "reason",
          ],
          hints: [
            "کتاب‌های خوانده شده توسط اعضای هم‌سلیقه را پیدا کنید",
            "کتاب‌هایی که عضو نخوانده اما دیگران خوانده‌اند",
            "امتیاز توصیه = بر اساس تعداد اعضای مشابه که آن کتاب را خوانده‌اند",
          ],
          solution:
            "WITH member_books AS (SELECT DISTINCT m.id AS member_id, CONCAT(m.firstName, ' ', m.lastName) AS member_name, l.bookId FROM members m JOIN loans l ON m.id = l.memberId), similar_members AS (SELECT mb1.member_id, mb1.member_name, mb2.member_id AS similar_member_id, COUNT(*) AS shared_books FROM member_books mb1 JOIN member_books mb2 ON mb1.bookId = mb2.bookId AND mb1.member_id != mb2.member_id GROUP BY mb1.member_id, mb1.member_name, mb2.member_id HAVING COUNT(*) >= 2), recommendations AS (SELECT sm.member_id, sm.member_name, mb.bookId, b.title, COUNT(*) AS recommendation_count FROM similar_members sm JOIN member_books mb ON sm.similar_member_id = mb.member_id JOIN books b ON mb.bookId = b.id WHERE NOT EXISTS (SELECT 1 FROM member_books mb2 WHERE mb2.member_id = sm.member_id AND mb2.bookId = mb.bookId) GROUP BY sm.member_id, sm.member_name, mb.bookId, b.title), top_recommendations AS (SELECT member_name, title AS recommended_book, recommendation_count AS recommendation_score, 'اعضای هم‌سلیقه این کتاب را پسندیده‌اند' AS reason, ROW_NUMBER() OVER (PARTITION BY member_id ORDER BY recommendation_count DESC) AS rn FROM recommendations) SELECT member_name, recommended_book, recommendation_score, reason FROM top_recommendations WHERE rn <= 3 AND recommendation_score >= 2 ORDER BY member_name, recommendation_score DESC;",
          explanation:
            "این کوئری پیچیده سیستم توصیه کتاب را بر اساس یادگیری ماشین ساده و تحلیل رفتار اعضا پیاده‌سازی می‌کند.",
          difficulty: "advanced",
          points: 100,
        },
      ],
    },
  },
  company: {
    name: "سیستم مدیریت شرکت",
    description: "مدیریت کارمندان، بخش‌ها، پروژه‌ها و حضور و غیاب",
    tables: [
      "EMPLOYEE",
      "DEPARTMENT",
      "DEPT_LOCATIONS",
      "PROJECT",
      "WORKS_ON",
      "DEPENDENT",
    ],
    questions: {
      beginner: [
        {
          id: "comp_basic_1",
          title: "لیست همه کارمندان",
          description: "تمام کارمندان شرکت را نمایش دهید.",
          expectedColumns: ["Ssn", "Fname", "Lname", "Salary"],
          hints: ["از جدول EMPLOYEE استفاده کنید", "از SELECT * استفاده کنید"],
          solution: "SELECT * FROM EMPLOYEE;",
          explanation: "این کوئری لیست کامل کارمندان شرکت را نمایش می‌دهد.",
          difficulty: "beginner",
          points: 10,
        },
        {
          id: "comp_basic_2",
          title: "لیست همه بخش‌ها",
          description: "نام تمام بخش‌های موجود در شرکت را نمایش دهید.",
          expectedColumns: ["Dname", "Dnumber"],
          hints: [
            "از جدول DEPARTMENT استفاده کنید",
            "فقط Dname و Dnumber را انتخاب کنید",
          ],
          solution: "SELECT Dname, Dnumber FROM DEPARTMENT;",
          explanation: "این کوئری اطلاعات اساسی بخش‌های شرکت را نمایش می‌دهد.",
          difficulty: "beginner",
          points: 10,
        },
        {
          id: "comp_basic_3",
          title: "تعداد کارمندان",
          description: "تعداد کل کارمندان شرکت را محاسبه کنید.",
          expectedColumns: ["total_employees"],
          hints: [
            "از تابع COUNT استفاده کنید",
            "از AS برای نام‌گذاری ستون استفاده کنید",
          ],
          solution: "SELECT COUNT(*) AS total_employees FROM EMPLOYEE;",
          explanation:
            "این کوئری تعداد کل کارمندان شاغل در شرکت را شمارش می‌کند.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "comp_basic_4",
          title: "کارمندان با حقوق بالا",
          description:
            "کارمندانی که حقوق آن‌ها بالای 50 میلیون تومان است را نمایش دهید.",
          expectedColumns: ["Fname", "Lname", "Salary"],
          hints: [
            "از شرط WHERE برای فیلتر حقوق استفاده کنید",
            "مبلغ 50 میلیون را 50000000 وارد کنید",
          ],
          solution:
            "SELECT Fname, Lname, Salary FROM EMPLOYEE WHERE Salary > 50000000;",
          explanation:
            "این کوئری کارمندان با درآمد بالا را بر اساس حقوق فیلتر می‌کند.",
          difficulty: "beginner",
          points: 20,
        },
        {
          id: "comp_basic_5",
          title: "پروژه‌های فعال",
          description:
            "لیست پروژه‌هایی که هنوز خاتمه نیافته‌اند را نمایش دهید.",
          expectedColumns: ["Pname", "Plocation"],
          hints: [
            "از جدول PROJECT استفاده کنید",
            "برای سادگی، تمام پروژه‌ها را فعال در نظر بگیرید",
          ],
          solution: "SELECT Pname, Plocation FROM PROJECT;",
          explanation:
            "این کوئری تمام پروژه‌ها را نمایش می‌دهد. در این مدل، فیلد مشخصی برای وضعیت پروژه وجود ندارد.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "comp_basic_6",
          title: "کارمندان به ترتیب نام",
          description: "کارمندان را به ترتیب حروف الفبای نام مرتب کنید.",
          expectedColumns: ["Fname", "Lname"],
          hints: [
            "از ORDER BY Fname استفاده کنید",
            "برای مرتب‌سازی صعودی نیازی به ASC نیست",
          ],
          solution: "SELECT Fname, Lname FROM EMPLOYEE ORDER BY Fname;",
          explanation:
            "این کوئری کارمندان را به ترتیب الفبایی نام مرتب می‌کند.",
          difficulty: "beginner",
          points: 15,
        },
        {
          id: "comp_basic_7",
          title: "ساعات کاری کارمندان",
          description:
            "ساعات کاری ثبت شده برای کارمندان در پروژه‌ها را نمایش دهید.",
          expectedColumns: ["Essn", "Pno", "Hours"],
          hints: [
            "از جدول WORKS_ON استفاده کنید",
            "این جدول ارتباط کارمندان و پروژه‌ها را نشان می‌دهد",
          ],
          solution:
            "SELECT Essn, Pno, Hours FROM WORKS_ON WHERE Hours IS NOT NULL;",
          explanation:
            "این کوئری ساعات کاری ثبت شده برای کارمندان را نمایش می‌دهد.",
          difficulty: "beginner",
          points: 20,
        },
        {
          id: "comp_basic_8",
          title: "مدیران بخش‌ها",
          description: "مدیران هر بخش را نمایش دهید.",
          expectedColumns: ["Dname", "Mgr_ssn"],
          hints: [
            "از جدول DEPARTMENT استفاده کنید",
            "این جدول اطلاعات مدیر هر بخش را شامل می‌شود",
          ],
          solution: "SELECT Dname, Mgr_ssn FROM DEPARTMENT;",
          explanation:
            "این کوئری مدیر هر بخش را بر اساس اطلاعات جدول DEPARTMENT شناسایی می‌کند.",
          difficulty: "beginner",
          points: 20,
        },
        {
          id: "comp_basic_9",
          title: "پروژه‌های بخش تحقیق",
          description:
            "پروژه‌هایی که توسط بخش تحقیق (Research) مدیریت می‌شوند را نمایش دهید.",
          expectedColumns: ["Pname", "Dnum"],
          hints: [
            "از JOIN بین PROJECT و DEPARTMENT استفاده کنید",
            "بخش 'Research' را فیلتر کنید",
          ],
          solution:
            "SELECT p.Pname, p.Dnum FROM PROJECT p JOIN DEPARTMENT d ON p.Dnum = d.Dnumber WHERE d.Dname = 'Research';",
          explanation:
            "این کوئری پروژه‌های بخش تحقیق را با استفاده از JOIN فیلتر می‌کند.",
          difficulty: "beginner",
          points: 25,
        },
        {
          id: "comp_basic_10",
          title: "کارمندان بخش فروش",
          description: "کارمندان شاغل در بخش فروش را نمایش دهید.",
          expectedColumns: ["Fname", "Lname"],
          hints: [
            "نیاز به JOIN بین EMPLOYEE و DEPARTMENT دارید",
            "بخش 'Sales' را فیلتر کنید",
          ],
          solution:
            "SELECT e.Fname, e.Lname FROM EMPLOYEE e JOIN DEPARTMENT d ON e.Dno = d.Dnumber WHERE d.Dname = 'Sales';",
          explanation:
            "این کوئری کارمندان بخش فروش را با استفاده از JOIN شناسایی می‌کند.",
          difficulty: "beginner",
          points: 25,
        },
      ],
      intermediate: [
        {
          id: "comp_inter_1",
          title: "میانگین حقوق هر بخش",
          description: "میانگین حقوق کارمندان هر بخش را محاسبه کنید.",
          expectedColumns: ["Dname", "avg_salary"],
          hints: [
            "نیاز به JOIN بین EMPLOYEE و DEPARTMENT دارید",
            "از GROUP BY روی بخش استفاده کنید",
            "از تابع AVG استفاده کنید",
          ],
          solution:
            "SELECT d.Dname, AVG(e.Salary) AS avg_salary FROM EMPLOYEE e JOIN DEPARTMENT d ON e.Dno = d.Dnumber GROUP BY d.Dnumber, d.Dname;",
          explanation:
            "این کوئری میانگین حقوق کارمندان را برای هر بخش محاسبه می‌کند.",
          difficulty: "intermediate",
          points: 35,
        },
        {
          id: "comp_inter_2",
          title: "تعداد کارمندان هر بخش",
          description: "تعداد کارمندان شاغل در هر بخش را محاسبه کنید.",
          expectedColumns: ["Dname", "employee_count"],
          hints: [
            "از JOIN بین EMPLOYEE و DEPARTMENT استفاده کنید",
            "از GROUP BY روی بخش استفاده کنید",
            "از COUNT برای شمارش استفاده کنید",
          ],
          solution:
            "SELECT d.Dname, COUNT(e.Ssn) AS employee_count FROM DEPARTMENT d LEFT JOIN EMPLOYEE e ON d.Dnumber = e.Dno GROUP BY d.Dnumber, d.Dname;",
          explanation: "این کوئری تعداد نیروی انسانی هر بخش را شمارش می‌کند.",
          difficulty: "intermediate",
          points: 35,
        },
        {
          id: "comp_inter_3",
          title: "پروژه‌های با بیشترین کارمند",
          description:
            "پروژه‌هایی که بیش از 2 کارمند روی آن کار می‌کنند را نمایش دهید.",
          expectedColumns: ["Pname", "employee_count"],
          hints: [
            "از JOIN بین PROJECT و WORKS_ON استفاده کنید",
            "از GROUP BY روی پروژه و HAVING برای فیلتر استفاده کنید",
          ],
          solution:
            "SELECT p.Pname, COUNT(w.Essn) as employee_count FROM PROJECT p JOIN WORKS_ON w ON p.Pnumber = w.Pno GROUP BY p.Pnumber, p.Pname HAVING COUNT(w.Essn) > 2;",
          explanation:
            "این کوئری پروژه‌های بزرگ را بر اساس تعداد کارمندان درگیر شناسایی می‌کند.",
          difficulty: "intermediate",
          points: 45,
        },
        {
          id: "comp_inter_4",
          title: "کارمندان پرکار",
          description:
            "کارمندانی که بیش از 40 ساعت در هفته روی پروژه‌ها کار کرده‌اند.",
          expectedColumns: ["employee_name", "total_hours"],
          hints: [
            "نیاز به JOIN بین EMPLOYEE و WORKS_ON دارید",
            "از GROUP BY روی کارمند و SUM برای ساعات استفاده کنید",
          ],
          solution:
            "SELECT e.Fname || ' ' || e.Lname AS employee_name, SUM(w.Hours) AS total_hours FROM EMPLOYEE e JOIN WORKS_ON w ON e.Ssn = w.Essn GROUP BY e.Ssn, e.Fname, e.Lname HAVING SUM(w.Hours) > 40;",
          explanation:
            "این کوئری کارمندان پرکار را بر اساس مجموع ساعات کاری‌شان شناسایی می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "intermediate",
          points: 50,
        },
        {
          id: "comp_inter_5",
          title: "بالاترین حقوق هر بخش",
          description: "کارمند با بالاترین حقوق در هر بخش را نمایش دهید.",
          expectedColumns: ["Dname", "employee_name", "max_salary"],
          hints: [
            "از Window Function استفاده کنید",
            "از RANK() OVER (PARTITION BY Dno ORDER BY Salary DESC)",
            "فقط کارمندان با رتبه 1 را انتخاب کنید",
          ],
          solution:
            "WITH ranked_employees AS (SELECT e.Fname, e.Lname, e.Salary, d.Dname, RANK() OVER (PARTITION BY e.Dno ORDER BY e.Salary DESC) AS rank FROM EMPLOYEE e JOIN DEPARTMENT d ON e.Dno = d.Dnumber) SELECT Dname, Fname || ' ' || Lname AS employee_name, Salary AS max_salary FROM ranked_employees WHERE rank = 1;",
          explanation:
            "این کوئری از Window Function برای یافتن بالاترین حقوق در هر بخش استفاده می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "intermediate",
          points: 45,
        },
        {
          id: "comp_inter_6",
          title: "پروژه‌های بدون کارمند",
          description:
            "پروژه‌هایی که هیچ کارمندی روی آن‌ها کار نمی‌کند را نمایش دهید.",
          expectedColumns: ["Pname"],
          hints: [
            "از LEFT JOIN بین PROJECT و WORKS_ON استفاده کنید",
            "از WHERE برای فیلتر کردن رکوردهای NULL استفاده کنید",
          ],
          solution:
            "SELECT p.Pname FROM PROJECT p LEFT JOIN WORKS_ON w ON p.Pnumber = w.Pno WHERE w.Essn IS NULL;",
          explanation:
            "این کوئری پروژه‌هایی که هنوز کارمندی به آن‌ها تخصیص نیافته را شناسایی می‌کند.",
          difficulty: "intermediate",
          points: 40,
        },
        {
          id: "comp_inter_7",
          title: "کارمندان بدون پروژه",
          description:
            "کارمندانی که روی هیچ پروژه‌ای کار نمی‌کنند را نمایش دهید.",
          expectedColumns: ["Fname", "Lname"],
          hints: [
            "از LEFT JOIN بین EMPLOYEE و WORKS_ON استفاده کنید",
            "شرط WHERE برای فیلتر NULL استفاده کنید",
          ],
          solution:
            "SELECT e.Fname, e.Lname FROM EMPLOYEE e LEFT JOIN WORKS_ON w ON e.Ssn = w.Essn WHERE w.Pno IS NULL;",
          explanation:
            "این کوئری کارمندان تخصیص نیافته را با استفاده از LEFT JOIN شناسایی می‌کند.",
          difficulty: "intermediate",
          points: 45,
        },
        {
          id: "comp_inter_8",
          title: "میانگین ساعات کاری پروژه‌ها",
          description:
            "میانگین ساعات کاری ثبت شده برای هر پروژه را محاسبه کنید.",
          expectedColumns: ["Pname", "avg_hours"],
          hints: [
            "از JOIN بین PROJECT و WORKS_ON استفاده کنید",
            "از GROUP BY روی پروژه و AVG برای میانگین استفاده کنید",
          ],
          solution:
            "SELECT p.Pname, AVG(w.Hours) AS avg_hours FROM PROJECT p JOIN WORKS_ON w ON p.Pnumber = w.Pno GROUP BY p.Pnumber, p.Pname;",
          explanation:
            "این کوئری عملکرد پروژه‌ها را بر اساس میانگین ساعات کاری تحلیل می‌کند.",
          difficulty: "intermediate",
          points: 40,
        },
        {
          id: "comp_inter_9",
          title: "بخش‌های پرکار",
          description:
            "بخش‌هایی که بیش از 3 کارمند دارند را به همراه میانگین حقوقشان نمایش دهید.",
          expectedColumns: ["Dname", "employee_count", "avg_salary"],
          hints: [
            "از JOIN بین EMPLOYEE و DEPARTMENT استفاده کنید",
            "از GROUP BY و HAVING استفاده کنید",
            "شرط تعداد کارمند > 3 در HAVING قرار دهید",
          ],
          solution:
            "SELECT d.Dname, COUNT(e.Ssn) AS employee_count, ROUND(AVG(e.Salary), 0) AS avg_salary FROM DEPARTMENT d JOIN EMPLOYEE e ON d.Dnumber = e.Dno GROUP BY d.Dnumber, d.Dname HAVING COUNT(e.Ssn) > 3;",
          explanation:
            "این کوئری بخش‌های بزرگ شرکت را با تحلیل تعداد کارمند و حقوق شناسایی می‌کند.",
          difficulty: "intermediate",
          points: 40,
        },
        {
          id: "comp_inter_10",
          title: "نرخ مشارکت در پروژه‌ها",
          description:
            "درصد کارمندان هر بخش که در پروژه‌ها مشارکت دارند را محاسبه کنید.",
          expectedColumns: ["Dname", "participation_rate"],
          hints: [
            "نیاز به JOIN بین سه جدول EMPLOYEE, DEPARTMENT, WORKS_ON",
            "تعداد کارمندان در پروژه / کل کارمندان بخش",
          ],
          solution:
            "SELECT d.Dname, ROUND(COUNT(DISTINCT w.Essn) * 100.0 / COUNT(DISTINCT e.Ssn), 2) AS participation_rate FROM DEPARTMENT d LEFT JOIN EMPLOYEE e ON d.Dnumber = e.Dno LEFT JOIN WORKS_ON w ON e.Ssn = w.Essn GROUP BY d.Dnumber, d.Dname;",
          explanation:
            "این کوئری پیچیده نرخ مشارکت کارمندان هر بخش در پروژه‌ها را محاسبه می‌کند.",
          difficulty: "intermediate",
          points: 55,
        },
      ],
      advanced: [
        {
          id: "comp_adv_1",
          title: "تحلیل وابستگان کارمندان",
          description: "تعداد وابستگان هر کارمند را محاسبه و نمایش دهید.",
          expectedColumns: ["employee_name", "dependent_count"],
          hints: [
            "نیاز به JOIN بین EMPLOYEE و DEPENDENT دارید",
            "از GROUP BY روی کارمند و COUNT برای شمارش استفاده کنید",
          ],
          solution:
            "SELECT e.Fname || ' ' || e.Lname AS employee_name, COUNT(d.Dependent_name) AS dependent_count FROM EMPLOYEE e LEFT JOIN DEPENDENT d ON e.Ssn = d.Essn GROUP BY e.Ssn, e.Fname, e.Lname ORDER BY dependent_count DESC;",
          explanation:
            "این کوئری تعداد وابستگان هر کارمند را شمارش می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "advanced",
          points: 65,
        },
        {
          id: "comp_adv_2",
          title: "رتبه‌بندی کارمندان بر اساس حقوق",
          description:
            "کارمندان را در هر بخش بر اساس حقوق رتبه‌بندی کرده و رتبه 3 اول را نمایش دهید.",
          expectedColumns: ["Dname", "employee_name", "Salary", "rank"],
          hints: [
            "از Window Function استفاده کنید",
            "از RANK() OVER (PARTITION BY Dno ORDER BY Salary DESC)",
            "فقط رتبه‌های 1، 2، 3 را انتخاب کنید",
          ],
          solution:
            "WITH ranked_salaries AS (SELECT e.Fname, e.Lname, e.Salary, d.Dname, RANK() OVER (PARTITION BY e.Dno ORDER BY e.Salary DESC) AS rank FROM EMPLOYEE e JOIN DEPARTMENT d ON e.Dno = d.Dnumber) SELECT Dname, Fname || ' ' || Lname AS employee_name, Salary, rank FROM ranked_salaries WHERE rank <= 3 ORDER BY Dname, rank;",
          explanation:
            "این کوئری از Window Function برای رتبه‌بندی حقوق در هر بخش استفاده می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "advanced",
          points: 75,
        },
        {
          id: "comp_adv_3",
          title: "تحلیل ساختار مدیریت",
          description: "برای هر کارمند، نام مدیر مستقیم او را نمایش دهید.",
          expectedColumns: ["employee_name", "supervisor_name"],
          hints: [
            "از self-join روی جدول EMPLOYEE استفاده کنید",
            "یک جدول برای کارمند و یک جدول برای مدیر در نظر بگیرید",
          ],
          solution:
            "SELECT e.Fname || ' ' || e.Lname AS employee_name, s.Fname || ' ' || s.Lname AS supervisor_name FROM EMPLOYEE e LEFT JOIN EMPLOYEE s ON e.Super_ssn = s.Ssn;",
          explanation:
            "این کوئری ساختار سلسله مراتبی شرکت را با استفاده از self-join نمایش می‌دهد. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "advanced",
          points: 80,
        },
        {
          id: "comp_adv_4",
          title: "شناسایی کارمندان کلیدی",
          description:
            "کارمندانی که هم مدیر هستند و هم در پروژه‌ها مشارکت دارند.",
          expectedColumns: ["employee_name", "project_count"],
          hints: [
            "کارمندان مدیر را از جدول DEPARTMENT پیدا کنید",
            "مشارکت در پروژه را از WORKS_ON بررسی کنید",
          ],
          solution:
            "SELECT e.Fname || ' ' || e.Lname AS employee_name, COUNT(w.Pno) AS project_count FROM EMPLOYEE e JOIN WORKS_ON w ON e.Ssn = w.Essn WHERE e.Ssn IN (SELECT Mgr_ssn FROM DEPARTMENT) GROUP BY e.Ssn, e.Fname, e.Lname;",
          explanation:
            "این کوئری کارمندان کلیدی که نقش مدیریتی و اجرایی دارند را شناسایی می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "advanced",
          points: 85,
        },
        {
          id: "comp_adv_5",
          title: "تحلیل بهره‌وری پروژه‌ها",
          description:
            "بهره‌وری هر پروژه را بر اساس مجموع ساعات کاری و تعداد کارمندان محاسبه کنید.",
          expectedColumns: [
            "Pname",
            "total_hours",
            "team_size",
            "efficiency_score",
          ],
          hints: [
            "مجموع ساعات و تعداد کارمندان را از WORKS_ON بگیرید",
            "بهره‌وری = مجموع ساعات / تعداد کارمندان",
          ],
          solution:
            "WITH project_metrics AS (SELECT p.Pname, SUM(w.Hours) AS total_hours, COUNT(DISTINCT w.Essn) AS team_size FROM PROJECT p JOIN WORKS_ON w ON p.Pnumber = w.Pno GROUP BY p.Pnumber, p.Pname) SELECT Pname, total_hours, team_size, ROUND(total_hours / NULLIF(team_size, 0), 2) AS efficiency_score FROM project_metrics ORDER BY efficiency_score DESC;",
          explanation:
            "این کوئری بهره‌وری پروژه‌ها را بر اساس معیارهای مختلف ارزیابی می‌کند.",
          difficulty: "advanced",
          points: 90,
        },
        {
          id: "comp_adv_6",
          title: "پیش‌بینی حقوق کارمندان",
          description:
            "حقوق هر کارمند را بر اساس میانگین حقوق بخش و سابقه کار پیش‌بینی کنید (مثال ساده).",
          expectedColumns: [
            "employee_name",
            "current_salary",
            "predicted_salary",
            "difference",
          ],
          hints: [
            "از میانگین حقوق بخش به عنوان پایه استفاده کنید",
            "به ازای هر سال سابقه، 2% به حقوق اضافه کنید",
          ],
          solution:
            "WITH dept_avg_salary AS (SELECT Dno, AVG(Salary) AS avg_dept_salary FROM EMPLOYEE GROUP BY Dno), employee_service AS (SELECT Ssn, Fname, Lname, Salary, Dno, (julianday('now') - julianday(Bdate)) / 365.25 - 25 AS years_of_service FROM EMPLOYEE) SELECT es.Fname || ' ' || es.Lname AS employee_name, es.Salary AS current_salary, ROUND(das.avg_dept_salary * (1 + (es.years_of_service * 0.02))) AS predicted_salary, ROUND(es.Salary - (das.avg_dept_salary * (1 + (es.years_of_service * 0.02)))) AS difference FROM employee_service es JOIN dept_avg_salary das ON es.Dno = das.Dno ORDER BY difference DESC;",
          explanation:
            "این کوئری پیشرفته یک مدل ساده برای پیش‌بینی حقوق بر اساس سابقه و بخش ارائه می‌دهد. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "advanced",
          points: 95,
        },
        {
          id: "comp_adv_7",
          title: "تحلیل شبکه همکاری",
          description:
            "کارمندانی که بیشترین همکاری با دیگران را در پروژه‌ها دارند شناسایی کنید.",
          expectedColumns: [
            "employee1_name",
            "employee2_name",
            "collaboration_score",
          ],
          hints: [
            "از self-join روی جدول WORKS_ON استفاده کنید",
            "همکاری = تعداد پروژه‌های مشترک",
          ],
          solution:
            "WITH collaborations AS (SELECT w1.Essn AS e1_ssn, w2.Essn AS e2_ssn, COUNT(*) AS shared_projects FROM WORKS_ON w1 JOIN WORKS_ON w2 ON w1.Pno = w2.Pno AND w1.Essn < w2.Essn GROUP BY w1.Essn, w2.Essn) SELECT e1.Fname || ' ' || e1.Lname AS employee1_name, e2.Fname || ' ' || e2.Lname AS employee2_name, c.shared_projects AS collaboration_score FROM collaborations c JOIN EMPLOYEE e1 ON c.e1_ssn = e1.Ssn JOIN EMPLOYEE e2 ON c.e2_ssn = e2.Ssn ORDER BY collaboration_score DESC LIMIT 10;",
          explanation:
            "این کوئری شبکه همکاری بین کارمندان را تحلیل می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "advanced",
          points: 85,
        },
        {
          id: "comp_adv_8",
          title: "بهینه‌سازی تخصیص منابع",
          description:
            "بخش‌هایی که کمترین بار کاری (میانگین ساعات) را دارند شناسایی کنید.",
          expectedColumns: ["Dname", "avg_hours_per_employee"],
          hints: [
            "مجموع ساعات کاری هر بخش را محاسبه کنید",
            "مجموع ساعات را بر تعداد کارمندان بخش تقسیم کنید",
          ],
          solution:
            "WITH department_hours AS (SELECT d.Dname, d.Dnumber, SUM(COALESCE(w.Hours, 0)) AS total_hours FROM DEPARTMENT d LEFT JOIN EMPLOYEE e ON d.Dnumber = e.Dno LEFT JOIN WORKS_ON w ON e.Ssn = w.Essn GROUP BY d.Dnumber, d.Dname), department_employees AS (SELECT Dno, COUNT(*) AS employee_count FROM EMPLOYEE GROUP BY Dno) SELECT dh.Dname, ROUND(dh.total_hours / NULLIF(de.employee_count, 0), 2) AS avg_hours_per_employee FROM department_hours dh JOIN department_employees de ON dh.Dnumber = de.Dno ORDER BY avg_hours_per_employee ASC;",
          explanation:
            "این کوئری بهینه‌سازی منابع انسانی را با شناسایی بخش‌های با بار کاری کمتر ارائه می‌دهد.",
          difficulty: "advanced",
          points: 90,
        },
        {
          id: "comp_adv_9",
          title: "تحلیل چرخه عمر پروژه‌ها",
          description:
            "میانگین تعداد کارمندان و ساعات کاری برای پروژه‌های هر بخش را محاسبه کنید.",
          expectedColumns: ["Dname", "avg_team_size", "avg_project_hours"],
          hints: [
            "از چندین JOIN و агреذور استفاده کنید",
            "ابتدا متریک‌های هر پروژه را محاسبه کنید، سپس میانگین هر بخش را بگیرید",
          ],
          solution:
            "WITH project_stats AS (SELECT p.Dnum, COUNT(DISTINCT w.Essn) AS team_size, SUM(w.Hours) AS total_hours FROM PROJECT p JOIN WORKS_ON w ON p.Pnumber = w.Pno GROUP BY p.Pnumber, p.Dnum) SELECT d.Dname, ROUND(AVG(ps.team_size), 2) AS avg_team_size, ROUND(AVG(ps.total_hours), 2) AS avg_project_hours FROM DEPARTMENT d JOIN project_stats ps ON d.Dnumber = ps.Dnum GROUP BY d.Dnumber, d.Dname;",
          explanation:
            "این کوئری پیشرفته چرخه عمر پروژه‌ها را برای تحلیل عملکرد بخش‌ها تحلیل می‌کند.",
          difficulty: "advanced",
          points: 100,
        },
        {
          id: "comp_adv_10",
          title: "سیستم هوشمند ارزیابی عملکرد",
          description:
            "امتیاز کلی عملکرد هر کارمند را بر اساس حقوق، سابقه کار و مشارکت در پروژه‌ها محاسبه کنید.",
          expectedColumns: [
            "employee_name",
            "salary_score",
            "tenure_score",
            "project_score",
            "total_score",
            "grade",
          ],
          hints: [
            "امتیاز حقوق = (حقوق / میانگین حقوق بخش) × 40",
            "امتیاز سابقه = min(سال‌های کار × 5, 30)",
            "امتیاز پروژه = (مجموع ساعات / 10) تا حداکثر 30",
          ],
          solution:
            "WITH performance_metrics AS (SELECT e.Ssn, e.Fname, e.Lname, e.Salary, e.Dno, (julianday('now') - julianday(e.Bdate)) / 365.25 - 25 AS years_of_service, SUM(COALESCE(w.Hours, 0)) AS total_hours FROM EMPLOYEE e LEFT JOIN WORKS_ON w ON e.Ssn = w.Essn GROUP BY e.Ssn, e.Fname, e.Lname, e.Salary, e.Dno, e.Bdate), dept_avg_salary AS (SELECT Dno, AVG(Salary) AS avg_salary FROM EMPLOYEE GROUP BY Dno), score_calculation AS (SELECT pm.Fname, pm.Lname, ROUND((pm.Salary / das.avg_salary) * 40, 1) AS salary_score, ROUND(LEAST(pm.years_of_service * 5, 30), 1) AS tenure_score, ROUND(LEAST(pm.total_hours / 10, 30), 1) AS project_score FROM performance_metrics pm JOIN dept_avg_salary das ON pm.Dno = das.Dno), final_evaluation AS (SELECT Fname, Lname, salary_score, tenure_score, project_score, ROUND(salary_score + tenure_score + project_score, 1) AS total_score FROM score_calculation) SELECT Fname || ' ' || Lname AS employee_name, salary_score, tenure_score, project_score, total_score, CASE WHEN total_score >= 90 THEN 'عالی' WHEN total_score >= 75 THEN 'خوب' WHEN total_score >= 60 THEN 'قابل قبول' ELSE 'نیاز به بهبود' END AS grade FROM final_evaluation ORDER BY total_score DESC;",
          explanation:
            "این کوئری پیچیده سیستم جامع ارزیابی عملکرد کارمندان را پیاده‌سازی می‌کند. در SQLite برای اتصال رشته‌ها از || استفاده می‌شود.",
          difficulty: "advanced",
          points: 100,
        },
      ],
    },
  },
};
