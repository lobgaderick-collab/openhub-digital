import { getServiceBySlug, getAllServices } from "@/lib/services";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Not Found" };
  return { title: service.meta.title, description: service.meta.summary };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const { content } = await compileMDX({
    source: service.content,
    components: {
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
  // (make sure to import Image if you use img component in services)
  // Add: import Image from "next/image"; at the top of the file

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl font-bold mb-4">
        {service.meta.title}
      </h1>
      <div className="prose prose-neutral max-w-none">{content}</div>
      <div className="mt-8">
        <a
          href={`https://wa.me/237699421947?text=${encodeURIComponent(
            "I am interested in " + service.meta.title
          )}`}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-md hover:bg-green-700 transition"
        >
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}