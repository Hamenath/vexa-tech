"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Discover",
    desc: "We dive deep into your brand, target audience, and market positioning to uncover core opportunities.",
    color: "#0071e3",
  },
  {
    id: "02",
    title: "Strategize",
    desc: "Architecting a precise, scalable roadmap aligned with your business objectives and digital vision.",
    color: "#0071e3",
  },
  {
    id: "03",
    title: "Design",
    desc: "Crafting immersive, premium UI/UX that captures attention and elegantly communicates value.",
    color: "#0071e3",
  },
  {
    id: "04",
    title: "Develop",
    desc: "Building the foundation using modern frameworks with flawless performance and scalability.",
    color: "#0071e3",
  },
  {
    id: "05",
    title: "Grow",
    desc: "Driving exponential growth through continuous optimization and data-driven refinement.",
    color: "#0071e3",
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
      className="relative flex items-center w-full mb-20 md:mb-32"
    >
      {/* Left side (even: card / odd: empty) */}
      <div className="w-full md:w-1/2 md:pr-16">
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

      {/* Center node */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="relative"
        >
          <div
            className="w-5 h-5 rounded-full border-4 border-white z-20 relative bg-[#0071e3] shadow-lg shadow-blue-500/20"
          />
        </motion.div>
      </div>

      {/* Right side (odd: card / even: empty) */}
      <div className="w-full md:w-1/2 md:pl-16">
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
        className="md:hidden w-full"
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
  return (
    <div
      className={`group relative p-10 rounded-[32px] border border-black/5 bg-white hover:border-black/10 transition-all duration-500 shadow-sm hover:shadow-xl ${isMobile ? "block" : "hidden md:block"}`}
    >
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0071e3] text-white font-bold text-sm mb-6 shadow-lg shadow-blue-500/20"
      >
        {step.id}
      </div>

      <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4 tracking-tight">
        {step.title}
      </h3>
      <p className="text-[#6e6e73] text-base leading-relaxed font-light">
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
      className="relative py-32 md:py-48 bg-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-slate-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-24 md:mb-40">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-tag mb-8 mx-auto w-fit">Execution Strategy</div>
            <h2 className="text-4xl md:text-7xl font-bold text-[#1d1d1f] leading-tight tracking-tight mb-8">
              How we <span className="text-[#0071e3]">architect</span> success
            </h2>
            <p className="text-[#6e6e73] text-xl font-light max-w-2xl mx-auto leading-relaxed">
              A refined blueprint for digital dominance, engineered through intentional 
              strategy and meticulous execution.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">

          {/* Animated SVG path — desktop only */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block -translate-x-1/2 overflow-visible pointer-events-none">
            <svg
              width="2"
              height="100%"
              className="absolute inset-0 h-full"
            >
              <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />
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

          {/* Mobile track */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-100 md:hidden" />

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
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mb-8">
            Ready to start the journey?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-lg transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            Start Your Project
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
