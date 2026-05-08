import ServiceCard from "@/components/ServiceCard"; import { getAllServices } from "@/lib/services";
export const metadata = { title: "Services" };
export default function ServicesPage() {
  const services = getAllServices();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl font-bold mb-4">Our Services</h1>
      <p className="text-neutral-500 max-w-2xl mb-8">Practical digital solutions to help your business grow in Cameroon and beyond.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{services.map(s => <ServiceCard key={s.slug} title={s.title} summary={s.summary} slug={s.slug} />)}</div>
    </div>
  );
}
