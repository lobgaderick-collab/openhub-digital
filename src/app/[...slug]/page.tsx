import { notFound, redirect } from "next/navigation";
import { getAllPosts } from "@/lib/insights";

export default function CatchAllPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  // Only handle single-segment paths like /some-article
  if (!params.slug || params.slug.length !== 1) notFound();

  const slug = params.slug[0];

  // Don't redirect actual pages
  const reservedPaths = new Set([
    "about",
    "contact",
    "insights",
    "services",
    "_next",
    "api",
    "favicon.ico",
    "robots.txt",
    "sitemap.xml",
  ]);
  if (reservedPaths.has(slug)) notFound();

  // Check if this slug exists in our article collection
  const posts = getAllPosts();
  const exists = posts.some((p) => p.slug === slug);

  if (exists) {
    redirect(`/insights/${slug}`);
  } else {
    notFound();
  }
}