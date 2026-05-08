"use client";
import { FaWhatsapp, FaLinkedin, FaTwitter } from "react-icons/fa";
export default function SocialShare({ url, title }: { url: string; title: string }) {
  const fullUrl = `https://openhubdigital.com${url}`;
  return (
    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-neutral-200">
      <span className="text-sm text-neutral-500">Share:</span>
      <a href={`https://wa.me/?text=${encodeURIComponent(title + " " + fullUrl)}`} target="_blank" rel="noopener" className="text-green-600 hover:text-green-700"><FaWhatsapp /></a>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener" className="text-blue-400 hover:text-blue-600"><FaTwitter /></a>
      <a href={`https://linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}`} target="_blank" rel="noopener" className="text-blue-700 hover:text-blue-900"><FaLinkedin /></a>
    </div>
  );
}
