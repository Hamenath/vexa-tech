"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-white">
      {/* ── Subtle Ambient Orbs ── */}
      <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full bg-blue-50/50 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-slate-50 blur-[100px] pointer-events-none" />

      {/* ── Minimal Grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#000 1px, transparent 1px),
            linear-gradient(90deg, #000 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {children}
    </div>
  )
}

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "2×", label: "Faster Delivery" },
  { value: "24/7", label: "Support" },
]

export function HeroContent() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pb-16 pt-32">
      {/* Minimal Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10 bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider"
      >
        Innovate · Create · Grow
      </motion.div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-5xl"
      >
        <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.1] tracking-tight mb-8 text-[#1d1d1f]">
          Engineering the <br />
          <span className="text-[#0071e3]">digital standard.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl text-[#6e6e73] font-light leading-relaxed max-w-2xl mx-auto mb-14"
        >
          We architect refined digital experiences that command authority 
          and accelerate growth for ambitious brands.
        </motion.p>

        {/* Apple CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-5 flex-wrap"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-base transition-all duration-300"
          >
            Start your project
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 text-[#0071e3] hover:underline font-semibold text-base transition-all duration-300"
          >
            Explore services
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Stats Strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-32 w-full max-w-4xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-px">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-6 px-4 bg-transparent text-center"
            >
              <span className="text-4xl font-bold text-[#1d1d1f] mb-1">
                {stat.value}
              </span>
              <span className="text-[12px] font-medium text-[#6e6e73]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ animation: "fadeInUp 0.8s 1.5s both" }}>
        <div
          className="w-px h-10 bg-slate-200"
          style={{ animation: "scrollBob 1.5s ease-in-out infinite" }}
        />
      </div>
    </main>
  )
}
