"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { swissContainerVariants, swissItemVariants } from "@/lib/motion";
import { useRouter } from "next/navigation";

export default function BetaClaimFooter() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length >= 6) {
      router.push(`/claim?card=${encodeURIComponent(code.trim().toUpperCase())}`);
    }
  };

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
          <motion.div 
            variants={swissItemVariants}
            className="col-span-12 bg-amber-500 text-neutral-950 p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 rounded-sm"
          >
            {/* Left */}
            <div className="flex-1 rtl:text-right text-left">
              <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight leading-tight">
                Vous avez reçu une carte d'invitation Bêta ?
              </h2>
              <p className="text-neutral-900 font-medium text-lg">
                Entrez votre code à 6 caractères pour activer votre restaurant.
              </p>
            </div>

            {/* Right Form */}
            <div className="w-full md:w-auto md:min-w-[400px]">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="GEQO-XXXXXX"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-5 py-4 bg-neutral-50 border-2 border-transparent focus:border-neutral-950 outline-none text-neutral-950 font-bold uppercase placeholder:text-neutral-400 placeholder:font-medium transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="whitespace-nowrap bg-neutral-950 text-amber-500 font-bold px-8 py-4 hover:bg-neutral-800 transition-colors active:scale-95 flex items-center justify-center"
                >
                  Activer Mon Restaurant
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
