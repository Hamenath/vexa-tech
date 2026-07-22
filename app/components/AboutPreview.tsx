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
      className="relative py-24 md:py-32 bg-bg-base text-text-primary border-t border-border-subtle overflow-hidden"
    >
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-150 h-125 bg-brand-accent/3 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="system-tag mb-8 bg-white/50 backdrop-blur shadow-sm">
              <span className="status-dot" />
              SYS // CORPORATE PROFILE
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-text-primary leading-tight tracking-tight">
              We architect <span className="text-gradient-blue">digital</span> ecosystems
            </h2>
            <p className="text-text-muted text-[18px] leading-relaxed font-normal mb-10 max-w-xl">
              VEXA TECH is a premium digital services company helping businesses grow through modern websites, strategic branding, software development, digital marketing, and intelligent business solutions.
            </p>
            <Link
              href="/about"
              className="group glass-btn-primary shadow-sm text-base h-auto py-3.5"
            >
              Discover Our Story
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full mt-12 lg:mt-0"
          >
            <div className="bg-white border border-border-subtle aspect-video rounded-3xl p-12 shadow-sm flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,113,227,0.05)_0%,transparent_70%)] pointer-events-none z-0" />

              <motion.div
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-36 h-36 md:w-44 md:h-44 z-10 drop-shadow-[0_4px_16px_rgba(124,58,237,0.2)]"
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
