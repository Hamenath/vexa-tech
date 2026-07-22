"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, ChevronRight } from "lucide-react";
import { getGmailLink } from "../lib/utils";

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
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/TechVexa98498",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
      </svg>
    ),
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
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vexa-tech-8a82bb3a6/",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
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
          y: 50, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 95%" },
        });
      }
      if (linksRef.current) {
        gsap.from(linksRef.current.querySelectorAll(".footer-col"), {
          y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: linksRef.current, start: "top 92%" },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-bg-base text-text-primary pt-24 pb-12 overflow-hidden border-t border-border-subtle"
    >
      {/* Subtle light ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-linear-to-t from-brand-accent/5 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* Large watermark background */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-[14vw] font-black text-black/1.5 tracking-tighter uppercase select-none pointer-events-none z-0 text-center w-full">
        VEXA TECH
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* ── TOP CTA ── */}
        <div ref={ctaRef} className="mb-20 lg:mb-28">
          <div className="bg-bg-surface border border-border-subtle rounded-4xl p-8 md:p-14 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-sm">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-accent/5 rounded-full blur-[90px] pointer-events-none" />
            <div className="max-w-2xl relative z-10">
              <div className="system-tag mb-4">
                <span className="status-dot" />
                SYS // READY FOR DEPLOYMENT
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary leading-tight tracking-tight mb-4">
                Let&apos;s build <span className="text-brand-accent">what&apos;s next.</span>
              </h2>
              <p className="text-text-muted text-base md:text-lg font-normal leading-relaxed">
                Your vision, our enterprise architecture. Together, we engineer digital ecosystems that dominate markets.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 relative z-10 w-full sm:w-auto">
              <Link
                href="/contact"
                className="group glass-btn-primary w-full sm:w-auto justify-center"
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
                className="group glass-btn-secondary w-full sm:w-auto justify-center"
              >
                <Mail size={18} className="text-text-primary" />
                Send Inquiry
              </Link>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div ref={linksRef} className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20 relative z-10">

          {/* Brand */}
          <div className="footer-col md:col-span-12 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3.5 group mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-black/5 border border-black/5 rounded-xl transition-all duration-300 group-hover:border-brand-accent">
                <Image
                  src="/vexatechlogo.svg"
                  alt="VEXA TECH"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
              </div>
              <span className="text-xl font-extrabold text-text-primary tracking-tight group-hover:text-brand-accent transition-colors">
                VEXA TECH
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-8 max-w-xs font-normal">
              VEXA TECH architects high-performance digital experiences combining immersive design, enterprise engineering, and rapid scalability.
            </p>

            {/* Socials */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted opacity-60">
                Connect // Global
              </span>
              <div className="flex gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="w-10 h-10 rounded-xl bg-black/5 border border-black/5 text-text-muted flex items-center justify-center transition-all duration-300 hover:border-brand-accent hover:text-white hover:bg-brand-accent hover:-translate-y-1"
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
            <h4 className="text-text-muted opacity-60 font-bold mb-6 uppercase text-[11px] tracking-wider">Company</h4>
            <ul className="space-y-3.5">
              {[
                { name: "About Us",       href: "/about" },
                { name: "Our Process",    href: "/#process" },
                { name: "Recent Projects",href: "/#projects" },
                { name: "Meet the Team",  href: "/team" },
                { name: "Careers",        href: "/careers" },
                { name: "Contact",        href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-text-muted hover:text-brand-accent transition-colors duration-300 text-sm font-medium"
                  >
                    <ChevronRight
                      className="w-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:mr-1.5 text-brand-accent shrink-0"
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
            <h4 className="text-text-muted opacity-60 font-bold mb-6 uppercase text-[11px] tracking-wider">Services</h4>
            <ul className="space-y-3.5">
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
                    className="group flex items-center text-text-muted hover:text-brand-accent transition-colors duration-300 text-sm font-medium"
                  >
                    <ChevronRight
                      className="w-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:mr-1.5 text-brand-accent shrink-0"
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
        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-text-muted opacity-60 text-xs">
            © {new Date().getFullYear()} VEXA TECH. All rights reserved. Enterprise Redesign Edition.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.support.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-text-muted opacity-60 hover:text-text-primary transition-colors text-xs"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
