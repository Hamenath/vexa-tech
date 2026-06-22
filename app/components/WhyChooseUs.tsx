"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Sparkles, TrendingUp, BarChart2, Users, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Strategic Approach",
    desc: "We align every project with your brand goals, audience needs, and growth vision.",
  },
  {
    icon: Sparkles,
    title: "Premium Design",
    desc: "We craft clean, modern, and intuitive experiences that build trust and engagement.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Development",
    desc: "Our digital solutions are built for performance, flexibility, and long-term growth.",
  },
  {
    icon: BarChart2,
    title: "Business Impact",
    desc: "Every design and development decision is made to support real business results.",
  },
  {
    icon: Users,
    title: "Strong Collaboration",
    desc: "We work with clarity, consistency, and partnership throughout the project journey.",
  },
  {
    icon: CheckCircle,
    title: "Quality Execution",
    desc: "We focus on polished details, modern standards, and high-value digital experiences.",
  },
];

export default function WhyChooseUs() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="relative py-32 md:py-40 bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-tag mb-8">Why Vexa Tech</div>
            <h2 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] leading-[1.1] tracking-tight mb-8">
              The VEXA TECH <span className="text-[#0071e3]">Advantage</span>
            </h2>
            <p className="text-[#6e6e73] text-xl font-light leading-relaxed">
              Six pillars that define our commitment to elite digital engineering.
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
                className="group relative p-10 rounded-[32px] border border-black/5 bg-white hover:border-black/10 transition-all duration-400 overflow-hidden shadow-sm hover:shadow-xl"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8 bg-slate-50 border border-slate-100 transition-all duration-500 group-hover:bg-blue-50 group-hover:border-blue-100"
                >
                  <Icon
                    size={22}
                    className="text-[#0071e3]"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold text-[#1d1d1f] mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[#6e6e73] text-base leading-relaxed font-light">
                  {feature.desc}
                </p>

                {/* Accent line */}
                <div
                  className="absolute bottom-8 left-10 w-6 h-[2px] bg-[#0071e3]/30 group-hover:w-12 group-hover:bg-[#0071e3] transition-all duration-500 rounded-full"
                />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
