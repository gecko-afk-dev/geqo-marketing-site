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

export default function FinancialCalculator() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState(1000);
  const [aov, setAov] = useState(80);
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

  // Brief background flash on the output figures whenever an input changes —
  // both outputs always update together (they're derived from the same two
  // inputs), so one shared flag covers all three rows.
  const [flash, setFlash] = useState(false);
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerFlash = () => {
    setFlash(true);
    if (flashTimeout.current) clearTimeout(flashTimeout.current);
    flashTimeout.current = setTimeout(() => setFlash(false), 250);
  };

  const aggregatorTax = orders * aov * 0.25;
  const geqoFee = orders * 3.0;
  const netMargin = aggregatorTax - geqoFee;

  return (
    <section className="py-16 md:py-24 border-b border-grid-line bg-obsidian">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 md:col-span-14 lg:col-span-10 md:col-start-2 mb-12">
            <h2 className="font-space font-bold text-4xl text-offwhite mb-4">
              {t("calc_section_title")}
            </h2>
            <p className="font-plex-sans text-[#A3A3A3] text-lg max-w-2xl">
              {t("calc_section_desc")}
            </p>
          </div>

          <motion.div
            ref={gridRef}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="col-span-12 md:col-span-14 lg:col-span-14 md:col-start-2 grid md:grid-cols-2 gap-12 lg:gap-24"
          >
            {/* Input Controls */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label htmlFor="orders" className="font-plex-mono text-sm tracking-widest text-[#A3A3A3] uppercase">
                    {t("calc_slider1")}
                  </label>
                  <span className="font-plex-mono text-2xl text-offwhite">{orders.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  id="orders"
                  min="100"
                  max="5000"
                  step="50"
                  value={orders}
                  onChange={(e) => {
                    setOrders(Number(e.target.value));
                    triggerFlash();
                  }}
                  className="w-full h-2 bg-[#262626] appearance-none rounded-none accent-saffron focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron cursor-ew-resize"
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label htmlFor="aov" className="font-plex-mono text-sm tracking-widest text-[#A3A3A3] uppercase">
                    {t("calc_slider2")}
                  </label>
                  <span className="font-plex-mono text-2xl text-offwhite">{aov.toLocaleString()} MAD</span>
                </div>
                <input
                  type="range"
                  id="aov"
                  min="30"
                  max="300"
                  step="5"
                  value={aov}
                  onChange={(e) => {
                    setAov(Number(e.target.value));
                    triggerFlash();
                  }}
                  className="w-full h-2 bg-[#262626] appearance-none rounded-none accent-saffron focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron cursor-ew-resize"
                />
              </div>
            </motion.div>

            {/* Output Matrix */}
            <motion.div variants={itemVariants} className="bg-[#141414] border border-grid-line p-8 flex flex-col justify-center">
              <div className="space-y-8">
                <div
                  className={`flex justify-between items-center border-b border-grid-line pb-4 -mx-4 px-4 transition-colors duration-300 ${
                    flash ? "bg-[rgba(245,158,11,0.12)]" : "bg-transparent"
                  }`}
                >
                  <span className="font-plex-mono text-sm text-[#A3A3A3] uppercase tracking-wide">{t("calc_aggregator")}</span>
                  <span className="font-plex-mono text-xl text-critical line-through decoration-2">
                    {aggregatorTax.toLocaleString()} MAD
                  </span>
                </div>

                <div
                  className={`flex justify-between items-center border-b border-grid-line pb-4 -mx-4 px-4 transition-colors duration-300 ${
                    flash ? "bg-[rgba(245,158,11,0.12)]" : "bg-transparent"
                  }`}
                >
                  <span className="font-plex-mono text-sm text-[#A3A3A3] uppercase tracking-wide">{t("calc_geqo")}</span>
                  <span className="font-plex-mono text-xl text-offwhite">
                    {geqoFee.toLocaleString()} MAD
                  </span>
                </div>

                <div
                  className={`pt-4 -mx-4 px-4 transition-colors duration-300 ${
                    flash ? "bg-[rgba(5,205,153,0.12)]" : "bg-transparent"
                  }`}
                >
                  <span className="block font-plex-mono text-sm text-mint uppercase tracking-widest mb-2">
                    {t("calc_monthly")}
                  </span>
                  <span className="block font-mono-data tracking-tight">
                    +{netMargin.toLocaleString()} <span className="text-2xl text-mint/70">MAD</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
