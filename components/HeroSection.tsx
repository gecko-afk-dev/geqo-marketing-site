"use client";

import { motion, useReducedMotion } from "framer-motion";
import { swissContainerVariants, swissItemVariants } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  // When reduced motion is preferred, skip the animation entirely — render final state.
  const containerVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : swissContainerVariants;
  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : swissItemVariants;

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
            {/*
              Single motion.div container drives the stagger across all five content blocks.
              - animate (not whileInView) because this is above the fold — plays on mount.
              - Variant state propagates automatically to children via framer-motion's
                variant inheritance; no per-child initial/animate props needed.
            */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* 1. Status Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center space-x-2 border border-grid-line bg-[#141414] px-4 py-2 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                <span className="font-plex-mono text-xs md:text-sm text-offwhite uppercase tracking-widest">
                  [ {t("hero_tag")} ]
                </span>
              </motion.div>

              {/* 2. Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-hero text-offwhite mb-8"
              >
                {t("hero_headline")}
              </motion.h1>

              {/* 3. Sub-headline */}
              <motion.p
                variants={itemVariants}
                className="font-lg text-[#A3A3A3] max-w-3xl mb-12"
              >
                {t("hero_subheadline")}
              </motion.p>

              {/* 4. CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8"
              >
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
              </motion.div>

              {/* 5. Disclaimer */}
              <motion.p
                variants={itemVariants}
                className="font-plex-mono text-xs text-[#737373] max-w-2xl"
              >
                *Disclaimer: 0% commission sur vos commandes directes GEQO (frais fixes par commande: 3 MAD hors livraison).
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
