"use client";

import { Modal, Typography, Space, Button, Divider } from "antd";
import { CopyOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const SQLLearningModal = ({ open, onClose, topic }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const learningContent = {
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
        {
          title: "محدود کردن نتایج",
          query: "SELECT * FROM EMPLOYEE LIMIT 5;",
          description: "فقط 5 کارمند اول را نمایش می‌دهد",
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
        {
          title: "اضافه کردن بخش جدید",
          query: `INSERT INTO DEPARTMENT (Dname, Dnumber, Mgr_ssn, Mgr_start_date) 
VALUES ('فناوری اطلاعات', 6, '333445555', '2024-01-01');`,
          description: "بخش جدید با مدیر و تاریخ شروع مدیریت",
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
          query: `UPDATE EMPLOYEE 
SET Salary = 45000 
WHERE Ssn = '123456789';`,
          description: "حقوق کارمند با شماره ملی مشخص را تغییر می‌دهد",
        },
        {
          title: "تغییر آدرس کارمند",
          query: `UPDATE EMPLOYEE 
SET Address = 'تهران، خیابان آزادی' 
WHERE Fname = 'John' AND Lname = 'Smith';`,
          description: "آدرس کارمند مشخص را بروزرسانی می‌کند",
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
          query: `DELETE FROM PROJECT 
WHERE Pnumber = 999;`,
          description: "پروژه با شماره مشخص را حذف می‌کند",
        },
        {
          title: "حذف کارمندان بازنشسته",
          query: `DELETE FROM EMPLOYEE 
WHERE YEAR(CURRENT_DATE) - YEAR(Bdate) > 65;`,
          description: "کارمندان بالای 65 سال را حذف می‌کند",
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
          query: `SELECT * FROM EMPLOYEE 
WHERE Sex = 'F';`,
          description: "فقط کارمندان زن را نمایش می‌دهد",
        },
        {
          title: "فیلتر بر اساس حقوق",
          query: `SELECT Fname, Lname, Salary FROM EMPLOYEE 
WHERE Salary > 35000;`,
          description: "کارمندان با حقوق بالای 35000 را نشان می‌دهد",
        },
        {
          title: "شرایط ترکیبی",
          query: `SELECT * FROM EMPLOYEE 
WHERE Sex = 'M' AND Salary > 30000;`,
          description: "کارمندان مرد با حقوق بالای 30000",
        },
      ],
    },
    operators: {
      title: "عملگرهای SQL",
      description:
        "عملگرهای SQL برای مقایسه و بررسی شرایط در کوئری‌ها استفاده می‌شوند.",
      syntax: "WHERE column operator value",
      tips: [
        "= برای برابری دقیق استفاده می‌شود",
        "<> یا != برای نابرابری استفاده می‌شود",
        "برای مقایسه اعداد از >, <, >=, <= استفاده کنید",
      ],
      examples: [
        {
          title: "مقایسه برابری",
          query: `SELECT * FROM EMPLOYEE 
WHERE Sex = 'M';`,
          description: "کارمندان مرد را نمایش می‌دهد",
        },
        {
          title: "مقایسه عددی",
          query: `SELECT Fname, Lname, Salary FROM EMPLOYEE 
WHERE Salary >= 40000;`,
          description: "کارمندان با حقوق 40000 یا بالاتر",
        },
        {
          title: "نابرابری",
          query: `SELECT * FROM EMPLOYEE 
WHERE Dno <> 5;`,
          description: "کارمندان که در بخش 5 نیستند",
        },
      ],
    },
    "order-by": {
      title: "دستور ORDER BY در SQL",
      description:
        "ORDER BY برای مرتب‌سازی نتایج کوئری بر اساس یک یا چند ستون استفاده می‌شود.",
      syntax:
        "SELECT * FROM table_name ORDER BY column1 ASC/DESC, column2 ASC/DESC",
      tips: [
        "ASC برای مرتب‌سازی صعودی (پیش‌فرض)",
        "DESC برای مرتب‌سازی نزولی",
        "می‌توانید بر اساس چند ستون مرتب‌سازی کنید",
      ],
      examples: [
        {
          title: "مرتب‌سازی بر اساس حقوق",
          query: `SELECT Fname, Lname, Salary FROM EMPLOYEE 
ORDER BY Salary DESC;`,
          description: "کارمندان از بالاترین حقوق به پایین‌ترین",
        },
        {
          title: "مرتب‌سازی بر اساس نام",
          query: `SELECT * FROM EMPLOYEE 
ORDER BY Lname ASC, Fname ASC;`,
          description: "مرتب‌سازی بر اساس نام خانوادگی سپس نام",
        },
      ],
    },
    like: {
      title: "عملگر LIKE در SQL",
      description:
        "LIKE برای جستجوی الگو در متن استفاده می‌شود. با % و _ کار می‌کند.",
      syntax: "SELECT * FROM table_name WHERE column LIKE 'pattern'",
      tips: [
        "% نشان‌دهنده هر تعداد کاراکتر (صفر یا بیشتر)",
        "_ نشان‌دهنده دقیقاً یک کاراکتر",
        "برای جستجوی حساس به حروف بزرگ و کوچک دقت کنید",
      ],
      examples: [
        {
          title: "شروع با حرف خاص",
          query: `SELECT * FROM EMPLOYEE 
WHERE Fname LIKE 'J%';`,
          description: "کارمندانی که نامشان با J شروع می‌شود",
        },
        {
          title: "شامل کلمه خاص",
          query: `SELECT * FROM EMPLOYEE 
WHERE Address LIKE '%تهران%';`,
          description: "کارمندانی که در آدرسشان کلمه تهران است",
        },
        {
          title: "الگوی دقیق",
          query: `SELECT * FROM EMPLOYEE 
WHERE Ssn LIKE '12345____';`,
          description: "شماره ملی که با 12345 شروع و 9 رقمی است",
        },
      ],
    },
    in: {
      title: "عملگر IN در SQL",
      description:
        "IN برای بررسی اینکه آیا مقدار یک ستون در لیست مقادیر مشخص وجود دارد.",
      syntax: "SELECT * FROM table_name WHERE column IN (value1, value2, ...)",
      tips: [
        "جایگزین مناسب برای چندین OR",
        "می‌توانید از آن با زیرکوئری استفاده کنید",
        "NOT IN برای عکس شرط استفاده می‌شود",
      ],
      examples: [
        {
          title: "انتخاب از چند بخش",
          query: `SELECT * FROM EMPLOYEE 
WHERE Dno IN (1, 4, 5);`,
          description: "کارمندان بخش‌های 1، 4 و 5",
        },
        {
          title: "استفاده با متن",
          query: `SELECT * FROM EMPLOYEE 
WHERE Fname IN ('John', 'Ahmad', 'Sara');`,
          description: "کارمندان با نام‌های مشخص",
        },
        {
          title: "NOT IN",
          query: `SELECT * FROM EMPLOYEE 
WHERE Dno NOT IN (5);`,
          description: "کارمندانی که در بخش 5 نیستند",
        },
      ],
    },
    between: {
      title: "عملگر BETWEEN در SQL",
      description:
        "BETWEEN برای بررسی اینکه آیا مقدار در بازه مشخصی قرار دارد.",
      syntax: "SELECT * FROM table_name WHERE column BETWEEN value1 AND value2",
      tips: [
        "شامل هر دو مقدار ابتدا و انتها می‌شود",
        "معادل >= value1 AND <= value2",
        "NOT BETWEEN برای خارج از بازه",
      ],
      examples: [
        {
          title: "بازه حقوق",
          query: `SELECT Fname, Lname, Salary FROM EMPLOYEE 
WHERE Salary BETWEEN 30000 AND 50000;`,
          description: "کارمندان با حقوق بین 30 تا 50 هزار",
        },
        {
          title: "بازه تاریخی",
          query: `SELECT * FROM PROJECT 
WHERE Mgr_start_date BETWEEN '2020-01-01' AND '2024-12-31';`,
          description: "پروژه‌هایی که در بازه زمانی مشخص شروع شدند",
        },
      ],
    },
    join: {
      title: "دستور JOIN در SQL",
      description:
        "JOIN برای ترکیب اطلاعات از چندین جدول بر اساس روابط بینشان استفاده می‌شود.",
      syntax:
        "SELECT * FROM table1 JOIN table2 ON table1.column = table2.column",
      tips: [
        "INNER JOIN: فقط رکوردهای مطابق در هر دو جدول",
        "LEFT JOIN: همه رکوردهای جدول چپ + مطابق‌ها از راست",
        "RIGHT JOIN: همه رکوردهای جدول راست + مطابق‌ها از چپ",
        "FULL JOIN: همه رکوردها از هر دو جدول",
      ],
      examples: [
        {
          title: "اتصال کارمند و بخش",
          query: `SELECT E.Fname, E.Lname, D.Dname 
FROM EMPLOYEE E 
JOIN DEPARTMENT D ON E.Dno = D.Dnumber;`,
          description: "نام کارمندان همراه با نام بخششان",
        },
        {
          title: "LEFT JOIN",
          query: `SELECT E.Fname, E.Lname, D.Dname 
FROM EMPLOYEE E 
LEFT JOIN DEPARTMENT D ON E.Dno = D.Dnumber;`,
          description: "همه کارمندان حتی اگر بخش نداشته باشند",
        },
        {
          title: "JOIN چندگانه",
          query: `SELECT E.Fname, D.Dname, P.Pname 
FROM EMPLOYEE E 
JOIN DEPARTMENT D ON E.Dno = D.Dnumber 
JOIN WORKS_ON W ON E.Ssn = W.Essn 
JOIN PROJECT P ON W.Pno = P.Pnumber;`,
          description: "کارمند، بخش و پروژه‌های آنها",
        },
      ],
    },
    union: {
      title: "دستور UNION در SQL",
      description:
        "UNION برای ترکیب نتایج دو یا چند کوئری SELECT استفاده می‌شود.",
      syntax: "SELECT columns FROM table1 UNION SELECT columns FROM table2",
      tips: [
        "تعداد ستون‌ها در همه SELECT‌ها باید یکسان باشد",
        "نوع داده ستون‌ها باید سازگار باشد",
        "UNION ALL برای نگه‌داشتن تکراری‌ها",
      ],
      examples: [
        {
          title: "ترکیب نام‌ها",
          query: `SELECT Fname AS Name FROM EMPLOYEE 
UNION 
SELECT Dname AS Name FROM DEPARTMENT;`,
          description: "لیست ترکیبی از نام کارمندان و بخش‌ها",
        },
        {
          title: "UNION ALL",
          query: `SELECT Ssn FROM EMPLOYEE WHERE Sex = 'M' 
UNION ALL 
SELECT Ssn FROM EMPLOYEE WHERE Salary > 40000;`,
          description: "کارمندان مرد و پردرآمد (با تکرار)",
        },
      ],
    },
    "group-by": {
      title: "دستور GROUP BY در SQL",
      description:
        "GROUP BY برای گروه‌بندی رکوردها بر اساس مقادیر یکسان استفاده می‌شود.",
      syntax:
        "SELECT column, aggregate_function(column) FROM table GROUP BY column",
      tips: [
        "معمولاً با توابع تجمیعی استفاده می‌شود",
        "ستون‌های غیرتجمیعی باید در GROUP BY باشند",
        "ترتیب گروه‌بندی مهم است",
      ],
      examples: [
        {
          title: "تعداد کارمند هر بخش",
          query: `SELECT Dno, COUNT(*) as Employee_Count 
FROM EMPLOYEE 
GROUP BY Dno;`,
          description: "تعداد کارمندان در هر بخش",
        },
        {
          title: "میانگین حقوق بر اساس جنسیت",
          query: `SELECT Sex, AVG(Salary) as Average_Salary 
FROM EMPLOYEE 
GROUP BY Sex;`,
          description: "میانگین حقوق مردان و زنان",
        },
        {
          title: "گروه‌بندی چندگانه",
          query: `SELECT Dno, Sex, COUNT(*) as Count 
FROM EMPLOYEE 
GROUP BY Dno, Sex;`,
          description: "تعداد کارمندان بر اساس بخش و جنسیت",
        },
      ],
    },
    having: {
      title: "بند HAVING در SQL",
      description:
        "HAVING برای فیلتر کردن گروه‌ها پس از GROUP BY استفاده می‌شود.",
      syntax:
        "SELECT column, aggregate_function(column) FROM table GROUP BY column HAVING condition",
      tips: [
        "WHERE قبل از گروه‌بندی، HAVING بعد از گروه‌بندی عمل می‌کند",
        "فقط با توابع تجمیعی یا ستون‌های GROUP BY کار می‌کند",
        "برای فیلتر گروه‌ها بر اساس نتایج تجمیعی",
      ],
      examples: [
        {
          title: "بخش‌های پرجمعیت",
          query: `SELECT Dno, COUNT(*) as Employee_Count 
FROM EMPLOYEE 
GROUP BY Dno 
HAVING COUNT(*) > 3;`,
          description: "بخش‌هایی که بیش از 3 کارمند دارند",
        },
        {
          title: "بخش‌های پردرآمد",
          query: `SELECT Dno, AVG(Salary) as Avg_Salary 
FROM EMPLOYEE 
GROUP BY Dno 
HAVING AVG(Salary) > 35000;`,
          description: "بخش‌هایی با میانگین حقوق بالای 35000",
        },
      ],
    },
    case: {
      title: "دستور CASE در SQL",
      description: "CASE برای ایجاد منطق شرطی در کوئری‌ها استفاده می‌شود.",
      syntax:
        "CASE WHEN condition THEN result WHEN condition THEN result ELSE result END",
      tips: [
        "مثل if-else در برنامه‌نویسی عمل می‌کند",
        "می‌توانید چندین WHEN داشته باشید",
        "ELSE اختیاری است",
      ],
      examples: [
        {
          title: "طبقه‌بندی حقوق",
          query: `SELECT Fname, Lname, Salary,
CASE 
  WHEN Salary >= 40000 THEN 'بالا'
  WHEN Salary >= 30000 THEN 'متوسط'
  ELSE 'پایین'
END AS Salary_Level
FROM EMPLOYEE;`,
          description: "طبقه‌بندی کارمندان بر اساس حقوق",
        },
        {
          title: "محاسبه پاداش",
          query: `SELECT Fname, Lname, Salary,
CASE 
  WHEN Salary > 35000 THEN Salary * 0.1
  ELSE Salary * 0.05
END AS Bonus
FROM EMPLOYEE;`,
          description: "محاسبه پاداش بر اساس حقوق",
        },
      ],
    },
    distinct: {
      title: "کلمه کلیدی DISTINCT در SQL",
      description: "DISTINCT برای حذف رکوردهای تکراری از نتایج استفاده می‌شود.",
      syntax: "SELECT DISTINCT column1, column2 FROM table_name",
      tips: [
        "فقط رکوردهای منحصر به فرد را برمی‌گرداند",
        "روی تمام ستون‌های انتخاب شده اعمال می‌شود",
        "ممکن است کندی ایجاد کند در جداول بزرگ",
      ],
      examples: [
        {
          title: "بخش‌های منحصر به فرد",
          query: `SELECT DISTINCT Dno FROM EMPLOYEE;`,
          description: "لیست شماره بخش‌هایی که کارمند دارند",
        },
        {
          title: "ترکیب منحصر به فرد",
          query: `SELECT DISTINCT Dno, Sex FROM EMPLOYEE;`,
          description: "ترکیبات منحصر به فرد بخش و جنسیت",
        },
      ],
    },
    exists: {
      title: "عملگر EXISTS در SQL",
      description: "EXISTS برای بررسی وجود رکورد در زیرکوئری استفاده می‌شود.",
      syntax:
        "SELECT * FROM table1 WHERE EXISTS (SELECT * FROM table2 WHERE condition)",
      tips: [
        "TRUE برمی‌گرداند اگر زیرکوئری حداقل یک رکورد داشته باشد",
        "NOT EXISTS برای عکس شرط",
        "معمولاً سریع‌تر از IN در برخی حالات",
      ],
      examples: [
        {
          title: "کارمندان دارای پروژه",
          query: `SELECT E.Fname, E.Lname 
FROM EMPLOYEE E 
WHERE EXISTS (
  SELECT 1 FROM WORKS_ON W 
  WHERE W.Essn = E.Ssn
);`,
          description: "کارمندانی که حداقل یک پروژه دارند",
        },
        {
          title: "NOT EXISTS",
          query: `SELECT E.Fname, E.Lname 
FROM EMPLOYEE E 
WHERE NOT EXISTS (
  SELECT 1 FROM WORKS_ON W 
  WHERE W.Essn = E.Ssn
);`,
          description: "کارمندانی که هیچ پروژه‌ای ندارند",
        },
      ],
    },
    "any-all": {
      title: "عملگرهای ANY و ALL در SQL",
      description:
        "ANY و ALL برای مقایسه با مجموعه‌ای از مقادیر از زیرکوئری استفاده می‌شوند.",
      syntax: "SELECT * FROM table WHERE column operator ANY/ALL (subquery)",
      tips: [
        "ANY: TRUE اگر با حداقل یکی از مقادیر شرط برقرار باشد",
        "ALL: TRUE اگر با همه مقادیر شرط برقرار باشد",
        "SOME معادل ANY است",
      ],
      examples: [
        {
          title: "ANY - حقوق بالاتر از هر یک",
          query: `SELECT Fname, Lname, Salary 
FROM EMPLOYEE 
WHERE Salary > ANY (
  SELECT Salary FROM EMPLOYEE WHERE Dno = 5
);`,
          description: "کارمندانی با حقوق بالاتر از هر یک از کارمندان بخش 5",
        },
        {
          title: "ALL - حقوق بالاتر از همه",
          query: `SELECT Fname, Lname, Salary 
FROM EMPLOYEE 
WHERE Salary > ALL (
  SELECT Salary FROM EMPLOYEE WHERE Dno = 5
);`,
          description: "کارمندانی با حقوق بالاتر از همه کارمندان بخش 5",
        },
      ],
    },
    ifnull: {
      title: "تابع IFNULL در SQL",
      description:
        "IFNULL برای جایگزینی مقادیر NULL با مقدار دیگری استفاده می‌شود.",
      syntax: "IFNULL(expression, replacement_value)",
      tips: [
        "اگر expression برابر NULL باشد، replacement_value برمی‌گردد",
        "در SQLite از COALESCE استفاده کنید",
        "در SQL Server از ISNULL استفاده کنید",
      ],
      examples: [
        {
          title: "جایگزینی NULL در آدرس",
          query: `SELECT Fname, Lname, 
IFNULL(Address, 'آدرس نامشخص') as Address 
FROM EMPLOYEE;`,
          description: "نمایش آدرس یا متن پیش‌فرض",
        },
        {
          title: "محاسبه با NULL",
          query: `SELECT Fname, Lname, 
IFNULL(Salary, 0) + IFNULL(Bonus, 0) as Total_Income 
FROM EMPLOYEE;`,
          description: "محاسبه درآمد کل با در نظر گیری NULL",
        },
      ],
    },
    "null-values": {
      title: "مقادیر NULL در SQL",
      description: "NULL نمایانگر عدم وجود یا نامشخص بودن مقدار است.",
      syntax: "WHERE column IS NULL / WHERE column IS NOT NULL",
      tips: [
        "از = NULL استفاده نکنید، IS NULL استفاده کنید",
        "NULL در محاسبات نتیجه NULL می‌دهد",
        "NULL در مقایسه‌ها UNKNOWN برمی‌گرداند",
      ],
      examples: [
        {
          title: "پیدا کردن مقادیر NULL",
          query: `SELECT * FROM EMPLOYEE 
WHERE Address IS NULL;`,
          description: "کارمندانی که آدرس ندارند",
        },
        {
          title: "حذف مقادیر NULL",
          query: `SELECT * FROM EMPLOYEE 
WHERE Salary IS NOT NULL;`,
          description: "کارمندانی که حقوق مشخص دارند",
        },
        {
          title: "شمارش با NULL",
          query: `SELECT 
COUNT(*) as Total_Employees,
COUNT(Address) as Employees_With_Address
FROM EMPLOYEE;`,
          description: "مقایسه تعداد کل با تعداد دارای آدرس",
        },
      ],
    },
    aliases: {
      title: "نام‌های مستعار (Aliases) در SQL",
      description:
        "Aliases برای دادن نام موقت به جداول یا ستون‌ها استفاده می‌شود.",
      syntax: "SELECT column AS alias_name FROM table_name AS table_alias",
      tips: [
        "AS اختیاری است، می‌توانید حذف کنید",
        "برای خوانایی بهتر کوئری مفید است",
        "در JOIN برای تمایز جداول ضروری است",
      ],
      examples: [
        {
          title: "Alias برای ستون",
          query: `SELECT Fname AS 'نام', 
Lname AS 'نام خانوادگی', 
Salary AS 'حقوق' 
FROM EMPLOYEE;`,
          description: "تغییر نام ستون‌ها در نتیجه",
        },
        {
          title: "Alias برای جدول",
          query: `SELECT E.Fname, E.Lname, D.Dname 
FROM EMPLOYEE E, DEPARTMENT D 
WHERE E.Dno = D.Dnumber;`,
          description: "استفاده از نام کوتاه برای جداول",
        },
        {
          title: "Alias برای محاسبه",
          query: `SELECT Fname, Lname, 
Salary * 12 AS Annual_Salary 
FROM EMPLOYEE;`,
          description: "نام دادن به نتیجه محاسبه",
        },
      ],
    },
    count: {
      title: "تابع COUNT در SQL",
      description: "COUNT برای شمارش تعداد رکوردها در کوئری استفاده می‌شود.",
      syntax: "SELECT COUNT(column_name) FROM table_name",
      tips: [
        "COUNT(*) همه رکوردها را می‌شمارد",
        "COUNT(column) فقط مقادیر غیر NULL را می‌شمارد",
        "معمولاً با GROUP BY استفاده می‌شود",
      ],
      examples: [
        {
          title: "شمارش کل کارمندان",
          query: `SELECT COUNT(*) as Total_Employees 
FROM EMPLOYEE;`,
          description: "تعداد کل کارمندان شرکت",
        },
        {
          title: "شمارش با شرط",
          query: `SELECT COUNT(*) as Male_Employees 
FROM EMPLOYEE 
WHERE Sex = 'M';`,
          description: "تعداد کارمندان مرد",
        },
        {
          title: "شمارش در هر گروه",
          query: `SELECT Dno, COUNT(*) as Employee_Count 
FROM EMPLOYEE 
GROUP BY Dno;`,
          description: "تعداد کارمندان در هر بخش",
        },
      ],
    },
    avg: {
      title: "تابع AVG در SQL",
      description: "AVG برای محاسبه میانگین مقادیر عددی استفاده می‌شود.",
      syntax: "SELECT AVG(column_name) FROM table_name",
      tips: [
        "فقط با ستون‌های عددی کار می‌کند",
        "مقادیر NULL در محاسبه نادیده گرفته می‌شوند",
        "نتیجه همیشه عدد اعشاری است",
      ],
      examples: [
        {
          title: "میانگین حقوق کل",
          query: `SELECT AVG(Salary) as Average_Salary 
FROM EMPLOYEE;`,
          description: "میانگین حقوق همه کارمندان",
        },
        {
          title: "میانگین بر اساس جنسیت",
          query: `SELECT Sex, AVG(Salary) as Avg_Salary 
FROM EMPLOYEE 
GROUP BY Sex;`,
          description: "میانگین حقوق مردان و زنان جداگانه",
        },
      ],
    },
    sum: {
      title: "تابع SUM در SQL",
      description: "SUM برای محاسبه مجموع مقادیر عددی استفاده می‌شود.",
      syntax: "SELECT SUM(column_name) FROM table_name",
      tips: [
        "فقط با ستون‌های عددی کار می‌کند",
        "مقادیر NULL نادیده گرفته می‌شوند",
        "برای محاسبه کل هزینه، درآمد و غیره مفید است",
      ],
      examples: [
        {
          title: "مجموع حقوق‌ها",
          query: `SELECT SUM(Salary) as Total_Payroll 
FROM EMPLOYEE;`,
          description: "مجموع حقوق همه کارمندان",
        },
        {
          title: "مجموع در هر بخش",
          query: `SELECT Dno, SUM(Salary) as Department_Payroll 
FROM EMPLOYEE 
GROUP BY Dno;`,
          description: "مجموع حقوق هر بخش",
        },
      ],
    },
    max: {
      title: "تابع MAX در SQL",
      description: "MAX برای پیدا کردن بیشترین مقدار در ستون استفاده می‌شود.",
      syntax: "SELECT MAX(column_name) FROM table_name",
      tips: [
        "با اعداد، متن و تاریخ کار می‌کند",
        "مقادیر NULL نادیده گرفته می‌شوند",
        "برای متن، بر اساس ترتیب الفبا",
      ],
      examples: [
        {
          title: "بالاترین حقوق",
          query: `SELECT MAX(Salary) as Highest_Salary 
FROM EMPLOYEE;`,
          description: "بالاترین حقوق در شرکت",
        },
        {
          title: "بالاترین حقوق هر بخش",
          query: `SELECT Dno, MAX(Salary) as Max_Salary 
FROM EMPLOYEE 
GROUP BY Dno;`,
          description: "بالاترین حقوق در هر بخش",
        },
      ],
    },
    min: {
      title: "تابع MIN در SQL",
      description: "MIN برای پیدا کردن کمترین مقدار در ستون استفاده می‌شود.",
      syntax: "SELECT MIN(column_name) FROM table_name",
      tips: [
        "با اعداد، متن و تاریخ کار می‌کند",
        "مقادیر NULL نادیده گرفته می‌شوند",
        "برای متن، بر اساس ترتیب الفبا",
      ],
      examples: [
        {
          title: "کمترین حقوق",
          query: `SELECT MIN(Salary) as Lowest_Salary 
FROM EMPLOYEE;`,
          description: "کمترین حقوق در شرکت",
        },
        {
          title: "کمترین حقوق هر بخش",
          query: `SELECT Dno, MIN(Salary) as Min_Salary 
FROM EMPLOYEE 
GROUP BY Dno;`,
          description: "کمترین حقوق در هر بخش",
        },
      ],
    },
    "window-function-basics": {
      title: "مبانی Window Functions در SQL",
      description:
        "Window Functions برای محاسبه روی مجموعه‌ای از رکوردهای مرتبط بدون GROUP BY استفاده می‌شوند.",
      syntax:
        "SELECT column, window_function() OVER (PARTITION BY column ORDER BY column) FROM table",
      tips: [
        "OVER() برای تعریف پنجره داده‌ها",
        "PARTITION BY برای تقسیم‌بندی داده‌ها",
        "ORDER BY برای مرتب‌سازی در پنجره",
      ],
      examples: [
        {
          title: "رتبه‌بندی کارمندان",
          query: `SELECT Fname, Lname, Salary,
RANK() OVER (ORDER BY Salary DESC) as Salary_Rank
FROM EMPLOYEE;`,
          description: "رتبه‌بندی کارمندان بر اساس حقوق",
        },
        {
          title: "شماره ردیف",
          query: `SELECT ROW_NUMBER() OVER (ORDER BY Salary DESC) as Row_Num,
Fname, Lname, Salary
FROM EMPLOYEE;`,
          description: "شماره ردیف برای هر کارمند",
        },
      ],
    },
    lag: {
      title: "تابع LAG در SQL",
      description:
        "LAG برای دسترسی به مقدار ردیف قبلی در نتیجه کوئری استفاده می‌شود.",
      syntax: "LAG(column, offset, default_value) OVER (ORDER BY column)",
      tips: [
        "offset تعداد ردیف‌های عقب‌گرد است",
        "default_value برای اولین ردیف‌ها",
        "برای مقایسه با مقادیر قبلی مفید است",
      ],
      examples: [
        {
          title: "مقایسه حقوق با قبلی",
          query: `SELECT Fname, Salary,
LAG(Salary, 1, 0) OVER (ORDER BY Salary) as Previous_Salary
FROM EMPLOYEE;`,
          description: "حقوق هر کارمند و حقوق کارمند قبلی",
        },
      ],
    },
    lead: {
      title: "تابع LEAD در SQL",
      description:
        "LEAD برای دسترسی به مقدار ردیف بعدی در نتیجه کوئری استفاده می‌شود.",
      syntax: "LEAD(column, offset, default_value) OVER (ORDER BY column)",
      tips: [
        "offset تعداد ردیف‌های جلوگرد است",
        "default_value برای آخرین ردیف‌ها",
        "برای مقایسه با مقادیر بعدی مفید است",
      ],
      examples: [
        {
          title: "مقایسه حقوق با بعدی",
          query: `SELECT Fname, Salary,
LEAD(Salary, 1, 0) OVER (ORDER BY Salary) as Next_Salary
FROM EMPLOYEE;`,
          description: "حقوق هر کارمند و حقوق کارمند بعدی",
        },
      ],
    },
    "first-value": {
      title: "تابع FIRST_VALUE در SQL",
      description:
        "FIRST_VALUE برای دریافت اولین مقدار در پنجره داده‌ها استفاده می‌شود.",
      syntax: "FIRST_VALUE(column) OVER (PARTITION BY column ORDER BY column)",
      tips: [
        "همیشه اولین مقدار پنجره را برمی‌گرداند",
        "با PARTITION BY می‌توان گروه‌بندی کرد",
        "ترتیب ORDER BY مهم است",
      ],
      examples: [
        {
          title: "اولین کارمند هر بخش",
          query: `SELECT Dno, Fname, Salary,
FIRST_VALUE(Fname) OVER (PARTITION BY Dno ORDER BY Salary DESC) as Highest_Paid
FROM EMPLOYEE;`,
          description: "نام پردرآمدترین کارمند در هر بخش",
        },
      ],
    },
    "last-value": {
      title: "تابع LAST_VALUE در SQL",
      description:
        "LAST_VALUE برای دریافت آخرین مقدار در پنجره داده‌ها استفاده می‌شود.",
      syntax:
        "LAST_VALUE(column) OVER (PARTITION BY column ORDER BY column ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)",
      tips: [
        "معمولاً نیاز به تعریف کامل پنجره دارد",
        "بدون ROWS BETWEEN ممکن است نتیجه مورد انتظار ندهد",
        "با PARTITION BY می‌توان گروه‌بندی کرد",
      ],
      examples: [
        {
          title: "آخرین کارمند هر بخش",
          query: `SELECT Dno, Fname, Salary,
LAST_VALUE(Fname) OVER (
  PARTITION BY Dno 
  ORDER BY Salary 
  ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
) as Lowest_Paid
FROM EMPLOYEE;`,
          description: "نام کم‌درآمدترین کارمند در هر بخش",
        },
      ],
    },
    concat: {
      title: "تابع CONCAT در SQL",
      description: "CONCAT برای اتصال دو یا چند رشته متنی استفاده می‌شود.",
      syntax: "CONCAT(string1, string2, ...)",
      tips: [
        "در برخی دیتابیس‌ها از || استفاده می‌شود",
        "اگر یکی از مقادیر NULL باشد، نتیجه NULL می‌شود",
        "برای اتصال نام و نام خانوادگی مفید است",
      ],
      examples: [
        {
          title: "اتصال نام کامل",
          query: `SELECT CONCAT(Fname, ' ', Lname) as Full_Name 
FROM EMPLOYEE;`,
          description: "نام کامل کارمندان",
        },
        {
          title: "ایجاد آدرس ایمیل",
          query: `SELECT CONCAT(Fname, '.', Lname, '@company.com') as Email 
FROM EMPLOYEE;`,
          description: "ایجاد آدرس ایمیل فرضی",
        },
      ],
    },
    len: {
      title: "تابع LENGTH در SQL",
      description:
        "LENGTH برای محاسبه تعداد کاراکترهای یک رشته استفاده می‌شود.",
      syntax: "LENGTH(string) یا LEN(string) در SQL Server",
      tips: [
        "در SQL Server از LEN استفاده کنید",
        "فاصله‌های انتهایی ممکن است نادیده گرفته شوند",
        "برای اعتبارسنجی طول رشته مفید است",
      ],
      examples: [
        {
          title: "طول نام کارمندان",
          query: `SELECT Fname, LENGTH(Fname) as Name_Length 
FROM EMPLOYEE;`,
          description: "تعداد حروف نام هر کارمند",
        },
        {
          title: "فیلتر بر اساس طول",
          query: `SELECT * FROM EMPLOYEE 
WHERE LENGTH(Fname) > 5;`,
          description: "کارمندان با نام بیش از 5 حرف",
        },
      ],
    },
    upper: {
      title: "تابع UPPER در SQL",
      description:
        "UPPER برای تبدیل همه حروف رشته به حروف بزرگ استفاده می‌شود.",
      syntax: "UPPER(string)",
      tips: [
        "فقط روی حروف انگلیسی تأثیر می‌گذارد",
        "اعداد و کاراکترهای خاص تغییر نمی‌کنند",
        "برای استاندارد کردن داده‌های متنی مفید است",
      ],
      examples: [
        {
          title: "نام‌ها با حروف بزرگ",
          query: `SELECT UPPER(Fname) as Upper_Name, 
UPPER(Lname) as Upper_LastName 
FROM EMPLOYEE;`,
          description: "نام کارمندان با حروف بزرگ",
        },
      ],
    },
    lower: {
      title: "تابع LOWER در SQL",
      description:
        "LOWER برای تبدیل همه حروف رشته به حروف کوچک استفاده می‌شود.",
      syntax: "LOWER(string)",
      tips: [
        "فقط روی حروف انگلیسی تأثیر می‌گذارد",
        "اعداد و کاراکترهای خاص تغییر نمی‌کنند",
        "برای جستجوی غیرحساس به حروف مفید است",
      ],
      examples: [
        {
          title: "نام‌ها با حروف کوچک",
          query: `SELECT LOWER(Fname) as Lower_Name 
FROM EMPLOYEE;`,
          description: "نام کارمندان با حروف کوچک",
        },
      ],
    },
    rand: {
      title: "تابع RANDOM در SQL",
      description: "RANDOM یا RAND برای تولید اعداد تصادفی استفاده می‌شود.",
      syntax: "RANDOM() یا RAND()",
      tips: [
        "در SQLite از RANDOM() استفاده کنید",
        "در MySQL و SQL Server از RAND()",
        "نتیجه عددی بین 0 و 1 است",
      ],
      examples: [
        {
          title: "انتخاب تصادفی کارمندان",
          query: `SELECT * FROM EMPLOYEE 
ORDER BY RANDOM() 
LIMIT 3;`,
          description: "انتخاب 3 کارمند به صورت تصادفی",
        },
      ],
    },
    round: {
      title: "تابع ROUND در SQL",
      description: "ROUND برای گرد کردن اعداد اعشاری استفاده می‌شود.",
      syntax: "ROUND(number, decimals)",
      tips: [
        "decimals تعداد رقم اعشار مورد نظر است",
        "اگر decimals مشخص نشود، به عدد صحیح گرد می‌کند",
        "برای نمایش قیمت‌ها مفید است",
      ],
      examples: [
        {
          title: "گرد کردن حقوق",
          query: `SELECT Fname, Salary, 
ROUND(Salary / 1000, 2) as Salary_K 
FROM EMPLOYEE;`,
          description: "حقوق بر حسب هزار تومان",
        },
      ],
    },
    floor: {
      title: "تابع FLOOR در SQL",
      description:
        "FLOOR برای گرد کردن عدد به سمت پایین (کمترین عدد صحیح) استفاده می‌شود.",
      syntax: "FLOOR(number)",
      tips: [
        "همیشه به سمت کمتر گرد می‌کند",
        "برای اعداد منفی رفتار متفاوت دارد",
        "نتیجه عدد صحیح است",
      ],
      examples: [
        {
          title: "بخش صحیح حقوق",
          query: `SELECT Fname, Salary, 
FLOOR(Salary / 1000) as Salary_Thousands 
FROM EMPLOYEE;`,
          description: "بخش هزارگان حقوق",
        },
      ],
    },
    ceil: {
      title: "تابع CEIL در SQL",
      description:
        "CEIL یا CEILING برای گرد کردن عدد به سمت بالا (بزرگترین عدد صحیح) استفاده می‌شود.",
      syntax: "CEIL(number) یا CEILING(number)",
      tips: [
        "همیشه به سمت بالا گرد می‌کند",
        "برای محاسبه تعداد صفحات مفید است",
        "نتیجه عدد صحیح است",
      ],
      examples: [
        {
          title: "گرد کردن به بالا",
          query: `SELECT Fname, Salary, 
CEIL(Salary / 10000) as Salary_Tens 
FROM EMPLOYEE;`,
          description: "گرد کردن حقوق به دهگان هزار بالاتر",
        },
      ],
    },
    "current-timestamp": {
      title: "تابع CURRENT_TIMESTAMP در SQL",
      description:
        "CURRENT_TIMESTAMP برای دریافت تاریخ و زمان فعلی سیستم استفاده می‌شود.",
      syntax: "CURRENT_TIMESTAMP یا NOW() یا GETDATE()",
      tips: [
        "در MySQL از NOW() استفاده کنید",
        "در SQL Server از GETDATE()",
        "شامل تاریخ و زمان است",
      ],
      examples: [
        {
          title: "ثبت زمان فعلی",
          query: `SELECT Fname, Lname, 
CURRENT_TIMESTAMP as Current_Time 
FROM EMPLOYEE;`,
          description: "نمایش زمان فعلی برای هر کارمند",
        },
      ],
    },
    year: {
      title: "تابع YEAR در SQL",
      description: "YEAR برای استخراج سال از تاریخ استفاده می‌شود.",
      syntax: "YEAR(date)",
      tips: [
        "فقط بخش سال تاریخ را برمی‌گرداند",
        "برای فیلتر بر اساس سال مفید است",
        "نتیجه عدد صحیح است",
      ],
      examples: [
        {
          title: "سال تولد کارمندان",
          query: `SELECT Fname, Lname, Bdate, 
YEAR(Bdate) as Birth_Year 
FROM EMPLOYEE;`,
          description: "سال تولد هر کارمند",
        },
        {
          title: "فیلتر بر اساس سال",
          query: `SELECT * FROM EMPLOYEE 
WHERE YEAR(Bdate) > 1970;`,
          description: "کارمندان متولد بعد از 1970",
        },
      ],
    },
    month: {
      title: "تابع MONTH در SQL",
      description: "MONTH برای استخراج ماه از تاریخ استفاده می‌شود.",
      syntax: "MONTH(date)",
      tips: [
        "عددی بین 1 تا 12 برمی‌گرداند",
        "برای آمار ماهانه مفید است",
        "1 = ژانویه، 12 = دسامبر",
      ],
      examples: [
        {
          title: "ماه تولد کارمندان",
          query: `SELECT Fname, Lname, 
MONTH(Bdate) as Birth_Month 
FROM EMPLOYEE;`,
          description: "ماه تولد هر کارمند",
        },
      ],
    },
    day: {
      title: "تابع DAY در SQL",
      description: "DAY برای استخراج روز از تاریخ استفاده می‌شود.",
      syntax: "DAY(date)",
      tips: [
        "عددی بین 1 تا 31 برمی‌گرداند",
        "بسته به ماه متفاوت است",
        "برای تحلیل روزانه مفید است",
      ],
      examples: [
        {
          title: "روز تولد کارمندان",
          query: `SELECT Fname, Lname, 
DAY(Bdate) as Birth_Day 
FROM EMPLOYEE;`,
          description: "روز تولد هر کارمند",
        },
      ],
    },
    datatypes: {
      title: "انواع داده در SQL",
      description: "انواع مختلف داده که می‌توان در جداول SQL تعریف کرد.",
      syntax: "column_name datatype(size)",
      tips: [
        "انتخاب نوع داده مناسب برای بهینه‌سازی فضا مهم است",
        "اندازه‌ها در انواع داده محدودیت ایجاد می‌کنند",
        "برخی انواع داده خاص دیتابیس هستند",
      ],
      examples: [
        {
          title: "انواع عددی",
          query: `CREATE TABLE Numbers (
  id INTEGER,
  price DECIMAL(10,2),
  score FLOAT,
  is_active BOOLEAN
);`,
          description: "استفاده از انواع داده عددی مختلف",
        },
        {
          title: "انواع متنی",
          query: `CREATE TABLE TextData (
  name VARCHAR(50),
  description TEXT,
  code CHAR(5)
);`,
          description: "انواع داده برای ذخیره متن",
        },
        {
          title: "انواع تاریخی",
          query: `CREATE TABLE TimeData (
  created_date DATE,
  updated_time TIMESTAMP,
  birth_year YEAR
);`,
          description: "انواع داده برای تاریخ و زمان",
        },
      ],
    },
    "create-table": {
      title: "دستور CREATE TABLE در SQL",
      description:
        "CREATE TABLE برای ایجاد جدول جدید در دیتابیس استفاده می‌شود.",
      syntax:
        "CREATE TABLE table_name (column1 datatype, column2 datatype, ...)",
      tips: [
        "نام جدول باید منحصر به فرد باشد",
        "حداقل یک ستون باید تعریف شود",
        "کلید اصلی را از همان ابتدا تعریف کنید",
      ],
      examples: [
        {
          title: "جدول ساده کارمند",
          query: `CREATE TABLE EMPLOYEE (
  Ssn CHAR(9) PRIMARY KEY,
  Fname VARCHAR(50),
  Lname VARCHAR(50),
  Salary DECIMAL(10,2),
  Dno INTEGER
);`,
          description: "ایجاد جدول کارمند با ستون‌های اساسی",
        },
        {
          title: "جدول با محدودیت‌ها",
          query: `CREATE TABLE DEPARTMENT (
  Dnumber INTEGER PRIMARY KEY,
  Dname VARCHAR(100) NOT NULL UNIQUE,
  Budget DECIMAL(15,2) CHECK (Budget > 0),
  Created_date DATE DEFAULT CURRENT_DATE
);`,
          description: "جدول با انواع محدودیت‌ها",
        },
      ],
    },
    "drop-table": {
      title: "دستور DROP TABLE در SQL",
      description: "DROP TABLE برای حذف کامل جدول از دیتابیس استفاده می‌شود.",
      syntax: "DROP TABLE table_name",
      tips: [
        "⚠️ عملیات غیرقابل بازگشت است",
        "همه داده‌ها و ساختار جدول حذف می‌شود",
        "IF EXISTS برای جلوگیری از خطا استفاده کنید",
      ],
      examples: [
        {
          title: "حذف جدول",
          query: `DROP TABLE EMPLOYEE;`,
          description: "حذف کامل جدول کارمند",
        },
        {
          title: "حذف امن",
          query: `DROP TABLE IF EXISTS OLD_DATA;`,
          description: "حذف جدول در صورت وجود",
        },
      ],
    },
    "alter-table": {
      title: "دستور ALTER TABLE در SQL",
      description: "ALTER TABLE برای تغییر ساختار جدول موجود استفاده می‌شود.",
      syntax: "ALTER TABLE table_name ADD/DROP/MODIFY column_name datatype",
      tips: [
        "برای اضافه، حذف یا تغییر ستون‌ها",
        "تغییرات روی جداول با داده احتیاط می‌خواهد",
        "ممکن است نیاز به پشتیبان‌گیری باشد",
      ],
      examples: [
        {
          title: "اضافه کردن ستون",
          query: `ALTER TABLE EMPLOYEE 
ADD COLUMN Email VARCHAR(100);`,
          description: "اضافه کردن ستون ایمیل به جدول کارمند",
        },
        {
          title: "حذف ستون",
          query: `ALTER TABLE EMPLOYEE 
DROP COLUMN Email;`,
          description: "حذف ستون ایمیل",
        },
        {
          title: "تغییر نوع داده",
          query: `ALTER TABLE EMPLOYEE 
MODIFY COLUMN Salary DECIMAL(12,2);`,
          description: "تغییر اندازه ستون حقوق",
        },
      ],
    },
    constraints: {
      title: "محدودیت‌ها (Constraints) در SQL",
      description:
        "Constraints قوانینی هستند که بر روی داده‌های جدول اعمال می‌شوند.",
      syntax: "CONSTRAINT constraint_name constraint_type",
      tips: [
        "برای تضمین یکپارچگی داده‌ها استفاده می‌شوند",
        "می‌توان در CREATE TABLE یا ALTER TABLE تعریف کرد",
        "نام‌گذاری مناسب برای مدیریت آسان‌تر",
      ],
      examples: [
        {
          title: "انواع محدودیت‌ها",
          query: `CREATE TABLE EMPLOYEE (
  Ssn CHAR(9) PRIMARY KEY,
  Fname VARCHAR(50) NOT NULL,
  Email VARCHAR(100) UNIQUE,
  Salary DECIMAL(10,2) CHECK (Salary > 0),
  Dno INTEGER,
  FOREIGN KEY (Dno) REFERENCES DEPARTMENT(Dnumber)
);`,
          description: "جدول با انواع مختلف محدودیت‌ها",
        },
      ],
    },
    "not-null": {
      title: "محدودیت NOT NULL در SQL",
      description:
        "NOT NULL تضمین می‌کند که ستون نمی‌تواند مقدار NULL داشته باشد.",
      syntax: "column_name datatype NOT NULL",
      tips: [
        "برای فیلدهای ضروری استفاده می‌شود",
        "قابل اضافه کردن به ستون موجود",
        "ممکن است INSERT را رد کند",
      ],
      examples: [
        {
          title: "تعریف NOT NULL",
          query: `CREATE TABLE EMPLOYEE (
  Ssn CHAR(9) NOT NULL,
  Fname VARCHAR(50) NOT NULL,
  Lname VARCHAR(50) NOT NULL,
  Email VARCHAR(100)
);`,
          description: "فیلدهای اجباری با NOT NULL",
        },
        {
          title: "اضافه کردن NOT NULL",
          query: `ALTER TABLE EMPLOYEE 
MODIFY COLUMN Email VARCHAR(100) NOT NULL;`,
          description: "اضافه کردن محدودیت NOT NULL به ستون موجود",
        },
      ],
    },
    unique: {
      title: "محدودیت UNIQUE در SQL",
      description: "UNIQUE تضمین می‌کند که مقادیر ستون منحصر به فرد باشند.",
      syntax: "column_name datatype UNIQUE",
      tips: [
        "امکان NULL دارد اما فقط یک بار",
        "برای فیلدهایی مثل ایمیل و کد ملی",
        "می‌توان روی چند ستون تعریف کرد",
      ],
      examples: [
        {
          title: "ستون منحصر به فرد",
          query: `CREATE TABLE EMPLOYEE (
  Ssn CHAR(9) PRIMARY KEY,
  Email VARCHAR(100) UNIQUE,
  Phone VARCHAR(15) UNIQUE
);`,
          description: "ایمیل و تلفن منحصر به فرد",
        },
        {
          title: "UNIQUE ترکیبی",
          query: `CREATE TABLE ENROLLMENT (
  Student_id INTEGER,
  Course_id INTEGER,
  UNIQUE(Student_id, Course_id)
);`,
          description: "ترکیب دانشجو و درس منحصر به فرد",
        },
      ],
    },
    "primary-key": {
      title: "کلید اصلی (PRIMARY KEY) در SQL",
      description: "PRIMARY KEY شناسه منحصر به فرد هر رکورد در جدول است.",
      syntax: "column_name datatype PRIMARY KEY",
      tips: [
        "هر جدول فقط یک کلید اصلی دارد",
        "نمی‌تواند NULL باشد",
        "خودکار UNIQUE و NOT NULL است",
      ],
      examples: [
        {
          title: "کلید اصلی ساده",
          query: `CREATE TABLE EMPLOYEE (
  Ssn CHAR(9) PRIMARY KEY,
  Fname VARCHAR(50),
  Lname VARCHAR(50)
);`,
          description: "شماره ملی به عنوان کلید اصلی",
        },
        {
          title: "کلید اصلی ترکیبی",
          query: `CREATE TABLE WORKS_ON (
  Essn CHAR(9),
  Pno INTEGER,
  Hours DECIMAL(4,1),
  PRIMARY KEY (Essn, Pno)
);`,
          description: "ترکیب کارمند و پروژه به عنوان کلید",
        },
      ],
    },
    "foreign-key": {
      title: "کلید خارجی (FOREIGN KEY) در SQL",
      description: "FOREIGN KEY ارتباط بین جداول را برقرار می‌کند.",
      syntax: "FOREIGN KEY (column) REFERENCES other_table(column)",
      tips: [
        "باید به کلید اصلی جدول دیگر اشاره کند",
        "تضمین یکپارچگی ارجاعی",
        "عملیات CASCADE برای حذف/بروزرسانی خودکار",
      ],
      examples: [
        {
          title: "کلید خارجی ساده",
          query: `CREATE TABLE EMPLOYEE (
  Ssn CHAR(9) PRIMARY KEY,
  Fname VARCHAR(50),
  Dno INTEGER,
  FOREIGN KEY (Dno) REFERENCES DEPARTMENT(Dnumber)
);`,
          description: "ارتباط کارمند با بخش",
        },
        {
          title: "کلید خارجی با CASCADE",
          query: `CREATE TABLE DEPENDENT (
  Essn CHAR(9),
  Dependent_name VARCHAR(50),
  FOREIGN KEY (Essn) REFERENCES EMPLOYEE(Ssn)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);`,
          description: "حذف/بروزرسانی خودکار وابستگان",
        },
      ],
    },
    check: {
      title: "محدودیت CHECK در SQL",
      description: "CHECK شرط سفارشی برای اعتبارسنجی داده‌ها تعریف می‌کند.",
      syntax: "CHECK (condition)",
      tips: [
        "شرط باید منطقی و قابل ارزیابی باشد",
        "می‌تواند بر چند ستون اعمال شود",
        "در INSERT و UPDATE بررسی می‌شود",
      ],
      examples: [
        {
          title: "بررسی محدوده سن",
          query: `CREATE TABLE EMPLOYEE (
  Ssn CHAR(9) PRIMARY KEY,
  Fname VARCHAR(50),
  Age INTEGER CHECK (Age >= 18 AND Age <= 65),
  Salary DECIMAL(10,2) CHECK (Salary > 0)
);`,
          description: "محدود کردن سن و حقوق",
        },
        {
          title: "بررسی جنسیت",
          query: `CREATE TABLE PERSON (
  ID INTEGER PRIMARY KEY,
  Name VARCHAR(50),
  Gender CHAR(1) CHECK (Gender IN ('M', 'F'))
);`,
          description: "محدود کردن مقادیر جنسیت",
        },
      ],
    },
    default: {
      title: "مقدار پیش‌فرض (DEFAULT) در SQL",
      description:
        "DEFAULT مقدار پیش‌فرض برای ستون در صورت عدم ورود تعریف می‌کند.",
      syntax: "column_name datatype DEFAULT value",
      tips: [
        "مقدار باید با نوع داده سازگار باشد",
        "می‌تواند تابع باشد مثل CURRENT_DATE",
        "در INSERT اعمال می‌شود",
      ],
      examples: [
        {
          title: "مقادیر پیش‌فرض مختلف",
          query: `CREATE TABLE EMPLOYEE (
  Ssn CHAR(9) PRIMARY KEY,
  Fname VARCHAR(50),
  Status VARCHAR(20) DEFAULT 'Active',
  Salary DECIMAL(10,2) DEFAULT 30000,
  Hire_date DATE DEFAULT CURRENT_DATE
);`,
          description: "انواع مقادیر پیش‌فرض",
        },
      ],
    },
    "auto-increment": {
      title: "خودافزایشی (AUTO INCREMENT) در SQL",
      description:
        "AUTO INCREMENT خودکار عدد منحصر به فرد برای رکوردهای جدید تولید می‌کند.",
      syntax: "column_name INTEGER AUTO_INCREMENT PRIMARY KEY",
      tips: [
        "معمولاً برای کلید اصلی استفاده می‌شود",
        "در SQLite از AUTOINCREMENT استفاده کنید",
        "در PostgreSQL از SERIAL استفاده کنید",
      ],
      examples: [
        {
          title: "کلید خودافزایشی",
          query: `CREATE TABLE EMPLOYEE (
  ID INTEGER AUTO_INCREMENT PRIMARY KEY,
  Fname VARCHAR(50),
  Lname VARCHAR(50),
  Email VARCHAR(100)
);`,
          description: "شناسه خودکار برای کارمندان",
        },
        {
          title: "شروع از عدد خاص",
          query: `CREATE TABLE PRODUCT (
  ID INTEGER AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(100),
  Price DECIMAL(10,2)
);
ALTER TABLE PRODUCT AUTO_INCREMENT = 1000;`,
          description: "شروع شمارش از 1000",
        },
      ],
    },
    index: {
      title: "ایندکس (INDEX) در SQL",
      description: "INDEX برای تسریع جستجو در جداول بزرگ استفاده می‌شود.",
      syntax: "CREATE INDEX index_name ON table_name (column1, column2, ...)",
      tips: [
        "تسریع SELECT اما کند کردن INSERT/UPDATE",
        "روی ستون‌های پرجستجو ایجاد کنید",
        "کلیدهای اصلی خودکار ایندکس دارند",
      ],
      examples: [
        {
          title: "ایندکس تک ستونه",
          query: `CREATE INDEX idx_employee_lastname 
ON EMPLOYEE (Lname);`,
          description: "ایندکس روی نام خانوادگی برای جستجوی سریع",
        },
        {
          title: "ایندکس ترکیبی",
          query: `CREATE INDEX idx_employee_name 
ON EMPLOYEE (Lname, Fname);`,
          description: "ایندکس روی نام کامل",
        },
        {
          title: "ایندکس منحصر به فرد",
          query: `CREATE UNIQUE INDEX idx_employee_email 
ON EMPLOYEE (Email);`,
          description: "ایندکس منحصر به فرد روی ایمیل",
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
      <div className="p-6 bg-white dark:bg-[#1F1F1F] space-y-6" dir="rtl">
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
        {/* <div className="text-center p-5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl border-2 border-blue-400 dark:border-blue-300 mt-2">
          <span className="text-white text-base font-medium drop-shadow-sm">
            💻 آماده تمرین هستید؟ این کوئری‌ها را در محیط تمرین امتحان کنید!
          </span>
        </div> */}
      </div>
    </Modal>
  );
};

export default SQLLearningModal;
