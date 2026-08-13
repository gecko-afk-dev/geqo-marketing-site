"use client";

import { motion } from "framer-motion";
import { swissContainerVariants, swissItemVariants } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export default function FeatureMatrix() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const features = [
    {
      id: "01",
      title: t.feat_1_title,
      description: t.feat_1_desc
    },
    {
      id: "02",
      title: t.feat_2_title,
      description: t.feat_2_desc
    },
    {
      id: "03",
      title: t.feat_3_title,
      description: t.feat_3_desc
    },
    {
      id: "04",
      title: t.feat_4_title,
      description: t.feat_4_desc
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-12 gap-6 lg:gap-8"
          variants={swissContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={swissItemVariants}
              className="col-span-12 md:col-span-6 bg-[#141414] border border-neutral-800 p-8 hover:border-amber-500/40 transition-colors duration-300"
            >
              <div className="text-xl font-bold text-neutral-50 mb-3 rtl:text-right text-left flex gap-2 rtl:flex-row-reverse">
                <span className="text-amber-500 font-mono">{feature.id} /</span>
                <span>{feature.title}</span>
              </div>
              <p className="text-neutral-400 font-medium rtl:text-right text-left">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
