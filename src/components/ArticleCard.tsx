import Link from "next/link";
import { format, parseISO } from "date-fns";
interface ArticleCardProps { title: string; date: string; slug: string; excerpt?: string; readingTime?: string; }
export default function ArticleCard({ title, date, slug, excerpt, readingTime }: ArticleCardProps) {
  return (
    <article className="border-b border-neutral-100 pb-6">
      <time dateTime={date} className="text-xs text-neutral-400 uppercase tracking-wide">{format(parseISO(date), "MMMM d, yyyy")}</time>
      <h2 className="font-serif text-xl font-semibold mt-1 mb-2"><Link href={`/insights/${slug}`} className="hover:text-accent transition">{title}</Link></h2>
      {excerpt && <p className="text-neutral-600 text-sm line-clamp-2 mb-3">{excerpt}</p>}
      <div className="flex items-center text-xs text-neutral-400 space-x-4">{readingTime && <span>{readingTime}</span>}</div>
    </article>
  );
}
