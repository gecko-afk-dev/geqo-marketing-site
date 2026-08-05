"use client";

import { motion } from "framer-motion";
import { swissContainerVariants, swissItemVariants } from "@/lib/motion";
import { useI18nContext } from "@/lib/i18n/i18n-context";
import { translations } from "@/lib/i18n/translations";
import Link from "next/link";

export default function Hero() {
  const { locale } = useI18nContext();
  const t = translations[locale];

  return (
    <section className="pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-12 gap-6 lg:gap-8 items-center"
          variants={swissContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <motion.div variants={swissItemVariants} className="font-mono text-xs uppercase tracking-widest text-amber-500">
              // LA PLATEFORME WHATSAPP 0% COMMISSION
            </motion.div>
            
            <motion.h1 
              variants={swissItemVariants}
              className="font-black tracking-tight leading-[0.95] text-neutral-50 text-5xl lg:text-7xl rtl:text-right text-left"
            >
              {t.hero_headline}
            </motion.h1>
            
            <motion.p 
              variants={swissItemVariants}
              className="text-neutral-400 text-lg lg:text-xl max-w-xl rtl:text-right text-left"
            >
              {t.hero_subheadline}
            </motion.p>
            
            <motion.div 
              variants={swissItemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link 
                href="/claim"
                className="bg-amber-500 text-neutral-950 font-bold px-6 py-4 hover:bg-amber-400 transition-colors text-center"
              >
                Rejoindre la Bêta (Carte Invitation)
              </Link>
              <button 
                onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-neutral-700 hover:border-neutral-500 text-neutral-200 px-6 py-4 transition-colors text-center font-medium"
              >
                Calculer mes Économies
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
              <div className="flex justify-between items-center border-b border-neutral-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-neutral-950">G.</div>
                  <div>
                    <div className="text-sm font-bold text-neutral-50">GEQO Bot</div>
                    <div className="text-xs text-emerald-500">En ligne</div>
                  </div>
                </div>
              </div>

              {/* Chat Bubble */}
              <div className="space-y-4">
                <div className="bg-[#1F2937] rounded-2xl rounded-tl-sm p-4 text-sm text-neutral-200 max-w-[85%]">
                  Bienvenue! Votre commande est prête à être saisie. Cliquez ci-dessous pour ouvrir le menu sécurisé.
                </div>
                
                {/* JWT Magic Link Button */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 max-w-[85%]">
                  <button className="w-full bg-amber-500 text-neutral-950 font-bold py-3 rounded-lg text-sm transition-transform active:scale-95">
                    Ouvrir le Menu ➔
                  </button>
                </div>
                
                {/* Mini Item Card */}
                <div className="bg-[#0A0A0A] border border-neutral-800 rounded-xl p-4 mt-6 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-neutral-100 text-sm">Tacos Double</div>
                    <div className="text-xs text-neutral-500">Sauce fromagère, Frites</div>
                  </div>
                  <div className="text-amber-500 font-bold text-sm">45 MAD</div>
                </div>
              </div>

              {/* KDS Pill (Floating) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-5 -right-5 bg-neutral-900 border border-neutral-700 px-4 py-2 rounded-full shadow-xl flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="text-xs font-mono font-bold text-neutral-200 tracking-wider">EN CUISINE - #1042</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
