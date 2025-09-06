"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Input,
  Table,
  Select,
  Typography,
  Space,
  Alert,
  Spin,
  Tabs,
  Collapse,
} from "antd";
import {
  PlayCircleOutlined,
  DatabaseOutlined,
  TableOutlined,
  InfoCircleOutlined,
  ClearOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const SQLQueryInterface = () => {
  const [query, setQuery] = useState("SELECT * FROM EMPLOYEE LIMIT 5;");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [schema, setSchema] = useState({});
  const [selectedDatabase, setSelectedDatabase] = useState("company");

  // Database examples and descriptions
  const databases = {
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
      sampleQueries: [
        "SELECT * FROM customers LIMIT 5;",
        "SELECT name, price FROM products WHERE price > 1000000;",
        "SELECT c.firstName, c.lastName, COUNT(o.id) as order_count FROM customers c LEFT JOIN orders o ON c.id = o.customerId GROUP BY c.id;",
        "SELECT p.name, AVG(r.rating) as avg_rating FROM products p JOIN reviews r ON p.id = r.productId GROUP BY p.id;",
      ],
    },
    school: {
      name: "سیستم مدیریت مدرسه",
      description: "مدیریت دانش‌آموزان، معلمان، دروس و نمرات",
      tables: ["students", "teachers", "courses", "enrollments", "grades"],
      sampleQueries: [
        "SELECT * FROM students LIMIT 5;",
        "SELECT firstName, lastName, department, salary FROM teachers;",
        "SELECT s.firstName, s.lastName, AVG(g.score) as average_score FROM students s JOIN grades g ON s.id = g.studentId GROUP BY s.id;",
        "SELECT c.courseName, COUNT(e.studentId) as student_count FROM courses c LEFT JOIN enrollments e ON c.id = e.courseId GROUP BY c.id;",
      ],
    },
    library: {
      name: "سیستم مدیریت کتابخانه",
      description: "مدیریت کتاب‌ها، نویسندگان، اعضا و امانات",
      tables: [
        "authors",
        "publishers",
        "books",
        "book_authors",
        "members",
        "loans",
      ],
      sampleQueries: [
        "SELECT * FROM books LIMIT 5;",
        "SELECT b.title, a.firstName, a.lastName FROM books b JOIN book_authors ba ON b.id = ba.bookId JOIN authors a ON ba.authorId = a.id;",
        "SELECT m.firstName, m.lastName, COUNT(l.id) as loan_count FROM members m LEFT JOIN loans l ON m.id = l.memberId GROUP BY m.id;",
        "SELECT b.title, b.availableCopies, b.totalCopies FROM books b WHERE b.availableCopies < b.totalCopies;",
      ],
    },
    company: {
      name: "سیستم شرکت استاندارد (COMPANY)",
      description:
        "مدیریت کارمندان، بخش‌ها، پروژه‌ها و وابستگان - دیتابیس مرجع",
      tables: [
        "EMPLOYEE",
        "DEPARTMENT",
        "DEPT_LOCATIONS",
        "PROJECT",
        "WORKS_ON",
        "DEPENDENT",
      ],
      sampleQueries: [
        "SELECT * FROM EMPLOYEE LIMIT 5;",
        "SELECT Fname, Lname, Salary FROM EMPLOYEE WHERE Salary > 30000;",
        "SELECT D.Dname, E.Fname, E.Lname FROM DEPARTMENT D, EMPLOYEE E WHERE D.Mgr_ssn = E.Ssn;",
        "SELECT E.Fname, E.Lname, P.Pname FROM EMPLOYEE E, WORKS_ON W, PROJECT P WHERE E.Ssn = W.Essn AND W.Pno = P.Pnumber;",
      ],
    },
  };

  useEffect(() => {
    fetchSchema();
  }, []);

  const fetchSchema = async () => {
    try {
      const response = await fetch("/api/sql/execute");
      const data = await response.json();
      if (data.success) {
        setSchema(data.tables);
      }
    } catch (error) {
      console.error("Error fetching schema:", error);
    }
  };

  const executeQuery = async () => {
    if (!query.trim()) {
      setError("لطفاً کوئری خود را وارد کنید");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/sql/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query.trim(),
          database: selectedDatabase,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || "خطا در اجرای کوئری");
      }
    } catch (error) {
      setError("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  const clearQuery = () => {
    setQuery("");
    setResult(null);
    setError(null);
  };

  const loadSampleQuery = (sampleQuery) => {
    setQuery(sampleQuery);
    setResult(null);
    setError(null);
  };

  const formatTableColumns = (data) => {
    if (!data || data.length === 0) return [];

    const firstRow = data[0];
    return Object.keys(firstRow).map((key) => ({
      title: key,
      dataIndex: key,
      key: key,
      render: (text) => {
        if (text === null) return <Text type="secondary">NULL</Text>;
        if (typeof text === "boolean") return text ? "true" : "false";
        return String(text);
      },
    }));
  };

  const formatTableData = (data) => {
    if (!data || data.length === 0) return [];

    return data.map((row, index) => ({
      ...row,
      key: index,
    }));
  };

  const renderSchemaInfo = () => {
    const dbInfo = databases[selectedDatabase];
    const relevantTables = dbInfo.tables.reduce((acc, tableName) => {
      if (schema[tableName]) {
        acc[tableName] = schema[tableName];
      }
      return acc;
    }, {});

    const collapseItems = Object.entries(relevantTables).map(
      ([tableName, columns]) => ({
        key: tableName,
        label: (
          <Space>
            <TableOutlined />
            <Text strong>{tableName}</Text>
            <Text type="secondary">({columns.length} ستون)</Text>
          </Space>
        ),
        children: (
          <div style={{ marginRight: 20 }}>
            {columns.map((column) => (
              <div key={column.name} style={{ marginBottom: 4 }}>
                <Text code>{column.name}</Text>
                <Text type="secondary" style={{ marginRight: 8 }}>
                  {column.type}
                  {column.primaryKey && " (PK)"}
                  {column.notNull && " (NOT NULL)"}
                </Text>
              </div>
            ))}
          </div>
        ),
      })
    );

    return <Collapse size="small" ghost items={collapseItems} />;
  };

  const tabItems = [
    {
      key: "query",
      label: "ویرایشگر کوئری",
      children: (
        <div>
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <div>
              <div style={{ marginBottom: 8 }}>
                <Text strong>انتخاب دیتابیس:</Text>
              </div>
              <Select
                value={selectedDatabase}
                onChange={setSelectedDatabase}
                style={{ width: "100%", marginBottom: 16 }}
                size="large"
              >
                {Object.entries(databases).map(([key, db]) => (
                  <Option key={key} value={key}>
                    <Space>
                      <DatabaseOutlined />
                      {db.name}
                    </Space>
                  </Option>
                ))}
              </Select>
              <Alert
                message={databases[selectedDatabase].description}
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text strong>کوئری SQL:</Text>
                <Space>
                  <Button
                    icon={<ClearOutlined />}
                    onClick={clearQuery}
                    size="small"
                  >
                    پاک کردن
                  </Button>
                  <Button
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    onClick={executeQuery}
                    loading={loading}
                    size="large"
                  >
                    اجرا
                  </Button>
                </Space>
              </div>
              <TextArea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="کوئری SQL خود را اینجا بنویسید..."
                rows={8}
                style={{
                  fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                  direction: "ltr",
                  textAlign: "left",
                }}
              />
            </div>

            <div>
              <Text strong>کوئری‌های نمونه:</Text>
              <div style={{ marginTop: 8 }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  {databases[selectedDatabase].sampleQueries.map(
                    (sampleQuery, index) => (
                      <Button
                        key={index}
                        type="link"
                        onClick={() => loadSampleQuery(sampleQuery)}
                        style={{
                          height: "auto",
                          padding: "4px 8px",
                          textAlign: "left",
                          direction: "ltr",
                          fontFamily:
                            'Monaco, Consolas, "Courier New", monospace',
                        }}
                      >
                        {sampleQuery}
                      </Button>
                    )
                  )}
                </Space>
              </div>
            </div>
          </Space>
        </div>
      ),
    },
    {
      key: "schema",
      label: "ساختار دیتابیس",
      children: (
        <div>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Alert
              message="اطلاعات جداول و ستون‌های دیتابیس انتخاب شده"
              description="برای دیدن جزئیات هر جدول، روی نام آن کلیک کنید"
              type="info"
              showIcon
            />
            {renderSchemaInfo()}
          </Space>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <div>
            <Title level={2}>
              <DatabaseOutlined /> محیط تمرین SQL
            </Title>
            <Paragraph>
              در این بخش می‌توانید کوئری‌های SQL خود را روی دیتابیس‌های نمونه
              تست کنید. برای شروع، یکی از دیتابیس‌ها را انتخاب کرده و کوئری خود
              را بنویسید.
            </Paragraph>
          </div>

          <Tabs items={tabItems} size="large" />

          {error && (
            <Alert
              message="خطا در اجرای کوئری"
              description={error}
              type="error"
              showIcon
              closable
              onClose={() => setError(null)}
            />
          )}

          {loading && (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <Spin size="large" />
              <div style={{ marginTop: 16 }}>
                <Text>در حال اجرای کوئری...</Text>
              </div>
            </div>
          )}

          {result && (
            <Card
              title={
                <Space>
                  <InfoCircleOutlined />
                  نتایج کوئری
                </Space>
              }
              extra={
                <Space>
                  <Text type="secondary">{result.rowCount} ردیف</Text>
                  <Text type="secondary">
                    زمان اجرا: {result.executionTime}
                  </Text>
                </Space>
              }
            >
              {result.data && result.data.length > 0 ? (
                <Table
                  columns={formatTableColumns(result.data)}
                  dataSource={formatTableData(result.data)}
                  pagination={{
                    pageSize: 20,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `مجموع ${total} ردیف`,
                  }}
                  scroll={{ x: true }}
                  size="small"
                />
              ) : (
                <Alert
                  message="کوئری با موفقیت اجرا شد"
                  description="نتیجه‌ای برای نمایش وجود ندارد"
                  type="success"
                  showIcon
                />
              )}
            </Card>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default SQLQueryInterface;
