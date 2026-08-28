"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView, Variants } from "framer-motion";
import { swissContainerVariants, swissItemVariants } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// useReducedMotion() can resolve synchronously on the client's first render
// (before hydration completes), which would mismatch the SSR output —
// always false — and throw a hydration error. Gate it behind mount so the
// first client render matches the server, then adopt the real value.
function useSafeReducedMotion() {
  const detected = useReducedMotion();
  const [safe, setSafe] = useState(false);
  useEffect(() => setSafe(!!detected), [detected]);
  return safe;
}

export default function PricingMatrix() {
  const { t } = useLanguage();
  const prefersReducedMotion = useSafeReducedMotion();
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, amount: 0.2 });

  // When reduced motion is preferred, skip the animation entirely — render final state.
  const containerVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : swissContainerVariants;
  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : swissItemVariants;

  // Pro tier gets the same entrance as its siblings, plus a one-time amber
  // glow pulse (peaking ~30% through) fired off the same inView state.
  const proVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 20, boxShadow: "0 0 0px 0px rgba(245,158,11,0)" },
        visible: {
          opacity: 1,
          y: 0,
          boxShadow: [
            "0 0 0px 0px rgba(245,158,11,0)",
            "0 0 40px 8px rgba(245,158,11,0.35)",
            "0 0 0px 0px rgba(245,158,11,0)",
          ],
          transition: {
            default: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            boxShadow: { duration: 1.3, ease: [0.16, 1, 0.3, 1], times: [0, 0.3, 1] },
          },
        },
      };

  const tiers = [
    {
      name: t("tier_starter_name"),
      price: t("tier_starter_price"),
      period: t("tier_starter_period"),
      htEquivalent: t("tier_starter_ht"),
      features: t("tier_starter_features"),
      cta: t("pricing_starter_cta"),
      isPopular: false,
      isPrixFondateur: false,
      fenceCopy: t("tier_starter_fence"),
      toll: t("tier_starter_toll"),
      walletInfo: t("tier_starter_wallet")
    },
    {
      name: t("tier_pro_name"),
      price: t("tier_pro_price"),
      period: t("tier_pro_period"),
      htEquivalent: t("tier_pro_ht"),
      prixFondateur: t("tier_pro_founder"),
      features: t("tier_pro_features"),
      cta: t("pricing_pro_cta"),
      isPopular: true,
      isPrixFondateur: true,
      callout: t("tier_pro_callout"),
      microLine: t("tier_pro_micro")
    },
    {
      name: t("tier_scale_name"),
      price: t("tier_scale_price"),
      period: t("tier_scale_period"),
      htEquivalent: t("tier_scale_ht"),
      prixFondateur: t("tier_scale_founder"),
      features: t("tier_scale_features"),
      cta: t("pricing_scale_cta"),
      isPopular: false,
      isPrixFondateur: true,
      microLine: t("tier_scale_micro")
    },
    {
      name: t("tier_multi_name"),
      price: t("tier_multi_price"),
      period: t("tier_multi_period"),
      htEquivalent: t("tier_multi_ht"),
      prixFondateur: t("tier_multi_founder"),
      features: t("tier_multi_features"),
      cta: t("pricing_multi_cta"),
      isPopular: false,
      isPrixFondateur: true,
      microLine: t("tier_multi_micro")
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-obsidian border-b border-grid-line">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-space font-bold text-4xl text-offwhite mb-4">
            {t("pricing_title")}
          </h2>
          <p className="font-plex-sans text-[#A3A3A3] text-lg max-w-2xl mx-auto">
            {t("pricing_subtitle")}
          </p>
          <p className="mt-4 text-xs text-[#737373] max-w-3xl mx-auto font-plex-mono">
            {t("pricing_disclaimer")}
          </p>
        </div>

        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name as string}
              variants={tier.isPopular ? proVariants : itemVariants}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : tier.isPopular
                    // The Pro card's own entrance/glow animation writes an inline
                    // boxShadow style, which would silently beat a CSS hover:shadow
                    // utility (inline style always wins over a stylesheet rule for
                    // the same property) — so its hover shadow has to go through
                    // framer-motion too, not Tailwind.
                    ? { y: -3, boxShadow: "0px 18px 40px -16px rgba(245,158,11,0.18)", transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }
                    : { y: -3, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }
              }
              className={`group relative border border-grid-line p-8 flex flex-col transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                tier.isPopular
                  ? "bg-[#1C1C1C]"
                  : "bg-[#141414] hover:border-neutral-600 motion-safe:hover:shadow-[0_16px_32px_-18px_rgba(0,0,0,0.6)]"
              }`}
            >
              {!tier.isPopular && (
                <span className="absolute top-0 left-0 right-0 h-[2px] bg-saffron origin-left scale-x-0 motion-safe:group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
              )}
              {tier.isPopular && (
                <div className="absolute top-0 left-0 w-full h-1 bg-saffron" />
              )}
              {tier.isPopular && (
                <div className="absolute top-4 right-4 bg-saffron text-obsidian text-xs font-bold uppercase tracking-widest py-1 px-2">
                  {t("pricing_popular")}
                </div>
              )}
              
              <div className="mb-8 mt-2">
                <span className="font-plex-mono text-sm uppercase tracking-widest text-[#A3A3A3]">
                  {tier.name as string}
                </span>
                <div className="mt-4 flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-space font-bold text-4xl text-offwhite">{tier.price as string}</span>
                  </div>
                  <span className="font-plex-sans text-[#737373] text-sm">{tier.period as string} ({tier.htEquivalent as string})</span>
                </div>

                {tier.isPrixFondateur && (
                  <div className="mt-4 bg-[#262626] border border-[#404040] p-3 text-sm">
                    <span className="block font-plex-sans font-bold text-saffron">{t("pricing_founder_life")}</span>
                    <span className="block font-plex-mono text-offwhite">{tier.prixFondateur as string}</span>
                  </div>
                )}
                
                {tier.callout && (
                  <div className="mt-4 font-plex-sans font-medium text-mint text-sm">
                    {tier.callout as string}
                  </div>
                )}
                
                {tier.toll && (
                  <div className="mt-4 space-y-2">
                    <div className="font-plex-sans text-xs text-[#D4D4D4] border-l-2 border-mint pl-3 py-1">
                      {tier.toll as string}
                    </div>
                    <div className="font-plex-sans text-xs text-[#A3A3A3]">
                      {tier.walletInfo as string}
                    </div>
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {(tier.features as string[]).map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-mint mt-1">●</span>
                    <span className="font-plex-sans text-[#D4D4D4] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {tier.fenceCopy && (
                <div className="mb-6 font-plex-sans text-xs italic text-[#737373]">
                  {tier.fenceCopy as string}
                </div>
              )}

              {tier.microLine && (
                <div className="mb-6 font-plex-mono text-xs text-saffron border-t border-grid-line pt-4">
                  {tier.microLine as string}
                </div>
              )}

              <a
                href="#claim-form"
                className={`flex items-center justify-center h-[56px] px-8 w-full font-bold rounded-none uppercase tracking-wide transition-colors ${
                  tier.isPopular
                    ? "bg-[#F59E0B] text-[#0A0A0A] hover:bg-amber-400"
                    : "bg-transparent border border-neutral-700 text-[#FAFAFA] hover:border-neutral-500"
                }`}
              >
                {tier.cta as string}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Prix Fondateur Banner */}
          <div className="bg-saffron text-obsidian font-bold p-4 text-center tracking-wide font-plex-mono uppercase text-sm">
            {/* [PRIX FONDATEUR LOCK] */}
            {t("pricing_founder_banner")}
            <div className="mt-2 h-2 bg-obsidian/20 max-w-md mx-auto rounded-none overflow-hidden">
              {prefersReducedMotion ? (
                <div className="h-full bg-obsidian w-[87%]" />
              ) : (
                <motion.div
                  className="h-full bg-obsidian"
                  initial={{ width: "0%" }}
                  animate={{ width: inView ? "87%" : "0%" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </div>
            <div className="mt-1 text-xs opacity-80">{t("pricing_founder_spots")}</div>
          </div>
          
          <p className="text-center text-sm font-plex-sans text-[#A3A3A3] italic">
            {t("pricing_quote")}
          </p>
          
          <p className="text-center text-xs font-plex-sans text-[#737373]">
            {t("pricing_marketing")}
          </p>

          <div className="bg-[#141414] border border-grid-line p-6 mt-8">
            <h4 className="font-space font-bold text-lg text-offwhite mb-4">{t("pricing_note_title")}</h4>
            <div className="space-y-4 font-plex-sans text-sm text-[#A3A3A3]">
              <p>
                <strong className="text-[#D4D4D4]">{t("pricing_note_1_title")}</strong> {t("pricing_note_1_desc")}
              </p>
              <p>
                <strong className="text-[#D4D4D4]">{t("pricing_note_2_title")}</strong> {t("pricing_note_2_desc")}
              </p>
              <p className="text-xs text-[#737373] mt-4 pt-4 border-t border-[#262626]">
                {t("pricing_note_3")}
              </p>
              <p className="text-xs text-saffron mt-2 font-medium">
                {t("pricing_note_4")}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
