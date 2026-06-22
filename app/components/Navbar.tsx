"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "../lib/utils";

const navLinks = [
  { name: "Home",     href: "/" },
  { name: "About",    href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Team",     href: "/team" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const smoothScroll = useSpring(scrollY, { stiffness: 120, damping: 20, mass: 0.2 });
  const range = [0, 180];

  const width         = useTransform(smoothScroll, range, ["96%", "72%"]);
  const paddingY      = useTransform(smoothScroll, range, [16, 10]);
  const paddingX      = useTransform(smoothScroll, range, [28, 18]);
  const radius        = useTransform(smoothScroll, range, [20, 999]);
  const top           = useTransform(smoothScroll, range, [20, 10]);
  const logoScale     = useTransform(smoothScroll, range, [1, 0.9]);
  const bgOpacity     = useTransform(smoothScroll, range, [0.5, 0.85]);
  const borderOpacity = useTransform(smoothScroll, range, [0.1, 0.25]);

  return (
    <>
      <motion.nav
        style={{
          width,
          paddingTop: paddingY,
          paddingBottom: paddingY,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          borderRadius: radius,
          top,
        }}
        className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between"
      >
        {/* Glass background */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 rounded-[inherit] bg-white/80 backdrop-blur-xl pointer-events-none shadow-sm"
        />
        {/* Subtle border */}
        <motion.div
          style={{ opacity: borderOpacity }}
          className="absolute inset-0 rounded-[inherit] border border-black/5 pointer-events-none"
        />
        {/* Inner top highlight */}
        <div className="absolute inset-x-0 top-0 h-px rounded-t-[inherit] bg-linear-to-r from-transparent via-black/5 to-transparent pointer-events-none" />

        {/* ── LOGO ── */}
        <Link href="/" className="relative z-10 flex items-center gap-3 group shrink-0">
          <motion.div
            style={{ scale: logoScale }}
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center transition-transform duration-500 ease-out group-hover:rotate-6"
          >
            <Image
              src="/vexatechlogo.svg"
              alt="VEXA TECH"
              width={36}
              height={36}
              className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]"
            />
          </motion.div>
          <span className="font-bold tracking-tight text-[#1d1d1f] text-sm md:text-base group-hover:text-brand-accent transition-colors duration-300">
            VEXA TECH
          </span>
        </Link>

        {/* ── DESKTOP MENU ── */}
        <div className="relative z-10 hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-[13px] font-semibold transition-all duration-300 rounded-full group",
                  isActive ? "text-[#1d1d1f]" : "text-[#6e6e73] hover:text-[#1d1d1f]"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full z-0 bg-black/5 border border-black/5"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/contact"
            className={cn(
              "hidden md:flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-[13px] transition-all duration-300",
              pathname === "/contact"
                ? "bg-[#1d1d1f] text-white"
                : "bg-[#0071e3] text-white hover:bg-[#0077ed]"
            )}
          >
            Contact <ArrowRight size={11} />
          </Link>

          <button
            className="md:hidden p-2 text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/5 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xl md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 right-0 top-0 h-[65vh] bg-[#0d0d14]/95 backdrop-blur-2xl z-70 rounded-b-[3rem] p-12 flex flex-col md:hidden border-b border-violet-500/20 shadow-2xl"
            >
              {/* Top glow line */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-violet-500/50 to-transparent rounded-b-full pointer-events-none" />

              <div className="flex items-center justify-between mb-16">
                <span className="text-white font-black tracking-widest text-lg uppercase">VEXA TECH</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/60 bg-white/5 border border-white/10 p-3 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "text-5xl font-black tracking-tighter transition-colors block",
                        pathname === link.href
                          ? "text-gradient-primary"
                          : "text-white/20 hover:text-white/70"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-black uppercase text-xs tracking-[0.2em] transition-all shadow-[0_4px_20px_rgba(124,58,237,0.4)]"
                >
                  Contact <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
