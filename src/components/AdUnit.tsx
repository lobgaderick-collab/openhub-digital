"use client";
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
