"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Code2, Layers, TrendingUp } from "lucide-react";

const previewServices = [
  {
    title: "Web Development",
    slug: "web-development",
    sysCode: "SYS // 01",
    icon: Code2,
    desc: "High-performance, SEO-optimized digital ecosystems engineered for enterprise stability and rapid conversion.",
  },
  {
    title: "UI / UX Design",
    slug: "ui-ux-design",
    sysCode: "SYS // 02",
    icon: Layers,
    desc: "Refined digital interfaces balancing visual authority with intuitive user journeys and high conversion clarity.",
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    sysCode: "SYS // 03",
    icon: TrendingUp,
    desc: "Data-driven growth strategies designed to scale reach, command brand presence, and deliver measurable ROI.",
  },
];

export default function ServicesPreview() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="relative py-24 md:py-32 bg-bg-base text-text-primary border-t border-border-subtle overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-125 bg-brand-accent/3 rounded-full blur-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="system-tag mb-8 bg-white/50 backdrop-blur shadow-sm">
              <span className="status-dot" />
              SYS // CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary leading-tight tracking-tight mb-6">
              Solutions <span className="text-gradient-blue">engineered</span> for dominance
            </h2>
            <p className="text-text-muted text-[18px] font-normal leading-relaxed max-w-2xl">
              From web architecture to digital strategy, we provide the technical precision 
              needed for enterprise-grade execution.
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
                    whileHover={{ y: -4 }}
                    onMouseMove={handleMouseMove}
                    className="glass-card-interactive p-8 h-full rounded-3xl bg-white border border-border-subtle hover:border-brand-accent/20 hover:shadow-sm transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/5 flex items-center justify-center group-hover:border-brand-accent/20 group-hover:bg-brand-accent/5 transition-all duration-300">
                        <Icon size={24} className="text-text-primary group-hover:text-brand-accent transition-colors" />
                      </div>
                      <span className="text-[10px] font-mono text-text-muted/65 tracking-wider">
                        {service.sysCode}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-brand-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text-muted text-sm font-normal leading-relaxed mb-8 flex-1">
                      {service.desc}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-accent group-hover:text-brand-accent-hover transition-colors">
                      Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
            className="group glass-btn-primary shadow-sm text-base h-auto py-3.5"
          >
            Explore All Services
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
