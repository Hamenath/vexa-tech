"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Rocket, 
  CreditCard, 
  Cpu, 
  ChevronDown, 
  ExternalLink
} from "lucide-react";
import { cn } from "@/app/lib/utils";

const SupportCard = ({ icon: Icon, title, desc }: { icon: React.ComponentType<{ size?: number }>, title: string, desc: string }) => (
  <motion.div
    whileHover={{ y: -6 }}
    className="p-8 rounded-3xl bg-white border border-border-subtle hover:border-brand-accent/20 hover:shadow-md transition-all duration-300 flex flex-col items-start group cursor-pointer h-full"
  >
    <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/5 flex items-center justify-center text-text-primary group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-white mb-6 transition-all duration-300 shadow-sm">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-brand-accent transition-colors">{title}</h3>
    <p className="text-text-muted font-normal text-sm mb-6 grow leading-relaxed">
      {desc}
    </p>
    <div className="text-brand-accent font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
      Learn More <ExternalLink size={14} />
    </div>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full p-6 md:p-8 rounded-2xl text-left transition-all duration-300 border flex justify-between items-center",
          isOpen ? "bg-white border-brand-accent/30 shadow-sm" : "bg-white border-border-subtle hover:border-black/10"
        )}
      >
        <span className="text-lg md:text-xl font-bold text-text-primary pr-6">{question}</span>
        <ChevronDown 
          size={20} 
          className={cn("text-brand-accent transition-transform duration-300 shrink-0", isOpen && "rotate-180")} 
        />
      </button>
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-120 opacity-100 mt-2 px-8 pb-6" : "max-h-0 opacity-0"
        )}
      >
        <div className="text-base text-text-muted font-normal leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function SupportCenter() {
  return (
    <main className="min-h-screen bg-bg-base text-text-primary pt-20">
      {/* Search Header */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-border-subtle bg-bg-light">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="system-tag mb-8 mx-auto w-fit bg-white/80 backdrop-blur shadow-sm">
              <span className="status-dot" />
              SYS // VEXA TECH CARE
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-text-primary mb-6 tracking-tight">
              How can we <span className="text-gradient-blue">help</span> you?
            </h1>
            
            {/* Search Input */}
            <div className="max-w-2xl mx-auto mt-10 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted/40 group-focus-within:text-brand-accent transition-colors" size={22} />
              <input 
                type="text" 
                placeholder="Search knowledge base (e.g., 'web development', 'support')..."
                className="w-full pl-16 pr-8 py-5 rounded-2xl bg-white border border-border-subtle text-text-primary placeholder-text-muted/40 shadow-sm outline-none transition-all text-base font-normal focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/5"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <SupportCard 
            icon={Rocket} 
            title="Getting Started" 
            desc="Guides on launching your project, submitting initial requirements, and timeline expectations." 
          />
          <SupportCard 
            icon={Cpu} 
            title="Technical Architecture" 
            desc="Technical details on Next.js 16, Framer Motion, GSAP, and serverless infrastructure." 
          />
          <SupportCard 
            icon={CreditCard} 
            title="Billing & Milestones" 
            desc="Information on payment milestones, invoices, and project scoping terms." 
          />
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="system-tag mb-6 mx-auto w-fit bg-white shadow-sm">
            SYS // FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-text-primary text-center mb-12">
            Frequently Asked Questions
          </h2>

          <FAQItem 
            question="What is the average timeline for a custom web development project?"
            answer="Project timelines vary based on scope. Standard high-performance landing pages and corporate platforms typically take 2-4 weeks, while complex full-stack web applications range from 4-8 weeks."
          />
          <FAQItem 
            question="Do you provide ongoing support after project launch?"
            answer="Yes! VEXA TECH provides 24/7 technical monitoring, security updates, feature enhancements, and continuous optimization plans post-launch."
          />
          <FAQItem 
            question="How do we get started with VEXA TECH?"
            answer="Simply fill out our contact form or send us an email. Our team will review your requirements and schedule an initial consultation within 24 business hours."
          />
        </div>
      </section>
    </main>
  );
}
