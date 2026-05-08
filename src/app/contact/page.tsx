import WhatsAppButton from "@/components/WhatsAppButton";
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
