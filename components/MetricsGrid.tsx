"use client";

import { motion } from "framer-motion";
import { swissContainerVariants, swissItemVariants } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export default function MetricsGrid() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const metrics = [
    {
      value: t.metric_1_val,
      color: "text-amber-500",
      description: t.metric_1_desc
    },
    {
      value: t.metric_2_val,
      color: "text-emerald-500",
      description: t.metric_2_desc
    },
    {
      value: t.metric_3_val,
      color: "text-neutral-100",
      description: t.metric_3_desc
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
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              variants={swissItemVariants}
              className="col-span-12 md:col-span-4 bg-[#141414] border border-neutral-800 p-8 hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between"
            >
              <div className={`text-5xl font-black mb-6 rtl:text-right text-left ${metric.color}`}>
                {metric.value}
              </div>
              <p className="text-neutral-400 font-medium rtl:text-right text-left">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
