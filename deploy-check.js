const fs = require("fs");
const path = require("path");

console.log("=== DEPLOYMENT CHECK ===");
console.log("Current working directory:", process.cwd());
console.log("Files in root:", fs.readdirSync("."));

// Check for important directories
const importantDirs = ["app", "prisma", "public"];
importantDirs.forEach((dir) => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}/ directory exists`);
    console.log(`   Files in ${dir}/:`, fs.readdirSync(dir));
  } else {
    console.log(`❌ ${dir}/ directory missing`);
  }
});

// Check for important files
const importantFiles = [
  "package.json",
  "next.config.mjs",
  "liara.json",
  "prisma/schema.prisma",
  "prisma/dev.db",
];
importantFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
    if (file.endsWith(".db")) {
      const stats = fs.statSync(file);
      console.log(`   Database size: ${(stats.size / 1024).toFixed(2)} KB`);
    }
  } else {
    console.log(`❌ ${file} missing`);
  }
});

// Check environment variables
console.log("Environment variables:");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL:", process.env.DATABASE_URL);

console.log("=== END CHECK ===");
