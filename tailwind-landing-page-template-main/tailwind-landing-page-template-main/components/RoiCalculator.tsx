"use client";

import { useState, useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { swissContainerVariants, swissItemVariants } from "@/lib/motion";
import { useI18nContext } from "@/lib/i18n/i18n-context";
import { translations } from "@/lib/i18n/translations";

function AnimatedCounter({ value }: { value: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      const controls = animate(prevValue.current, value, {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(v) {
          // Format with spaces for thousands
          node.textContent = Math.round(v).toLocaleString("en-US").replace(/,/g, " ");
        },
      });
      prevValue.current = value;
      return () => controls.stop();
    }
  }, [value]);

  return <span ref={nodeRef} />;
}

export default function RoiCalculator() {
  const { locale } = useI18nContext();
  const t = translations[locale];

  const [ordersPerDay, setOrdersPerDay] = useState(40);
  const [basketSize, setBasketSize] = useState(65);

  const aggregatorCost = ordersPerDay * basketSize * 0.25 * 30;
  const geqoCost = ordersPerDay * 3.0 * 30;
  const netGain = aggregatorCost - geqoCost;

  return (
    <section className="py-16" id="roi-calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-12 gap-6 lg:gap-8"
          variants={swissContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Control Panel */}
          <motion.div 
            variants={swissItemVariants}
            className="col-span-12 lg:col-span-5 bg-[#141414] border border-neutral-800 p-8 space-y-8"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-amber-500 rtl:text-right text-left">
              {t.calc_title}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-neutral-200">
                <label htmlFor="orders-slider">{t.calc_slider1}</label>
                <span className="text-amber-500 text-lg">{ordersPerDay}</span>
              </div>
              <input
                id="orders-slider"
                type="range"
                min="10"
                max="200"
                value={ordersPerDay}
                onChange={(e) => setOrdersPerDay(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-neutral-200">
                <label htmlFor="basket-slider">{t.calc_slider2}</label>
                <span className="text-amber-500 text-lg">{basketSize}</span>
              </div>
              <input
                id="basket-slider"
                type="range"
                min="30"
                max="200"
                value={basketSize}
                onChange={(e) => setBasketSize(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </motion.div>

          {/* Right Ledger Panel */}
          <motion.div 
            variants={swissItemVariants}
            className="col-span-12 lg:col-span-7 bg-[#0F0F0F] border border-amber-500/30 p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-neutral-800 pb-4">
                <div className="text-sm font-mono text-neutral-400 rtl:text-right text-left max-w-[60%]">
                  {t.calc_aggregator}
                </div>
                <div className="text-2xl font-bold text-red-400">
                  - <AnimatedCounter value={aggregatorCost} /> MAD
                </div>
              </div>

              <div className="flex justify-between items-end border-b border-neutral-800 pb-4">
                <div className="text-sm font-mono text-neutral-400 rtl:text-right text-left max-w-[60%]">
                  {t.calc_geqo}
                </div>
                <div className="text-2xl font-bold text-neutral-300">
                  - <AnimatedCounter value={geqoCost} /> MAD
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="text-sm font-bold text-emerald-500/80 mb-2 rtl:text-right text-left uppercase tracking-widest">
                {t.calc_net}
              </div>
              <div className="text-5xl lg:text-6xl font-black text-emerald-500 flex items-baseline justify-end rtl:justify-start gap-2">
                <span>+</span>
                <AnimatedCounter value={netGain} />
                <span className="text-3xl font-bold text-emerald-500/70 ml-2">MAD</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
