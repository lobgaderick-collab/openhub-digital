import { notFound, redirect } from "next/navigation";
import { getAllPosts } from "@/lib/insights";

export default function CatchAllPage({ params }: { params: { slug?: string[] } }) {
  if (!params.slug || params.slug.length !== 1) notFound();
  const slug = params.slug[0];
  const reserved = new Set(["about","contact","insights","services","_next","api","favicon.ico","robots.txt","sitemap.xml"]);
  if (reserved.has(slug)) notFound();
  const allPosts = getAllPosts();
  if (allPosts.some(p => p.slug === slug)) redirect(`/insights/${slug}`);
  else notFound();
}