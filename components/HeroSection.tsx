"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 md:py-24 border-b border-grid-line overflow-hidden">
      {/* Background abstract grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-[1280px] mx-auto h-full grid grid-cols-12 gap-6 md:gap-8 px-4 md:px-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-r border-grid-line hidden md:block" />
          ))}
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 lg:col-span-12">
            
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 border border-grid-line bg-[#141414] px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              <span className="font-plex-mono text-xs md:text-sm text-offwhite uppercase tracking-widest">
                [ {t("hero_tag")} ]
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-hero text-offwhite mb-8">
              {t("hero_headline")}
            </h1>

            {/* Sub-headline */}
            <p className="font-lg text-[#A3A3A3] max-w-3xl mb-12">
              {t("hero_subheadline")}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              <a
                href="#claim-form"
                className="h-[56px] px-8 flex items-center justify-center bg-[#F59E0B] text-[#0A0A0A] font-bold rounded-none uppercase tracking-wide hover:bg-amber-400 transition-colors"
              >
                {t("cta_join_beta")}
              </a>
              <button
                className="h-[56px] px-8 bg-transparent border border-neutral-700 text-[#FAFAFA] font-bold rounded-none uppercase tracking-wide hover:border-neutral-500 transition-colors"
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
