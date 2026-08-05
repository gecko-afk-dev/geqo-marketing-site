"use client";

import { useI18nContext } from "@/lib/i18n/i18n-context";
import { translations } from "@/lib/i18n/translations";
import Link from "next/link";

export default function Footer() {
  const { locale } = useI18nContext();
  const t = translations[locale];

  return (
    <footer className="bg-[#0A0A0A] border-t border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top area */}
        <div className="grid gap-10 py-12 sm:grid-cols-12">
          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-4 rtl:text-right text-left">
            <div className="mb-6 flex justify-start rtl:justify-end">
              <Link href="/" className="inline-block">
                <img src="/geqo-logo.svg" alt="GEQO" className="h-8 w-auto object-contain" />
              </Link>
            </div>
            <div className="text-sm font-medium text-neutral-400 mb-3">
              {t.footer_location}
            </div>
            <div className="text-sm font-medium text-amber-500/80">
              {t.footer_powered}
            </div>
          </div>
        </div>

        {/* Bottom area */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 border-t border-neutral-800/50 text-sm">
          {/* Copyrights note */}
          <div className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
            {t.footer_copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
