import fs from "fs"; import path from "path"; import matter from "gray-matter"; import { readingTime } from "reading-time-estimator";
const postsDirectory = path.join(process.cwd(), "content/insights");
export interface PostMeta { slug: string; title: string; date: string; author: string; category: string; excerpt: string; coverImage?: string; readingTime: string; }
function parsePost(filePath: string, slug: string): PostMeta {
  const raw = fs.readFileSync(filePath, "utf8"); const { data, content } = matter(raw); const stats = readingTime(content);
  return { slug, title: data.title, date: data.date, author: data.author || "OpenHub Digital", category: data.category || "Uncategorized", excerpt: data.excerpt || "", coverImage: data.coverImage || undefined, readingTime: stats.text };
}
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith(".mdx"));
  return files.map(f => parsePost(path.join(postsDirectory, f), f.replace(/\.mdx$/,""))).sort((a,b) => (a.date > b.date ? -1 : 1));
}
export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`); if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8"); const { data, content } = matter(raw); const stats = readingTime(content);
  return { meta: { slug, title: data.title, date: data.date, author: data.author || "OpenHub Digital", category: data.category || "Uncategorized", excerpt: data.excerpt || "", coverImage: data.coverImage || undefined, readingTime: stats.text }, content };
}
export function getPostsByCategory(category: string): PostMeta[] { return getAllPosts().filter(p => p.category === category); }
export function getRelatedPosts(currentSlug: string, category: string, limit = 3): PostMeta[] { return getAllPosts().filter(p => p.slug !== currentSlug && p.category === category).slice(0, limit); }
