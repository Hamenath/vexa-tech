"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Layers,
  TrendingUp,
  BarChart3,
  Palette,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Web Development",
    slug: "web-development",
    sysCode: "SYS // 01",
    description:
      "We build high-performance, SEO-optimized digital ecosystems that turn visitors into loyal enterprise customers. Scalable, secure, and lightning fast.",
    icon: Code2,
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "UI / UX Design",
    slug: "ui-ux-design",
    sysCode: "SYS // 02",
    description:
      "Refined digital experiences that balance aesthetic elegance with intuitive functionality. We design for clarity, trust, and brand authority.",
    icon: Layers,
    tags: ["Figma Design", "Micro-Interactions", "Prototyping"],
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    sysCode: "SYS // 03",
    description:
      "Data-driven strategies designed to scale your reach and maximize ROI. We focus on growth models that move key business metrics.",
    icon: TrendingUp,
    tags: ["SEO Optimization", "Conversion Funnels", "Analytics"],
  },
  {
    title: "Business Analysis",
    slug: "business-analysis",
    sysCode: "SYS // 04",
    description:
      "Deep-dive diagnostics of your business workflows. We identify bottlenecks and architect digital roadmaps for long-term scalability.",
    icon: BarChart3,
    tags: ["Workflow Mapping", "Tech Diagnostics", "Strategy"],
  },
  {
    title: "Graphic Design",
    slug: "graphic-design",
    sysCode: "SYS // 05",
    description:
      "Premium visual identities that command attention. From motion assets to full visual systems, we craft unmatched brand presence.",
    icon: Palette,
    tags: ["Brand Systems", "Motion Assets", "Visual Design"],
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full"
    >
      <Link
        href={`/services/${service.slug}`}
        onMouseMove={handleMouseMove}
        className="glass-card-interactive block relative flex flex-col p-8 lg:p-10 rounded-3xl bg-white border border-border-subtle hover:border-brand-accent/20 hover:shadow-md transition-all duration-500 cursor-pointer h-full"
      >
        <div className="flex items-start justify-between mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-black/5 border border-black/5 group-hover:border-brand-accent/20 group-hover:bg-brand-accent/5 transition-all duration-500">
            <Icon size={26} className="text-text-primary group-hover:text-brand-accent transition-colors" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-mono text-text-muted/65 tracking-wider">
            {service.sysCode}
          </span>
        </div>

        <h3 className="text-2xl font-black text-text-primary mb-4 tracking-tight group-hover:text-brand-accent transition-colors">
          {service.title}
        </h3>
        <p className="text-base text-text-muted leading-relaxed flex-1 font-normal mb-8">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-black/2 text-text-muted border border-black/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent group-hover:text-brand-accent-hover transition-colors">
          Explore Service
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
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
      className="relative py-32 md:py-40 bg-bg-base text-text-primary overflow-hidden border-t border-border-subtle"
    >
      {/* Radial Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-175 bg-brand-accent/3 rounded-full blur-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="system-tag mb-8 bg-white/50 backdrop-blur shadow-sm">
              <span className="status-dot" />
              SYS // SERVICES PORTFOLIO
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-text-primary leading-tight tracking-tight mb-8">
              Solutions <span className="text-gradient-blue">engineered</span> for dominance
            </h2>
            <p className="text-text-muted text-xl font-normal leading-relaxed">
              Multidisciplinary technical capabilities transformed into refined digital execution for modern enterprise leaders.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}

          {/* Custom Project Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-8 lg:p-10 rounded-3xl bg-white border border-brand-accent/20 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="system-tag mb-6 bg-brand-accent/5 border-brand-accent/10 text-brand-accent">
                SYS // CUSTOM ARCHITECTURE
              </div>
              <h3 className="text-2xl font-black text-text-primary mb-4">
                Have a specialized request?
              </h3>
              <p className="text-text-muted text-base leading-relaxed mb-8 font-normal">
                We engineer tailored digital solutions, cloud infrastructure, and custom software systems for unique enterprise requirements.
              </p>
            </div>
            <Link
              href="/contact"
              className="group glass-btn-blue text-sm w-full justify-center h-auto py-3.5"
            >
              Consult Our Engineers
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
