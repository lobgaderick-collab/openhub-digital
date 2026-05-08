import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div><h4 className="font-serif text-lg font-semibold text-white mb-2">OpenHub Digital</h4><p className="text-sm">Digital business intelligence for Africa.</p></div>
        <div><h4 className="font-semibold text-white mb-2">Platform</h4><ul className="space-y-1 text-sm"><li><Link href="/insights" className="hover:text-white transition">Insights</Link></li><li><Link href="/services" className="hover:text-white transition">Services</Link></li></ul></div>
        <div>
          <h4 className="font-semibold text-white mb-2">Company</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><a href="https://openhubconsulting.com" target="_blank" rel="noopener" className="hover:text-white transition">openhubconsulting.com</a></li>
          </ul>
        </div>
        <div><h4 className="font-semibold text-white mb-2">Stay informed</h4><NewsletterForm /></div>
      </div>
      <div className="mt-8 border-t border-neutral-700 pt-6 text-center text-sm text-neutral-500">© {new Date().getFullYear()} OpenHub Digital. All rights reserved.</div>
    </footer>
  );
}
