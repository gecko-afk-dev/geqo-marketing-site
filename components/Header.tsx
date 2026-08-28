"use client";

import { useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import SetaeMark from "./SetaeMark";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Locale } from "@/lib/i18n/translations";

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Skip state update if reduced motion — header stays in condensed fallback
    if (prefersReducedMotion) {
      if (!scrolled) setScrolled(true);
      return;
    }
    setScrolled(latest > 8);
  });

  // Reduced-motion: render condensed state immediately, no transitions
  if (prefersReducedMotion) {
    return (
      <header
        className="sticky top-0 z-50 border-b border-grid-line"
        style={{
          height: 62,
          backgroundColor: "rgba(10,10,10,0.78)",
          backdropFilter: "blur(14px) saturate(1.2)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-full grid grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Left: Brand Lockup */}
          <div className="col-span-4 md:col-span-4 flex items-center space-x-3">
            <SetaeMark className="w-7 h-7" />
            <div className="flex items-baseline space-x-2">
              <Link
                href="/"
                className="font-space font-bold text-xl text-offwhite tracking-tight"
              >
                GEQO
              </Link>
            </div>
          </div>

          {/* Center: Live Status — hidden in condensed state */}
          <div className="hidden md:flex md:col-span-4 justify-center items-center opacity-0 pointer-events-none">
            <span className="text-mint font-plex-mono font-medium text-xs sm:text-sm tracking-widest uppercase">
              <span className="animate-pulse mr-2">●</span>
              {t("header_live")}
            </span>
          </div>

          {/* Right: CTA & Lang */}
          <div className="col-span-8 md:col-span-4 flex justify-end items-center gap-4">
            <div className="flex gap-2 text-xs font-plex-mono border border-grid-line p-1 rounded bg-[#141414]">
              {(["fr", "ar", "en"] as Locale[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded transition-colors uppercase ${
                    lang === l
                      ? "bg-[#262626] text-offwhite font-bold"
                      : "text-[#737373] hover:text-[#A3A3A3]"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href="#claim-form"
              className="hidden sm:flex items-center justify-center h-[56px] px-8 bg-[#F59E0B] text-[#0A0A0A] font-bold rounded-none uppercase tracking-wide hover:bg-amber-400 transition-colors"
            >
              {t("header_cta")}
            </a>
          </div>
        </div>
      </header>
    );
  }

  // Full animated header for users who haven't opted out of motion
  return (
    <motion.header
      className="sticky top-0 z-50"
      animate={{
        height: scrolled ? 62 : 80,
        backgroundColor: scrolled
          ? "rgba(10,10,10,0.78)"
          : "rgba(10,10,10,0)",
        backdropFilter: scrolled
          ? "blur(14px) saturate(1.2)"
          : "blur(0px) saturate(1)",
        borderBottomWidth: scrolled ? 1 : 0,
        borderBottomColor: scrolled
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0)",
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-full grid grid-cols-12 gap-6 md:gap-8 items-center">
        {/* Left: Brand Lockup (scales subtly when condensed) */}
        <div className="col-span-4 md:col-span-4 flex items-center space-x-3">
          <motion.div
            animate={{ scale: scrolled ? 0.88 : 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center space-x-3"
          >
            <SetaeMark className="w-8 h-8" />
            <div className="flex items-baseline space-x-2">
              <Link
                href="/"
                className="font-space font-bold text-2xl text-offwhite tracking-tight"
              >
                GEQO
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Center: Live Utility Status — fades out when condensed */}
        <motion.div
          className="hidden md:flex md:col-span-4 justify-center items-center"
          animate={{ opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? "none" : "auto" }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <span className="text-mint font-plex-mono font-medium text-xs sm:text-sm tracking-widest uppercase">
            <span className="animate-pulse mr-2">●</span>
            {t("header_live")}
          </span>
        </motion.div>

        {/* Right: CTA & Lang */}
        <div className="col-span-8 md:col-span-4 flex justify-end items-center gap-4">
          <div className="flex gap-2 text-xs font-plex-mono border border-grid-line p-1 rounded bg-[#141414]">
            {(["fr", "ar", "en"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded transition-colors uppercase ${
                  lang === l
                    ? "bg-[#262626] text-offwhite font-bold"
                    : "text-[#737373] hover:text-[#A3A3A3]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <a
            href="#claim-form"
            className="hidden sm:flex items-center justify-center h-[56px] px-8 bg-[#F59E0B] text-[#0A0A0A] font-bold rounded-none uppercase tracking-wide hover:bg-amber-400 transition-colors"
          >
            {t("header_cta")}
          </a>
        </div>
      </div>
    </motion.header>
  );
}
