"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Select,
  Button,
  Typography,
  Space,
  Badge,
  Progress,
  Modal,
  Alert,
  Divider,
  Row,
  Col,
  Tag,
  Tooltip,
  Tabs,
  Input,
  App,
} from "antd";
import {
  PlayCircleOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
  DatabaseOutlined,
  QuestionCircleOutlined,
  EyeOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { practiceQuestions } from "../../data/practiceQuestions";
import { databaseSchemas } from "../../data/databaseSchemas";
import { useDarkMode } from "../../utils/store";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const SQLPracticeInterface = () => {
  const isDarkMode = useDarkMode((state) => state.isDarkMode);
  const { message } = App.useApp();

  // State management
  const [selectedDatabase, setSelectedDatabase] = useState("ecommerce");
  const [selectedDifficulty, setSelectedDifficulty] = useState("beginner");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userQuery, setUserQuery] = useState("");
  const [queryResult, setQueryResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showDatabaseSchema, setShowDatabaseSchema] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [userProgress, setUserProgress] = useState({});
  const [executionTime, setExecutionTime] = useState(null);

  // Get current question
  const currentQuestions =
    practiceQuestions[selectedDatabase]?.questions[selectedDifficulty] || [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  // Calculate progress
  const totalQuestions = Object.values(
    practiceQuestions[selectedDatabase]?.questions || {}
  ).flat().length;
  const completedCount = completedQuestions.size;
  const progressPercentage =
    totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;

  // Reset states when database or difficulty changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setUserQuery("");
    setQueryResult(null);
    setShowHints(false);
    setCurrentHintIndex(0);
    setShowSolution(false);
    setExecutionTime(null);
  }, [selectedDatabase, selectedDifficulty]);

  // Initialize user progress
  useEffect(() => {
    const savedProgress = localStorage.getItem("sqlPracticeProgress");
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setUserProgress(progress);
        setCompletedQuestions(new Set(progress.completed || []));
      } catch (error) {
        console.error("Error loading progress:", error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (questionId) => {
    const newCompleted = new Set([...completedQuestions, questionId]);
    setCompletedQuestions(newCompleted);

    const progress = {
      completed: Array.from(newCompleted),
      lastUpdated: new Date().toISOString(),
    };

    setUserProgress(progress);
    localStorage.setItem("sqlPracticeProgress", JSON.stringify(progress));
  };

  // Execute SQL query
  const executeQuery = async () => {
    if (!userQuery.trim()) {
      message.warning("لطفاً کوئری خود را وارد کنید");
      return;
    }

    setIsLoading(true);
    setQueryResult(null);
    const startTime = Date.now();

    try {
      const response = await fetch("/api/sql/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userQuery,
          database: selectedDatabase,
        }),
      });

      const result = await response.json();
      const endTime = Date.now();
      setExecutionTime(endTime - startTime);

      // Always set the result to show to user
      setQueryResult(result);

      if (result.success) {
        // Check if query is correct (basic validation)
        if (result.data && result.data.length > 0) {
          const isCorrect = validateAnswer(result.data);
          if (isCorrect) {
            message.success("آفرین! جواب شما صحیح است!");
            saveProgress(currentQuestion.id);
          } else {
            message.info("کوئری اجرا شد، اما ممکن است نتیجه کامل نباشد");
          }
        } else {
          message.info("کوئری اجرا شد اما نتیجه‌ای برنگرداند");
        }
      } else {
        message.error(result.error || "خطا در اجرای کوئری");
      }
    } catch (error) {
      console.error("Error executing query:", error);
      setQueryResult({
        success: false,
        error: "خطا در ارتباط با سرور",
      });
      message.error("خطا در ارتباط با سرور");
    } finally {
      setIsLoading(false);
    }
  };

  // Basic answer validation (can be enhanced)
  const validateAnswer = (resultData) => {
    if (!currentQuestion || !resultData) return false;

    // Basic validation - check if result has expected columns
    if (resultData.length > 0) {
      const resultColumns = Object.keys(resultData[0]);
      const expectedColumns = currentQuestion.expectedColumns;

      // Check if all expected columns exist (flexible validation)
      return expectedColumns.some((col) =>
        resultColumns.some((resCol) =>
          resCol.toLowerCase().includes(col.toLowerCase())
        )
      );
    }

    return false;
  };

  // Show next hint
  const showNextHint = () => {
    if (currentHintIndex < currentQuestion.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    } else {
      setShowHints(true);
    }
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserQuery("");
      setQueryResult(null);
      setShowHints(false);
      setCurrentHintIndex(0);
      setShowSolution(false);
      setExecutionTime(null);
    }
  };

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserQuery("");
      setQueryResult(null);
      setShowHints(false);
      setCurrentHintIndex(0);
      setShowSolution(false);
      setExecutionTime(null);
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "green";
      case "intermediate":
        return "orange";
      case "advanced":
        return "red";
      default:
        return "blue";
    }
  };

  // Get difficulty text
  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "مبتدی";
      case "intermediate":
        return "متوسط";
      case "advanced":
        return "پیشرفته";
      default:
        return "نامشخص";
    }
  };

  // Function to render database relationships
  const renderDatabaseRelationships = () => {
    const schema = databaseSchemas[selectedDatabase];
    if (!schema || !schema.tables) {
      return (
        <div style={{ padding: 20, textAlign: "center" }}>
          <Text type="secondary">اطلاعات روابط جداول در دسترس نیست</Text>
        </div>
      );
    }

    // Extract relationships from foreign keys
    const relationships = [];
    Object.entries(schema.tables).forEach(([tableName, table]) => {
      table.columns.forEach((column) => {
        if (column.foreign) {
          const [referencedTable, referencedColumn] = column.foreign.split(".");
          relationships.push({
            fromTable: tableName,
            fromColumn: column.name,
            toTable: referencedTable,
            toColumn: referencedColumn,
            fromTableName: table.name,
            toTableName:
              schema.tables[referencedTable]?.name || referencedTable,
          });
        }
      });
    });

    if (relationships.length === 0) {
      return (
        <div style={{ padding: 20, textAlign: "center" }}>
          <Text type="secondary">
            هیچ رابطه‌ای بین جداول این دیتابیس تعریف نشده است
          </Text>
        </div>
      );
    }

    return (
      <div style={{ maxHeight: 500, overflowY: "auto", padding: 16 }}>
        <Alert
          message="روابط بین جداول"
          description="این بخش روابط خارجی (Foreign Key) بین جداول را نمایش می‌دهد"
          type="info"
          showIcon
          style={{ marginBottom: 20 }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {relationships.map((rel, index) => (
            <Card
              key={index}
              size="small"
              style={{
                border: "2px solid #1890ff",
                borderRadius: 8,
                background: isDarkMode ? "#001529" : "#f6ffed",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                {/* From Table */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <Card
                    size="small"
                    style={{
                      backgroundColor: isDarkMode ? "#722ed1" : "#f9f0ff",
                      border: "1px solid #722ed1",
                      textAlign: "center",
                    }}
                  >
                    <Space direction="vertical" size="small">
                      <Text
                        strong
                        style={{ color: "#722ed1", fontSize: "14px" }}
                      >
                        {rel.fromTableName}
                      </Text>
                      <Tag color="purple">
                        {rel.fromTable}.{rel.fromColumn}
                      </Tag>
                    </Space>
                  </Card>
                </div>

                {/* Relationship Arrow */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <Text style={{ fontSize: "20px", color: "#1890ff" }}>→</Text>
                  <Tag color="blue" style={{ fontSize: "10px" }}>
                    Foreign Key
                  </Tag>
                </div>

                {/* To Table */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <Card
                    size="small"
                    style={{
                      backgroundColor: isDarkMode ? "#52c41a" : "#f6ffed",
                      border: "1px solid #52c41a",
                      textAlign: "center",
                    }}
                  >
                    <Space direction="vertical" size="small">
                      <Text
                        strong
                        style={{ color: "#52c41a", fontSize: "14px" }}
                      >
                        {rel.toTableName}
                      </Text>
                      <Tag color="green">
                        {rel.toTable}.{rel.toColumn}
                      </Tag>
                    </Space>
                  </Card>
                </div>
              </div>

              {/* Relationship Description */}
              <div style={{ marginTop: 12, textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  هر رکورد در جدول <Text code>{rel.fromTableName}</Text> به یک
                  رکورد در جدول <Text code>{rel.toTableName}</Text> مرتبط است
                </Text>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card
          style={{
            marginTop: 20,
            backgroundColor: isDarkMode ? "#1f1f1f" : "#fafafa",
          }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>خلاصه روابط:</Text>
            <ul style={{ margin: 0, paddingRight: 20 }}>
              {relationships.map((rel, index) => (
                <li key={index} style={{ marginBottom: 4 }}>
                  <Text>
                    <Text code>{rel.fromTableName}</Text> ← متصل به →{" "}
                    <Text code>{rel.toTableName}</Text>{" "}
                    <Text type="secondary">
                      (از طریق {rel.fromColumn} → {rel.toColumn})
                    </Text>
                  </Text>
                </li>
              ))}
            </ul>
          </Space>
        </Card>
      </div>
    );
  };

  if (!currentQuestion) {
    return (
      <Card className="m-4">
        <div className="text-center">
          <Title level={3}>سوالی برای این سطح وجود ندارد</Title>
          <Text>لطفاً دیتابیس یا سطح دشواری دیگری انتخاب کنید.</Text>
        </div>
      </Card>
    );
  }

  return (
    <div
      className={`p-4 min-h-screen flex flex-col gap-2 items-center justify-start w-full transition-all duration-300 ease-in-out `}
    >
      {/* Header Controls */}
      <Card
        className={`backdrop-blur-lg w-full rounded-2xl shadow-lg border transition-all duration-300 ease-in-out flex flex-col gap-4 ${
          isDarkMode
            ? "bg-gray-800/95 border-white/10 shadow-black/30"
            : "bg-white/95 border-white/20 shadow-black/10"
        }`}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>انتخاب دیتابیس:</Text>
              <Select
                value={selectedDatabase}
                onChange={setSelectedDatabase}
                style={{ width: "100%" }}
                size="large"
                className="rounded-xl transition-all duration-300 ease-in-out hover:shadow-lg"
              >
                {Object.entries(practiceQuestions).map(([key, db]) => (
                  <Option key={key} value={key}>
                    <Space>
                      <DatabaseOutlined />
                      {db.name}
                    </Space>
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>راهنمای دیتابیس:</Text>
              <Button
                icon={<DatabaseOutlined />}
                onClick={() => setShowDatabaseSchema(true)}
                size="large"
                style={{ width: "100%" }}
                className="bg-gradient-to-r from-teal-500 to-green-600 border-none text-white font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-teal-200/20 hover:from-teal-400 hover:to-green-500 hover:-translate-y-0.5 hover:shadow-teal-200/30"
              >
                مشاهده جداول
              </Button>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>سطح دشواری:</Text>
              <Select
                value={selectedDifficulty}
                onChange={setSelectedDifficulty}
                style={{ width: "100%" }}
                size="large"
                className="rounded-xl transition-all duration-300 ease-in-out hover:shadow-lg"
              >
                <Option value="beginner">
                  <Tag color="green">مبتدی</Tag>
                </Option>
                <Option value="intermediate">
                  <Tag color="orange">متوسط</Tag>
                </Option>
                <Option value="advanced">
                  <Tag color="red">پیشرفته</Tag>
                </Option>
              </Select>
            </Space>
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" className="mt-4">
          <Col xs={24} sm={12} md={8}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>پیشرفت کلی:</Text>
              <Progress
                percent={Math.round(progressPercentage)}
                status="active"
                strokeColor={{
                  from: "#667eea",
                  to: "#764ba2",
                }}
                format={() => `${completedCount}/${totalQuestions}`}
                className={`rounded-xl !w-full !p-2 overflow-hidden  ${
                  isDarkMode ? "bg-black/30" : "bg-white/30"
                }`}
              />
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Question Card */}
      <Card
        className={`backdrop-blur-lg w-full rounded-2xl shadow-lg border transition-all duration-300 ease-in-out overflow-hidden mt-8 hover:-translate-y-0.5 ${
          isDarkMode
            ? "bg-gray-800/95 border-white/10 shadow-black/30 hover:shadow-black/40"
            : "bg-white/95 border-white/20 shadow-black/10 hover:shadow-black/15"
        }`}
        title={
          <Space>
            <Badge
              count={currentQuestionIndex + 1}
              className="rounded-xl  border-none font-semibold"
              style={{
                backgroundColor: completedQuestions.has(currentQuestion.id)
                  ? "#52c41a"
                  : undefined,
              }}
            />
            <Title level={4} style={{ margin: 0 }}>
              {currentQuestion.title}
            </Title>
            <Tag
              color={getDifficultyColor(currentQuestion.difficulty)}
              className="rounded-full font-semibold px-3 py-1 transition-all duration-300 ease-in-out"
            >
              {getDifficultyText(currentQuestion.difficulty)}
            </Tag>
            <Tag className="rounded-full font-semibold px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none">
              <TrophyOutlined /> {currentQuestion.points} امتیاز
            </Tag>
            {completedQuestions.has(currentQuestion.id) && (
              <Tag className="rounded-full font-semibold bg-gradient-to-r from-green-400 to-green-300 text-white animate-pulse">
                <CheckCircleOutlined /> تکمیل شده
              </Tag>
            )}
          </Space>
        }
        extra={
          <Space>
            <Button
              icon={<BulbOutlined />}
              onClick={() => setShowHints(true)}
              size="small"
              className="rounded-full transition-all duration-300 ease-in-out bg-gradient-to-r from-pink-500 to-red-500 border-none text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/40"
            >
              راهنمایی
            </Button>
            <Button
              icon={<EyeOutlined />}
              onClick={() => setShowSolution(true)}
              size="small"
              className="rounded-full transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-cyan-500 border-none text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/40"
            >
              مشاهده جواب
            </Button>
          </Space>
        }
      >
        <Paragraph>{currentQuestion.description}</Paragraph>

        {currentQuestion.expectedColumns && (
          <Alert
            message="ستون‌های مورد انتظار"
            description={
              <Space wrap>
                {currentQuestion.expectedColumns.map((col, index) => (
                  <Tag key={index} color="blue">
                    {col}
                  </Tag>
                ))}
              </Space>
            }
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
      </Card>

      {/* SQL Editor */}
      <Card
        title="ویرایشگر SQL"
        className={`backdrop-blur-lg w-full rounded-2xl shadow-lg border transition-all duration-300 ease-in-out mt-8 ${
          isDarkMode
            ? "bg-gray-800/95 border-white/10 shadow-black/30"
            : "bg-white/95 border-white/20 shadow-black/10"
        }`}
      >
        <TextArea
          rows={8}
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="-- کوئری SQL خود را اینجا بنویسید
SELECT * FROM table_name;"
          className="font-mono text-sm"
          style={{
            fontFamily: 'Monaco, "Courier New", monospace',
            fontSize: "14px",
            lineHeight: "1.5",
            resize: "vertical",
            direction: "ltr",
            textAlign: "left",
          }}
        />

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Space wrap>
            <Button
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={executeQuery}
              loading={isLoading}
              className="rounded-full transition-all duration-300 ease-in-out bg-gradient-to-r from-indigo-500 to-purple-600 border-none text-white font-semibold text-base h-12 px-8 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 disabled:opacity-70 disabled:transform-none"
            >
              اجرای کوئری
            </Button>

            <Button
              onClick={() => {
                const tableName =
                  selectedDatabase === "ecommerce"
                    ? "customers"
                    : selectedDatabase === "school"
                    ? "students"
                    : selectedDatabase === "library"
                    ? "books"
                    : "employees";
                setUserQuery(`SELECT * FROM ${tableName} LIMIT 10;`);
              }}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 border-none text-white font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-orange-200/20 hover:from-orange-400 hover:to-yellow-400 hover:-translate-y-0.5 hover:shadow-orange-200/30"
            >
              نمونه کوئری
            </Button>

            <Button
              onClick={() => setUserQuery("")}
              className="bg-gradient-to-r from-red-500 to-red-600 border-none text-white font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-red-200/20 hover:from-red-400 hover:to-red-500 hover:-translate-y-0.5 hover:shadow-red-200/30"
            >
              پاک کردن
            </Button>

            <Button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className="rounded-xl transition-all duration-300 ease-in-out h-10 hover:-translate-y-0.5"
            >
              سوال قبلی
            </Button>

            <Button
              onClick={nextQuestion}
              disabled={currentQuestionIndex === currentQuestions.length - 1}
              className="rounded-xl transition-all duration-300 ease-in-out h-10 hover:-translate-y-0.5"
            >
              سوال بعدی
            </Button>
          </Space>
        </div>
      </Card>

      {/* Query Results */}
      {queryResult && (
        <Card
          className={`backdrop-blur-lg w-full rounded-2xl shadow-lg border transition-all duration-300 ease-in-out mt-8 animate-slideInUp ${
            isDarkMode
              ? "bg-gray-800/95 border-white/10 shadow-black/30"
              : "bg-white/95 border-white/20 shadow-black/10"
          }`}
          title={
            <Space>
              {queryResult.success ? (
                <CheckCircleOutlined style={{ color: "#52c41a" }} />
              ) : (
                <CloseOutlined style={{ color: "#ff4d4f" }} />
              )}
              نتیجه کوئری
              {executionTime && <Tag color="blue">{executionTime}ms</Tag>}
            </Space>
          }
        >
          {queryResult.success ? (
            queryResult.data && queryResult.data.length > 0 ? (
              <div
                className={`overflow-x-auto rounded-xl overflow-hidden ${
                  isDarkMode ? "shadow-black/30" : "shadow-black/10"
                } shadow-lg`}
              >
                <table className="w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      {Object.keys(queryResult.data[0]).map((column) => (
                        <th
                          key={column}
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold p-3 text-right border-none"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {queryResult.data.slice(0, 100).map((row, index) => (
                      <tr
                        key={index}
                        className={`transition-colors duration-200 ease-in-out hover:${
                          isDarkMode ? "bg-indigo-500/20" : "bg-indigo-500/10"
                        }`}
                      >
                        {Object.values(row).map((value, cellIndex) => (
                          <td
                            key={cellIndex}
                            className={`p-3 ${
                              isDarkMode
                                ? "border-b border-white/10"
                                : "border-b border-black/10"
                            }`}
                          >
                            {value !== null ? String(value) : "NULL"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {queryResult.data.length > 100 && (
                  <div className="mt-2 text-center">
                    <Text type="secondary">
                      تنها 100 رکورد اول نمایش داده شده است. کل رکوردها:{" "}
                      {queryResult.data.length}
                    </Text>
                  </div>
                )}
              </div>
            ) : (
              <Alert
                message="کوئری با موفقیت اجرا شد اما نتیجه‌ای برنگرداند"
                type="info"
              />
            )
          ) : (
            <Alert
              message="خطا در اجرای کوئری"
              description={queryResult.error}
              type="error"
              showIcon
            />
          )}
        </Card>
      )}

      {/* Hints Modal */}
      <Modal
        title={
          <Space>
            <BulbOutlined style={{ color: "#faad14" }} />
            راهنمایی‌ها
          </Space>
        }
        open={showHints}
        onCancel={() => setShowHints(false)}
        footer={[
          <Button key="close" onClick={() => setShowHints(false)}>
            بستن
          </Button>,
        ]}
        width={600}
      >
        <div style={{ marginBottom: 16 }}>
          <Progress
            percent={Math.round(
              ((currentHintIndex + 1) / currentQuestion.hints.length) * 100
            )}
            size="small"
            className="rounded-xl overflow-hidden"
            strokeColor={{
              from: "#667eea",
              to: "#764ba2",
            }}
          />
        </div>

        {currentQuestion.hints
          .slice(0, currentHintIndex + 1)
          .map((hint, index) => (
            <Alert
              key={index}
              message={`راهنمایی ${index + 1}`}
              description={hint}
              type="info"
              style={{ marginBottom: 8 }}
              showIcon
              className={`rounded-xl border-none ${
                isDarkMode ? "shadow-black/30" : "shadow-black/10"
              } shadow-lg`}
            />
          ))}

        {currentHintIndex < currentQuestion.hints.length - 1 && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Button type="primary" onClick={showNextHint}>
              راهنمایی بعدی
            </Button>
          </div>
        )}
      </Modal>

      {/* Solution Modal */}
      <Modal
        title={
          <Space>
            <EyeOutlined style={{ color: "#ff4d4f" }} />
            راه حل
          </Space>
        }
        open={showSolution}
        onCancel={() => setShowSolution(false)}
        footer={[
          <Button key="close" onClick={() => setShowSolution(false)}>
            بستن
          </Button>,
        ]}
        width={800}
      >
        <Alert
          message="توجه"
          description="مشاهده راه حل ممکن است بر یادگیری شما تأثیر بگذارد. توصیه می‌شود ابتدا خودتان تلاش کنید."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
          className={`rounded-xl border-none ${
            isDarkMode ? "shadow-black/30" : "shadow-black/10"
          } shadow-lg`}
        />

        <Divider orientation="right">راه حل</Divider>
        <TextArea
          rows={6}
          value={currentQuestion.solution}
          readOnly
          className="font-mono text-sm"
          style={{
            fontFamily: 'Monaco, "Courier New", monospace',
            fontSize: "14px",
            lineHeight: "1.5",
            backgroundColor: isDarkMode ? "#1e1e1e" : "#f8f9fa",
            color: isDarkMode ? "#d4d4d4" : "#333",
            direction: "ltr",
            textAlign: "left",
          }}
        />

        <Divider orientation="right">توضیحات</Divider>
        <Paragraph>{currentQuestion.explanation}</Paragraph>
      </Modal>

      {/* Database Schema Modal */}
      <Modal
        title={
          <Space>
            <DatabaseOutlined />
            {databaseSchemas[selectedDatabase]?.name}
          </Space>
        }
        open={showDatabaseSchema}
        onCancel={() => setShowDatabaseSchema(false)}
        width={900}
        footer={null}
        className={isDarkMode ? "dark-modal" : ""}
      >
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary">
            {databaseSchemas[selectedDatabase]?.description}
          </Text>
        </div>

        <Tabs
          defaultActiveKey="tables"
          type="card"
          items={[
            {
              key: "tables",
              label: "جداول دیتابیس",
              children: (
                <div style={{ maxHeight: 500, overflowY: "auto" }}>
                  {Object.entries(
                    databaseSchemas[selectedDatabase]?.tables || {}
                  ).map(([tableName, table]) => (
                    <Card
                      key={tableName}
                      size="small"
                      title={
                        <Space>
                          <Text strong>{table.name}</Text>
                          <Text type="secondary">({tableName})</Text>
                        </Space>
                      }
                      style={{ marginBottom: 16 }}
                    >
                      <Text
                        type="secondary"
                        style={{ display: "block", marginBottom: 12 }}
                      >
                        {table.description}
                      </Text>

                      <div style={{ overflowX: "auto" }}>
                        <table
                          style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                          <thead>
                            <tr
                              style={{
                                backgroundColor: isDarkMode
                                  ? "#1f1f1f"
                                  : "#fafafa",
                              }}
                            >
                              <th
                                style={{
                                  padding: 8,
                                  border: "1px solid #d9d9d9",
                                  textAlign: "right",
                                }}
                              >
                                نام ستون
                              </th>
                              <th
                                style={{
                                  padding: 8,
                                  border: "1px solid #d9d9d9",
                                  textAlign: "right",
                                }}
                              >
                                نوع داده
                              </th>
                              <th
                                style={{
                                  padding: 8,
                                  border: "1px solid #d9d9d9",
                                  textAlign: "right",
                                }}
                              >
                                ویژگی‌ها
                              </th>
                              <th
                                style={{
                                  padding: 8,
                                  border: "1px solid #d9d9d9",
                                  textAlign: "right",
                                }}
                              >
                                توضیحات
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {table.columns.map((column, index) => (
                              <tr key={index}>
                                <td
                                  style={{
                                    padding: 8,
                                    border: "1px solid #d9d9d9",
                                  }}
                                >
                                  <Text strong={column.primary}>
                                    {column.name}
                                  </Text>
                                  {column.primary && (
                                    <Tag color="red" size="small">
                                      PK
                                    </Tag>
                                  )}
                                  {column.foreign && (
                                    <Tag color="blue" size="small">
                                      FK
                                    </Tag>
                                  )}
                                </td>
                                <td
                                  style={{
                                    padding: 8,
                                    border: "1px solid #d9d9d9",
                                  }}
                                >
                                  <Tag color="purple">{column.type}</Tag>
                                </td>
                                <td
                                  style={{
                                    padding: 8,
                                    border: "1px solid #d9d9d9",
                                  }}
                                >
                                  <Space>
                                    {column.nullable === false && (
                                      <Tag color="orange">NOT NULL</Tag>
                                    )}
                                    {column.unique && (
                                      <Tag color="green">UNIQUE</Tag>
                                    )}
                                    {column.foreign && (
                                      <Tooltip
                                        title={`Foreign Key: ${column.foreign}`}
                                      >
                                        <Tag color="blue">
                                          FK → {column.foreign}
                                        </Tag>
                                      </Tooltip>
                                    )}
                                  </Space>
                                </td>
                                <td
                                  style={{
                                    padding: 8,
                                    border: "1px solid #d9d9d9",
                                  }}
                                >
                                  <Text type="secondary">
                                    {column.description}
                                  </Text>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  ))}
                </div>
              ),
            },
            {
              key: "relationships",
              label: "روابط جداول",
              children: renderDatabaseRelationships(),
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default SQLPracticeInterface;
