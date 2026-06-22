"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Layers,
  TrendingUp,
  BarChart3,
  Palette,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Development",
    slug: "web-development",
    tag: "01",
    description:
      "We build high-performance, SEO-optimized digital ecosystems that turn visitors into loyal customers. Scalable, secure, and lightning fast.",
    icon: Code2,
    gradient: "from-violet-500 to-blue-500",
    glow: "rgba(124,58,237,0.4)",
    accent: "#7c3aed",
  },
  {
    title: "UI / UX Design",
    slug: "ui-ux-design",
    tag: "02",
    description:
      "Refined digital experiences that balance aesthetic elegance with intuitive functionality. We design for clarity, trust, and impact.",
    icon: Layers,
    gradient: "from-blue-500 to-cyan-400",
    glow: "rgba(59,130,246,0.4)",
    accent: "#3b82f6",
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    tag: "03",
    description:
      "Data-driven strategies designed to scale your reach and maximize ROI. We focus on growth that actually moves the needle.",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.4)",
    accent: "#10b981",
  },
  {
    title: "Business Analysis",
    slug: "business-analysis",
    tag: "04",
    description:
      "Deep-dive diagnostics of your business workflows. We identify bottlenecks and architect digital roadmaps for long-term growth.",
    icon: BarChart3,
    gradient: "from-amber-500 to-orange-400",
    glow: "rgba(245,158,11,0.4)",
    accent: "#f59e0b",
  },
  {
    title: "Graphic Design",
    slug: "graphic-design",
    tag: "05",
    description:
      "Premium visual identities that command attention. From motion graphics to full brand identity, we craft visual authority.",
    icon: Palette,
    gradient: "from-pink-500 to-rose-400",
    glow: "rgba(236,72,153,0.4)",
    accent: "#ec4899",
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link
        href={`/services/${service.slug}`}
        className="block relative flex flex-col p-10 rounded-[32px] border border-black/5 bg-white hover:border-black/10 transition-all duration-500 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl"
      >
        <motion.div
          whileHover={{
            y: -4,
            scale: 1.01,
          }}
          className="w-full h-full"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 border border-slate-100 transition-all duration-500 group-hover:bg-blue-50 group-hover:border-blue-100"
            >
              <Icon size={24} className="text-[#0071e3]" strokeWidth={1.5} />
            </div>
            <span className="text-[11px] font-bold tracking-wider text-slate-300 group-hover:text-[#0071e3]/40 transition-colors">
              {service.tag}
            </span>
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4 tracking-tight">
            {service.title}
          </h3>
          <p className="text-[15px] text-[#6e6e73] leading-relaxed flex-1 font-light mb-8">
            {service.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {["Scalable", "Modern", "Premium"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-100"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0071e3] transition-all duration-300"
          >
            Learn more
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="relative py-32 md:py-40 bg-[#f5f5f7] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-tag mb-8">Our Services</div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#1d1d1f] leading-[1.1] tracking-tight mb-8">
              Solutions <span className="text-[#0071e3]">designed</span> for growth
            </h2>
            <p className="text-[#6e6e73] text-xl font-light leading-relaxed max-w-xl">
              Multidisciplinary expertise transformed into refined digital execution
              for modern brands.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="sm:col-span-2 lg:col-span-2 relative flex flex-col items-center justify-center p-16 rounded-[40px] overflow-hidden text-center bg-white border border-slate-100 shadow-sm"
          >
            <div className="relative z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Ready to start?</p>
              <h3 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-8">
                Let&apos;s build something <span className="text-[#0071e3]">extraordinary.</span>
              </h3>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-10 py-5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-base transition-all duration-300"
              >
                Start a Project <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
