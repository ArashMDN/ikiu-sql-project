import { PrismaClient } from "../../../generated/prisma";
import { NextResponse } from "next/server";
import lodash from "lodash";

const prisma = new PrismaClient();

const ALLOWED_COMMANDS = ["SELECT", "WITH"];
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
  if (!ALLOWED_COMMANDS.some((cmd) => trimmedQuery.startsWith(cmd))) {
    return { valid: false, error: "فقط کوئری‌های SELECT مجاز هستند" };
  }
  if (BLOCKED_KEYWORDS.some((keyword) => trimmedQuery.includes(keyword))) {
    return { valid: false, error: "کوئری شامل دستورات غیرمجاز است" };
  }
  if (trimmedQuery.includes(";") && trimmedQuery.split(";").length > 2) {
    return { valid: false, error: "اجرای چندین کوئری همزمان مجاز نیست" };
  }
  return { valid: true };
}

function serializeResult(result) {
  return JSON.parse(
    JSON.stringify(result, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

function compareResults(userResult, solutionResult) {
  if (userResult.length !== solutionResult.length) {
    return false;
  }
  if (userResult.length === 0 && solutionResult.length === 0) {
    return true;
  }

  const userResultSorted = lodash.sortBy(
    userResult,
    Object.keys(userResult[0])
  );
  const solutionResultSorted = lodash.sortBy(
    solutionResult,
    Object.keys(solutionResult[0])
  );

  return lodash.isEqual(userResultSorted, solutionResultSorted);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userQuery, solutionQuery } = body;

    if (!userQuery || !solutionQuery) {
      return NextResponse.json(
        { error: "هر دو کوئری کاربر و راه حل الزامی است" },
        { status: 400 }
      );
    }

    const userQueryValidation = validateSqlQuery(userQuery);
    if (!userQueryValidation.valid) {
      return NextResponse.json(
        { error: userQueryValidation.error, isValidationError: true },
        { status: 400 }
      );
    }

    const solutionQueryValidation = validateSqlQuery(solutionQuery);
    if (!solutionQueryValidation.valid) {
      return NextResponse.json(
        { error: "کوئری راه حل نامعتبر است", isValidationError: true },
        { status: 500 }
      );
    }

    const startTime = Date.now();
    let userResult, solutionResult;

    try {
      userResult = await prisma.$queryRawUnsafe(userQuery);
    } catch (sqlError) {
      return NextResponse.json(
        {
          error: "خطا در اجرای کوئری شما",
          details: sqlError.message,
          success: false,
        },
        { status: 400 }
      );
    }

    try {
      solutionResult = await prisma.$queryRawUnsafe(solutionQuery);
    } catch (sqlError) {
      console.error("Solution Query Error:", sqlError);
      return NextResponse.json(
        {
          error: "خطا در اجرای کوئری راه حل",
          details: sqlError.message,
          success: false,
        },
        { status: 500 }
      );
    }

    const executionTime = Date.now() - startTime;
    const serializedUserResult = serializeResult(userResult);
    const serializedSolutionResult = serializeResult(solutionResult);

    const isCorrect = compareResults(
      serializedUserResult,
      serializedSolutionResult
    );

    return NextResponse.json({
      success: true,
      isCorrect,
      userResult: serializedUserResult,
      executionTime: `${executionTime}ms`,
      rowCount: serializedUserResult.length,
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
