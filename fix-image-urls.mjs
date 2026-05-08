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

  // Match common malformed patterns:
  // 1. "url](images/filename" inside a full URL
  // 2. Any trailing garbage after the actual file extension
  content = content.replace(
    /(https?:\/\/openhubdigital\.com\/wp-content\/uploads\/[^\s"')]+?\.(?:jpg|jpeg|png|gif|webp))\].*?(?=\s|\"|\'|$)/gi,
    (match, url) => {
      changed = true;
      return url;  // keep only the clean URL
    }
  );

  // Also handle bare "images/..." paths that should be "/images/..." (missing slash)
  content = content.replace(
    /(?<![\/\w])images\/([^\s"')]+)/g,
    "/images/$1"
  );

  if (changed) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Cleaned URLs in ${file}`);
  }
}

console.log("URL cleanup complete.");