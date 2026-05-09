import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import ServiceCard from "@/components/ServiceCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllPosts } from "@/lib/insights";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
            Insights for Africa’s digital future.
          </h1>
          <p className="mt-4 text-xl text-neutral-500 max-w-2xl mx-auto">
            OpenHub Digital equips entrepreneurs and SMEs in Cameroon with
            strategy, tools, and intelligence to thrive online.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/insights"
              className="bg-accent text-white px-6 py-3 rounded-md font-medium hover:bg-blue-900 transition"
            >
              Read Insights
            </Link>
            <Link
              href="/services"
              className="border border-neutral-300 px-6 py-3 rounded-md font-medium hover:bg-neutral-50 transition"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold mb-8">
            Latest Insights
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <ArticleCard key={post.slug} {...post} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/insights"
              className="text-accent font-medium hover:underline"
            >
              View all articles →
            </Link>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold mb-8 text-center">
            How We Help
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Websites & Strategy",
                summary: "Modern business websites built for results.",
                slug: "business-website-development",
              },
              {
                title: "AI Integration",
                summary: "Practical AI tools to automate and scale.",
                slug: "ai-integration",
              },
              {
                title: "Digital Guidance",
                summary: "Registration, compliance, digital transformation.",
                slug: "digital-transformation-consulting",
              },
            ].map((s) => (
              <ServiceCard key={s.slug} {...s} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="text-accent font-medium hover:underline"
            >
              Explore all services →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-semibold mb-4">
            Stay informed
          </h2>
          <p className="text-neutral-500 mb-6">
            Get digital business insights in your inbox.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}