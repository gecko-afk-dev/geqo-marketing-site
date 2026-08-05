"use client";

import { motion } from "framer-motion";
import { swissContainerVariants, swissItemVariants } from "@/lib/motion";

export default function FeatureMatrix() {
  const features = [
    {
      id: "01",
      title: "Funnel Hybrid WhatsApp",
      description: "Magic Link JWT -> PWA instantanée sans téléchargement."
    },
    {
      id: "02",
      title: "Modificateurs Talabat",
      description: "Sauces, extras, options avec calculs de prix en temps réel."
    },
    {
      id: "03",
      title: "Géolocalisation 0 MAD",
      description: "Pin drop OpenStreetMap Leaflet.js + calcul Haversine serveur."
    },
    {
      id: "04",
      title: "Écran Cuisine (KDS) WebSockets",
      description: "Vue 3 live order feed avec notifications sonores."
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
              <div className="text-xl font-bold text-neutral-50 mb-3 rtl:text-right text-left flex gap-2">
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
