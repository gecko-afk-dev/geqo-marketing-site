"use client";

import { useState, useMemo } from "react";
import { TrendingDown, TrendingUp, DollarSign, Zap } from "lucide-react";

const GEQO_MONTHLY_FEE = 399; // MAD
const AGGREGATOR_COMMISSION = 0.25; // 25%
const DAYS_PER_MONTH = 30;

export default function RoiCalculator() {
  const [ordersPerDay, setOrdersPerDay] = useState(50);
  const [avgOrderValue, setAvgOrderValue] = useState(70);

  const { aggregatorCost, geqoCost, monthlySaved, monthlyRevenue } =
    useMemo(() => {
      const monthlyRevenue = ordersPerDay * avgOrderValue * DAYS_PER_MONTH;
      const aggregatorCost = monthlyRevenue * AGGREGATOR_COMMISSION;
      const geqoCost = GEQO_MONTHLY_FEE;
      const monthlySaved = aggregatorCost - geqoCost;
      return { aggregatorCost, geqoCost, monthlySaved, monthlyRevenue };
    }, [ordersPerDay, avgOrderValue]);

  const formatMAD = (n: number) =>
    new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(n) + " MAD";

  return (
    <section id="roi-calculator" className="relative overflow-hidden py-20 md:py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-50 via-slate-900/[0.03] to-gray-50" />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-400/5 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center" data-aos="fade-up">
          <span className="mb-3 inline-block rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-red-600">
            The Math Doesn't Lie
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            See How Much Delivery Aggregators are <span className="text-red-500">Taking</span> From You
          </h2>
          <p className="mt-3 text-base text-slate-500">
            Adjust the sliders below to see your real monthly loss vs. GEQO.
          </p>
        </div>

        {/* Card */}
        <div
          className="overflow-hidden rounded-3xl border border-slate-700/30 bg-slate-900 shadow-2xl shadow-slate-900/30"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* Sliders */}
          <div className="grid gap-8 border-b border-slate-700/50 bg-slate-800/50 p-8 md:grid-cols-2">
            {/* Slider 1 */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label htmlFor="orders-per-day" className="text-sm font-semibold text-slate-300">
                  Orders per day
                </label>
                <span className="rounded-lg bg-slate-700 px-3 py-1 text-lg font-bold text-white">
                  {ordersPerDay}
                </span>
              </div>
              <input
                id="orders-per-day"
                type="range"
                min={5}
                max={500}
                step={5}
                value={ordersPerDay}
                onChange={(e) => setOrdersPerDay(Number(e.target.value))}
                className="w-full cursor-pointer accent-emerald-500"
              />
              <div className="mt-1 flex justify-between text-[10px] text-slate-500">
                <span>5</span><span>500</span>
              </div>
            </div>

            {/* Slider 2 */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label htmlFor="avg-order-value" className="text-sm font-semibold text-slate-300">
                  Avg. Order Value (MAD)
                </label>
                <span className="rounded-lg bg-slate-700 px-3 py-1 text-lg font-bold text-white">
                  {avgOrderValue} MAD
                </span>
              </div>
              <input
                id="avg-order-value"
                type="range"
                min={30}
                max={300}
                step={5}
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                className="w-full cursor-pointer accent-emerald-500"
              />
              <div className="mt-1 flex justify-between text-[10px] text-slate-500">
                <span>30 MAD</span><span>300 MAD</span>
              </div>
            </div>
          </div>

          {/* Monthly revenue note */}
          <div className="flex items-center justify-center gap-2 border-b border-slate-700/40 bg-slate-800/30 py-3">
            <DollarSign className="h-4 w-4 text-slate-400" />
            <span className="text-xs text-slate-400">
              Monthly gross revenue:&nbsp;
              <span className="font-bold text-white">{formatMAD(monthlyRevenue)}</span>
            </span>
          </div>

          {/* Comparison */}
          <div className="grid md:grid-cols-3">
            {/* Aggregators */}
            <div className="border-b border-slate-700/40 p-8 md:border-b-0 md:border-r">
              <div className="mb-3 flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Delivery Aggregators
                </span>
              </div>
              <div className="mb-1 text-xs text-slate-500">25% commission fee</div>
              <div className="text-3xl font-extrabold text-red-400 md:text-4xl">
                {formatMAD(aggregatorCost)}
              </div>
              <div className="mt-1 text-xs text-red-400/70">lost every month</div>
              <div className="mt-4 rounded-xl bg-red-950/40 p-3 text-xs leading-relaxed text-red-300/80">
                💸 That's <strong>{formatMAD(aggregatorCost * 12)}</strong> per year — gone to middlemen.
              </div>
            </div>

            {/* GEQO */}
            <div className="border-b border-slate-700/40 p-8 md:border-b-0 md:border-r">
              <div className="mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  GEQO
                </span>
              </div>
              <div className="mb-1 text-xs text-slate-500">Flat monthly fee</div>
              <div className="text-3xl font-extrabold text-emerald-400 md:text-4xl">
                {formatMAD(geqoCost)}
              </div>
              <div className="mt-1 text-xs text-emerald-400/70">per month, all inclusive</div>
              <div className="mt-4 rounded-xl bg-emerald-950/40 p-3 text-xs leading-relaxed text-emerald-300/80">
                ✅ 0% commission. Keep every dirham you earn.
              </div>
            </div>

            {/* Savings */}
            <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900 p-8">
              <div className="mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  You Keep
                </span>
              </div>
              <div className="mb-1 text-xs text-slate-500">Every month, with GEQO</div>
              <div
                className={`text-3xl font-extrabold md:text-4xl ${
                  monthlySaved > 0 ? "text-yellow-300" : "text-slate-400"
                }`}
              >
                {monthlySaved > 0 ? "+" : ""}{formatMAD(Math.max(0, monthlySaved))}
              </div>
              <div className="mt-1 text-xs text-yellow-400/70">net savings per month</div>
              {monthlySaved > 0 && (
                <div className="mt-4 rounded-xl border border-emerald-700/30 bg-emerald-900/20 p-3 text-xs leading-relaxed text-emerald-200">
                  🎯 <strong>{formatMAD(monthlySaved * 12)}</strong> back in your pocket this year.
                </div>
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex flex-col items-center gap-3 border-t border-slate-700/40 bg-slate-800/50 px-8 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm text-slate-400">
              Stop paying commissions. Start owning your orders.
            </p>
            <a
              id="roi-claim-cta"
              href="#claim-form"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Claim Your Beta Spot
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
