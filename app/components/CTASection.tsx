"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 bg-bg-base text-text-primary overflow-hidden border-t border-border-subtle">
      {/* Grid & Light Radial Glow */}
      <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-125 bg-brand-accent/4 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="system-tag mb-8 mx-auto bg-white/50 backdrop-blur shadow-sm">
            <span className="status-dot" />
            SYS // DEPLOYMENT READY
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-text-primary leading-tight tracking-tight mb-8">
            Let&apos;s Build Your <br />
            <span className="text-gradient-blue">Next Success Story</span>
          </h2>
          <p className="text-text-muted text-[18px] font-normal leading-relaxed max-w-2xl mx-auto mb-12">
            Whether you&apos;re launching a new business, modernizing your digital presence, or scaling your brand, VEXA TECH is ready to help you build smarter and grow faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/contact"
              className="group glass-btn-primary shadow-sm text-base h-auto py-3.5"
            >
              Start Your Project
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
            <Link
              href="/contact"
              className="group glass-btn-secondary text-base h-auto py-3.5"
            >
              Schedule a Consultation
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 shrink-0 text-text-primary" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
