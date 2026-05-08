import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Helper to write a file, creating parent directories if needed
function writeFile(relativePath, content) {
  const fullPath = path.join(__dirname, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Created: ${relativePath}`);
}

// ========== All file definitions (with your real details) ==========

// tailwind.config.ts
writeFile('tailwind.config.ts', `import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { accent: "#1a3a5c", neutral: { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 800: "#262626", 900: "#171717" } },
      fontFamily: { serif: ["var(--font-merriweather)", "Georgia", "serif"], sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
`);

// next.config.mjs
writeFile('next.config.mjs', `/** @type {import('next').NextConfig} */
const nextConfig = { images: { domains: [] } };
export default nextConfig;
`);

// globals.css
writeFile('src/app/globals.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body { @apply bg-white text-neutral-900 antialiased; }
  h1, h2, h3, h4, h5, h6 { @apply font-serif; }
}
`);

// layout.tsx (with your AdSense ID)
writeFile('src/app/layout.tsx', `import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({ weight: ["300","400","700","900"], subsets: ["latin"], variable: "--font-merriweather" });

export const metadata: Metadata = {
  title: { default: "OpenHub Digital | Business Insights & Digital Strategy for Africa", template: "%s | OpenHub Digital" },
  description: "Expert digital strategy, AI integration, and business media for entrepreneurs and SMEs in Cameroon and Africa.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${inter.variable} \${merriweather.variable}\`}>
      <head>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0039457841411069" crossOrigin="anonymous" strategy="afterInteractive" />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
`);

// Navbar.tsx
writeFile('src/components/Navbar.tsx', `import Link from "next/link";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-neutral-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="font-serif text-2xl font-bold text-neutral-900">OpenHub<span className="text-accent">.</span>Digital</Link>
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
`);

// Footer.tsx (includes openhubconsulting.com link)
writeFile('src/components/Footer.tsx', `import Link from "next/link";
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
`);

// NewsletterForm.tsx
writeFile('src/components/NewsletterForm.tsx', `export default function NewsletterForm() {
  return (
    <form className="flex flex-col sm:flex-row gap-2" action="#" method="POST">
      <input type="email" placeholder="Your email" className="px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-400" required />
      <button type="submit" className="bg-accent hover:bg-blue-900 text-white px-4 py-2 rounded font-medium transition">Subscribe</button>
    </form>
  );
}
`);

// AdUnit.tsx (with your AdSense ID)
writeFile('src/components/AdUnit.tsx', `"use client";
import { useEffect } from "react";
declare global { interface Window { adsbygoogle: any[]; } }
export default function AdUnit({ slot, format = "auto" }: { slot: string; format?: string }) {
  useEffect(() => { if (window.adsbygoogle && window.adsbygoogle.length === 0) window.adsbygoogle.push({}); }, []);
  return (
    <div className="my-8 flex justify-center">
      <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="ca-pub-0039457841411069" data-ad-slot={slot} data-ad-format={format} data-full-width-responsive="true" />
    </div>
  );
}
`);

// ArticleCard.tsx
writeFile('src/components/ArticleCard.tsx', `import Link from "next/link";
import { format, parseISO } from "date-fns";
interface ArticleCardProps { title: string; date: string; slug: string; excerpt?: string; readingTime?: string; }
export default function ArticleCard({ title, date, slug, excerpt, readingTime }: ArticleCardProps) {
  return (
    <article className="border-b border-neutral-100 pb-6">
      <time dateTime={date} className="text-xs text-neutral-400 uppercase tracking-wide">{format(parseISO(date), "MMMM d, yyyy")}</time>
      <h2 className="font-serif text-xl font-semibold mt-1 mb-2"><Link href={\`/insights/\${slug}\`} className="hover:text-accent transition">{title}</Link></h2>
      {excerpt && <p className="text-neutral-600 text-sm line-clamp-2 mb-3">{excerpt}</p>}
      <div className="flex items-center text-xs text-neutral-400 space-x-4">{readingTime && <span>{readingTime}</span>}</div>
    </article>
  );
}
`);

// ServiceCard.tsx
writeFile('src/components/ServiceCard.tsx', `import Link from "next/link";
interface ServiceCardProps { title: string; summary: string; slug: string; }
export default function ServiceCard({ title, summary, slug }: ServiceCardProps) {
  return (
    <Link href={\`/services/\${slug}\`} className="block p-6 border border-neutral-200 rounded-lg hover:shadow-md transition">
      <h3 className="font-serif text-xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-600 text-sm">{summary}</p>
    </Link>
  );
}
`);

// RelatedArticles.tsx
writeFile('src/components/RelatedArticles.tsx', `import ArticleCard from "./ArticleCard";
import type { PostMeta } from "@/lib/insights";
export default function RelatedArticles({ articles }: { articles: PostMeta[] }) {
  return <div className="grid md:grid-cols-3 gap-6">{articles.map(a => <ArticleCard key={a.slug} {...a} />)}</div>;
}
`);

// SocialShare.tsx
writeFile('src/components/SocialShare.tsx', `"use client";
import { FaWhatsapp, FaLinkedin, FaTwitter } from "react-icons/fa";
export default function SocialShare({ url, title }: { url: string; title: string }) {
  const fullUrl = \`https://openhubdigital.com\${url}\`;
  return (
    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-neutral-200">
      <span className="text-sm text-neutral-500">Share:</span>
      <a href={\`https://wa.me/?text=\${encodeURIComponent(title + " " + fullUrl)}\`} target="_blank" rel="noopener" className="text-green-600 hover:text-green-700"><FaWhatsapp /></a>
      <a href={\`https://twitter.com/intent/tweet?text=\${encodeURIComponent(title)}&url=\${encodeURIComponent(fullUrl)}\`} target="_blank" rel="noopener" className="text-blue-400 hover:text-blue-600"><FaTwitter /></a>
      <a href={\`https://linkedin.com/shareArticle?mini=true&url=\${encodeURIComponent(fullUrl)}&title=\${encodeURIComponent(title)}\`} target="_blank" rel="noopener" className="text-blue-700 hover:text-blue-900"><FaLinkedin /></a>
    </div>
  );
}
`);

// WhatsAppButton.tsx (default number set to yours)
writeFile('src/components/WhatsAppButton.tsx', `"use client";
import { FaWhatsapp } from "react-icons/fa";
export default function WhatsAppButton({ phoneNumber = "237699421947" }) {
  const message = "Hello OpenHub Digital!";
  return (
    <a href={\`https://wa.me/\${phoneNumber}?text=\${encodeURIComponent(message)}\`} target="_blank" rel="noopener" className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition" aria-label="Chat on WhatsApp"><FaWhatsapp size={24} /></a>
  );
}
`);

// lib/insights.ts
writeFile('src/lib/insights.ts', `import fs from "fs"; import path from "path"; import matter from "gray-matter"; import { readingTime } from "reading-time-estimator";
const postsDirectory = path.join(process.cwd(), "content/insights");
export interface PostMeta { slug: string; title: string; date: string; author: string; category: string; excerpt: string; coverImage?: string; readingTime: string; }
function parsePost(filePath: string, slug: string): PostMeta {
  const raw = fs.readFileSync(filePath, "utf8"); const { data, content } = matter(raw); const stats = readingTime(content);
  return { slug, title: data.title, date: data.date, author: data.author || "OpenHub Digital", category: data.category || "Uncategorized", excerpt: data.excerpt || "", coverImage: data.coverImage || undefined, readingTime: stats.text };
}
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith(".mdx"));
  return files.map(f => parsePost(path.join(postsDirectory, f), f.replace(/\\.mdx$/,""))).sort((a,b) => (a.date > b.date ? -1 : 1));
}
export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  const filePath = path.join(postsDirectory, \`\${slug}.mdx\`); if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8"); const { data, content } = matter(raw); const stats = readingTime(content);
  return { meta: { slug, title: data.title, date: data.date, author: data.author || "OpenHub Digital", category: data.category || "Uncategorized", excerpt: data.excerpt || "", coverImage: data.coverImage || undefined, readingTime: stats.text }, content };
}
export function getPostsByCategory(category: string): PostMeta[] { return getAllPosts().filter(p => p.category === category); }
export function getRelatedPosts(currentSlug: string, category: string, limit = 3): PostMeta[] { return getAllPosts().filter(p => p.slug !== currentSlug && p.category === category).slice(0, limit); }
`);

// lib/services.ts
writeFile('src/lib/services.ts', `import fs from "fs"; import path from "path"; import matter from "gray-matter";
const servicesDirectory = path.join(process.cwd(), "content/services");
export interface ServiceMeta { slug: string; title: string; summary: string; icon?: string; }
export function getAllServices(): ServiceMeta[] {
  if (!fs.existsSync(servicesDirectory)) return [];
  const files = fs.readdirSync(servicesDirectory).filter(f => f.endsWith(".mdx"));
  return files.map(f => { const slug = f.replace(/\\.mdx$/,""); const raw = fs.readFileSync(path.join(servicesDirectory,f),"utf8"); const { data } = matter(raw); return { slug, title: data.title, summary: data.summary || "", icon: data.icon || undefined }; });
}
export function getServiceBySlug(slug: string): { meta: ServiceMeta; content: string } | null {
  const filePath = path.join(servicesDirectory, \`\${slug}.mdx\`); if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath,"utf8"); const { data, content } = matter(raw);
  return { meta: { slug, title: data.title, summary: data.summary || "", icon: data.icon || undefined }, content };
}
`);

// Pages: Home
writeFile('src/app/page.tsx', `import Link from "next/link"; import ArticleCard from "@/components/ArticleCard"; import ServiceCard from "@/components/ServiceCard"; import NewsletterForm from "@/components/NewsletterForm"; import { getAllPosts } from "@/lib/insights";
export default function Home() {
  const posts = getAllPosts().slice(0,3);
  return (
    <>
      <section className="py-20"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">Insights for Africa’s digital future.</h1>
        <p className="mt-4 text-xl text-neutral-500 max-w-2xl mx-auto">OpenHub Digital equips entrepreneurs and SMEs in Cameroon with strategy, tools, and intelligence to thrive online.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/insights" className="bg-accent text-white px-6 py-3 rounded-md font-medium hover:bg-blue-900 transition">Read Insights</Link>
          <Link href="/services" className="border border-neutral-300 px-6 py-3 rounded-md font-medium hover:bg-neutral-50 transition">Our Services</Link>
        </div>
      </div></section>
      <section className="py-16 bg-white"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-semibold mb-8">Latest Insights</h2>
        <div className="grid md:grid-cols-3 gap-8">{posts.map(post => <ArticleCard key={post.slug} {...post} />)}</div>
        <div className="mt-8 text-center"><Link href="/insights" className="text-accent font-medium hover:underline">View all articles →</Link></div>
      </div></section>
      <section className="py-16 bg-neutral-50"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-semibold mb-8 text-center">How We Help</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[ {title:"Websites & Strategy", summary:"Modern business websites built for results.", slug:"business-website-development"}, {title:"AI Integration", summary:"Practical AI tools to automate and scale.", slug:"ai-integration"}, {title:"Digital Guidance", summary:"Registration, compliance, digital transformation.", slug:"digital-transformation-consulting"} ].map(s => <ServiceCard key={s.slug} {...s} />)}
        </div>
        <div className="text-center mt-8"><Link href="/services" className="text-accent font-medium hover:underline">Explore all services →</Link></div>
      </div></section>
      <section className="py-16 bg-white"><div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="font-serif text-2xl font-semibold mb-4">Stay informed</h2>
        <p className="text-neutral-500 mb-6">Get digital business insights in your inbox.</p>
        <NewsletterForm />
      </div></section>
    </>
  );
}
`);

// Insights list
writeFile('src/app/insights/page.tsx', `import { getAllPosts } from "@/lib/insights"; import ArticleCard from "@/components/ArticleCard";
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
`);

// Insights single article (dynamic)
writeFile('src/app/insights/[slug]/page.tsx', `import { getPostBySlug, getRelatedPosts, getAllPosts } from "@/lib/insights"; import { notFound } from "next/navigation"; import { format, parseISO } from "date-fns"; import { compileMDX } from "next-mdx-remote/rsc"; import AdUnit from "@/components/AdUnit"; import RelatedArticles from "@/components/RelatedArticles"; import SocialShare from "@/components/SocialShare"; import Image from "next/image"; import type { Metadata } from "next";

export async function generateStaticParams() { const posts = getAllPosts(); return posts.map(post => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug); if (!post) return { title: "Not Found" };
  return { title: post.meta.title, description: post.meta.excerpt, openGraph: { images: post.meta.coverImage ? [post.meta.coverImage] : [] } };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug); if (!post) notFound();
  const { content } = await compileMDX({ source: post.content, components: { AdUnit, img: (props: any) => (<span className="relative block my-8 overflow-hidden rounded-lg"><Image src={props.src} alt={props.alt || ""} width={800} height={450} className="object-cover" /></span>) }, options: { parseFrontmatter: true } });
  const related = getRelatedPosts(params.slug, post.meta.category, 3);
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8"><time dateTime={post.meta.date} className="text-neutral-400 uppercase text-xs tracking-wider">{format(parseISO(post.meta.date), "MMMM d, yyyy")}</time>
        <h1 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-4">{post.meta.title}</h1>
        <div className="flex items-center text-sm text-neutral-500 space-x-4"><span>{post.meta.author}</span><span>{post.meta.readingTime}</span></div>
      </header>
      <div className="prose prose-neutral max-w-none prose-a:text-accent">{content}</div>
      <AdUnit slot="1234567890" />
      <SocialShare url={\`/insights/\${params.slug}\`} title={post.meta.title} />
      {related.length > 0 && (<div className="mt-12"><h2 className="font-serif text-2xl font-semibold mb-4">Related Articles</h2><RelatedArticles articles={related} /></div>)}
    </article>
  );
}
`);

// Services list
writeFile('src/app/services/page.tsx', `import ServiceCard from "@/components/ServiceCard"; import { getAllServices } from "@/lib/services";
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
`);

// Service single (dynamic) — with your WhatsApp number
writeFile('src/app/services/[slug]/page.tsx', `import { getServiceBySlug, getAllServices } from "@/lib/services"; import { notFound } from "next/navigation"; import { compileMDX } from "next-mdx-remote/rsc"; import type { Metadata } from "next";

export async function generateStaticParams() { return getAllServices().map(s => ({ slug: s.slug })); }

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getServiceBySlug(params.slug); if (!service) return { title: "Not Found" };
  return { title: service.meta.title, description: service.meta.summary };
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug); if (!service) notFound();
  const { content } = await compileMDX({ source: service.content, components: {}, options: { parseFrontmatter: true } });
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl font-bold mb-4">{service.meta.title}</h1>
      <div className="prose prose-neutral max-w-none">{content}</div>
      <div className="mt-8"><a href={\`https://wa.me/237699421947?text=\${encodeURIComponent("I am interested in " + service.meta.title)}\`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-md hover:bg-green-700 transition">Enquire on WhatsApp</a></div>
    </div>
  );
}
`);

// About page (with consulting link)
writeFile('src/app/about/page.tsx', `export const metadata = { title: "About" };
export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl font-bold mb-6">About OpenHub Digital</h1>
      <div className="prose prose-neutral max-w-none">
        <p>We are a digital authority platform rooted in Cameroon, serving entrepreneurs, SMEs, and professionals across Africa. Our mission is to make digital business straightforward—practical, honest, and grounded in real-world results.</p>
        <p>From business websites to AI integration and compliance guidance, we help you build a credible, modern online presence that grows with you.</p>
        <p>We believe the next wave of African business will be driven by digital clarity, not hype. That is the OpenHub way.</p>
        <p>OpenHub Digital is part of <a href="https://openhubconsulting.com" target="_blank" rel="noopener">OpenHub Consulting</a>.</p>
      </div>
    </div>
  );
}
`);

// Contact page (email: sales@openhubconsulting.com, WhatsApp: 237699421947)
writeFile('src/app/contact/page.tsx', `import WhatsAppButton from "@/components/WhatsAppButton";
export const metadata = { title: "Contact" };
export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl font-bold mb-6">Get in Touch</h1>
      <p className="text-neutral-500 mb-8">Reach us via WhatsApp or send a message.</p>
      <a href="https://wa.me/237699421947?text=Hello%20OpenHub" target="_blank" rel="noopener" className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-md hover:bg-green-700 transition mb-8">Chat on WhatsApp</a>
      <form className="space-y-4 mt-6" action="mailto:sales@openhubconsulting.com" method="post" encType="text/plain">
        <div><label className="block text-sm font-medium mb-1">Name</label><input type="text" name="name" className="w-full border border-neutral-300 rounded-md px-3 py-2" /></div>
        <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" name="email" className="w-full border border-neutral-300 rounded-md px-3 py-2" /></div>
        <div><label className="block text-sm font-medium mb-1">Message</label><textarea name="message" rows={4} className="w-full border border-neutral-300 rounded-md px-3 py-2" /></div>
        <button type="submit" className="bg-accent text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-900 transition">Send</button>
      </form>
      <WhatsAppButton />
    </div>
  );
}
`);

// 404 page
writeFile('src/app/not-found.tsx', `export default function NotFound() {
  return (<div className="max-w-2xl mx-auto py-20 text-center px-4"><h1 className="font-serif text-4xl font-bold mb-4">404 – Page Not Found</h1><p className="text-neutral-500">The page you are looking for does not exist.</p></div>);
}
`);

// sitemap.ts
writeFile('src/app/sitemap.ts', `import { getAllPosts } from "@/lib/insights"; import { getAllServices } from "@/lib/services";
export default async function sitemap() {
  const baseUrl = "https://openhubdigital.com";
  const posts = getAllPosts().map(p => ({ url: \`\${baseUrl}/insights/\${p.slug}\`, lastModified: p.date }));
  const services = getAllServices().map(s => ({ url: \`\${baseUrl}/services/\${s.slug}\`, lastModified: new Date() }));
  return [{ url: baseUrl, lastModified: new Date() }, { url: \`\${baseUrl}/about\`, lastModified: new Date() }, { url: \`\${baseUrl}/contact\`, lastModified: new Date() }, ...posts, ...services];
}
`);

// robots.ts
writeFile('src/app/robots.ts', `export default function robots() { return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://openhubdigital.com/sitemap.xml" }; }
`);

// Sample MDX files
writeFile('content/insights/welcome.mdx', `---
title: "Welcome to OpenHub Digital"
date: "2024-01-01"
author: "OpenHub Digital"
category: "General"
excerpt: "A new digital authority platform for Africa's builders."
---
This is your first insight. Start writing.
`);

writeFile('content/services/business-website-development.mdx', `---
title: "Business Website Development"
summary: "Custom, high-performance websites that represent your brand and drive growth."
---
We build modern, fast websites tailored to your business needs.
`);

writeFile('content/services/ai-integration.mdx', `---
title: "AI Integration"
summary: "Bring artificial intelligence into your workflows to save time and increase productivity."
---
Integrate AI tools like chatbots, automation, and data analysis.
`);

writeFile('content/services/digital-strategy.mdx', `---
title: "Digital Strategy"
summary: "Plan your digital future with a clear, actionable roadmap."
---
We help you understand where you are and where you need to go.
`);

writeFile('content/services/business-registration-guidance.mdx', `---
title: "Business Registration Guidance"
summary: "Navigate the legal and administrative steps to register your business in Cameroon."
---
Get clear, step-by-step support to formally register your company.
`);

writeFile('content/services/seo-content-strategy.mdx', `---
title: "SEO & Content Strategy"
summary: "Rank higher and reach your audience with a smart content plan."
---
We craft SEO-driven content strategies that attract and convert customers.
`);

writeFile('content/services/digital-transformation-consulting.mdx', `---
title: "Digital Transformation Consulting"
summary: "Transform your entire business for the digital age."
---
From automation to cloud adoption, we help you modernize.
`);

console.log('All files created successfully.');