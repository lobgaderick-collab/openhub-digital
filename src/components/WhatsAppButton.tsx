"use client";
import { FaWhatsapp } from "react-icons/fa";
export default function WhatsAppButton({ phoneNumber = "237699421947" }) {
  const message = "Hello OpenHub Digital!";
  return (
    <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener" className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition" aria-label="Chat on WhatsApp"><FaWhatsapp size={24} /></a>
  );
}
