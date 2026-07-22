"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Terminal } from "lucide-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-bg-base text-text-primary">
      {/* ── Ambient Radial Lighting (Light Theme Adaptation) ── */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-250 h-175 bg-linear-to-b from-brand-accent/5 via-brand-accent/2 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-emerald-500/3 blur-[120px] pointer-events-none" />

      {/* ── Technical Fine Grid Overlay ── */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />

      {/* ── Abstract 3D Hero Ring Element (Light Theme Adaptation) ── */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 md:w-200 md:h-200 pointer-events-none opacity-40">
        <div className="w-full h-full rounded-full border border-brand-accent/10 animate-spin-slow" style={{ animationDuration: "35s" }} />
        <div className="absolute inset-8 rounded-full border border-dashed border-black/5 animate-spin-reverse-slow" style={{ animationDuration: "25s" }} />
        <div className="absolute inset-24 rounded-full border border-brand-accent/5 blur-[2px]" />
      </div>

      {children}
    </div>
  )
}

const stats = [
  { value: "05+", label: "Completed Client Projects", code: "SYS // 01" },
  { value: "100%", label: "Client Satisfaction", code: "SYS // 02" },
  { value: "05+", label: "Business Partners", code: "SYS // 03" },
  { value: "24/7", label: "Dedicated Support", code: "SYS // 04" },
]

export function HeroContent() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] md:min-h-screen px-6 pb-16 pt-32 md:pt-36">
      {/* System Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="system-tag mb-8 shadow-sm bg-white/50 backdrop-blur"
      >
        <span className="status-dot" />
        <Terminal size={12} className="text-brand-accent" />
        <span>SYS // 01 // DIGITAL ARCHITECTURE</span>
      </motion.div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-5xl"
      >
        <h1 className="text-[clamp(3rem,7.5vw,5.5rem)] font-black leading-[1.05] tracking-tight mb-8 text-text-primary">
          Engineering the <br />
          <span className="text-gradient-blue">digital standard.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[18px] md:text-xl text-text-muted font-normal leading-relaxed max-w-85 md:max-w-2xl mx-auto mb-10 md:mb-14"
        >
          We architect premium digital experiences, powerful software solutions, strategic branding, and growth-driven marketing that help modern businesses scale with confidence.
        </motion.p>

        {/* Enterprise CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-5 flex-wrap"
        >
          <Link
            href="/contact"
            className="group glass-btn-primary shadow-sm text-base"
          >
            Start your project
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
          <Link
            href="/services"
            className="group glass-btn-secondary text-base"
          >
            Explore services
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform shrink-0 text-text-primary" />
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Stats Strip Cards ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16 md:mt-28 w-full max-w-5xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-start p-6 bg-white border border-border-subtle rounded-3xl shadow-sm hover:border-brand-accent/30 hover:shadow-md transition-all duration-300 group"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted/65 mb-2">
                {stat.code}
              </span>
              <span className="text-3xl md:text-4xl font-extrabold text-text-primary mb-1 group-hover:text-brand-accent transition-colors">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-text-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <div
          className="w-px h-8 bg-linear-to-b from-brand-accent to-transparent"
          style={{ animation: "scrollBob 1.5s ease-in-out infinite" }}
        />
      </div>
    </main>
  )
}
