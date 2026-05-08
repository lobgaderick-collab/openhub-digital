export default function NewsletterForm() {
  return (
    <form className="flex flex-col sm:flex-row gap-2" action="#" method="POST">
      <input type="email" placeholder="Your email" className="px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-400" required />
      <button type="submit" className="bg-accent hover:bg-blue-900 text-white px-4 py-2 rounded font-medium transition">Subscribe</button>
    </form>
  );
}
