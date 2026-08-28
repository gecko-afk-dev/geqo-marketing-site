"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageToggle from "../../components/LanguageToggle";
import LegalBackButton from "../../components/LegalBackButton";

type Category = "sales" | "support";

const inputClasses =
  "w-full px-5 py-4 bg-neutral-900 border border-neutral-800 focus:border-amber-500 outline-none text-[#FAFAFA] font-medium placeholder:text-neutral-500 transition-colors rtl:text-right text-left";

export default function ContactPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    category: "sales" as Category,
    name: "",
    email: "",
    whatsapp: "",
    message: "",
    honeypot: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://api.mygeqo.com";
      const response = await fetch(`${apiBase}/api/v1/public/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Contact form submission failed with status ${response.status}`);
      }
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        </article>

        {/* Contact Form */}
        <div className="mt-8">
          {isSuccess ? (
            <div className="bg-[#141414] border border-mint p-8 lg:p-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-mint/10 flex items-center justify-center mb-6">
                <span className="text-mint text-3xl">✓</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-mint mb-4">
                {t("contact_form_success_title")}
              </h2>
              <p className="text-[#FAFAFA] text-lg max-w-md mx-auto">
                {t("contact_form_success_message")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#141414] border border-amber-500/30 p-8 lg:p-12">
              {/* Category toggle */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, category: "sales" }))}
                  className={`flex-1 px-5 py-4 border font-medium text-center transition-colors ${
                    formData.category === "sales"
                      ? "border-amber-500 text-[#FAFAFA] bg-neutral-900"
                      : "border-neutral-800 text-neutral-500 bg-neutral-900/50"
                  }`}
                >
                  {t("contact_sales_label")}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, category: "support" }))}
                  className={`flex-1 px-5 py-4 border font-medium text-center transition-colors ${
                    formData.category === "support"
                      ? "border-amber-500 text-[#FAFAFA] bg-neutral-900"
                      : "border-neutral-800 text-neutral-500 bg-neutral-900/50"
                  }`}
                >
                  {t("contact_support_label")}
                </button>
              </div>

              <input
                type="text"
                name="name"
                placeholder={t("contact_form_name")}
                value={formData.name}
                onChange={handleChange}
                className={inputClasses}
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t("form_email")}
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                required
              />
              <input
                type="tel"
                name="whatsapp"
                placeholder={t("form_whatsapp")}
                value={formData.whatsapp}
                onChange={handleChange}
                className={inputClasses}
              />
              <textarea
                name="message"
                placeholder={t("contact_form_message_placeholder")}
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={inputClasses}
                required
              />

              {/* Honeypot — hidden from real users, bots that auto-fill every field will populate it */}
              <div
                style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
                aria-hidden="true"
              >
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
                />
              </div>

              {error && (
                <p className="text-red-500 font-medium rtl:text-right text-left">
                  {t("contact_form_error_generic")}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[56px] px-8 bg-[#F59E0B] text-[#0A0A0A] font-bold uppercase tracking-wide hover:bg-amber-400 transition-colors mt-2 disabled:opacity-60"
              >
                {isSubmitting ? t("deletion_submitting") : t("contact_form_submit")}
              </button>
            </form>
          )}
        </div>

        {/* Static contact info */}
        <article className="prose prose-invert prose-headings:font-space prose-headings:text-saffron prose-a:text-mint prose-a:no-underline hover:prose-a:underline prose-p:font-plex-sans prose-li:font-plex-sans prose-h1:text-3xl prose-h2:text-2xl prose-strong:text-offwhite max-w-none mt-12 pt-8 border-t border-grid-line">
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
