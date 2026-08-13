"use client";

import Link from "next/link";
import SetaeMark from "./SetaeMark";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Locale } from "@/lib/i18n/translations";

export default function Header() {
  const { t, lang, setLang } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-obsidian border-b border-grid-line">
      <div className="max-w-[1440px] mx-auto px-6 h-20 grid grid-cols-12 md:grid-cols-16 gap-6 items-center">
        {/* Left: Brand Lockup (Spans 4 columns) */}
        <div className="col-span-4 md:col-span-4 flex items-center space-x-3">
          <SetaeMark className="w-8 h-8" />
          <div className="flex items-baseline space-x-2">
            <Link href="/" className="font-space font-bold text-2xl text-offwhite tracking-tight">
              GEQO
            </Link>
          </div>
        </div>

        {/* Center: Live Utility Status (Spans 8 columns, hidden on small screens) */}
        <div className="hidden md:flex md:col-span-8 justify-center items-center">
          <span className="text-mint font-plex-mono font-medium text-xs sm:text-sm tracking-widest uppercase">
            <span className="animate-pulse mr-2">●</span>
            {t("header_live")}
          </span>
        </div>

        {/* Right: CTA & Lang (Spans 4 columns) */}
        <div className="col-span-8 md:col-span-4 flex justify-end items-center gap-4">
          <div className="flex gap-2 text-xs font-plex-mono border border-grid-line p-1 rounded bg-[#141414]">
            {(['fr', 'ar', 'en'] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded transition-colors uppercase ${
                  lang === l ? 'bg-[#262626] text-offwhite font-bold' : 'text-[#737373] hover:text-[#A3A3A3]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <a
            href="#claim-form"
            className="hidden sm:inline-block bg-saffron text-obsidian font-bold px-5 py-2.5 text-sm uppercase tracking-wide hover:bg-amber-400 transition-colors"
          >
            {t("header_cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
