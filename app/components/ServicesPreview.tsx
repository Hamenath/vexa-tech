"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Code2, Layers, TrendingUp } from "lucide-react";

const previewServices = [
  {
    title: "Web Development",
    slug: "web-development",
    icon: Code2,
    desc: "High-performance, SEO-optimized digital ecosystems.",
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.2)",
  },
  {
    title: "UI / UX Design",
    slug: "ui-ux-design",
    icon: Layers,
    desc: "Refined digital experiences balancing elegance and function.",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.2)",
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    icon: TrendingUp,
    desc: "Data-driven strategies designed to scale your reach.",
    color: "#10b981",
    glow: "rgba(16,185,129,0.2)",
  },
];

export default function ServicesPreview() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-tag mb-8">Our Expertise</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] leading-tight tracking-tight mb-8">
              Solutions <span className="text-[#0071e3]">designed</span> for growth
            </h2>
            <p className="text-[#6e6e73] text-xl font-light leading-relaxed max-w-xl">
              From web architecture to brand strategy, we provide the engineering excellence 
              needed for modern digital dominance.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {previewServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="block group h-full"
                >
                  <motion.div 
                    whileHover={{ scale: 1.01, y: -4 }}
                    className="p-8 h-full rounded-3xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-slate-200 group-hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-500">
                      <Icon size={24} className="text-[#0071e3]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 group-hover:text-[#0071e3] transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-[#6e6e73] text-sm font-light leading-relaxed mb-6">
                      {service.desc}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0071e3] opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-base transition-all duration-300"
          >
            Explore All Services
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
