"use client";

import { Modal, Typography, Space, Button, Divider } from "antd";
import { CopyOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const SQLLearningModal = ({ open, onClose, topic }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const learningContent = {
    // Basic SQL Statements
    "select-statement": {
      title: "دستور SELECT در SQL",
      description:
        "دستور SELECT برای انتخاب و بازیابی داده‌ها از دیتابیس استفاده می‌شود.",
      syntax: "SELECT column1, column2, ... FROM table_name;",
      tips: [
        "برای انتخاب همه ستون‌ها از * استفاده کنید",
        "نام ستون‌ها را با کاما از هم جدا کنید",
        "برای محدود کردن نتایج از LIMIT استفاده کنید",
      ],
      examples: [
        {
          title: "انتخاب همه کارمندان",
          query: "SELECT * FROM EMPLOYEE;",
          description: "تمام اطلاعات کارمندان را نمایش می‌دهد",
        },
        {
          title: "انتخاب ستون‌های خاص",
          query: "SELECT Fname, Lname, Salary FROM EMPLOYEE;",
          description: "فقط نام، نام خانوادگی و حقوق کارمندان را نشان می‌دهد",
        },
      ],
    },
    "insert-statement": {
      title: "دستور INSERT در SQL",
      description:
        "دستور INSERT برای اضافه کردن رکورد جدید به جدول استفاده می‌شود.",
      syntax:
        "INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);",
      tips: [
        "حتماً مقادیر را به ترتیب ستون‌ها وارد کنید",
        "مقادیر متنی را در کوتیشن قرار دهید",
        "می‌توانید چندین رکورد را همزمان اضافه کنید",
      ],
      examples: [
        {
          title: "اضافه کردن کارمند جدید",
          query: `INSERT INTO EMPLOYEE (Ssn, Fname, Lname, Sex, Salary, Dno) 
VALUES ('999999999', 'احمد', 'محمدی', 'M', 35000, 5);`,
          description: "یک کارمند جدید با مشخصات کامل اضافه می‌کند",
        },
      ],
    },
    "update-statement": {
      title: "دستور UPDATE در SQL",
      description:
        "دستور UPDATE برای تغییر رکوردهای موجود در جدول استفاده می‌شود.",
      syntax:
        "UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;",
      tips: [
        "⚠️ همیشه از WHERE استفاده کنید تا همه رکوردها تغییر نکند",
        "می‌توانید چندین ستون را همزمان تغییر دهید",
        "ابتدا با SELECT شرط خود را تست کنید",
      ],
      examples: [
        {
          title: "افزایش حقوق یک کارمند",
          query: `UPDATE EMPLOYEE SET Salary = 45000 WHERE Ssn = '123456789';`,
          description: "حقوق کارمند با شماره ملی مشخص را تغییر می‌دهد",
        },
      ],
    },
    "delete-statement": {
      title: "دستور DELETE در SQL",
      description:
        "دستور DELETE برای حذف رکوردهای موجود از جدول استفاده می‌شود.",
      syntax: "DELETE FROM table_name WHERE condition;",
      tips: [
        "🚨 بسیار خطرناک! همیشه از WHERE استفاده کنید",
        "ابتدا با SELECT شرط خود را تست کنید",
        "بدون WHERE همه رکوردها حذف می‌شوند!",
      ],
      examples: [
        {
          title: "حذف یک پروژه",
          query: `DELETE FROM PROJECT WHERE Pnumber = 999;`,
          description: "پروژه با شماره مشخص را حذف می‌کند",
        },
      ],
    },
    "where-clause": {
      title: "بند WHERE در SQL",
      description:
        "بند WHERE برای فیلتر کردن رکوردها بر اساس شرایط مشخص استفاده می‌شود.",
      syntax: "SELECT * FROM table_name WHERE condition;",
      tips: [
        "از عملگرهای مقایسه استفاده کنید: =, >, <, >=, <=, <>",
        "شرایط مختلف را با AND و OR ترکیب کنید",
        "مقادیر متنی را در کوتیشن قرار دهید",
      ],
      examples: [
        {
          title: "فیلتر بر اساس جنسیت",
          query: `SELECT * FROM EMPLOYEE WHERE Sex = 'F';`,
          description: "فقط کارمندان زن را نمایش می‌دهد",
        },
        {
          title: "شرایط ترکیبی",
          query: `SELECT * FROM EMPLOYEE WHERE Sex = 'M' AND Salary > 30000;`,
          description: "کارمندان مرد با حقوق بالای 30000",
        },
      ],
    },

    // Query Filtering
    operators: {
      title: "عملگرهای SQL (Operators)",
      description:
        "عملگرهای SQL برای مقایسه و ترکیب شرایط در کوئری‌ها استفاده می‌شوند.",
      syntax: "SELECT * FROM table_name WHERE column operator value;",
      tips: [
        "= برای برابری دقیق",
        "<> یا != برای نابرابری",
        ">, <, >=, <= برای مقایسه عددی",
        "AND, OR, NOT برای ترکیب شرایط",
      ],
      examples: [
        {
          title: "مقایسه عددی",
          query: "SELECT * FROM EMPLOYEE WHERE Salary >= 35000;",
          description: "کارمندان با حقوق 35000 یا بالاتر",
        },
        {
          title: "ترکیب شرایط",
          query: "SELECT * FROM EMPLOYEE WHERE Sex = 'M' AND Dno = 5;",
          description: "کارمندان مرد بخش شماره 5",
        },
      ],
    },
    like: {
      title: "جستجوی الگویی با LIKE",
      description: "عملگر LIKE برای جستجوی الگو در رشته‌ها استفاده می‌شود.",
      syntax: "SELECT * FROM table_name WHERE column LIKE 'pattern';",
      tips: [
        "% نشان‌دهنده صفر یا چند کاراکتر",
        "_ نشان‌دهنده دقیقاً یک کاراکتر",
        "برای جستجوی تقریبی مفید است",
      ],
      examples: [
        {
          title: "نام‌های شروع شده با J",
          query: "SELECT * FROM EMPLOYEE WHERE Fname LIKE 'J%';",
          description: "کارمندانی که نامشان با J شروع می‌شود",
        },
        {
          title: "آدرس‌های شامل Houston",
          query: "SELECT * FROM EMPLOYEE WHERE Address LIKE '%Houston%';",
          description: "کارمندان ساکن هیوستون",
        },
      ],
    },
    in: {
      title: "عضویت در لیست با IN",
      description:
        "عملگر IN برای بررسی عضویت در یک لیست از مقادیر استفاده می‌شود.",
      syntax: "SELECT * FROM table_name WHERE column IN (value1, value2, ...);",
      tips: [
        "جایگزین مناسب برای چندین OR",
        "می‌تواند با زیرکوئری استفاده شود",
        "NOT IN برای خارج بودن از لیست",
      ],
      examples: [
        {
          title: "بخش‌های خاص",
          query: "SELECT * FROM EMPLOYEE WHERE Dno IN (4, 5);",
          description: "کارمندان بخش‌های 4 و 5",
        },
        {
          title: "جنسیت‌های مشخص",
          query: "SELECT * FROM EMPLOYEE WHERE Sex IN ('M', 'F');",
          description: "همه کارمندان (مرد و زن)",
        },
      ],
    },
    between: {
      title: "محدوده با BETWEEN",
      description:
        "عملگر BETWEEN برای انتخاب مقادیر در یک محدوده استفاده می‌شود.",
      syntax:
        "SELECT * FROM table_name WHERE column BETWEEN value1 AND value2;",
      tips: [
        "شامل هر دو مقدار ابتدا و انتها",
        "برای اعداد، تاریخ و متن کار می‌کند",
        "NOT BETWEEN برای خارج از محدوده",
      ],
      examples: [
        {
          title: "محدوده حقوق",
          query: "SELECT * FROM EMPLOYEE WHERE Salary BETWEEN 30000 AND 45000;",
          description: "کارمندان با حقوق بین 30 تا 45 هزار",
        },
        {
          title: "محدوده تاریخ",
          query:
            "SELECT * FROM EMPLOYEE WHERE Bdate BETWEEN '1960-01-01' AND '1970-12-31';",
          description: "کارمندان متولد دهه 60",
        },
      ],
    },
    union: {
      title: "ترکیب نتایج با UNION",
      description: "UNION برای ترکیب نتایج چند کوئری استفاده می‌شود.",
      syntax: "SELECT column1 FROM table1 UNION SELECT column1 FROM table2;",
      tips: [
        "تعداد و نوع ستون‌ها باید یکسان باشد",
        "UNION مقادیر تکراری را حذف می‌کند",
        "UNION ALL همه مقادیر را نگه می‌دارد",
      ],
      examples: [
        {
          title: "ترکیب نام‌ها",
          query:
            "SELECT Fname as name FROM EMPLOYEE UNION SELECT Dname as name FROM DEPARTMENT;",
          description: "لیست ترکیبی نام کارمندان و بخش‌ها",
        },
      ],
    },
    case: {
      title: "شرطی با CASE",
      description:
        "دستور CASE برای ایجاد شرط‌های پیچیده در SELECT استفاده می‌شود.",
      syntax:
        "SELECT CASE WHEN condition THEN result ELSE default END FROM table_name;",
      tips: [
        "مانند if-else در برنامه‌نویسی",
        "می‌تواند چندین WHEN داشته باشد",
        "ELSE اختیاری است",
      ],
      examples: [
        {
          title: "دسته‌بندی حقوق",
          query:
            "SELECT Fname, CASE WHEN Salary > 40000 THEN 'High' WHEN Salary > 30000 THEN 'Medium' ELSE 'Low' END as salary_level FROM EMPLOYEE;",
          description: "دسته‌بندی کارمندان بر اساس حقوق",
        },
      ],
    },
    distinct: {
      title: "مقادیر منحصر به فرد با DISTINCT",
      description: "DISTINCT برای حذف مقادیر تکراری از نتایج استفاده می‌شود.",
      syntax: "SELECT DISTINCT column_name FROM table_name;",
      tips: [
        "فقط مقادیر منحصر به فرد را برمی‌گرداند",
        "روی چند ستون قابل اعمال است",
        "عملکرد کوئری را کاهش می‌دهد",
      ],
      examples: [
        {
          title: "بخش‌های منحصر به فرد",
          query: "SELECT DISTINCT Dno FROM EMPLOYEE;",
          description: "لیست شماره بخش‌هایی که کارمند دارند",
        },
        {
          title: "ترکیب منحصر به فرد",
          query: "SELECT DISTINCT Sex, Dno FROM EMPLOYEE;",
          description: "ترکیبات منحصر به فرد جنسیت و بخش",
        },
      ],
    },
    exists: {
      title: "بررسی وجود با EXISTS",
      description: "EXISTS برای بررسی وجود رکورد در زیرکوئری استفاده می‌شود.",
      syntax:
        "SELECT * FROM table1 WHERE EXISTS (SELECT 1 FROM table2 WHERE condition);",
      tips: [
        "True/False برمی‌گرداند",
        "معمولاً با زیرکوئری استفاده می‌شود",
        "NOT EXISTS برای عدم وجود",
      ],
      examples: [
        {
          title: "کارمندان با وابسته",
          query:
            "SELECT * FROM EMPLOYEE E WHERE EXISTS (SELECT 1 FROM DEPENDENT D WHERE D.Essn = E.Ssn);",
          description: "کارمندانی که وابسته دارند",
        },
      ],
    },
    "any-all": {
      title: "مقایسه با ANY و ALL",
      description: "ANY و ALL برای مقایسه با مجموعه مقادیر استفاده می‌شوند.",
      syntax: "SELECT * FROM table_name WHERE column > ANY/ALL (subquery);",
      tips: [
        "ANY: حداقل یکی از شرایط",
        "ALL: همه شرایط",
        "معمولاً با زیرکوئری استفاده می‌شوند",
      ],
      examples: [
        {
          title: "حقوق بالاتر از هر کدام",
          query:
            "SELECT * FROM EMPLOYEE WHERE Salary > ANY (SELECT Salary FROM EMPLOYEE WHERE Dno = 4);",
          description: "کارمندان با حقوق بالاتر از حداقل یکی از بخش 4",
        },
      ],
    },
    ifnull: {
      title: "مدیریت NULL با IFNULL",
      description: "IFNULL برای جایگزینی مقادیر NULL استفاده می‌شود.",
      syntax: "SELECT IFNULL(column, replacement_value) FROM table_name;",
      tips: [
        "در SQLite از COALESCE استفاده کنید",
        "مقدار پیش‌فرض برای NULL ها",
        "برای محاسبات مفید است",
      ],
      examples: [
        {
          title: "جایگزینی NULL",
          query:
            "SELECT Fname, COALESCE(Minit, 'N/A') as middle_initial FROM EMPLOYEE;",
          description: "نمایش N/A برای نام میانی خالی",
        },
      ],
    },
    "null-values": {
      title: "کار با مقادیر NULL",
      description: "مقادیر NULL نشان‌دهنده عدم وجود داده هستند.",
      syntax: "SELECT * FROM table_name WHERE column IS NULL / IS NOT NULL;",
      tips: [
        "از = NULL استفاده نکنید",
        "IS NULL و IS NOT NULL صحیح است",
        "NULL در محاسبات نتیجه NULL می‌دهد",
      ],
      examples: [
        {
          title: "کارمندان بدون سرپرست",
          query: "SELECT * FROM EMPLOYEE WHERE Super_ssn IS NULL;",
          description: "کارمندانی که سرپرست ندارند",
        },
        {
          title: "کارمندان با سرپرست",
          query: "SELECT * FROM EMPLOYEE WHERE Super_ssn IS NOT NULL;",
          description: "کارمندانی که سرپرست دارند",
        },
      ],
    },
    aliases: {
      title: "نام مستعار با AS (Aliases)",
      description:
        "Aliases برای دادن نام موقت به جداول و ستون‌ها استفاده می‌شود.",
      syntax: "SELECT column AS alias_name FROM table_name AS table_alias;",
      tips: [
        "کلمه AS اختیاری است",
        "برای خوانایی بهتر کوئری",
        "در JOIN ها ضروری است",
      ],
      examples: [
        {
          title: "نام مستعار ستون",
          query:
            "SELECT Fname AS first_name, Lname AS last_name FROM EMPLOYEE;",
          description: "استفاده از نام انگلیسی برای ستون‌ها",
        },
        {
          title: "نام مستعار جدول",
          query:
            "SELECT E.Fname, D.Dname FROM EMPLOYEE E, DEPARTMENT D WHERE E.Dno = D.Dnumber;",
          description: "استفاده از E و D به جای نام کامل جداول",
        },
      ],
    },
    "order-by": {
      title: "مرتب‌سازی با ORDER BY",
      description:
        "دستور ORDER BY برای مرتب‌سازی نتایج کوئری بر اساس یک یا چند ستون استفاده می‌شود.",
      syntax:
        "SELECT * FROM table_name ORDER BY column1 ASC/DESC, column2 ASC/DESC;",
      tips: [
        "ASC برای مرتب‌سازی صعودی (پیش‌فرض)",
        "DESC برای مرتب‌سازی نزولی",
        "می‌توانید بر اساس چند ستون مرتب‌سازی کنید",
      ],
      examples: [
        {
          title: "مرتب‌سازی بر اساس حقوق",
          query:
            "SELECT Fname, Lname, Salary FROM EMPLOYEE ORDER BY Salary DESC;",
          description: "کارمندان را بر اساس حقوق از بالا به پایین مرتب می‌کند",
        },
        {
          title: "مرتب‌سازی چندگانه",
          query: "SELECT * FROM EMPLOYEE ORDER BY Dno ASC, Salary DESC;",
          description: "ابتدا بر اساس شماره بخش و سپس حقوق مرتب می‌کند",
        },
      ],
    },
    "group-by": {
      title: "گروه‌بندی با GROUP BY",
      description:
        "دستور GROUP BY برای گروه‌بندی رکوردها و اعمال توابع تجمیعی استفاده می‌شود.",
      syntax:
        "SELECT column1, function(column2) FROM table_name GROUP BY column1;",
      tips: [
        "همراه با توابع تجمیعی استفاده می‌شود",
        "ستون‌های SELECT باید در GROUP BY باشند",
        "برای خلاصه‌سازی داده‌ها بسیار مفید است",
      ],
      examples: [
        {
          title: "تعداد کارمندان هر بخش",
          query:
            "SELECT Dno, COUNT(*) as employee_count FROM EMPLOYEE GROUP BY Dno;",
          description: "تعداد کارمندان در هر بخش را نمایش می‌دهد",
        },
        {
          title: "متوسط حقوق هر بخش",
          query:
            "SELECT Dno, AVG(Salary) as avg_salary FROM EMPLOYEE GROUP BY Dno;",
          description: "میانگین حقوق کارمندان در هر بخش",
        },
      ],
    },
    having: {
      title: "فیلتر گروه‌ها با HAVING",
      description: "بند HAVING برای فیلتر کردن نتایج GROUP BY استفاده می‌شود.",
      syntax:
        "SELECT column1, function(column2) FROM table_name GROUP BY column1 HAVING condition;",
      tips: [
        "فقط همراه با GROUP BY استفاده می‌شود",
        "برای فیلتر نتایج توابع تجمیعی",
        "WHERE قبل از گروه‌بندی، HAVING بعد از آن",
      ],
      examples: [
        {
          title: "بخش‌های با بیش از 2 کارمند",
          query:
            "SELECT Dno, COUNT(*) FROM EMPLOYEE GROUP BY Dno HAVING COUNT(*) > 2;",
          description: "فقط بخش‌هایی که بیش از 2 کارمند دارند",
        },
      ],
    },
    join: {
      title: "اتصال جداول (JOIN)",
      description:
        "JOIN برای ترکیب داده‌ها از چند جدول بر اساس روابط بین آن‌ها استفاده می‌شود.",
      syntax:
        "SELECT * FROM table1 JOIN table2 ON table1.column = table2.column;",
      tips: [
        "INNER JOIN فقط رکوردهای مشترک",
        "LEFT JOIN همه رکوردهای جدول چپ",
        "RIGHT JOIN همه رکوردهای جدول راست",
        "FULL OUTER JOIN همه رکوردها",
      ],
      examples: [
        {
          title: "کارمندان و بخش‌هایشان",
          query:
            "SELECT E.Fname, E.Lname, D.Dname FROM EMPLOYEE E JOIN DEPARTMENT D ON E.Dno = D.Dnumber;",
          description: "نام کارمندان همراه با نام بخششان",
        },
        {
          title: "پروژه‌ها و کارمندان",
          query:
            "SELECT E.Fname, P.Pname, W.Hours FROM EMPLOYEE E JOIN WORKS_ON W ON E.Ssn = W.Essn JOIN PROJECT P ON W.Pno = P.Pnumber;",
          description: "کارمندان، پروژه‌هایشان و ساعات کار",
        },
      ],
    },

    // Window Functions
    "window-function-basics": {
      title: "مبانی توابع پنجره‌ای (Window Functions)",
      description:
        "توابع پنجره‌ای محاسبات را روی مجموعه‌ای از رکوردها انجام می‌دهند.",
      syntax:
        "SELECT column, FUNCTION() OVER (PARTITION BY column ORDER BY column) FROM table_name;",
      tips: [
        "OVER تعین‌کننده پنجره محاسبه",
        "PARTITION BY برای گروه‌بندی",
        "ORDER BY برای ترتیب درون پنجره",
      ],
      examples: [
        {
          title: "شماره‌گذاری رکوردها",
          query:
            "SELECT Fname, Salary, ROW_NUMBER() OVER (ORDER BY Salary DESC) as rank FROM EMPLOYEE;",
          description: "شماره‌گذاری کارمندان بر اساس حقوق",
        },
      ],
    },
    lag: {
      title: "تابع LAG - مقدار قبلی",
      description: "LAG مقدار ستون در رکورد قبلی را برمی‌گرداند.",
      syntax:
        "SELECT LAG(column, offset) OVER (ORDER BY column) FROM table_name;",
      tips: [
        "offset تعداد رکوردهای عقب",
        "پیش‌فرض offset برابر 1",
        "برای مقایسه با مقادیر قبلی مفید است",
      ],
      examples: [
        {
          title: "مقایسه با حقوق قبلی",
          query:
            "SELECT Fname, Salary, LAG(Salary) OVER (ORDER BY Salary) as prev_salary FROM EMPLOYEE;",
          description: "نمایش حقوق و حقوق کارمند قبلی",
        },
      ],
    },
    lead: {
      title: "تابع LEAD - مقدار بعدی",
      description: "LEAD مقدار ستون در رکورد بعدی را برمی‌گرداند.",
      syntax:
        "SELECT LEAD(column, offset) OVER (ORDER BY column) FROM table_name;",
      tips: [
        "offset تعداد رکوردهای جلو",
        "پیش‌فرض offset برابر 1",
        "برای مقایسه با مقادیر آینده مفید است",
      ],
      examples: [
        {
          title: "مقایسه با حقوق بعدی",
          query:
            "SELECT Fname, Salary, LEAD(Salary) OVER (ORDER BY Salary) as next_salary FROM EMPLOYEE;",
          description: "نمایش حقوق و حقوق کارمند بعدی",
        },
      ],
    },
    "first-value": {
      title: "تابع FIRST_VALUE - اولین مقدار",
      description: "FIRST_VALUE اولین مقدار در پنجره را برمی‌گرداند.",
      syntax:
        "SELECT FIRST_VALUE(column) OVER (PARTITION BY column ORDER BY column) FROM table_name;",
      tips: [
        "اولین مقدار در ترتیب مشخص شده",
        "معمولاً با PARTITION BY استفاده می‌شود",
        "برای مقایسه با بهترین/بدترین مفید است",
      ],
      examples: [
        {
          title: "بالاترین حقوق هر بخش",
          query:
            "SELECT Fname, Dno, Salary, FIRST_VALUE(Salary) OVER (PARTITION BY Dno ORDER BY Salary DESC) as highest_in_dept FROM EMPLOYEE;",
          description: "بالاترین حقوق در هر بخش",
        },
      ],
    },
    "last-value": {
      title: "تابع LAST_VALUE - آخرین مقدار",
      description: "LAST_VALUE آخرین مقدار در پنجره را برمی‌گرداند.",
      syntax:
        "SELECT LAST_VALUE(column) OVER (PARTITION BY column ORDER BY column ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) FROM table_name;",
      tips: [
        "آخرین مقدار در ترتیب مشخص شده",
        "نیاز به تعریف محدوده پنجره",
        "ROWS BETWEEN برای تعریف محدوده",
      ],
      examples: [
        {
          title: "کمترین حقوق هر بخش",
          query:
            "SELECT Fname, Dno, Salary, LAST_VALUE(Salary) OVER (PARTITION BY Dno ORDER BY Salary DESC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) as lowest_in_dept FROM EMPLOYEE;",
          description: "کمترین حقوق در هر بخش",
        },
      ],
    },

    // Numeric Functions
    rand: {
      title: "تابع RANDOM - عدد تصادفی",
      description: "تابع RANDOM عدد تصادفی تولید می‌کند.",
      syntax: "SELECT RANDOM() FROM table_name;",
      tips: [
        "در SQLite RANDOM() استفاده کنید",
        "عدد صحیح بزرگ تولید می‌کند",
        "برای تصادفی کردن نتایج مفید است",
      ],
      examples: [
        {
          title: "انتخاب تصادفی کارمندان",
          query: "SELECT * FROM EMPLOYEE ORDER BY RANDOM() LIMIT 3;",
          description: "انتخاب 3 کارمند به صورت تصادفی",
        },
      ],
    },
    round: {
      title: "تابع ROUND - گرد کردن",
      description:
        "ROUND عدد را به نزدیک‌ترین عدد صحیح یا رقم اعشار گرد می‌کند.",
      syntax: "SELECT ROUND(number, decimals) FROM table_name;",
      tips: [
        "decimals تعداد رقم اعشار (اختیاری)",
        "پیش‌فرض به عدد صحیح گرد می‌کند",
        "برای نمایش بهتر اعداد مفید است",
      ],
      examples: [
        {
          title: "گرد کردن حقوق",
          query:
            "SELECT Fname, ROUND(Salary/1000, 1) as salary_k FROM EMPLOYEE;",
          description: "نمایش حقوق بر حسب هزار با یک رقم اعشار",
        },
      ],
    },
    floor: {
      title: "تابع FLOOR - کف عدد",
      description:
        "FLOOR بزرگ‌ترین عدد صحیح کوچک‌تر یا مساوی عدد داده شده را برمی‌گرداند.",
      syntax: "SELECT FLOOR(number) FROM table_name;",
      tips: [
        "همیشه به سمت پایین گرد می‌کند",
        "برای اعداد منفی نیز کار می‌کند",
        "برای محاسبات ریاضی مفید است",
      ],
      examples: [
        {
          title: "کف حقوق",
          query:
            "SELECT Fname, Salary, FLOOR(Salary/10000) as salary_tens FROM EMPLOYEE;",
          description: "تعداد ده‌هزارهای حقوق",
        },
      ],
    },
    ceil: {
      title: "تابع CEIL - سقف عدد",
      description:
        "CEIL کوچک‌ترین عدد صحیح بزرگ‌تر یا مساوی عدد داده شده را برمی‌گرداند.",
      syntax: "SELECT CEIL(number) FROM table_name;",
      tips: [
        "همیشه به سمت بالا گرد می‌کند",
        "در SQLite ممکن است CEILING نام داشته باشد",
        "برای محاسبه تعداد صفحات مفید است",
      ],
      examples: [
        {
          title: "سقف حقوق",
          query:
            "SELECT Fname, Salary, CEIL(Salary/10000.0) as salary_ceiling FROM EMPLOYEE;",
          description: "گرد کردن به بالا برای ده‌هزارهای حقوق",
        },
      ],
    },

    // Individual Functions
    count: {
      title: "تابع COUNT - شمارش رکوردها",
      description:
        "تابع COUNT برای شمارش تعداد رکوردها یا مقادیر غیر NULL استفاده می‌شود.",
      syntax:
        "SELECT COUNT(*) FROM table_name; یا SELECT COUNT(column_name) FROM table_name;",
      tips: [
        "COUNT(*) همه رکوردها را می‌شمارد حتی NULL ها",
        "COUNT(column) فقط مقادیر غیر NULL را می‌شمارد",
        "معمولاً با GROUP BY استفاده می‌شود",
      ],
      examples: [
        {
          title: "تعداد کل کارمندان",
          query: "SELECT COUNT(*) as total_employees FROM EMPLOYEE;",
          description: "تعداد کل کارمندان در جدول",
        },
        {
          title: "تعداد کارمندان هر بخش",
          query:
            "SELECT Dno, COUNT(*) as employee_count FROM EMPLOYEE GROUP BY Dno;",
          description: "تعداد کارمندان در هر بخش",
        },
      ],
    },
    avg: {
      title: "تابع AVG - میانگین",
      description: "تابع AVG میانگین مقادیر عددی یک ستون را محاسبه می‌کند.",
      syntax: "SELECT AVG(column_name) FROM table_name;",
      tips: [
        "فقط روی ستون‌های عددی کار می‌کند",
        "مقادیر NULL نادیده گرفته می‌شوند",
        "نتیجه همیشه عدد اعشاری است",
      ],
      examples: [
        {
          title: "میانگین حقوق",
          query: "SELECT AVG(Salary) as average_salary FROM EMPLOYEE;",
          description: "میانگین حقوق همه کارمندان",
        },
      ],
    },
    sum: {
      title: "تابع SUM - مجموع",
      description: "تابع SUM مجموع تمام مقادیر عددی یک ستون را محاسبه می‌کند.",
      syntax: "SELECT SUM(column_name) FROM table_name;",
      tips: [
        "فقط روی ستون‌های عددی کار می‌کند",
        "مقادیر NULL نادیده گرفته می‌شوند",
        "برای محاسبه مجاميع بسیار مفید است",
      ],
      examples: [
        {
          title: "مجموع حقوق",
          query: "SELECT SUM(Salary) as total_salary FROM EMPLOYEE;",
          description: "مجموع حقوق پرداختی به همه کارمندان",
        },
      ],
    },
    max: {
      title: "تابع MAX - حداکثر مقدار",
      description: "تابع MAX بیشترین مقدار در یک ستون را پیدا می‌کند.",
      syntax: "SELECT MAX(column_name) FROM table_name;",
      tips: [
        "روی ستون‌های عددی، متنی و تاریخ کار می‌کند",
        "مقادیر NULL نادیده گرفته می‌شوند",
        "برای متن‌ها ترتیب الفبایی در نظر گرفته می‌شود",
      ],
      examples: [
        {
          title: "بالاترین حقوق",
          query: "SELECT MAX(Salary) as highest_salary FROM EMPLOYEE;",
          description: "بالاترین حقوق در شرکت",
        },
      ],
    },
    min: {
      title: "تابع MIN - کمترین مقدار",
      description: "تابع MIN کمترین مقدار در یک ستون را پیدا می‌کند.",
      syntax: "SELECT MIN(column_name) FROM table_name;",
      tips: [
        "روی ستون‌های عددی، متنی و تاریخ کار می‌کند",
        "مقادیر NULL نادیده گرفته می‌شوند",
        "برای متن‌ها ترتیب الفبایی در نظر گرفته می‌شود",
      ],
      examples: [
        {
          title: "کمترین حقوق",
          query: "SELECT MIN(Salary) as lowest_salary FROM EMPLOYEE;",
          description: "کمترین حقوق در شرکت",
        },
      ],
    },

    // String Functions
    concat: {
      title: "تابع CONCAT - چسباندن رشته‌ها",
      description:
        "تابع CONCAT برای چسباندن دو یا چند رشته به هم استفاده می‌شود.",
      syntax: "SELECT CONCAT(string1, string2, ...) FROM table_name;",
      tips: [
        "در SQLite از || استفاده کنید",
        "می‌توانید رشته‌های ثابت و ستون‌ها را ترکیب کنید",
        "اگر یکی از مقادیر NULL باشد، نتیجه NULL خواهد بود",
      ],
      examples: [
        {
          title: "نام کامل کارمندان",
          query: "SELECT Fname || ' ' || Lname as full_name FROM EMPLOYEE;",
          description: "نام و نام خانوادگی را با فاصله به هم می‌چسباند",
        },
      ],
    },
    len: {
      title: "تابع LENGTH - طول رشته",
      description: "تابع LENGTH طول یک رشته را برمی‌گرداند.",
      syntax: "SELECT LENGTH(string_column) FROM table_name;",
      tips: [
        "تعداد کاراکترها را می‌شمارد",
        "فاصله‌ها نیز شمرده می‌شوند",
        "برای NULL مقدار NULL برمی‌گرداند",
      ],
      examples: [
        {
          title: "طول نام کارمندان",
          query: "SELECT Fname, LENGTH(Fname) as name_length FROM EMPLOYEE;",
          description: "طول نام هر کارمند را نمایش می‌دهد",
        },
      ],
    },
    upper: {
      title: "تابع UPPER - حروف بزرگ",
      description: "تابع UPPER تمام حروف یک رشته را به حروف بزرگ تبدیل می‌کند.",
      syntax: "SELECT UPPER(string_column) FROM table_name;",
      tips: [
        "فقط حروف انگلیسی تبدیل می‌شوند",
        "اعداد و نمادها تغییر نمی‌کنند",
        "برای جستجوی غیرحساس به حروف مفید است",
      ],
      examples: [
        {
          title: "نام‌های با حروف بزرگ",
          query: "SELECT UPPER(Fname) as first_name FROM EMPLOYEE;",
          description: "نام کارمندان با حروف بزرگ",
        },
      ],
    },
    lower: {
      title: "تابع LOWER - حروف کوچک",
      description: "تابع LOWER تمام حروف یک رشته را به حروف کوچک تبدیل می‌کند.",
      syntax: "SELECT LOWER(string_column) FROM table_name;",
      tips: [
        "فقط حروف انگلیسی تبدیل می‌شوند",
        "اعداد و نمادها تغییر نمی‌کنند",
        "برای یکسان‌سازی متن‌ها مفید است",
      ],
      examples: [
        {
          title: "نام‌های با حروف کوچک",
          query: "SELECT LOWER(Lname) as last_name FROM EMPLOYEE;",
          description: "نام خانوادگی با حروف کوچک",
        },
      ],
    },

    // Date Functions
    "current-timestamp": {
      title: "تابع CURRENT_TIMESTAMP - زمان فعلی",
      description:
        "تابع CURRENT_TIMESTAMP تاریخ و زمان فعلی سیستم را برمی‌گرداند.",
      syntax: "SELECT CURRENT_TIMESTAMP;",
      tips: [
        "شامل تاریخ و زمان است",
        "بر اساس تنظیمات سرور",
        "برای ثبت زمان ایجاد/تغییر مفید است",
      ],
      examples: [
        {
          title: "زمان فعلی",
          query: "SELECT CURRENT_TIMESTAMP as current_time;",
          description: "زمان فعلی سیستم را نمایش می‌دهد",
        },
      ],
    },
    year: {
      title: "استخراج سال از تاریخ",
      description: "برای استخراج سال از یک ستون تاریخ استفاده می‌شود.",
      syntax: "SELECT strftime('%Y', date_column) FROM table_name;",
      tips: [
        "در SQLite از strftime استفاده کنید",
        "%Y برای سال 4 رقمی",
        "مفید برای گروه‌بندی بر اساس سال",
      ],
      examples: [
        {
          title: "سال تولد کارمندان",
          query:
            "SELECT Fname, strftime('%Y', Bdate) as birth_year FROM EMPLOYEE;",
          description: "سال تولد هر کارمند را نمایش می‌دهد",
        },
      ],
    },
    month: {
      title: "استخراج ماه از تاریخ",
      description: "برای استخراج ماه از یک ستون تاریخ استفاده می‌شود.",
      syntax: "SELECT strftime('%m', date_column) FROM table_name;",
      tips: [
        "در SQLite از strftime استفاده کنید",
        "%m برای ماه (01-12)",
        "مفید برای آمار ماهانه",
      ],
      examples: [
        {
          title: "ماه تولد کارمندان",
          query:
            "SELECT Fname, strftime('%m', Bdate) as birth_month FROM EMPLOYEE;",
          description: "ماه تولد هر کارمند را نمایش می‌دهد",
        },
      ],
    },
    day: {
      title: "استخراج روز از تاریخ",
      description: "برای استخراج روز از یک ستون تاریخ استفاده می‌شود.",
      syntax: "SELECT strftime('%d', date_column) FROM table_name;",
      tips: [
        "در SQLite از strftime استفاده کنید",
        "%d برای روز (01-31)",
        "مفید برای آمار روزانه",
      ],
      examples: [
        {
          title: "روز تولد کارمندان",
          query:
            "SELECT Fname, strftime('%d', Bdate) as birth_day FROM EMPLOYEE;",
          description: "روز تولد هر کارمند را نمایش می‌دهد",
        },
      ],
    },

    // Tables
    datatypes: {
      title: "انواع داده‌ها (Data Types)",
      description:
        "انواع داده‌ها نوع اطلاعاتی که در هر ستون ذخیره می‌شود را مشخص می‌کنند.",
      syntax: "CREATE TABLE table_name (column_name DATATYPE);",
      tips: [
        "INTEGER برای اعداد صحیح",
        "REAL برای اعداد اعشاری",
        "TEXT برای متن",
        "BLOB برای داده‌های باینری",
      ],
      examples: [
        {
          title: "جدول با انواع داده مختلف",
          query:
            "CREATE TABLE SAMPLE (id INTEGER, name TEXT, price REAL, data BLOB);",
          description: "جدول نمونه با انواع داده مختلف",
        },
      ],
    },
    "create-table": {
      title: "ایجاد جدول با CREATE TABLE",
      description:
        "دستور CREATE TABLE برای ایجاد جدول جدید در دیتابیس استفاده می‌شود.",
      syntax:
        "CREATE TABLE table_name (column1 datatype, column2 datatype, ...);",
      tips: [
        "نام جدول باید منحصر به فرد باشد",
        "نوع داده هر ستون را مشخص کنید",
        "محدودیت‌ها را تعریف کنید",
      ],
      examples: [
        {
          title: "ایجاد جدول ساده",
          query:
            "CREATE TABLE STUDENT (id INTEGER PRIMARY KEY, name TEXT, age INTEGER);",
          description: "جدول دانشجو با سه ستون",
        },
      ],
    },
    "alter-table": {
      title: "تغییر جدول با ALTER TABLE",
      description:
        "دستور ALTER TABLE برای تغییر ساختار جدول موجود استفاده می‌شود.",
      syntax: "ALTER TABLE table_name ADD COLUMN column_name datatype;",
      tips: [
        "می‌توانید ستون جدید اضافه کنید",
        "تغییر نام جدول امکان‌پذیر است",
        "در SQLite امکانات محدودی دارد",
      ],
      examples: [
        {
          title: "اضافه کردن ستون",
          query: "ALTER TABLE EMPLOYEE ADD COLUMN Email TEXT;",
          description: "ستون ایمیل به جدول کارمندان اضافه می‌کند",
        },
      ],
    },
    constraints: {
      title: "محدودیت‌های جدول (Constraints)",
      description:
        "محدودیت‌ها قوانینی هستند که بر روی داده‌های جدول اعمال می‌شوند.",
      syntax: "CREATE TABLE table_name (column datatype CONSTRAINT);",
      tips: [
        "NOT NULL اجباری بودن مقدار",
        "UNIQUE منحصر به فرد بودن",
        "CHECK شرط خاص",
      ],
      examples: [
        {
          title: "جدول با محدودیت‌ها",
          query:
            "CREATE TABLE PRODUCT (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL CHECK(price > 0));",
          description: "جدول محصول با محدودیت‌های مختلف",
        },
      ],
    },
    "primary-key": {
      title: "کلید اصلی (Primary Key)",
      description: "Primary Key شناسه منحصر به فرد هر رکورد در جدول است.",
      syntax: "CREATE TABLE table_name (id INTEGER PRIMARY KEY, ...);",
      tips: [
        "هر جدول فقط یک Primary Key دارد",
        "نمی‌تواند NULL باشد",
        "خودکار ایندکس ایجاد می‌شود",
      ],
      examples: [
        {
          title: "تعریف کلید اصلی",
          query:
            "CREATE TABLE COURSE (course_id INTEGER PRIMARY KEY, title TEXT);",
          description: "جدول درس با کلید اصلی",
        },
      ],
    },
    "foreign-key": {
      title: "کلید خارجی (Foreign Key)",
      description: "Foreign Key ارتباط بین دو جدول را برقرار می‌کند.",
      syntax:
        "CREATE TABLE table_name (id INTEGER, parent_id INTEGER, FOREIGN KEY (parent_id) REFERENCES parent_table(id));",
      tips: [
        "به کلید اصلی جدول دیگر اشاره می‌کند",
        "یکپارچگی ارجاعی را تضمین می‌کند",
        "می‌تواند NULL باشد",
      ],
      examples: [
        {
          title: "تعریف کلید خارجی",
          query:
            "CREATE TABLE ORDER_ITEM (item_id INTEGER PRIMARY KEY, order_id INTEGER, FOREIGN KEY (order_id) REFERENCES ORDERS(id));",
          description: "جدول آیتم سفارش با کلید خارجی",
        },
      ],
    },
    index: {
      title: "ایندکس‌ها (Indexes)",
      description:
        "ایندکس‌ها برای بهبود سرعت جستجو و عملکرد کوئری‌ها استفاده می‌شوند.",
      syntax: "CREATE INDEX index_name ON table_name(column_name);",
      tips: [
        "سرعت SELECT را افزایش می‌دهد",
        "INSERT/UPDATE/DELETE کندتر می‌شود",
        "روی ستون‌های پرجستجو ایندکس بگذارید",
      ],
      examples: [
        {
          title: "ایجاد ایندکس",
          query: "CREATE INDEX idx_employee_salary ON EMPLOYEE(Salary);",
          description: "ایندکس برای سرعت جستجوی حقوق",
        },
      ],
    },
    "drop-table": {
      title: "حذف جدول با DROP TABLE",
      description:
        "دستور DROP TABLE برای حذف کامل جدول از دیتابیس استفاده می‌شود.",
      syntax: "DROP TABLE table_name;",
      tips: [
        "⚠️ عمل برگشت‌ناپذیر است",
        "همه داده‌ها حذف می‌شوند",
        "IF EXISTS برای جلوگیری از خطا",
      ],
      examples: [
        {
          title: "حذف جدول",
          query: "DROP TABLE IF EXISTS TEMP_TABLE;",
          description: "حذف جدول موقت اگر وجود داشته باشد",
        },
      ],
    },
    "not-null": {
      title: "محدودیت NOT NULL",
      description: "محدودیت NOT NULL از خالی بودن ستون جلوگیری می‌کند.",
      syntax: "CREATE TABLE table_name (column_name datatype NOT NULL);",
      tips: [
        "مقدار NULL قابل قبول نیست",
        "اجباری کردن ورود مقدار",
        "برای فیلدهای ضروری استفاده کنید",
      ],
      examples: [
        {
          title: "ستون اجباری",
          query:
            "CREATE TABLE USER (id INTEGER PRIMARY KEY, email TEXT NOT NULL);",
          description: "جدول کاربر با ایمیل اجباری",
        },
      ],
    },
    unique: {
      title: "محدودیت UNIQUE",
      description: "محدودیت UNIQUE از تکراری بودن مقادیر جلوگیری می‌کند.",
      syntax: "CREATE TABLE table_name (column_name datatype UNIQUE);",
      tips: [
        "هر مقدار فقط یک بار مجاز است",
        "NULL مجاز است (معمولاً)",
        "برای فیلدهای منحصر به فرد مثل ایمیل",
      ],
      examples: [
        {
          title: "ایمیل منحصر به فرد",
          query:
            "CREATE TABLE USER (id INTEGER PRIMARY KEY, email TEXT UNIQUE);",
          description: "هر ایمیل فقط یک بار قابل استفاده",
        },
      ],
    },
    check: {
      title: "محدودیت CHECK",
      description: "محدودیت CHECK شرط خاصی را روی مقادیر ستون اعمال می‌کند.",
      syntax:
        "CREATE TABLE table_name (column_name datatype CHECK (condition));",
      tips: [
        "شرط باید درست یا نادرست باشد",
        "برای اعتبارسنجی داده‌ها",
        "می‌تواند چند ستون را شامل شود",
      ],
      examples: [
        {
          title: "بررسی محدوده سن",
          query:
            "CREATE TABLE PERSON (id INTEGER, age INTEGER CHECK (age >= 0 AND age <= 120));",
          description: "سن باید بین 0 تا 120 باشد",
        },
      ],
    },
    default: {
      title: "مقدار پیش‌فرض DEFAULT",
      description: "DEFAULT مقدار پیش‌فرض برای ستون تعیین می‌کند.",
      syntax: "CREATE TABLE table_name (column_name datatype DEFAULT value);",
      tips: [
        "در صورت عدم ورود مقدار اعمال می‌شود",
        "می‌تواند مقدار ثابت یا تابع باشد",
        "برای تاریخ می‌تواند CURRENT_TIMESTAMP باشد",
      ],
      examples: [
        {
          title: "مقدار پیش‌فرض",
          query:
            "CREATE TABLE POST (id INTEGER, title TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);",
          description: "تاریخ ایجاد خودکار ثبت می‌شود",
        },
      ],
    },
    "auto-increment": {
      title: "افزایش خودکار AUTO INCREMENT",
      description: "AUTO INCREMENT شماره خودکار برای کلید اصلی تولید می‌کند.",
      syntax: "CREATE TABLE table_name (id INTEGER PRIMARY KEY AUTOINCREMENT);",
      tips: [
        "فقط برای INTEGER PRIMARY KEY",
        "خودکار افزایش می‌یابد",
        "هرگز تکرار نمی‌شود",
      ],
      examples: [
        {
          title: "شماره خودکار",
          query:
            "CREATE TABLE ARTICLE (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT);",
          description: "شماره مقاله خودکار تولید می‌شود",
        },
      ],
    },
  };

  const content = learningContent[topic];

  if (!content) {
    return null;
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      centered
      title={
        <div className="text-center py-2">
          <Space size="middle">
            <span className="text-xl">📖</span>
            <Text strong className="text-lg text-blue-600 dark:text-blue-400">
              {content.title}
            </Text>
          </Space>
        </div>
      }
      styles={{
        body: {
          maxHeight: "75vh",
          overflowY: "auto",
          padding: 0,
        },
      }}
    >
      <div className="p-6 bg-white dark:bg-gray-900 space-y-6" dir="rtl">
        {/* Description */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-800 dark:text-gray-200 text-center text-base leading-relaxed m-0">
            {content.description}
          </p>
        </div>

        {/* Syntax */}
        <div>
          <h4 className="text-green-600 dark:text-green-400 mb-3 mt-0 text-lg font-semibold">
            🔧 ساختار کلی
          </h4>
          <div className="bg-gray-900 dark:bg-gray-800 border border-gray-700 dark:border-gray-600 p-4 rounded-lg">
            <code
              className="text-gray-300 dark:text-gray-400 text-sm font-mono block"
              dir="ltr"
            >
              {content.syntax}
            </code>
          </div>
        </div>

        {/* Tips */}
        <div>
          <h4 className="text-amber-600 dark:text-amber-400 mb-4 mt-0 text-lg font-semibold">
            💡 نکات مهم
          </h4>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <ul className="m-0 pr-5 space-y-3">
              {content.tips.map((tip, index) => (
                <li
                  key={index}
                  className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed"
                >
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Examples */}
        <div>
          <h4 className="text-red-600 dark:text-red-400 mb-5 mt-0 text-lg font-semibold">
            🔥 مثال‌های کاربردی با دیتابیس COMPANY
          </h4>
          <div className="space-y-6">
            {content.examples.map((example, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5"
              >
                <div className="mb-4">
                  <h5 className="text-blue-600 dark:text-blue-400 text-base font-semibold mb-2 mt-0">
                    {example.title}
                  </h5>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 mt-0">
                    {example.description}
                  </p>
                </div>

                <div className="bg-gray-900 dark:bg-black border-2 border-gray-700 dark:border-gray-600 rounded-lg p-5 relative overflow-auto">
                  <Button
                    type="text"
                    icon={<CopyOutlined />}
                    onClick={() => copyToClipboard(example.query)}
                    className="absolute top-3 left-3 text-gray-400 hover:text-gray-200 hover:bg-gray-700 border border-gray-600"
                    size="small"
                  />
                  <pre
                    className="text-gray-100 dark:text-gray-200 text-sm leading-relaxed font-mono mr-10 mt-0 mb-0 overflow-x-auto"
                    dir="ltr"
                  >
                    {example.query}
                  </pre>
                </div>

                {index < content.examples.length - 1 && (
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-6"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center p-5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl border-2 border-blue-400 dark:border-blue-300 mt-2">
          <span className="text-white text-base font-medium drop-shadow-sm">
            💻 آماده تمرین هستید؟ این کوئری‌ها را در محیط تمرین امتحان کنید!
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default SQLLearningModal;
