"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-tag mb-8 mx-auto">Get Started</div>
          <h2 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] leading-tight tracking-tight mb-8">
            Ready to architect your <br />
            <span className="text-[#0071e3]">digital future?</span>
          </h2>
          <p className="text-[#6e6e73] text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
            Join the elite brands that trust VEXA TECH to engineer their most critical 
            digital systems and premium user experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              Start Your Project
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center gap-1.5 text-[#0071e3] hover:underline font-semibold text-base transition-all duration-300"
            >
              Explore services
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
