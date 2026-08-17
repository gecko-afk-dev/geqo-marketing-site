"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FinancialCalculator() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState(1000);
  const [aov, setAov] = useState(80);

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

          <div className="col-span-12 md:col-span-14 lg:col-span-14 md:col-start-2 grid md:grid-cols-2 gap-12 lg:gap-24">
            {/* Input Controls */}
            <div className="flex flex-col space-y-12">
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
                  onChange={(e) => setOrders(Number(e.target.value))}
                  className="w-full h-2 bg-[#262626] appearance-none rounded-none accent-saffron outline-none cursor-ew-resize"
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
                  onChange={(e) => setAov(Number(e.target.value))}
                  className="w-full h-2 bg-[#262626] appearance-none rounded-none accent-saffron outline-none cursor-ew-resize"
                />
              </div>
            </div>

            {/* Output Matrix */}
            <div className="bg-[#141414] border border-grid-line p-8 flex flex-col justify-center">
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-grid-line pb-4">
                  <span className="font-plex-mono text-sm text-[#A3A3A3] uppercase tracking-wide">{t("calc_aggregator")}</span>
                  <span className="font-plex-mono text-xl text-critical line-through decoration-2">
                    {aggregatorTax.toLocaleString()} MAD
                  </span>
                </div>
                
                <div className="flex justify-between items-center border-b border-grid-line pb-4">
                  <span className="font-plex-mono text-sm text-[#A3A3A3] uppercase tracking-wide">{t("calc_geqo")}</span>
                  <span className="font-plex-mono text-xl text-offwhite">
                    {geqoFee.toLocaleString()} MAD
                  </span>
                </div>

                <div className="pt-4">
                  <span className="block font-plex-mono text-sm text-mint uppercase tracking-widest mb-2">
                    {t("calc_monthly")}
                  </span>
                  <span className="block font-mono-data tracking-tight">
                    +{netMargin.toLocaleString()} <span className="text-2xl text-mint/70">MAD</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
