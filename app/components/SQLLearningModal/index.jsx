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
