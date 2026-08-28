"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
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

export default function FeatureGrid() {
  const { t } = useLanguage();
  const prefersReducedMotion = useSafeReducedMotion();
  const gridRef = useRef(null);
  // animate (not whileInView) so this reliably picks up the reduced-motion
  // gate settling shortly after mount — whileInView's IntersectionObserver
  // callback doesn't reliably re-read a variants object that changed after
  // it started watching.
  const inView = useInView(gridRef, { once: true, amount: 0.2 });

  // When reduced motion is preferred, skip the animation entirely — render final state.
  const containerVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : swissContainerVariants;
  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : swissItemVariants;

  const features = [
    {
      title: t("feat_1_title"),
      description: t("feat_1_desc"),
      meta: t("feat_1_meta"),
      highlight: t("feat_1_hl"),
    },
    {
      title: t("feat_2_title"),
      description: t("feat_2_desc"),
      meta: t("feat_2_meta"),
      highlight: t("feat_2_hl"),
    },
    {
      title: t("feat_3_title"),
      description: t("feat_3_desc"),
      meta: t("feat_3_meta"),
      highlight: t("feat_3_hl"),
    },
    {
      title: t("feat_4_title"),
      description: t("feat_4_desc"),
      meta: t("feat_4_meta"),
      highlight: t("feat_4_hl"),
    },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-grid-line bg-[#050505]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-16">
          <div className="col-span-12 md:col-span-14 lg:col-span-10 md:col-start-2">
            <h2 className="font-space font-bold text-4xl text-offwhite mb-4">
              {t("feat_section_title")}
            </h2>
            <p className="font-plex-sans text-[#A3A3A3] text-lg max-w-2xl">
              {t("feat_section_desc")}
            </p>
          </div>
        </div>

        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? undefined : { y: -3, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
              className="group relative border border-grid-line bg-[#0A0A0A] p-8 flex flex-col hover:border-neutral-600 motion-safe:hover:shadow-[0_16px_32px_-18px_rgba(0,0,0,0.6)] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-saffron origin-left scale-x-0 motion-safe:group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <div className="font-plex-mono text-xs text-saffron uppercase tracking-widest mb-6">
                [{String(index + 1).padStart(2, "0")}] {feature.highlight}
              </div>
              <h3 className="font-space font-bold text-xl text-offwhite mb-4">
                {feature.title}
              </h3>
              <p className="font-plex-sans text-[#A3A3A3] text-sm flex-grow mb-8 leading-relaxed">
                {feature.description}
              </p>
              <div className="border-t border-grid-line pt-4 mt-auto">
                <span className="font-plex-mono text-xs text-[#737373] tracking-wide">
                  {feature.meta}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
