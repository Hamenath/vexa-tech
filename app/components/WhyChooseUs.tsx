"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Sparkles, TrendingUp, BarChart2, Users, CheckCircle } from "lucide-react";

const features = [
  {
    sysCode: "PILLAR // 01",
    icon: Sparkles,
    title: "Premium Quality",
    desc: "We design and develop immaculate, high-end digital products that establish trust and command market authority.",
  },
  {
    sysCode: "PILLAR // 02",
    icon: Target,
    title: "Business-Focused Solutions",
    desc: "Every technical and strategic decision is aligned with your business model, corporate goals, and market demands.",
  },
  {
    sysCode: "PILLAR // 03",
    icon: Users,
    title: "Long-Term Partnership",
    desc: "We operate with radical transparency, supporting your business scale, iterations, and constant evolution over time.",
  },
  {
    sysCode: "PILLAR // 04",
    icon: CheckCircle,
    title: "Modern Technologies",
    desc: "Built with the latest frameworks like Next.js 16, TypeScript, and modern tools to prevent technical debt.",
  },
  {
    sysCode: "PILLAR // 05",
    icon: TrendingUp,
    title: "Performance & Scalability",
    desc: "Engineered for lightning-fast speeds, global content delivery, robust security, and uncompromised uptime.",
  },
  {
    sysCode: "PILLAR // 06",
    icon: BarChart2,
    title: "Growth-Oriented Strategy",
    desc: "We optimize user journeys, SEO architectures, and campaign dynamics to drive clear, measurable business growth.",
  },
];

export default function WhyChooseUs() {
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
    <section id="why-us" className="relative py-32 md:py-40 bg-bg-base text-text-primary border-t border-border-subtle overflow-hidden">
      {/* Background Radial */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-225 h-150 bg-brand-accent/3 rounded-full blur-[160px] pointer-events-none" />

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
              SYS // THE ADVANTAGE
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-primary leading-tight tracking-tight mb-8">
              The VEXA TECH <span className="text-gradient-blue">Advantage</span>
            </h2>
            <p className="text-text-muted text-xl font-normal leading-relaxed">
              Six core pillars defining our relentless commitment to enterprise engineering excellence.
            </p>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                onMouseMove={handleMouseMove}
                className="group glass-card-interactive p-8 lg:p-10 rounded-3xl bg-white border border-border-subtle hover:border-brand-accent/20 hover:shadow-md transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-black/5 border border-black/5 group-hover:border-brand-accent/20 group-hover:bg-brand-accent/5 transition-all duration-500">
                      <Icon size={22} className="text-text-primary group-hover:text-brand-accent transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-mono text-text-muted/65 tracking-wider">
                      {feature.sysCode}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-4 tracking-tight group-hover:text-brand-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted text-base leading-relaxed font-normal mb-8">
                    {feature.desc}
                  </p>
                </div>

                <div className="w-8 h-0.5 bg-brand-accent/20 group-hover:w-16 group-hover:bg-brand-accent transition-all duration-500 rounded-full" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
