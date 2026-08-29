"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import Link from "next/link";
import SetaeMark from "./SetaeMark";
import { swissContainerVariants, swissItemVariants } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function useSafeReducedMotion() {
  const [safe, setSafe] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => { setSafe(true); }, []);
  return safe ? reduced : false;
}

export default function Footer() {
  const { t } = useLanguage();
  const prefersReducedMotion = useSafeReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const gridContent = (
    <>
      {/* Brand & Corporate Entities */}
      <div className="md:col-span-6 space-y-6">
        <div className="flex items-center space-x-3">
          <SetaeMark className="w-8 h-8" mono={true} />
          <span className="font-space font-bold text-xl text-offwhite tracking-tight">
            GEQO
          </span>
        </div>

        <div className="font-plex-sans text-xs text-[#737373] leading-relaxed max-w-lg space-y-2">
          <p>
            {t("footer_desc_1")}
          </p>
          <p className="opacity-80">
            {t("footer_desc_2")}
          </p>
          <p className="pt-2 font-plex-mono uppercase tracking-widest text-[#525252]">
            GEQO SARL AU (IF: —, ICE: —, RC: —, Casablanca)
            <br />
            GEQO LLC (EIN: 35-2978925, Wyoming)
          </p>
        </div>
      </div>

      {/* Legal Compliance & Links */}
      <div className="md:col-span-6 flex flex-col justify-end space-y-6">
        <div className="flex flex-wrap gap-4 text-sm font-plex-mono tracking-wide">
          <Link href="/terms" className="text-offwhite hover:text-saffron transition-colors">
            {t("footer_terms")}
          </Link>
          <span className="text-grid-line">|</span>
          <Link href="/privacy" className="text-offwhite hover:text-saffron transition-colors">
            {t("footer_privacy")}
          </Link>
          <span className="text-grid-line">|</span>
          <Link href="/data-deletion" className="text-offwhite hover:text-saffron transition-colors">
            {t("footer_data_deletion")}
          </Link>
          <span className="text-grid-line">|</span>
          <Link href="/contact" className="text-offwhite hover:text-saffron transition-colors">
            {t("footer_contact")}
          </Link>
        </div>

        <div className="space-y-2">
          <p className="font-plex-sans text-xs text-[#737373] leading-relaxed">
            {t("footer_compliance_1")}
          </p>
          <p className="font-plex-sans text-xs text-[#737373] leading-relaxed">
            <Link href="/privacy#garantie" className="text-mint hover:underline">
              {t("footer_compliance_2")}
            </Link>
          </p>
        </div>
      </div>
    </>
  );

  const copyrightContent = <span>{t("footer_rights")}</span>;

  return (
    <footer className="bg-obsidian border-t border-grid-line py-16 md:py-24">
      <motion.div
        ref={containerRef}
        className="max-w-[1280px] mx-auto px-4 md:px-8"
        variants={prefersReducedMotion ? undefined : swissContainerVariants}
        initial={prefersReducedMotion ? undefined : "hidden"}
        animate={prefersReducedMotion ? undefined : (isInView ? "visible" : "hidden")}
      >
        {prefersReducedMotion ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-grid-line pb-12 mb-8">
            {gridContent}
          </div>
        ) : (
          <motion.div
            variants={swissItemVariants}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-grid-line pb-12 mb-8"
          >
            {gridContent}
          </motion.div>
        )}

        {prefersReducedMotion ? (
          <div className="flex flex-col md:flex-row justify-between items-center text-xs font-plex-mono text-[#525252] tracking-wider uppercase">
            {copyrightContent}
          </div>
        ) : (
          <motion.div
            variants={swissItemVariants}
            className="flex flex-col md:flex-row justify-between items-center text-xs font-plex-mono text-[#525252] tracking-wider uppercase"
          >
            {copyrightContent}
          </motion.div>
        )}
      </motion.div>
    </footer>
  );
}
