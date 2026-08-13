"use client";

import Link from "next/link";
import SetaeMark from "./SetaeMark";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-obsidian border-t border-grid-line pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-grid-line pb-12 mb-8">
          
          {/* Brand & Corporate Entities */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center space-x-3">
              <SetaeMark className="w-8 h-8" mono={true} />
              <span className="font-space font-bold text-xl text-offwhite tracking-tight">
                GEQO
              </span>
            </div>
            
            <div className="font-plex-sans text-xs text-[#737373] leading-relaxed max-w-lg space-y-2">
              <p>
                {t("footer_desc_1")}
              </p>
              <p className="opacity-80">
                {t("footer_desc_2")}
              </p>
              <p className="pt-2 font-plex-mono uppercase tracking-widest text-[#525252]">
                GEQO SARL AU (IF: —, ICE: —, RC: —, Casablanca)
                <br />
                GEQO LLC (EIN: —, Wyoming)
              </p>
            </div>
          </div>

          {/* Legal Compliance & Links */}
          <div className="md:col-span-6 flex flex-col justify-end space-y-6">
            <div className="flex flex-wrap gap-4 text-sm font-plex-mono tracking-wide">
              <Link href="/terms" className="text-offwhite hover:text-saffron transition-colors">
                {t("footer_terms")}
              </Link>
              <span className="text-grid-line">|</span>
              <Link href="/privacy" className="text-offwhite hover:text-saffron transition-colors">
                {t("footer_privacy")}
              </Link>
              <span className="text-grid-line">|</span>
              <Link href="/data-deletion" className="text-offwhite hover:text-saffron transition-colors">
                {t("footer_data_deletion")}
              </Link>
            </div>
            
            <div className="space-y-2">
              <p className="font-plex-sans text-xs text-[#737373] leading-relaxed">
                {t("footer_compliance_1")}
              </p>
              <p className="font-plex-sans text-xs text-[#737373] leading-relaxed">
                <Link href="/privacy#garantie" className="text-mint hover:underline">
                  {t("footer_compliance_2")}
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-plex-mono text-[#525252] tracking-wider uppercase">
          <span>{t("footer_rights")}</span>
          <div className="mt-4 md:mt-0 flex gap-4">
            <a href="https://wa.me/212000000000" className="hover:text-mint transition-colors">{t("footer_contact")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
