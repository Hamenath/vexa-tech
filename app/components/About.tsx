"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const values = [
  "Strategic Design Thinking",
  "Advanced Web Architecture",
  "Brand-Focused Execution",
  "Scalable Digital Systems",
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 md:py-40 bg-white overflow-hidden"
    >
      {/* ── Minimal background ── */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <div className="section-tag mb-8">
              About Vexa Tech
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-[#1d1d1f] tracking-tight leading-[1.15]">
              We architect{" "}
              <span className="text-[#0071e3]">digital</span>{" "}
              ecosystems
            </h2>

            <div className="space-y-6 text-[#6e6e73] text-lg leading-relaxed font-light mb-12">
              <p>
                VEXA TECH is an elite digital engineering firm specialized in 
                high-performance web architecture, strategic UI/UX design, 
                and scalable business systems.
              </p>
              <p>
                We build premium digital experiences that command authority, 
                optimize workflows, and drive definitive market growth.
              </p>
            </div>

            {/* Value points */}
            <div className="grid sm:grid-cols-2 gap-3">
              {values.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="group flex items-center gap-4 px-5 py-4 rounded-2xl border border-white/40 glass-surface-subtle hover:border-[#0071e3]/30 hover:shadow-xs transition-all duration-300 cursor-default"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                  <span className="text-[15px] font-medium text-[#1d1d1f]">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-10"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0071e3] hover:underline group transition-all duration-300"
              >
                Work with us
                <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Card */}
            <div className="glass-card w-full aspect-square max-w-[480px] mx-auto lg:ml-auto p-4 rounded-[40px] shadow-xl">
              {/* Inner frame */}
              <div className="w-full h-full rounded-[32px] bg-slate-50 flex items-center justify-center relative overflow-hidden group">
                {/* Subtle light */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent pointer-events-none" />

                {/* Logo */}
                <div className="relative w-1/2 h-1/2 transform transition-all duration-1000 group-hover:scale-105">
                  <Image
                    src="/vexatechlogo.svg"
                    alt="VEXA TECH Logo"
                    fill
                    className="object-contain opacity-80"
                  />
                </div>
              </div>
            </div>

            {/* Floating stat badges — CSS animations avoid React removeChild conflicts */}
            <div
              className="absolute -top-4 right-0 lg:-right-4 glass-card rounded-2xl px-6 py-4 text-center shadow-lg"
              style={{ animation: "floatUp 4s ease-in-out infinite" }}
            >
              <div className="text-2xl font-bold text-[#1d1d1f]">150+</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#6e6e73]">Projects</div>
            </div>

            <div
              className="absolute -bottom-4 left-0 lg:-left-4 glass-card rounded-2xl px-6 py-4 text-center shadow-lg"
              style={{ animation: "floatDown 5s ease-in-out infinite 1s" }}
            >
              <div className="text-2xl font-bold text-[#0071e3]">99%</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#6e6e73]">Satisfaction</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
