import { notFound, redirect } from "next/navigation";
import { getAllPosts } from "@/lib/insights";

export default function CatchAllPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  // Only handle single‑segment paths like /some-old-article
  if (!params.slug || params.slug.length !== 1) notFound();
  const slug = params.slug[0];

  // List of real pages that should never be redirected
  const reserved = new Set([
    "about", "contact", "insights", "services",
    "_next", "api", "favicon.ico", "robots.txt", "sitemap.xml",
  ]);
  if (reserved.has(slug)) notFound();

  // Check if this slug belongs to an article
  const allPosts = getAllPosts();
  if (allPosts.some((p) => p.slug === slug)) {
    redirect(`/insights/${slug}`);
  } else {
    notFound();
  }
}