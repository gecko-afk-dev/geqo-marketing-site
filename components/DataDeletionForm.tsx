"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// --- Security: Input Sanitization ---
// Strips HTML tags, script tags, and control characters to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
}

// --- Validation Regexes ---
// RFC 5322 simplified email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// E.164 phone number regex
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  email?: string;
  phone?: string;
  confirm?: string;
}

export default function DataDeletionForm() {
  const { t, lang } = useLanguage();

  // Form field state
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accountType, setAccountType] = useState("consumer");
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // UI state
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [referenceId, setReferenceId] = useState("");

  // Client-side validation
  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    const sanitizedEmail = sanitizeInput(email);
    if (!EMAIL_REGEX.test(sanitizedEmail)) {
      newErrors.email = t("deletion_error_email") as string;
    }

    // Strip spaces/dashes from phone for validation
    const cleanPhone = sanitizeInput(phone).replace(/[\s\-()]/g, "");
    if (!PHONE_REGEX.test(cleanPhone)) {
      newErrors.phone = t("deletion_error_phone") as string;
    }

    if (!confirmed) {
      newErrors.confirm = t("deletion_error_confirm") as string;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("submitting");
    setServerError("");

    // Sanitize all inputs before submission
    const payload = {
      email: sanitizeInput(email),
      phone_number: sanitizeInput(phone).replace(/[\s\-()]/g, ""),
      account_type: accountType,
      reason: sanitizeInput(reason) || undefined,
    };

    try {
      const response = await fetch(
        "https://api.mygeqo.com/api/v1/public/data-deletion-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        setReferenceId(data?.reference_id || data?.id || "—");
        setStatus("success");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setServerError(errorData?.detail || (t("deletion_error_generic") as string));
        setStatus("error");
      }
    } catch {
      setServerError(t("deletion_error_generic") as string);
      setStatus("error");
    }
  }

  // --- Success Confirmation Card ---
  if (status === "success") {
    return (
      <div
        className="border-2 border-mint bg-[#0A1F18] rounded-lg p-8 space-y-4 animate-in fade-in"
        role="alert"
        aria-live="polite"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-mint/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-space font-bold text-xl text-mint">
            {t("deletion_success_title")}
          </h3>
        </div>
        <p className="font-plex-sans text-offwhite/90 leading-relaxed">
          {t("deletion_success_message")}
        </p>
        {referenceId && (
          <div className="font-plex-mono text-sm text-[#A3A3A3] pt-2 border-t border-[#262626]">
            {t("deletion_success_ref")} <span className="text-mint font-bold">{referenceId}</span>
          </div>
        )}
      </div>
    );
  }

  // --- Form ---
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="deletion-email" className="block font-plex-mono text-sm text-saffron tracking-wide uppercase">
          {t("deletion_email_label")} <span className="text-critical">*</span>
        </label>
        <input
          id="deletion-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          placeholder={t("deletion_email_placeholder") as string}
          className={`w-full bg-[#141414] border ${
            errors.email ? "border-critical" : "border-[#262626]"
          } rounded px-4 py-3 text-offwhite font-plex-sans placeholder:text-[#525252] focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron/30 transition-colors`}
          dir={lang === "ar" ? "rtl" : "ltr"}
        />
        {errors.email && (
          <p className="text-critical text-xs font-plex-mono mt-1" role="alert">{errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label htmlFor="deletion-phone" className="block font-plex-mono text-sm text-saffron tracking-wide uppercase">
          {t("deletion_phone_label")} <span className="text-critical">*</span>
        </label>
        <input
          id="deletion-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
          }}
          placeholder={t("deletion_phone_placeholder") as string}
          className={`w-full bg-[#141414] border ${
            errors.phone ? "border-critical" : "border-[#262626]"
          } rounded px-4 py-3 text-offwhite font-plex-sans placeholder:text-[#525252] focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron/30 transition-colors`}
          dir="ltr"
        />
        {errors.phone && (
          <p className="text-critical text-xs font-plex-mono mt-1" role="alert">{errors.phone}</p>
        )}
      </div>

      {/* Account Type Select */}
      <div className="space-y-2">
        <label htmlFor="deletion-account-type" className="block font-plex-mono text-sm text-saffron tracking-wide uppercase">
          {t("deletion_account_type_label")}
        </label>
        <select
          id="deletion-account-type"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="w-full bg-[#141414] border border-[#262626] rounded px-4 py-3 text-offwhite font-plex-sans focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron/30 transition-colors appearance-none cursor-pointer"
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <option value="consumer">{t("deletion_account_consumer")}</option>
          <option value="merchant">{t("deletion_account_merchant")}</option>
        </select>
      </div>

      {/* Reason Textarea */}
      <div className="space-y-2">
        <label htmlFor="deletion-reason" className="block font-plex-mono text-sm text-saffron tracking-wide uppercase">
          {t("deletion_reason_label")}
        </label>
        <textarea
          id="deletion-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={t("deletion_reason_placeholder") as string}
          rows={4}
          maxLength={1000}
          className="w-full bg-[#141414] border border-[#262626] rounded px-4 py-3 text-offwhite font-plex-sans placeholder:text-[#525252] focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron/30 transition-colors resize-none"
          dir={lang === "ar" ? "rtl" : "ltr"}
        />
      </div>

      {/* Confirmation Checkbox */}
      <div className="space-y-2">
        <label
          htmlFor="deletion-confirm"
          className={`flex items-start gap-3 cursor-pointer group p-4 rounded border ${
            errors.confirm ? "border-critical bg-critical/5" : "border-[#262626] bg-[#141414]"
          } transition-colors hover:border-[#3a3a3a]`}
        >
          <input
            id="deletion-confirm"
            type="checkbox"
            checked={confirmed}
            onChange={(e) => {
              setConfirmed(e.target.checked);
              if (errors.confirm) setErrors((prev) => ({ ...prev, confirm: undefined }));
            }}
            className="mt-1 w-4 h-4 rounded border-[#525252] bg-[#0A0A0A] text-saffron focus:ring-saffron/30 flex-shrink-0"
          />
          <span className="font-plex-sans text-sm text-[#A3A3A3] leading-relaxed group-hover:text-offwhite transition-colors">
            {t("deletion_confirm_label")}
          </span>
        </label>
        {errors.confirm && (
          <p className="text-critical text-xs font-plex-mono mt-1" role="alert">{errors.confirm}</p>
        )}
      </div>

      {/* Server Error */}
      {status === "error" && serverError && (
        <div className="border border-critical/50 bg-critical/10 rounded px-4 py-3 text-critical text-sm font-plex-mono" role="alert">
          {serverError}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className={`w-full font-plex-mono font-bold tracking-widest uppercase text-sm py-4 rounded border transition-all duration-300 ${
          status === "submitting"
            ? "bg-[#262626] border-[#3a3a3a] text-[#525252] cursor-not-allowed"
            : "bg-critical/10 border-critical text-critical hover:bg-critical hover:text-white cursor-pointer"
        }`}
      >
        {status === "submitting" ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t("deletion_submitting")}
          </span>
        ) : (
          t("deletion_submit")
        )}
      </button>
    </form>
  );
}
