"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { swissContainerVariants, swissItemVariants } from "@/lib/motion";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

const MOROCCAN_CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Tangier",
  "Agadir",
  "Fes",
  "Meknes",
  "Oujda",
  "Kenitra",
  "Tetouan",
  "Other"
];

function ClaimFormLogic() {
  const { lang } = useLanguage();
  const t = translations[lang];
  
  const searchParams = useSearchParams();
  const paramCode = searchParams.get("card") || searchParams.get("code") || "";

  const [formData, setFormData] = useState({
    restaurant_name: "",
    contact_name: "",
    whatsapp_number: "",
    city: "",
    email: "",
    beta_code: paramCode,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (paramCode) {
      setFormData(prev => ({ ...prev, beta_code: paramCode }));
      // Auto-scroll logic if params exist
      const formEl = document.getElementById("claim-form");
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
      await fetch('https://api.mygeqo.com/api/v1/public/beta-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        variants={swissItemVariants}
        className="col-span-12 bg-[#141414] border border-[#05CD99] p-8 lg:p-12 flex flex-col items-center text-center rounded-none"
        id="claim-form"
      >
        <div className="w-16 h-16 bg-[#05CD99]/10 rounded-full flex items-center justify-center mb-6">
          <span className="text-[#05CD99] text-3xl">✓</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#05CD99] mb-4">Request Received</h2>
        <p className="text-[#FAFAFA] text-lg max-w-md mx-auto">
          We have received your demo request. Our team will contact you on WhatsApp shortly to set up your restaurant.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={swissItemVariants}
      className="col-span-12 bg-[#141414] border border-amber-500/30 p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-stretch justify-between gap-12 rounded-none"
      id="claim-form"
    >
      {/* Left */}
      <div className="flex-1 rtl:text-right text-left lg:pt-4">
        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight text-[#FAFAFA]">
          {t.form_heading}
        </h2>
        <p className="text-neutral-400 font-medium text-lg max-w-md">
          {t.form_subheading}
        </p>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-[500px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="restaurant_name"
            placeholder={t.form_restaurant}
            value={formData.restaurant_name}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-neutral-900 border border-neutral-800 focus:border-amber-500 outline-none text-[#FAFAFA] font-medium placeholder:text-neutral-500 transition-colors rtl:text-right text-left"
            required
          />
          <input
            type="text"
            name="contact_name"
            placeholder={t.form_contact}
            value={formData.contact_name}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-neutral-900 border border-neutral-800 focus:border-amber-500 outline-none text-[#FAFAFA] font-medium placeholder:text-neutral-500 transition-colors rtl:text-right text-left"
            required
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="tel"
              name="whatsapp_number"
              placeholder={t.form_whatsapp}
              value={formData.whatsapp_number}
              onChange={handleChange}
              className="w-full sm:w-1/2 px-5 py-4 bg-neutral-900 border border-neutral-800 focus:border-amber-500 outline-none text-[#FAFAFA] font-medium placeholder:text-neutral-500 transition-colors rtl:text-right text-left"
              required
            />
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full sm:w-1/2 px-5 py-4 bg-neutral-900 border border-neutral-800 focus:border-amber-500 outline-none font-medium transition-colors rtl:text-right text-left appearance-none ${formData.city ? 'text-[#FAFAFA]' : 'text-neutral-500'}`}
              required
            >
              <option value="" disabled>{t.form_city}</option>
              {MOROCCAN_CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <input
            type="email"
            name="email"
            placeholder={t.form_email}
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-neutral-900 border border-neutral-800 focus:border-amber-500 outline-none text-[#FAFAFA] font-medium placeholder:text-neutral-500 transition-colors rtl:text-right text-left"
            required
          />
          <input
            type="text"
            name="beta_code"
            placeholder={t.form_beta_code + " (Optional)"}
            value={formData.beta_code}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-neutral-900/50 border border-neutral-800/50 focus:border-amber-500 outline-none text-[#FAFAFA] font-medium placeholder:text-neutral-600 transition-colors rtl:text-right text-left uppercase"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-500 text-neutral-950 px-8 py-4 font-bold tracking-widest uppercase hover:bg-amber-400 transition-colors active:scale-95 disabled:opacity-70 mt-2"
          >
            {isSubmitting ? "..." : t.form_submit_beta}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default function ClaimDemoForm() {
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
          <Suspense fallback={<div className="col-span-12 h-64 bg-neutral-900 animate-pulse border border-neutral-800" />}>
            <ClaimFormLogic />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
