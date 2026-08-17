"use client";

import { motion } from "framer-motion";
import { swissContainerVariants, swissItemVariants } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const scrollToBeta = () => {
    document.getElementById('beta-claim-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <motion.div 
          className="grid grid-cols-12 gap-6 lg:gap-8 items-center"
          variants={swissContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <motion.div variants={swissItemVariants} className="font-mono text-xs uppercase tracking-widest text-amber-500 rtl:text-right text-left">
              {t.hero_tag}
            </motion.div>
            
            <motion.h1 
              variants={swissItemVariants}
              className="font-hero text-neutral-50 rtl:text-right text-left"
            >
              {t.hero_headline}
            </motion.h1>
            
            <motion.p 
              variants={swissItemVariants}
              className="font-lg text-neutral-400 max-w-xl rtl:text-right text-left"
            >
              {t.hero_subheadline}
            </motion.p>
            
            <motion.div 
              variants={swissItemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button 
                onClick={scrollToBeta}
                className="h-[56px] px-8 bg-[#F59E0B] text-[#0A0A0A] font-bold rounded-none uppercase tracking-wide hover:bg-amber-400 transition-colors"
              >
                {t.cta_join_beta}
              </button>
              <button 
                onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-[56px] px-8 bg-transparent border border-neutral-700 text-[#FAFAFA] font-bold rounded-none uppercase tracking-wide hover:border-neutral-500 transition-colors"
              >
                {t.hero_btn_calc}
              </button>
            </motion.div>
          </div>

          {/* Right Column: Swiss Smartphone Preview */}
          <div className="col-span-12 lg:col-span-5 mt-12 lg:mt-0">
            <motion.div 
              variants={swissItemVariants}
              className="bg-[#141414] border border-neutral-800 rounded-3xl p-6 shadow-2xl relative max-w-sm mx-auto"
            >
              {/* Fake Phone Header */}
              <div className="flex justify-between items-center border-b border-neutral-800 pb-4 mb-6 rtl:flex-row-reverse">
                <div className="flex items-center gap-3 rtl:flex-row-reverse">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-neutral-950">G.</div>
                  <div className="rtl:text-right text-left">
                    <div className="text-sm font-bold text-neutral-50">{t.hero_bot_name}</div>
                    <div className="text-xs text-emerald-500">{t.hero_bot_status}</div>
                  </div>
                </div>
              </div>

              {/* Chat Bubble */}
              <div className="space-y-4 flex flex-col items-start rtl:items-end">
                <div className="bg-[#1F2937] rounded-2xl rounded-tl-sm rtl:rounded-tl-2xl rtl:rounded-tr-sm p-4 text-sm text-neutral-200 max-w-[85%] rtl:text-right text-left">
                  {t.hero_bot_msg}
                </div>
                
                {/* JWT Magic Link Button */}
                <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4 w-full max-w-[85%]">
                  <button className="w-full h-[56px] px-8 bg-[#F59E0B] text-[#0A0A0A] font-bold rounded-none uppercase tracking-wide hover:bg-amber-400 transition-transform active:scale-95 text-sm">
                    {t.hero_bot_btn}
                  </button>
                </div>
                
                {/* Mini Item Card */}
                <div className="bg-[#0A0A0A] border border-neutral-800 rounded-xl p-4 mt-6 flex justify-between items-center rtl:flex-row-reverse w-full">
                  <div className="rtl:text-right text-left">
                    <div className="font-bold text-neutral-100 text-sm">{t.hero_item_name}</div>
                    <div className="text-xs text-neutral-500">{t.hero_item_desc}</div>
                  </div>
                  <div className="text-amber-500 font-bold text-sm">45 MAD</div>
                </div>
              </div>

              {/* KDS Pill (Floating) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-5 -right-5 rtl:right-auto rtl:-left-5 bg-neutral-900 border border-neutral-700 px-4 py-2 rounded-full shadow-xl flex items-center gap-2 rtl:flex-row-reverse"
              >
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="text-xs font-mono font-bold text-neutral-200 tracking-wider">
                  {t.hero_kds_pill}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
