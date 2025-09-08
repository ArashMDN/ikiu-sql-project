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
];
importantFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
  }
});

console.log("=== END CHECK ===");
