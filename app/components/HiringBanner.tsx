"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HiringBanner() {
  return (
    <section className="relative py-16 md:py-20 bg-bg-base text-text-primary border-t border-border-subtle overflow-hidden">
      {/* Light glow backdrops */}
      <div className="absolute inset-0 bg-tech-grid opacity-[0.02] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-80 bg-brand-accent/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 rounded-[2.5rem] bg-white border border-border-subtle shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 hover:border-brand-accent/10 transition-colors"
        >
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="system-tag mb-4 bg-brand-accent/5 border-brand-accent/10 text-brand-accent w-fit">
                🚀 NOW HIRING
              </div>
              <h3 className="text-2xl font-black text-text-primary mb-2">
                Business Executive
              </h3>
              <p className="text-text-muted text-base font-normal max-w-xl leading-relaxed">
                Join VEXA TECH and help businesses grow through innovative digital solutions.
              </p>
            </div>
          </div>

          <Link
            href="/careers"
            className="group glass-btn-primary shadow-sm text-base h-auto py-3.5 px-8 whitespace-nowrap"
          >
            View Careers
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 shrink-0" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
