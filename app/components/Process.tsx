"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    id: "01",
    sysCode: "PHASE // 01",
    title: "Discover",
    desc: "We analyze your enterprise model, target demographics, and competitive landscape to pinpoint core digital leverage.",
  },
  {
    id: "02",
    sysCode: "PHASE // 02",
    title: "Strategize",
    desc: "Architecting a high-precision, scalable technical roadmap aligned with long-term business goals and growth targets.",
  },
  {
    id: "03",
    sysCode: "PHASE // 03",
    title: "Design",
    desc: "Crafting immersive, high-end editorial UI/UX that commands attention and communicates brand authority.",
  },
  {
    id: "04",
    sysCode: "PHASE // 04",
    title: "Develop",
    desc: "Engineering the foundation with modern Next.js App Router, TypeScript, and high-performance animation engines.",
  },
  {
    id: "05",
    sysCode: "PHASE // 05",
    title: "Scale & Grow",
    desc: "Deploying and scaling your application through data-driven performance tuning and continuous feature delivery.",
  },
];

function TimelineCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative flex items-center w-full mb-16 md:mb-28"
    >
      {/* Left side */}
      <div className="hidden md:block w-full md:w-1/2 md:pr-14">
        {isEven && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <StepCard step={step} />
          </motion.div>
        )}
      </div>

      {/* Center glowing node */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="relative"
        >
          <div className="w-5 h-5 rounded-full border-2 border-white z-20 relative bg-brand-accent shadow-sm" />
        </motion.div>
      </div>

      {/* Right side */}
      <div className="hidden md:block w-full md:w-1/2 md:pl-14">
        {!isEven && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <StepCard step={step} />
          </motion.div>
        )}
      </div>

      {/* Mobile card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="md:hidden w-full pl-10"
      >
        <StepCard step={step} isMobile />
      </motion.div>
    </div>
  );
}

function StepCard({
  step,
  isMobile,
}: {
  step: (typeof steps)[0];
  isMobile?: boolean;
}) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group glass-card-interactive p-8 rounded-3xl bg-white border border-border-subtle hover:border-brand-accent/20 hover:shadow-md transition-all duration-500 ${isMobile ? "block" : "hidden md:block"}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-brand-accent text-white font-bold text-sm shadow-sm border border-brand-accent/25">
          {step.id}
        </div>
        <span className="text-[10px] font-mono text-text-muted/65 tracking-wider">
          {step.sysCode}
        </span>
      </div>

      <h3 className="text-2xl font-black text-text-primary mb-3 tracking-tight group-hover:text-brand-accent transition-colors">
        {step.title}
      </h3>
      <p className="text-text-muted text-base leading-relaxed font-normal">
        {step.desc}
      </p>
    </div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-32 md:py-44 bg-bg-base text-text-primary border-t border-border-subtle overflow-hidden"
    >
      {/* Light Ambient background */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-200 h-150 bg-brand-accent/3 rounded-full blur-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="system-tag mb-8 mx-auto w-fit bg-white/50 backdrop-blur shadow-sm">
              <span className="status-dot" />
              SYS // EXECUTION BLUEPRINT
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-text-primary leading-tight tracking-tight mb-8">
              How we <span className="text-gradient-blue">architect</span> success
            </h2>
            <p className="text-text-muted text-xl font-normal max-w-2xl mx-auto leading-relaxed">
              A refined blueprint for enterprise digital dominance, engineered through strategic methodology and continuous execution.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Animated SVG path — desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block -translate-x-1/2 overflow-visible pointer-events-none">
            <svg
              width="2"
              height="100%"
              className="absolute inset-0 h-full"
            >
              <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(0,0,0,0.06)" strokeWidth="2" />
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="#0071e3"
                strokeWidth="2"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {/* Mobile line track */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-black/5 md:hidden" />

          {/* Steps */}
          <div className="relative z-10">
            {steps.map((step, index) => (
              <TimelineCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-text-muted opacity-60 font-mono text-xs uppercase tracking-widest mb-8">
            Ready to initiate your build?
          </p>
          <Link
            href="/contact"
            className="group glass-btn-primary shadow-sm text-lg h-auto py-3.5"
          >
            Start Your Project
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
