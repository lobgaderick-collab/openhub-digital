import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, "content", "insights");
const imagesDir = path.join(__dirname, "public", "images");

// Bypass SSL for the old site
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

// Helper to download a file
const downloadFile = (url, dest) =>
  new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const proto = url.startsWith("https") ? https : http;
    proto.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(`Failed to download ${url} - status ${response.statusCode}`);
        return;
      }
      response.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", reject);
  });

// Read all .mdx files
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

for (const file of files) {
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  // Regex for common WordPress image URLs (adjust if needed)
  const regex =
    /https?:\/\/openhubdigital\.com\/wp-content\/uploads\/[^\s)"]+/g;
  const matches = content.match(regex);

  if (matches) {
    for (const url of matches) {
      const filename = path.basename(new URL(url).pathname);
      const newPath = `/images/${filename}`;
      try {
        await downloadFile(url, path.join(imagesDir, filename));
        content = content.replace(url, newPath);
        changed = true;
        console.log(`Downloaded: ${filename}`);
      } catch (err) {
        console.warn(`Could not download ${url}: ${err}`);
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Updated: ${file}`);
  }
}

console.log("Image download complete. Restart the dev server.");