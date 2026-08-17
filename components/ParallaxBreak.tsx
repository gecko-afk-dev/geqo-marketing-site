"use client";

import { motion } from "framer-motion";
import { swissContainerVariants, swissItemVariants } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export default function ParallaxBreak() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <section 
      className="relative w-full h-64 lg:h-80 bg-fixed bg-cover bg-center my-16 flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: 'url("/images/hero-bg-daytime.jpg")' }}
    >
      {/* Heavy Dark Overlay */}
      <div className="absolute inset-0 bg-[#0A0A0A]/85 backdrop-blur-[2px] mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 w-full">
        <motion.div
          variants={swissContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full flex justify-center md:justify-start"
        >
          <motion.h2 
            variants={swissItemVariants}
            className="text-3xl md:text-5xl font-black text-neutral-50 rtl:text-right text-left tracking-tight leading-tight max-w-3xl"
          >
            "{t.parallax_quote}"
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
}
