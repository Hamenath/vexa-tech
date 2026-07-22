"use client";

import { useState, useEffect, useRef } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { cn, getGmailLink } from "../lib/utils";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import confetti from "canvas-confetti";
import { motion, AnimatePresence, useInView } from "framer-motion";

const inputBase =
  "w-full bg-white border border-border-subtle rounded-2xl px-4 py-3.5 text-sm text-text-primary placeholder-text-muted/40 transition-all duration-200 focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/5";

const labelBase =
  "block text-xs font-bold uppercase tracking-wider text-text-primary/80 mb-2";

const socials = [
  {
    label: "Email",
    value: "vexatech.connect@gmail.com",
    href: getGmailLink("vexatech.connect@gmail.com", "Project Inquiry"),
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "vexa-tech",
    href: "https://www.linkedin.com/in/vexa-tech-8a82bb3a6/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@vexa_tech001",
    href: "https://www.instagram.com/vexa_tech001",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    value: "@TechVexa98498",
    href: "https://x.com/TechVexa98498",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
      </svg>
    ),
  },
];

const countryCodes = [
  { name: "India",     code: "+91",  flag: "🇮🇳" },
  { name: "USA",       code: "+1",   flag: "🇺🇸" },
  { name: "UK",        code: "+44",  flag: "🇬🇧" },
  { name: "UAE",       code: "+971", flag: "🇦🇪" },
  { name: "Canada",    code: "+1",   flag: "🇨🇦" },
  { name: "Australia", code: "+61",  flag: "🇦🇺" },
  { name: "Germany",   code: "+49",  flag: "🇩🇪" },
  { name: "France",    code: "+33",  flag: "🇫🇷" },
  { name: "Singapore", code: "+65",  flag: "🇸🇬" },
  { name: "Japan",     code: "+81",  flag: "🇯🇵" },
];

type SubmissionStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  });

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    serviceRequired: "",
    projectBudget: "",
    message: "",
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  const set =
    (f: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setToast({ show: false, message: "", type: "success" });

    try {
      await addDoc(collection(db, "leads"), {
        ...form,
        fullPhone: `${form.countryCode} ${form.phone}`,
        status: "new",
        source: "website_contact_form",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, phone: `${form.countryCode} ${form.phone}` }),
      }).catch((err) => console.error("Notification trigger failed:", err));

      setStatus("success");
      setToast({ show: true, message: "Inquiry received! We'll contact you shortly.", type: "success" });
      setTimeout(() => setToast((p) => ({ ...p, show: false })), 5000);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      console.error("Submission error:", error);
      setStatus("error");
      setToast({ show: true, message: errMsg, type: "error" });
      setTimeout(() => setToast((p) => ({ ...p, show: false })), 5000);
    }
  };

  useEffect(() => {
    if (status === "success") {
      const colors = ["#0071e3", "#38bdf8", "#10b981", "#111111", "#60a5fa"];
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors, disableForReducedMotion: true });
      setTimeout(() => {
        confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, colors });
      }, 400);
    }
  }, [status]);

  const resetForm = () => {
    setForm({ fullName: "", email: "", countryCode: "+91", phone: "", serviceRequired: "", projectBudget: "", message: "" });
    setStatus("idle");
  };

  return (
    <section
      id="contact"
      className="relative py-32 md:py-40 bg-bg-base text-text-primary border-t border-border-subtle overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-150 bg-brand-accent/3 rounded-full blur-40 pointer-events-none" />

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={cn(
              "fixed bottom-8 right-8 z-100 flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-lg backdrop-blur-xl",
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-rose-50 border-rose-200 text-rose-700"
            )}
          >
            {toast.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-bold tracking-tight">{toast.message}</span>
            <button
              onClick={() => setToast((p) => ({ ...p, show: false }))}
              className="ml-2 hover:opacity-50 transition-opacity flex items-center justify-center shrink-0"
              aria-label="Close notification"
            >
              <X size={14} className="shrink-0" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="system-tag mb-8 mx-auto w-fit bg-white/50 backdrop-blur shadow-sm">
              <span className="status-dot" />
              SYS // INITIATE CONSULTATION
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-primary tracking-tight mb-6">
              Let&apos;s build something <span className="text-gradient-blue">extraordinary.</span>
            </h2>
            <p className="text-text-muted text-xl font-normal max-w-xl mx-auto">
              Share your vision. Our engineers respond within 24 business hours with a strategic blueprint.
            </p>
          </motion.div>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-4xl border border-border-subtle overflow-hidden bg-white shadow-sm"
        >
          <div className="grid lg:grid-cols-2">

            {/* ── LEFT: Info ── */}
            <div className="p-8 md:p-12 flex flex-col gap-8 border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-light">
              <div>
                <p className="text-text-primary font-black text-xl mb-2">VEXA TECH GLOBAL</p>
                <p className="text-sm text-text-muted font-normal leading-relaxed">
                  Share your technical goals and business requirements. Our architecture team will deliver a structured execution plan.
                </p>
              </div>

              {/* Socials */}
              <div className="flex flex-col gap-3">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target={s.href.startsWith("https") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-black/5 bg-white hover:border-brand-accent/50 hover:bg-brand-accent/3 hover:shadow-sm transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center shrink-0 text-text-primary group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                      {s.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-text-muted/65 font-mono tracking-wider uppercase leading-none mb-1">
                        {s.label}
                      </p>
                      <p className="text-xs font-bold text-text-primary truncate">{s.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-border-subtle flex-1 min-h-45 relative shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125326.37244817898!2d78.02308!3d9.9252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xdc955b7264f63071!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block", minHeight: "180px", opacity: 0.85, filter: "grayscale(100%)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="VEXA TECH — Madurai, Tamil Nadu"
                />
              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-emerald-50 border border-emerald-200 text-emerald-600">
                      <Check size={36} />
                    </div>
                    <h3 className="text-2xl font-black text-text-primary mb-3">Inquiry Received!</h3>
                    <p className="text-text-muted font-normal leading-relaxed mb-8 max-w-sm mx-auto text-sm">
                      Confirmation sent to your email address. Our leadership team will contact you within 24 business hours.
                    </p>
                    <button
                      onClick={resetForm}
                      className="group glass-btn-secondary px-8 py-3 rounded-xl text-xs uppercase tracking-widest font-bold h-auto"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-xl font-black text-text-primary tracking-tight mb-8">
                      Start Your Project
                    </p>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
                      {/* Name */}
                      <div className="md:col-span-1">
                        <label htmlFor="fullName" className={labelBase}>
                          Full Name <span className="text-brand-accent">*</span>
                        </label>
                        <input
                          id="fullName"
                          required
                          placeholder="Full Name"
                          className={inputBase}
                          value={form.fullName}
                          onChange={set("fullName")}
                        />
                      </div>

                      {/* Email */}
                      <div className="md:col-span-1">
                        <label htmlFor="email" className={labelBase}>
                          Email ID <span className="text-brand-accent">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          className={inputBase}
                          value={form.email}
                          onChange={set("email")}
                        />
                      </div>

                      {/* Service */}
                      <div className="md:col-span-1">
                        <label htmlFor="serviceRequired" className={labelBase}>
                          Services Needed <span className="text-brand-accent">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="serviceRequired"
                            required
                            value={form.serviceRequired}
                            className={`${inputBase} appearance-none cursor-pointer pr-9`}
                            onChange={set("serviceRequired")}
                          >
                            <option value="" disabled>Select Service...</option>
                            <option value="Web Development">Web Development</option>
                            <option value="UI / UX Design">UI / UX Design</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Business Analysis">Business Analysis</option>
                            <option value="Graphic Design">Graphic Design</option>
                          </select>
                          <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted/50" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="md:col-span-1">
                        <label htmlFor="phone" className={labelBase}>
                          Phone Number <span className="text-brand-accent">*</span>
                        </label>
                        <div className="flex gap-2">
                          <div className="relative shrink-0">
                            <select
                              className={`${inputBase} w-28 appearance-none pl-3 pr-7 cursor-pointer`}
                              value={form.countryCode}
                              onChange={set("countryCode")}
                            >
                              {countryCodes.map((c) => (
                                <option key={c.name + c.code} value={c.code}>
                                  {c.flag} {c.code}
                                </option>
                              ))}
                            </select>
                            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted/50" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </div>
                          <input
                            id="phone"
                            type="tel"
                            required
                            placeholder="Phone Number"
                            className={inputBase}
                            value={form.phone}
                            onChange={set("phone")}
                          />
                        </div>
                      </div>

                      {/* Budget */}
                      <div className="md:col-span-2">
                        <label htmlFor="projectBudget" className={labelBase}>
                          Expected Budget <span className="text-brand-accent">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50 font-bold text-sm">₹</span>
                          <input
                            id="projectBudget"
                            type="text"
                            inputMode="numeric"
                            required
                            placeholder="e.g. 50,000"
                            className={`${inputBase} pl-8`}
                            value={form.projectBudget}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, "");
                              setForm((p) => ({ ...p, projectBudget: val }));
                            }}
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="md:col-span-2">
                        <label htmlFor="message" className={labelBase}>
                          Project Goals & Details <span className="text-brand-accent">*</span>
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          placeholder="Describe what you want to build..."
                          className={`${inputBase} resize-none min-h-[110px]`}
                          value={form.message}
                          onChange={set("message")}
                        />
                      </div>

                      {/* Submit */}
                      <div className="md:col-span-2 mt-2">
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className={cn(
                            "w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-300 group flex items-center justify-center gap-2.5",
                            status === "loading"
                              ? "opacity-60 cursor-not-allowed bg-black/10 text-black/40"
                              : "glass-btn-primary w-full shadow-sm h-auto py-3.5"
                          )}
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2 className="animate-spin" size={16} />
                              Processing...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send
                                size={14}
                                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 shrink-0"
                              />
                            </>
                          )}
                        </button>

                        {status === "error" && (
                          <div className="flex items-center gap-2 text-rose-600 text-xs font-bold justify-center mt-3">
                            <AlertCircle size={14} />
                            There was an error. Please try again.
                          </div>
                        )}
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
