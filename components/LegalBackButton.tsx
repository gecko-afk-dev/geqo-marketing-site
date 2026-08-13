"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LegalBackButton() {
  const { t } = useLanguage();

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 font-plex-mono text-sm text-offwhite hover:text-saffron transition-colors duration-200 tracking-wide group mb-8"
    >
      <span className="group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform duration-200">
        {t("back_to_home")}
      </span>
    </Link>
  );
}
