import { PrismaClient } from "../../../generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// List of allowed read-only SQL commands
const ALLOWED_COMMANDS = [
  "SELECT",
  "WITH", // For CTEs (Common Table Expressions)
];

// List of dangerous keywords that should be blocked
const BLOCKED_KEYWORDS = [
  "DROP",
  "DELETE",
  "INSERT",
  "UPDATE",
  "ALTER",
  "CREATE",
  "TRUNCATE",
  "REPLACE",
  "MERGE",
  "CALL",
  "EXEC",
  "EXECUTE",
  "PRAGMA",
];

function validateSqlQuery(query) {
  if (!query || typeof query !== "string") {
    return { valid: false, error: "کوئری معتبر نیست" };
  }

  const trimmedQuery = query.trim().toUpperCase();

  // Check if query starts with allowed command
  const isAllowed = ALLOWED_COMMANDS.some((cmd) =>
    trimmedQuery.startsWith(cmd)
  );

  if (!isAllowed) {
    return {
      valid: false,
      error: "فقط کوئری‌های SELECT مجاز هستند",
    };
  }

  // Check for blocked keywords
  const hasBlockedKeyword = BLOCKED_KEYWORDS.some((keyword) =>
    trimmedQuery.includes(keyword)
  );

  if (hasBlockedKeyword) {
    return {
      valid: false,
      error: "کوئری شامل دستورات غیرمجاز است",
    };
  }

  // Additional security checks
  if (trimmedQuery.includes(";") && trimmedQuery.split(";").length > 2) {
    return {
      valid: false,
      error: "اجرای چندین کوئری همزمان مجاز نیست",
    };
  }

  return { valid: true };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { query, database } = body;

    if (!query) {
      return NextResponse.json({ error: "کوئری الزامی است" }, { status: 400 });
    }

    // Validate the SQL query
    const validation = validateSqlQuery(query);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Execute the query
    const startTime = Date.now();
    let result;

    try {
      result = await prisma.$queryRawUnsafe(query);
    } catch (sqlError) {
      return NextResponse.json(
        {
          error: "خطا در اجرای کوئری",
          details: sqlError.message,
          success: false,
        },
        { status: 400 }
      );
    }

    const executionTime = Date.now() - startTime;

    // Convert BigInt values to strings to avoid JSON serialization issues
    const serializedResult = JSON.parse(
      JSON.stringify(result, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    return NextResponse.json({
      success: true,
      data: serializedResult,
      executionTime: `${executionTime}ms`,
      rowCount: Array.isArray(serializedResult) ? serializedResult.length : 0,
      query: query.trim(),
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "خطای داخلی سرور",
        success: false,
      },
      { status: 500 }
    );
  }
}

// GET endpoint to get database schema information
export async function GET() {
  try {
    const tables = await prisma.$queryRaw`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name != '_prisma_migrations'
      ORDER BY name;
    `;

    const tableDetails = {};

    for (const table of tables) {
      const columns = await prisma.$queryRawUnsafe(
        `PRAGMA table_info(${table.name})`
      );
      tableDetails[table.name] = columns.map((col) => ({
        name: col.name,
        type: col.type,
        notNull: col.notnull === 1,
        primaryKey: col.pk === 1,
        defaultValue: col.dflt_value,
      }));
    }

    return NextResponse.json({
      success: true,
      tables: tableDetails,
    });
  } catch (error) {
    console.error("Schema Error:", error);
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات دیتابیس" },
      { status: 500 }
    );
  }
}
