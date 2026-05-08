import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, "content", "insights");

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

files.forEach((file) => {
  const filePath = path.join(postsDir, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  let newDate = data.date;
  if (data.date instanceof Date) {
    newDate = data.date.toISOString().split("T")[0];
  } else if (typeof data.date === "number" || !isNaN(Date.parse(data.date))) {
    newDate = new Date(data.date).toISOString().split("T")[0];
  } else if (typeof data.date !== "string" || data.date.trim() === "") {
    newDate = new Date().toISOString().split("T")[0];
  }

  if (String(data.date) !== String(newDate)) {
    data.date = newDate;
    const newFrontmatter = matter.stringify(content, data);
    fs.writeFileSync(filePath, newFrontmatter, "utf8");
    console.log(`Fixed date in: ${file}`);
  }
});

console.log("Date check complete.");