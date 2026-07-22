"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Printer, 
  HelpCircle, 
  Copy, 
  Check, 
  ShieldCheck, 
  ChevronRight,
  Database,
  Eye,
  Settings,
  Mail
} from "lucide-react";

const Section = ({ title, icon: Icon, children }: { title: string, icon: React.ComponentType<{ size?: number }>, children: React.ReactNode }) => (
  <motion.section 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-16 last:mb-0"
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/5 flex items-center justify-center text-brand-accent shadow-sm">
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-black text-text-primary tracking-tight">{title}</h2>
    </div>
    <div className="pl-0 md:pl-16">
      {children}
    </div>
  </motion.section>
);

export default function PrivacyPolicy() {
  const [copied, setCopied] = useState(false);
  const email = "vexatech.connect@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-bg-base text-text-primary pt-20">
      {/* Header Section */}
      <section className="pt-24 pb-20 border-b border-border-subtle bg-bg-light">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="system-tag mb-6 mx-auto w-fit bg-white/80 backdrop-blur shadow-sm">
              <span className="status-dot" />
              SYS // TRANSPARENCY & TRUST
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-text-primary mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xl text-text-muted font-normal max-w-2xl mx-auto leading-relaxed mb-10">
              Transparency is key. We believe you should know exactly how we handle and protect your enterprise data.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={handlePrint}
                className="group glass-btn-secondary px-6 py-3 text-sm font-bold shadow-sm h-auto"
              >
                <Printer size={18} className="shrink-0" />
                Print Policy
              </button>
              <Link
                href="/support"
                className="group glass-btn-primary px-6 py-3 text-sm font-bold shadow-sm h-auto"
              >
                <HelpCircle size={18} className="shrink-0" />
                Have Questions?
              </Link>
            </div>
            
            <p className="mt-10 text-sm text-text-muted font-mono">
              Effective Date: <span className="text-text-primary font-bold">January 15, 2026</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          
          <Section title="1. Introduction" icon={ShieldCheck}>
            <p className="text-text-muted text-lg leading-relaxed mb-6 font-normal">
              Welcome to VEXA TECH. We respect your privacy and are committed to protecting your personal data. This policy outlines our practices regarding data collection, use, and protection when you visit our website or interact with our services.
            </p>
          </Section>

          <Section title="2. Information We Collect" icon={Database}>
            <p className="text-text-muted text-lg leading-relaxed mb-8 font-normal">
              We collect specific data to provide our services effectively:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Identity Data", items: ["First name", "Last name", "Organization"] },
                { title: "Contact Data", items: ["Email ID", "Phone number", "Requirements"] },
                { title: "Technical Data", items: ["IP address", "Browser type", "Device info"] }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white border border-border-subtle hover:border-brand-accent/10 hover:shadow-sm transition-all duration-300">
                  <h3 className="text-base font-bold text-text-primary mb-3">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((sub, j) => (
                      <li key={j} className="text-text-muted text-sm flex items-center gap-2 font-normal">
                        <ChevronRight size={14} className="text-brand-accent" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title="3. How We Use Your Data" icon={Eye}>
            <ul className="space-y-6">
              {[
                "To reply to your inquiries sent through our contact forms.",
                "To schedule and manage consultation sessions.",
                "To improve our website performance and high-availability digital architecture."
              ].map((text, i) => (
                <li key={i} className="flex gap-4 items-start group">
                  <div className="w-6 h-6 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent mt-1 shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <p className="text-lg text-text-muted font-normal leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="4. Third-Party Services" icon={Settings}>
            <p className="text-text-muted text-lg leading-relaxed mb-8 font-normal">
              We rely on trusted enterprise providers to deliver smooth application experiences:
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="group flex flex-col p-8 rounded-3xl bg-white border border-border-subtle flex-1 min-w-70 hover:border-brand-accent/10 hover:shadow-sm transition-all duration-300">
                <h3 className="text-xl font-bold text-text-primary mb-2">Firebase (Google)</h3>
                <p className="text-text-muted text-sm font-normal">Powers lead storage and serverless document operations securely.</p>
              </div>
              <div className="group flex flex-col p-8 rounded-3xl bg-white border border-border-subtle flex-1 min-w-70 hover:border-brand-accent/10 hover:shadow-sm transition-all duration-300">
                <h3 className="text-xl font-bold text-text-primary mb-2">Twilio & Nodemailer</h3>
                <p className="text-text-muted text-sm font-normal">Triggers instant WhatsApp and Email lead notifications.</p>
              </div>
            </div>
          </Section>

          <Section title="5. Cookies & Tracking" icon={ShieldCheck}>
            <p className="text-text-muted text-lg leading-relaxed font-normal">
              Our website uses minimal operational cookies to enhance user experience. We do not use intrusive tracking cookies for advertising purposes without your consent.
            </p>
          </Section>

          {/* Final CTA Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-28 p-12 lg:p-16 rounded-3xl bg-white border border-border-subtle text-text-primary text-center shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,113,227,0.03),transparent_60%)] pointer-events-none" />
            
            <div className="system-tag mb-6 mx-auto w-fit bg-white shadow-sm">
              SYS // PRIVACY TEAM
            </div>
            <h2 className="relative z-10 text-3xl md:text-5xl font-black mb-6">
              Still have questions?
            </h2>
            <p className="relative z-10 text-text-muted text-lg mb-10 font-normal max-w-xl mx-auto">
              We are happy to clarify any questions regarding data privacy and how we protect your enterprise information.
            </p>
            
            <div className="relative z-10 inline-flex flex-col sm:flex-row items-center gap-4 bg-black/5 p-2 rounded-2xl border border-black/5">
              <div className="flex items-center gap-3 px-6 py-4">
                <Mail className="text-brand-accent" size={20} />
                <span className="font-bold text-lg text-text-primary">{email}</span>
              </div>
              <button 
                onClick={handleCopyEmail}
                className="w-full sm:w-auto group glass-btn-primary px-8 py-4 rounded-xl font-bold h-auto"
              >
                {copied ? <Check size={18} className="shrink-0" /> : <Copy size={18} className="shrink-0" />}
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
