import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, "content", "insights");

const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".mdx"));

let anyChanged = false;

for (const file of files) {
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Split into frontmatter and body
  const parts = content.split(/^---$/m);
  if (parts.length < 3) continue; // skip if malformed

  const frontmatter = parts[1];
  let body = parts.slice(2).join("---");

  // Protect code fences (inline code and block code)
  const codeBlocks = [];
  // Extract backtick blocks (```) and inline codes (`code`)
  body = body.replace(/(```[\s\S]*?```|`[^`\n]+`)/g, (match) => {
    codeBlocks.push(match);
    return `%%CODEBLOCK${codeBlocks.length - 1}%%`;
  });

  // Now replace remaining curly braces with HTML entities
  body = body.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");

  // Restore code blocks
  body = body.replace(/%%CODEBLOCK(\d+)%%/g, (_, i) => codeBlocks[+i]);

  // Reassemble the file
  const newContent = `---\n${frontmatter}\n---\n${body}`;
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`Fixed braces in: ${file}`);
    anyChanged = true;
  }
}

console.log(anyChanged ? "All files fixed." : "No changes needed.");