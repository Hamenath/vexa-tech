"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Printer, 
  Copy, 
  Check, 
  ShieldCheck, 
  Database,
  Eye,
  Settings,
  Mail,
  AlertCircle
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

export default function TermsOfService() {
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
              SYS // LEGAL FRAMEWORK
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-text-primary mb-6 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xl text-text-muted font-normal max-w-2xl mx-auto leading-relaxed mb-10">
              Please read these terms carefully before engaging with VEXA TECH services and digital architecture.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={handlePrint}
                className="group glass-btn-secondary px-6 py-3 text-sm font-bold shadow-sm h-auto"
              >
                <Printer size={18} className="shrink-0" />
                Print Terms
              </button>
              <Link 
                href="/contact"
                className="group glass-btn-primary px-6 py-3 text-sm font-bold shadow-sm h-auto"
              >
                <AlertCircle size={18} className="shrink-0" />
                Contact Legal
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
          
          <Section title="1. Agreement to Terms" icon={ShieldCheck}>
            <p className="text-text-muted text-lg leading-relaxed mb-6 font-normal">
              By accessing or using the VEXA TECH website, tools, or consulting services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not access or use our platform.
            </p>
          </Section>

          <Section title="2. Intellectual Property Rights" icon={Database}>
            <p className="text-text-muted text-lg leading-relaxed mb-6 font-normal">
              Unless otherwise agreed in a separate master service agreement, all website designs, custom code, graphics, and brand trademarks remain the intellectual property of VEXA TECH or its respective licensors.
            </p>
          </Section>

          <Section title="3. User Warranties & Conduct" icon={Eye}>
            <ul className="space-y-6">
              {[
                "You agree to provide accurate and verifiable information when submitting project inquiries.",
                "You agree not to use our infrastructure for malicious activities, probing, or unauthorized scanning.",
                "All communications submitted through VEXA TECH forms must adhere to lawful business practices."
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

          <Section title="4. Limitation of Liability" icon={Settings}>
            <p className="text-text-muted text-lg leading-relaxed font-normal">
              In no event shall VEXA TECH or its directors, employees, or partners be liable for indirect, incidental, or consequential damages resulting from your access to or use of our web services.
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
              SYS // LEGAL INQUIRIES
            </div>
            <h2 className="relative z-10 text-3xl md:text-5xl font-black mb-6">
              Need legal clarification?
            </h2>
            <p className="relative z-10 text-text-muted text-lg mb-10 font-normal max-w-xl mx-auto">
              Our team is ready to answer questions about master service contracts, NDAs, or terms of service.
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
