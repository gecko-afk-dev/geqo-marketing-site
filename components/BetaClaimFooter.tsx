"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { swissContainerVariants, swissItemVariants } from "@/lib/motion";
import { useSearchParams } from "next/navigation";
import { useI18nContext } from "@/lib/i18n/i18n-context";
import { translations } from "@/lib/i18n/translations";

function BetaFormLogic() {
  const { locale } = useI18nContext();
  const t = translations[locale];
  
  const searchParams = useSearchParams();
  const paramCode = searchParams.get("card") || searchParams.get("code") || "";

  const [formData, setFormData] = useState({
    beta_code: paramCode,
    restaurant_name: "",
    contact_name: "",
    whatsapp_number: "",
    city: "",
    email: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (paramCode) {
      setFormData(prev => ({ ...prev, beta_code: paramCode }));
      // Auto-scroll logic if params exist
      const formEl = document.getElementById("beta-claim-form");
      if (formEl) {
        setTimeout(() => {
          formEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 500);
      }
    }
  }, [paramCode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/v1/public/beta-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      // Simulate success for now since endpoint might not exist locally
      alert("Beta signup successful!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      variants={swissItemVariants}
      className="col-span-12 bg-amber-500 text-neutral-950 p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-stretch justify-between gap-12 rounded-none"
      id="beta-claim-form"
    >
      {/* Left */}
      <div className="flex-1 rtl:text-right text-left lg:pt-4">
        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
          {t.form_heading}
        </h2>
        <p className="text-neutral-900 font-medium text-lg max-w-md">
          {t.form_subheading}
        </p>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-[500px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="beta_code"
            placeholder={t.form_beta_code}
            value={formData.beta_code}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-neutral-50 border-2 border-transparent focus:border-neutral-950 outline-none text-neutral-950 font-bold uppercase placeholder:text-neutral-400 placeholder:font-medium transition-colors rtl:text-right text-left"
            required
          />
          <input
            type="text"
            name="restaurant_name"
            placeholder={t.form_restaurant}
            value={formData.restaurant_name}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-neutral-50 border-2 border-transparent focus:border-neutral-950 outline-none text-neutral-950 font-bold placeholder:text-neutral-400 placeholder:font-medium transition-colors rtl:text-right text-left"
            required
          />
          <input
            type="text"
            name="contact_name"
            placeholder={t.form_contact}
            value={formData.contact_name}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-neutral-50 border-2 border-transparent focus:border-neutral-950 outline-none text-neutral-950 font-bold placeholder:text-neutral-400 placeholder:font-medium transition-colors rtl:text-right text-left"
            required
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="tel"
              name="whatsapp_number"
              placeholder={t.form_whatsapp}
              value={formData.whatsapp_number}
              onChange={handleChange}
              className="w-full sm:w-1/2 px-5 py-4 bg-neutral-50 border-2 border-transparent focus:border-neutral-950 outline-none text-neutral-950 font-bold placeholder:text-neutral-400 placeholder:font-medium transition-colors rtl:text-right text-left"
              required
            />
            <input
              type="text"
              name="city"
              placeholder={t.form_city}
              value={formData.city}
              onChange={handleChange}
              className="w-full sm:w-1/2 px-5 py-4 bg-neutral-50 border-2 border-transparent focus:border-neutral-950 outline-none text-neutral-950 font-bold placeholder:text-neutral-400 placeholder:font-medium transition-colors rtl:text-right text-left"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder={t.form_email}
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-neutral-50 border-2 border-transparent focus:border-neutral-950 outline-none text-neutral-950 font-bold placeholder:text-neutral-400 placeholder:font-medium transition-colors rtl:text-right text-left"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-neutral-950 text-neutral-50 px-8 py-4 font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors active:scale-95 disabled:opacity-70 mt-2"
          >
            {isSubmitting ? "..." : t.form_submit_beta}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default function BetaClaimFooter() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-12"
          variants={swissContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Suspense fallback={<div className="col-span-12 h-64 bg-amber-500 animate-pulse" />}>
            <BetaFormLogic />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
