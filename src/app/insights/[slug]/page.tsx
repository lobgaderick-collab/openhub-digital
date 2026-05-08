import { getPostBySlug, getRelatedPosts, getAllPosts } from "@/lib/insights";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { compileMDX } from "next-mdx-remote/rsc";
import AdUnit from "@/components/AdUnit";
import RelatedArticles from "@/components/RelatedArticles";
import SocialShare from "@/components/SocialShare";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      images: post.meta.coverImage ? [post.meta.coverImage] : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: {
      AdUnit,
      img: (props: any) => {
        let src = props.src;
        if (src && !src.startsWith("http") && !src.startsWith("/")) {
          src = "/" + src;
        }
        return (
          <span className="relative block my-8 overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={props.alt || ""}
              width={800}
              height={450}
              className="object-cover"
            />
          </span>
        );
      },
    },
    options: { parseFrontmatter: true },
  });

  const related = getRelatedPosts(slug, post.meta.category, 3);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <time
          dateTime={post.meta.date}
          className="text-neutral-400 uppercase text-xs tracking-wider"
        >
          {format(parseISO(post.meta.date), "MMMM d, yyyy")}
        </time>
        <h1 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-4">
          {post.meta.title}
        </h1>
        <div className="flex items-center text-sm text-neutral-500 space-x-4">
          <span>{post.meta.author}</span>
          <span>{post.meta.readingTime}</span>
        </div>
      </header>
      <div className="prose prose-neutral max-w-none prose-a:text-accent">
        {content}
      </div>
      <AdUnit slot="1234567890" />
      <SocialShare url={`/insights/${slug}`} title={post.meta.title} />
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-serif text-2xl font-semibold mb-4">
            Related Articles
          </h2>
          <RelatedArticles articles={related} />
        </div>
      )}
    </article>
  );
}