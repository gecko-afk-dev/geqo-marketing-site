"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import LegalBackButton from "@/components/LegalBackButton";
import DataDeletionForm from "@/components/DataDeletionForm";

export default function DataDeletionPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-obsidian text-offwhite py-24 selection:bg-mint selection:text-obsidian">
      <div className="max-w-[760px] mx-auto px-6">

        {/* Top Navigation */}
        <LegalBackButton />

        <div className="mb-12 border-b border-grid-line pb-8">
          <LanguageToggle />

          {/* Version Metadata */}
          <div className="bg-[#141414] border border-[#262626] p-4 text-sm font-plex-mono text-[#A3A3A3] mb-8">
            {t("version_meta")}
          </div>
        </div>

        {/* Page Title & Legal Intro */}
        <article className="prose prose-invert prose-headings:font-space prose-headings:text-saffron prose-a:text-mint prose-a:no-underline hover:prose-a:underline prose-p:font-plex-sans prose-li:font-plex-sans prose-h1:text-3xl prose-h2:text-2xl prose-strong:text-offwhite max-w-none">
          <h1>{t("deletion_title")}</h1>

          <p className="text-[#A3A3A3] leading-relaxed">
            {t("deletion_intro")}
          </p>

          {/* Legal Basis Notice */}
          <div className="not-prose bg-[#141414] border-l-2 border-saffron p-4 my-8 font-plex-mono text-xs text-[#A3A3A3] leading-relaxed">
            {t("deletion_legal_basis")}
          </div>
        </article>

        {/* Deletion Request Form */}
        <div className="mt-8">
          <DataDeletionForm />
        </div>

        {/* Contact Fallback */}
        <div className="mt-12 pt-8 border-t border-grid-line">
          <p className="font-plex-mono text-xs text-[#525252] leading-relaxed">
            privacy@mygeqo.com · dpo@mygeqo.com
          </p>
        </div>
      </div>
    </div>
  );
}
