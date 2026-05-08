import Link from "next/link";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-neutral-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="font-serif text-2xl font-bold text-neutral-900">
  OpenHub Digital
</Link>
        <ul className="flex gap-6 text-sm font-medium text-neutral-600">
          <li><Link href="/insights" className="hover:text-accent transition">Insights</Link></li>
          <li><Link href="/services" className="hover:text-accent transition">Services</Link></li>
          <li><Link href="/about" className="hover:text-accent transition">About</Link></li>
          <li><Link href="/contact" className="hover:text-accent transition">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
