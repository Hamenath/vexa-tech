"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AboutPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-[#f5f5f7] overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-tag mb-8">About Vexa Tech</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-[#1d1d1f] leading-tight tracking-tight">
              We architect <span className="text-[#0071e3]">digital</span> ecosystems
            </h2>
            <p className="text-[#6e6e73] text-lg md:text-xl leading-relaxed font-light mb-10 max-w-xl">
              VEXA TECH is an elite digital engineering firm specialized in 
              high-performance web architecture, strategic UI/UX design, 
              and scalable business systems.
            </p>
            <Link
              href="/about"
              className="group glass-btn-primary shadow-lg shadow-blue-500/10 text-base"
            >
              Discover Our Story
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5 shrink-0" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full mt-12 lg:mt-0"
          >
            <div className="glass-card-showcase aspect-video rounded-[32px] p-12 shadow-xl flex items-center justify-center overflow-hidden">
              {/* Diffused radial background glow element behind logo */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,113,227,0.1)_0%,transparent_65%)] pointer-events-none z-0" />

              <motion.div
                animate={{
                  y: [0, -6, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-40 h-40 opacity-90 z-10"
              >
                <Image src="/vexatechlogo.svg" alt="VEXA TECH" fill className="object-contain" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
