"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Sparkles, Calendar, ShieldCheck, Zap, Bot } from "lucide-react";

export default function ProductAnnouncement() {
  const varnamUrl = "https://varnam.vexatech.in/";

  const highlights = [
    {
      icon: Calendar,
      title: "Muhurtham Calendar",
      desc: "Smart scheduling tailored for peak wedding dates and multi-session bridal slots.",
    },
    {
      icon: Bot,
      title: "VARNAM AI Assistant",
      desc: "Intelligent analytics to forecast bookings, track revenue, and optimize studio operations.",
    },
    {
      icon: Zap,
      title: "Automated Invoicing",
      desc: "Instant quotation generation, bridal advance receipts, and automated payment reminders.",
    },
    {
      icon: ShieldCheck,
      title: "Bridal CRM & Enquiries",
      desc: "Centralized client consultations, trial makeup notes, and booking histories.",
    },
  ];

  return (
    <section id="varnam" className="relative py-20 md:py-28 bg-bg-base text-text-primary border-t border-border-subtle overflow-hidden">
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-125 h-125 bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-150 h-150 bg-brand-accent/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid opacity-[0.025] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        
        {/* Top Announcement Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/10 border border-orange-500/20 text-orange-600 backdrop-blur-sm shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            <span>NEW PRODUCT ANNOUNCEMENT</span>
          </div>

          <div className="system-tag bg-white/70 backdrop-blur border-border-subtle shadow-xs">
            <Sparkles size={12} className="text-orange-500" />
            <span>BUILT BY VEXA TECH</span>
          </div>
        </motion.div>

        {/* Main Grid: Info + Visual Showcase */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Details & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-[1.1] mb-6">
              Introducing <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                VARNAM
              </span>{" "}
              Bridal Software
            </h2>

            <p className="text-text-muted text-lg sm:text-xl font-normal leading-relaxed mb-8 max-w-2xl">
              An all-in-one studio management platform & AI assistant engineered specifically for bridal makeup artists, wedding beauty studios, and luxury salon professionals to streamline daily operations, muhurtham bookings, and revenue growth.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-border-subtle shadow-xs hover:border-orange-500/20 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
                        <Icon size={16} />
                      </div>
                      <h4 className="font-bold text-sm text-text-primary">{item.title}</h4>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={varnamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 h-13 px-8 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-base shadow-[0_4px_16px_rgba(234,88,12,0.25)] hover:shadow-[0_8px_24px_rgba(234,88,12,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Visit VARNAM Platform</span>
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </a>

              <Link
                href="/varnam"
                className="group glass-btn-secondary text-base h-13 py-0 px-7 flex items-center justify-center"
              >
                <span>Live Preview via /varnam</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 shrink-0" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Interactive Logo Card linking to varnam */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <a
              href={varnamUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit VARNAM Bridal Software"
              className="group block relative rounded-3xl p-6 sm:p-8 bg-white border border-border-subtle shadow-md hover:shadow-xl hover:border-orange-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle Ambient Shimmer inside card */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/15 transition-all duration-500" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/15 transition-all duration-500" />

              {/* Status Header Badge on Card */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                  Cloud Platform v1.0
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 group-hover:translate-x-1 transition-transform">
                  Launch App
                  <ArrowUpRight size={14} />
                </span>
              </div>

              {/* Logo Presentation Container */}
              <div className="relative aspect-square w-full max-w-[380px] mx-auto rounded-2xl bg-white flex items-center justify-center p-6 border border-border-light shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="/varnam-logo.jpg"
                  alt="VARNAM Bridal Software Logo"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain rounded-xl"
                  priority
                />
              </div>

              {/* Footer detail inside card */}
              <div className="mt-6 pt-5 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted relative z-10">
                <span className="font-medium text-stone-600">varnam.vexatech.in</span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Live System
                </span>
              </div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

