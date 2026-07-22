"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupWrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(mockupWrapperRef.current, { perspective: 1500 });
    gsap.set(frameRef.current, { rotationX: 15, rotationY: -10, scale: 0.7, z: -500 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1.5,
        pin: true,
      }
    });

    tl.to(frameRef.current, {
      rotationX: 0,
      rotationY: 0,
      z: 0,
      scale: 1,
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      borderWidth: 0,
      ease: "power2.inOut",
    })
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen w-full relative bg-bg-base text-text-primary overflow-hidden hidden md:flex items-center justify-center border-t border-border-subtle">
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[80vw] h-[80vw] max-w-250 max-h-250 bg-brand-accent/3 rounded-full blur-[160px]" />
      </div>

      {/* 3D Mockup Wrapper */}
      <div ref={mockupWrapperRef} className="relative z-10 w-full h-full flex items-center justify-center transform-style-3d">
        <div 
          ref={frameRef}
          className="relative w-[75vw] h-[65vh] max-w-7xl rounded-[2.5rem] overflow-hidden bg-white border border-border-subtle shadow-md flex flex-col transform-origin-center will-change-transform"
        >
          {/* Mockup Top Navigation Bar */}
          <div className="h-11 border-b border-black/5 bg-white/80 backdrop-blur-md flex items-center px-6 gap-2 shrink-0">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <div className="mx-auto w-1/3 max-w-75 h-5 rounded-md bg-black/2 border border-black/5" />
          </div>
          
          {/* Mockup Screen Content */}
          <div className="flex-1 relative bg-bg-base overflow-hidden flex items-center justify-center">
            
            {/* Grid Base */}
            <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none" />
            
            <div 
              ref={contentRef}
              className="relative z-10 text-center opacity-0 translate-y-16 blur-[20px]"
            >
              <div className="system-tag mb-6 mx-auto bg-white/50 backdrop-blur shadow-sm">
                <span className="status-dot" />
                SYS // HIGH PERFORMANCE ECOSYSTEM
              </div>
              <h3 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-text-primary uppercase">
                Crafting <br />
                <span className="text-gradient-blue">Excellence</span>
              </h3>
              <p className="text-text-muted text-lg md:text-2xl max-w-2xl mx-auto font-normal tracking-wide">
                A definitive look at high-performance digital engineering. Experience what’s next in technology.
              </p>
            </div>

            {/* Glowing Core Inside Mockup */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[80vw] max-w-200 h-[80vw] max-h-200 bg-brand-accent/4 blur-[140px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
      
    </section>
  );
}
