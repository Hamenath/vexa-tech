"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const values = [
  "Strategic Engineering Thinking",
  "Advanced Next.js Web Architecture",
  "Brand-Focused Execution",
  "Scalable Enterprise Systems",
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 md:py-40 bg-bg-base text-text-primary border-t border-border-subtle overflow-hidden"
    >
      {/* Radial lighting background */}
      <div className="absolute top-0 right-0 w-200 h-200 bg-brand-accent/3 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-150 h-150 bg-emerald-500/2 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <div className="system-tag mb-8 bg-white/50 backdrop-blur shadow-sm">
              <span className="status-dot" />
              SYS // ABOUT VEXA TECH
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 text-text-primary tracking-tight leading-tight">
              We architect{" "}
              <span className="text-gradient-blue">digital</span>{" "}
              ecosystems
            </h2>

            <div className="space-y-6 text-text-muted text-[18px] leading-relaxed font-normal mb-12">
              <p>
                VEXA TECH is a premium digital services company helping businesses grow through modern websites, strategic branding, software development, digital marketing, and intelligent business solutions.
              </p>
              <p>
                We combine creativity, technology, and strategy to build experiences that create measurable business value.
              </p>
            </div>

            {/* Value points */}
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="group flex items-center gap-3.5 px-5 py-4 rounded-2xl border border-border-subtle bg-white hover:border-brand-accent/40 hover:shadow-md transition-all duration-300 cursor-default"
                >
                  <div className="w-2 h-2 rounded-full bg-brand-accent shadow-sm" />
                  <span className="text-sm font-semibold text-text-primary">
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
                className="inline-flex items-center gap-2 text-base font-bold text-brand-accent hover:text-brand-accent-hover transition-colors"
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
            {/* White Glass Card */}
            <div className="bg-white border border-border-subtle w-full aspect-square max-w-120 mx-auto lg:ml-auto p-4 rounded-[40px] shadow-sm relative">
              <div className="w-full h-full rounded-4xl bg-bg-light flex items-center justify-center relative overflow-hidden group border border-border-subtle">
                <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-br from-brand-accent/5 via-transparent to-transparent pointer-events-none" />

                {/* Logo */}
                <div className="relative w-1/2 h-1/2 transform transition-all duration-1000 group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(124,58,237,0.2)]">
                  <Image
                    src="/vexatechlogo.svg"
                    alt="VEXA TECH Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Floating stat badges */}
            <div
              className="absolute -top-4 right-0 lg:-right-4 bg-white border border-border-subtle rounded-2xl px-6 py-4 text-center shadow-sm z-20"
              style={{ animation: "floatUp 4s ease-in-out infinite" }}
            >
              <div className="text-2xl font-extrabold text-text-primary">150+</div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted opacity-60">Projects</div>
            </div>

            <div
              className="absolute -bottom-4 left-0 lg:-left-4 bg-white border border-border-subtle rounded-2xl px-6 py-4 text-center shadow-sm z-20"
              style={{ animation: "floatDown 5s ease-in-out infinite 1s" }}
            >
              <div className="text-2xl font-extrabold text-brand-accent">99%</div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted opacity-60">Satisfaction</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
