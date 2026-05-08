import { getAllPosts } from "@/lib/insights"; import ArticleCard from "@/components/ArticleCard";
export const metadata = { title: "Insights", description: "Business and digital insights for African entrepreneurs." };
export default function InsightsPage() {
  const posts = getAllPosts();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl font-bold mb-8">Insights</h1>
      {posts.length > 0 ? (<div className="grid md:grid-cols-2 gap-8">{posts.map(post => <ArticleCard key={post.slug} {...post} />)}</div>) : <p className="text-neutral-500">No articles yet.</p>}
    </div>
  );
}
