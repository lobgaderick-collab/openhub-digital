import ArticleCard from "./ArticleCard";
import type { PostMeta } from "@/lib/insights";
export default function RelatedArticles({ articles }: { articles: PostMeta[] }) {
  return <div className="grid md:grid-cols-3 gap-6">{articles.map(a => <ArticleCard key={a.slug} {...a} />)}</div>;
}
