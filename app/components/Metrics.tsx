"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: "05+", label: "Completed Client Projects", code: "SYS // 01" },
  { value: "100%", label: "Client Satisfaction", code: "SYS // 02" },
  { value: "05+", label: "Business Partners", code: "SYS // 03" },
  { value: "24/7", label: "Dedicated Support", code: "SYS // 04" },
];

export default function Metrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.from(cardsRef.current, {
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-24 bg-bg-base text-text-primary relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <div 
              key={idx} 
              ref={el => { cardsRef.current[idx] = el; }}
              className="p-8 rounded-3xl bg-white border border-border-subtle flex flex-col items-center justify-center text-center group hover:border-brand-accent/20 hover:shadow-md transition-all duration-300 shadow-sm"
            >
              <span className="text-[10px] font-mono text-text-muted/65 tracking-wider mb-2">
                {metric.code}
              </span>
              <h3 className="text-4xl md:text-5xl font-black text-text-primary mb-2 group-hover:text-brand-accent transition-colors duration-300">
                {metric.value}
              </h3>
              <p className="text-text-muted text-xs md:text-sm font-semibold tracking-wider uppercase">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
