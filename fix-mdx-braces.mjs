import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, "content", "insights");

const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".mdx"));

for (const file of files) {
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  // Escapes lone curly braces that are not part of MDX expressions
  content = content.replace(/(?<!\$[\s\S]*?){(?![\s\S]*?\$)}/g, (match) => {
    changed = true;
    return `{'{'}`;
  });
  content = content.replace(/(?<!\$[\s\S]*?)}(?![\s\S]*?\$)/g, (match) => {
    changed = true;
    return `{'}'}`;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Fixed braces in: ${file}`);
  }
}

console.log("MDX brace cleanup complete.");