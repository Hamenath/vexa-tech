"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, ChevronRight } from "lucide-react";
import { cn, getGmailLink } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  support: [
    { name: "Privacy Policy",   href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Support Center",   href: "/support" },
  ],
};

const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@vexatech-p2f",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    hoverBg: "hover:bg-red-600",
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/TechVexa98498",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
      </svg>
    ),
    hoverBg: "hover:bg-white hover:text-black",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/vexa_tech001",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    hoverBg: "hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-600",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vexa-tech-8a82bb3a6/",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    hoverBg: "hover:bg-[#0077b5]",
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef   = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          y: 60, opacity: 0, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 95%" },
        });
      }
      if (linksRef.current) {
        gsap.from(linksRef.current.querySelectorAll(".footer-col"), {
          y: 40, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: linksRef.current, start: "top 92%" },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#fbfbfd] pt-24 pb-12 overflow-hidden border-t border-black/5"
    >
      {/* Background decoration */}
      <div className="absolute bottom-[10%] -left-[10%] w-[800px] h-[800px] bg-blue-50/50 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[10%] -right-[10%] w-[600px] h-[600px] bg-slate-50/50 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* ── TOP CTA ── */}
        <div ref={ctaRef} className="mb-24 lg:mb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center border-b border-black/5 pb-20">
            <div>
              <p className="text-[#0071e3] font-bold uppercase tracking-wider text-[11px] mb-6">
                Ready to transform?
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#1d1d1f] leading-[1.1] tracking-tight mb-8">
                Let&apos;s build <span className="text-[#0071e3]">what&apos;s next.</span>
              </h2>
              <p className="text-[#6e6e73] text-xl font-light leading-relaxed max-w-lg">
                Your vision, our architecture. Together, we create digital ecosystems
                that define industries.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-5 lg:justify-end">
              <Link
                href="/contact"
                className="group glass-btn-primary shadow-lg shadow-blue-500/10"
              >
                Get Started
                <ArrowUpRight
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  size={18}
                />
              </Link>
              <Link
                href={getGmailLink("vexatech.connect@gmail.com", "Project Inquiry")}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-btn-secondary"
              >
                <Mail size={18} />
                Send Inquiry
              </Link>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div ref={linksRef} className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-24">

          {/* Brand */}
          <div className="footer-col md:col-span-12 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-4 group mb-8">
              <div className="w-11 h-11 flex items-center justify-center bg-white border border-slate-100 rounded-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-105 group-hover:border-[#0071e3]/30 group-hover:shadow-lg">
                <Image
                  src="/vexatechlogo.svg"
                  alt="VEXA TECH"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain opacity-80"
                />
              </div>
              <span className="text-xl font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors">
                VEXA TECH
              </span>
            </Link>
            <p className="text-[#6e6e73] text-[15px] leading-relaxed font-light mb-10 max-w-xs">
              VEXA TECH builds refined digital experiences through modern design,
              scalable development, and growth-focused execution.
            </p>

            {/* Socials */}
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Follow Us
              </span>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="w-10 h-10 rounded-xl glass-surface-subtle text-slate-500 flex items-center justify-center transition-all duration-300 hover:border-[#0071e3] hover:text-[#0071e3] hover:shadow-md hover:-translate-y-0.5"
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Company links */}
          <div className="footer-col md:col-span-6 lg:col-span-3 lg:col-start-6">
            <h4 className="text-slate-400 font-bold mb-8 uppercase text-[11px] tracking-wider">Company</h4>
            <ul className="space-y-4">
              {[
                { name: "About Us",       href: "/about" },
                { name: "Our Process",    href: "/#process" }, // Keeping process as hash if it stays on home
                { name: "The Advantage",  href: "/#why-us" },  // Keeping why-us as hash if it stays on home
                { name: "Meet the Team",  href: "/team" },
                { name: "Contact",        href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-[#6e6e73] hover:text-[#0071e3] transition-colors duration-300 text-[15px]"
                  >
                    <ChevronRight
                      className="w-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:mr-2 text-[#0071e3] shrink-0"
                      size={14}
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div className="footer-col md:col-span-6 lg:col-span-3">
            <h4 className="text-slate-400 font-bold mb-8 uppercase text-[11px] tracking-wider">Services</h4>
            <ul className="space-y-4">
              {[
                { name: "Web Development",  href: "/services/web-development" },
                { name: "UI / UX Design",   href: "/services/ui-ux-design" },
                { name: "Digital Marketing",href: "/services/digital-marketing" },
                { name: "Business Analysis",href: "/services/business-analysis" },
                { name: "Graphic Design",   href: "/services/graphic-design" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-[#6e6e73] hover:text-[#0071e3] transition-colors duration-300 text-[15px]"
                  >
                    <ChevronRight
                      className="w-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:mr-2 text-[#0071e3] shrink-0"
                      size={14}
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
            <p className="text-slate-400 text-[13px]">
              © {new Date().getFullYear()} VEXA TECH. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.support.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 hover:text-[#1d1d1f] transition-colors text-[13px]"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
