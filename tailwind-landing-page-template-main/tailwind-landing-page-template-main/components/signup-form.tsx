"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/use-translation";
import SuccessOverlay from "./success-overlay";

// Route API calls through the same origin (/api → proxied to api.mygeqo.com by Cloudflare Pages).
// This prevents ad blockers from blocking cross-domain requests (ERR_BLOCKED_BY_CLIENT)
// and eliminates CORS for browser clients. In local dev, point directly to the local backend.
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ??
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "");  // Empty string = same origin; /api/* is proxied by Cloudflare _redirects


export default function SignupForm() {
  const { t, locale } = useTranslation();
  const [formData, setFormData] = useState({
    manager_name: "",
    restaurant_name: "",
    email: "",
    whatsapp_number: "",
    card_code: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);

  // Read card code from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cardParam = params.get("card");
    if (cardParam) {
      setFormData(prev => ({ ...prev, card_code: cardParam }));
      setIsReadOnly(true);
      
      // Smoothly scroll down to the claim form after rendering completes
      setTimeout(() => {
        const element = document.getElementById("claim-form");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly && e.target.name === "card_code") return;
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE}/api/v1/public/beta-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, locale }),
      });


      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        let msgKey = "error_default";
        
        if (response.status === 404) msgKey = "error_card_not_found";
        if (response.status === 409 && errorData?.detail?.includes("email")) msgKey = "error_email_exists";
        if (response.status === 409 && errorData?.detail?.includes("card")) msgKey = "error_card_used";
        
        throw new Error(msgKey);
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      // @ts-ignore
      setErrorMessage(t(err.message) || t("error_default"));
    }
  };

  return (
    <section id="claim-form">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="relative overflow-hidden rounded-2xl bg-gray-900 px-4 py-12 text-center shadow-xl md:px-12 md:py-20 text-white">
            <div className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2" aria-hidden="true">
              <div className="h-56 w-[480px] rounded-full border-[20px] border-green-500 blur-3xl opacity-50" />
            </div>

            <div className="mx-auto max-w-3xl">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("form_title")}</h2>
              <div className="inline-flex rounded-full bg-green-500/20 px-4 py-1.5 text-sm font-semibold text-green-400 mb-6 border border-green-500/30">
                🔒 {t("form_subtitle")}
              </div>
              <p className="mb-8 text-lg text-gray-400">{t("form_desc")}</p>

              <form onSubmit={handleSubmit} className="mx-auto max-w-md text-left">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300" htmlFor="manager_name">
                      {t("form_field_name")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="manager_name"
                      name="manager_name"
                      type="text"
                      required
                      value={formData.manager_name}
                      onChange={handleChange}
                      className="form-input w-full bg-gray-800 border-gray-700 text-white focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300" htmlFor="restaurant_name">
                      {t("form_field_restaurant")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="restaurant_name"
                      name="restaurant_name"
                      type="text"
                      required
                      value={formData.restaurant_name}
                      onChange={handleChange}
                      className="form-input w-full bg-gray-800 border-gray-700 text-white focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300" htmlFor="email">
                      {t("form_field_email")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input w-full bg-gray-800 border-gray-700 text-white focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300" htmlFor="whatsapp_number">
                      {t("form_field_whatsapp")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="whatsapp_number"
                      name="whatsapp_number"
                      type="tel"
                      required
                      placeholder="+212600000000"
                      pattern="^\+?[0-9]{9,15}$"
                      value={formData.whatsapp_number}
                      onChange={handleChange}
                      className="form-input w-full bg-gray-800 border-gray-700 text-white focus:border-green-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-300" htmlFor="card_code">
                        {t("form_field_card")} <span className="text-red-500">*</span>
                      </label>
                      {isReadOnly && (
                        <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 flex items-center gap-1 select-none">
                          <span>✓</span>
                          <span>
                            {locale === "ar" 
                              ? "تم إدخال الرمز وقفل التعديل" 
                              : (locale === "fr" 
                                  ? "Code Appliqué & Verrouillé" 
                                  : "Code Applied & Locked")}
                          </span>
                        </span>
                      )}
                    </div>
                    <input
                      id="card_code"
                      name="card_code"
                      type="text"
                      required
                      pattern="^GEQO-[A-Z0-9]{6}$"
                      placeholder="GEQO-XXXXXX"
                      value={formData.card_code}
                      onChange={handleChange}
                      readOnly={isReadOnly}
                      className={`form-input w-full border-gray-700 text-white focus:border-green-500 transition-all ${
                        isReadOnly 
                          ? "bg-gray-800/40 text-gray-400 border-dashed cursor-not-allowed select-none" 
                          : "bg-gray-800"
                      }`}
                    />
                  </div>
                </div>

                {status === "error" && (
                  <div className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
                    {errorMessage}
                  </div>
                )}

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn w-full bg-green-600 text-white shadow-sm hover:bg-green-500 disabled:opacity-50"
                  >
                    {status === "loading" ? t("form_submitting") : t("form_submit")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {status === "success" && <SuccessOverlay />}
    </section>
  );
}
