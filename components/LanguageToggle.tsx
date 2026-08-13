"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Locale } from "@/lib/i18n/translations";

const LANGUAGE_OPTIONS: { value: Locale; label: string }[] = [
  { value: "fr", label: "FR" },
  { value: "en", label: "EN" },
  { value: "ar", label: "عربي" },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex justify-end mb-8 font-plex-mono text-sm" role="radiogroup" aria-label="Language selector">
      <div className="inline-flex bg-[#141414] border border-[#262626] rounded overflow-hidden">
        {LANGUAGE_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setLang(option.value)}
            role="radio"
            aria-checked={lang === option.value}
            className={`px-4 py-2 font-bold tracking-widest transition-all duration-200 ${
              lang === option.value
                ? "bg-saffron text-obsidian"
                : "text-offwhite hover:bg-[#262626]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
