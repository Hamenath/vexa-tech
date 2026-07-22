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
  { name: "Projects", href: "/#projects" },
  { name: "Team",     href: "/team" },
  { name: "Careers",  href: "/careers" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const smoothScroll = useSpring(scrollY, { stiffness: 120, damping: 20, mass: 0.2 });
  const range = [0, 180];

  const width         = useTransform(smoothScroll, range, ["96%", isMobile ? "94%" : "72%"]);
  const paddingY      = useTransform(smoothScroll, range, [16, 10]);
  const paddingX      = useTransform(smoothScroll, range, [isMobile ? 12 : 28, isMobile ? 12 : 18]);
  const radius        = useTransform(smoothScroll, range, [20, 999]);
  const top           = useTransform(smoothScroll, range, [20, 10]);
  const logoScale     = useTransform(smoothScroll, range, [1, 0.9]);
  const bgOpacity     = useTransform(smoothScroll, range, [0.75, 0.95]);

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
        className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between shadow-sm"
      >
        {/* White Glass background */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 rounded-[inherit] bg-white/75 backdrop-blur-2xl pointer-events-none"
        />
        {/* Subtle black/5 border */}
        <div className="absolute inset-0 rounded-[inherit] border border-black/5 pointer-events-none" />
        {/* Inner top highlight */}
        <div className="absolute inset-x-0 top-0 h-px rounded-t-[inherit] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

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
              className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(124,58,237,0.3)]"
            />
          </motion.div>
          <span className="font-bold tracking-tight text-text-primary text-[14px] md:text-[15px] group-hover:text-brand-accent transition-colors duration-300">
            VEXA TECH
          </span>
        </Link>

        {/* ── DESKTOP MENU ── */}
        <div className="relative z-10 hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-[14px] font-semibold transition-colors duration-300 rounded-full group",
                  isActive ? "text-text-primary" : "text-text-muted hover:text-text-primary"
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
        <div className="relative z-10 flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/contact"
            className={cn(
              "hidden md:inline-flex items-center justify-center gap-1 px-4 md:px-5 py-2.5 rounded-full font-bold text-[12px] md:text-[13px] transition-all duration-300 group whitespace-nowrap",
              pathname === "/contact"
                ? "bg-brand-accent text-white shadow-md shadow-blue-500/15 scale-102"
                : "glass-btn-primary h-auto"
            )}
          >
            Contact <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            className="md:hidden p-2 text-text-muted hover:text-text-primary hover:bg-black/5 rounded-full transition-colors flex items-center justify-center focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={20} className="shrink-0" /> : <Menu size={20} className="shrink-0" />}
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
              className="fixed inset-0 z-60 bg-black/10 backdrop-blur-md md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 right-0 top-0 max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-3xl z-70 rounded-b-[2.5rem] p-8 flex flex-col md:hidden border-b border-black/5 shadow-xl text-text-primary"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-text-primary font-bold tracking-tight text-lg uppercase">VEXA TECH</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-primary bg-black/5 border border-black/5 p-2.5 rounded-full hover:bg-black/10 transition-colors flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X size={20} className="shrink-0" />
                </button>
              </div>

              <nav className="flex flex-col gap-5 mb-8">
                {navLinks.map((link, i) => {
                  const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
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
                          "text-3xl font-extrabold tracking-tight transition-colors block",
                          isActive
                            ? "text-brand-accent"
                            : "text-text-muted hover:text-text-primary"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group glass-btn-primary w-full py-4 rounded-full font-bold uppercase text-[12px] tracking-wider justify-center h-auto"
                >
                  Contact <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
