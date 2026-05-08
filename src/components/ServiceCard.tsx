import Link from "next/link";
interface ServiceCardProps { title: string; summary: string; slug: string; }
export default function ServiceCard({ title, summary, slug }: ServiceCardProps) {
  return (
    <Link href={`/services/${slug}`} className="block p-6 border border-neutral-200 rounded-lg hover:shadow-md transition">
      <h3 className="font-serif text-xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-600 text-sm">{summary}</p>
    </Link>
  );
}
