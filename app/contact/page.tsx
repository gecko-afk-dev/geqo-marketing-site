"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageToggle from "../../components/LanguageToggle";
import LegalBackButton from "../../components/LegalBackButton";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-obsidian text-offwhite py-24 selection:bg-mint selection:text-obsidian">
      <div className="max-w-[760px] mx-auto px-6">

        {/* Top Navigation */}
        <LegalBackButton />

        <div className="mb-12 border-b border-grid-line pb-8">
          <LanguageToggle />
        </div>

        <article className="prose prose-invert prose-headings:font-space prose-headings:text-saffron prose-a:text-mint prose-a:no-underline hover:prose-a:underline prose-p:font-plex-sans prose-li:font-plex-sans prose-h1:text-3xl prose-h2:text-2xl prose-strong:text-offwhite max-w-none">
          <h1>{t("contact_heading")}</h1>

          <h2>{t("contact_sales_label")}</h2>
          <p>{t("contact_sales_desc")}</p>
          <p>
            <a href="mailto:sales@mygeqo.com" className="text-mint hover:underline">sales@mygeqo.com</a>
          </p>

          <h2>{t("contact_support_label")}</h2>
          <p>{t("contact_support_desc")}</p>
          <p>
            <a href="mailto:support@mygeqo.com" className="text-mint hover:underline">support@mygeqo.com</a>
          </p>
        </article>
      </div>
    </div>
  );
}
