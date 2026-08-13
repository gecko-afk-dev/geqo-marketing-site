"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations, Locale } from "@/lib/i18n/translations";
import Image from "next/image";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const t = translations[lang];

  const scrollToBeta = () => {
    document.getElementById('beta-claim-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6 lg:gap-8 items-center h-20">
          
          {/* Logo (col 1-3) */}
          <div className="col-span-6 md:col-span-3">
            <Link href="/" className="flex items-center">
              <img src="/geqo-logo.svg?v=2" alt="GEQO" className="h-10 w-auto object-contain py-1" />
            </Link>
          </div>
          
          {/* i18n Toggle (col 8-9) */}
          <div className="col-span-6 md:col-start-8 md:col-span-2 flex justify-end md:justify-center items-center gap-4">
            {(['fr', 'ar', 'en'] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-sm font-mono uppercase tracking-widest transition-colors ${
                  lang === l ? 'text-amber-500 font-bold' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          
          {/* CTA (col 10-12) */}
          <div className="hidden md:flex col-span-3 justify-end">
            <button 
              onClick={scrollToBeta}
              className="bg-neutral-50 text-neutral-950 font-bold px-5 py-2.5 hover:bg-neutral-200 transition-colors"
            >
              {t.cta_join_beta}
            </button>
          </div>
          
        </div>
      </div>
    </header>
  );
}
