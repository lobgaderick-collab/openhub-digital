import { getAllPosts } from "@/lib/insights"; import { getAllServices } from "@/lib/services";
export default async function sitemap() {
  const baseUrl = "https://openhubdigital.com";
  const posts = getAllPosts().map(p => ({ url: `${baseUrl}/insights/${p.slug}`, lastModified: p.date }));
  const services = getAllServices().map(s => ({ url: `${baseUrl}/services/${s.slug}`, lastModified: new Date() }));
  return [{ url: baseUrl, lastModified: new Date() }, { url: `${baseUrl}/about`, lastModified: new Date() }, { url: `${baseUrl}/contact`, lastModified: new Date() }, ...posts, ...services];
}
