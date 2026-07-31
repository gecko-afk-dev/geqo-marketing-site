"use client";

import { useTranslation } from "@/lib/i18n/use-translation";
import Logo from "./logo";
import { ShieldCheck, Lock } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-50">
      {/* ─── Trust / Compliance Banner ───────────────────────────────────── */}
      <div className="border-y border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center gap-6 py-6 text-center sm:flex-row sm:gap-10 sm:text-left">
            {/* Badge 1 — CNDP */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-950/60 border border-emerald-700/30">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  CNDP Compliant
                </div>
                <div className="text-[11px] text-slate-400">
                  Fully compliant with Moroccan Data Privacy Laws
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden h-10 w-px bg-slate-700 sm:block" />

            {/* Badge 2 — Meta Encryption */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-950/60 border border-indigo-700/30">
                <Lock className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                  End-to-End Encrypted
                </div>
                <div className="text-[11px] text-slate-400">
                  All messages secured by Meta WhatsApp Business API
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden h-10 w-px bg-slate-700 sm:block" />

            {/* Badge 3 — Moroccan built */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-950/60 border border-red-700/30">
                <span className="text-lg" role="img" aria-label="Moroccan flag">🇲🇦</span>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-red-400">
                  Made in Morocco
                </div>
                <div className="text-[11px] text-slate-400">
                  Built for Moroccan restaurants, by Moroccans
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Footer Body ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div className="grid gap-10 py-8 sm:grid-cols-12 md:py-12 border-t border-gray-200">
          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-4">
            <div className="mb-2">
              <Logo />
            </div>
            <div className="text-sm text-gray-600 mb-4">
              {t("footer_location")}
            </div>
            <div className="text-sm text-gray-500">
              {t("footer_powered")}
            </div>
          </div>
        </div>

        {/* Bottom area */}
        <div className="flex flex-col md:flex-row items-center justify-between py-4 md:py-8 border-t border-gray-200 text-sm">
          {/* Copyrights note */}
          <div className="text-gray-600 mr-4">
            {t("footer_copyright")}
          </div>
        </div>
      </div>
    </footer>
  );
}
