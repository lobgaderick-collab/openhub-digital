import fs from "fs"; import path from "path"; import matter from "gray-matter";
const servicesDirectory = path.join(process.cwd(), "content/services");
export interface ServiceMeta { slug: string; title: string; summary: string; icon?: string; }
export function getAllServices(): ServiceMeta[] {
  if (!fs.existsSync(servicesDirectory)) return [];
  const files = fs.readdirSync(servicesDirectory).filter(f => f.endsWith(".mdx"));
  return files.map(f => { const slug = f.replace(/\.mdx$/,""); const raw = fs.readFileSync(path.join(servicesDirectory,f),"utf8"); const { data } = matter(raw); return { slug, title: data.title, summary: data.summary || "", icon: data.icon || undefined }; });
}
export function getServiceBySlug(slug: string): { meta: ServiceMeta; content: string } | null {
  const filePath = path.join(servicesDirectory, `${slug}.mdx`); if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath,"utf8"); const { data, content } = matter(raw);
  return { meta: { slug, title: data.title, summary: data.summary || "", icon: data.icon || undefined }, content };
}
