"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-24 pb-32 border-b border-grid-line overflow-hidden">
      {/* Background abstract grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-[1440px] mx-auto h-full grid grid-cols-12 md:grid-cols-16 gap-6 px-6">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-full border-r border-grid-line hidden md:block" />
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-12 md:grid-cols-16 gap-6">
          <div className="col-span-12 md:col-span-14 lg:col-span-12 md:col-start-2">
            
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 border border-grid-line bg-[#141414] px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              <span className="font-plex-mono text-xs md:text-sm text-offwhite uppercase tracking-widest">
                [ {t("hero_tag")} ]
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-space font-bold text-5xl md:text-[64px] leading-[1.1] text-offwhite mb-8">
              {t("hero_headline")}
            </h1>

            {/* Sub-headline */}
            <p className="font-plex-sans text-xl md:text-[20px] leading-relaxed text-[#A3A3A3] max-w-3xl mb-12">
              {t("hero_subheadline")}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              <a
                href="#claim-form"
                className="bg-saffron text-obsidian font-bold px-8 py-4 text-lg hover:bg-amber-400 transition-colors inline-block text-center uppercase tracking-wide"
              >
                {t("cta_join_beta")}
              </a>
              <button
                className="border border-neutral-700 text-offwhite px-8 py-4 text-lg hover:border-neutral-500 transition-colors inline-block text-center uppercase tracking-wide"
              >
                {t("hero_btn_calc")}
              </button>
            </div>

            {/* Disclaimer */}
            <p className="font-plex-mono text-xs text-[#737373] max-w-2xl">
              *Disclaimer: 0% commission sur vos commandes directes GEQO (frais fixes par commande: 3 MAD hors livraison).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
