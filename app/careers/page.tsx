"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Briefcase, Calendar, Users, CheckCircle2, Award, Sparkles, Code, Globe } from "lucide-react";
import PageTransition from "../components/PageTransition";
import ScrollToTop from "../components/ScrollToTop";

const responsibilities = [
  "Lead generation",
  "Client communication",
  "Business development",
  "Sales follow-up",
  "Customer relationship management",
  "Market research",
];

const requirements = [
  "Strong communication skills",
  "Tamil & English proficiency",
  "Basic computer knowledge",
  "Positive attitude",
  "Team player",
];



const recruitmentSteps = [
  { number: "01", name: "Apply Online", desc: "Submit your details and resume through our secure portal." },
  { number: "02", name: "Resume Screening", desc: "Our recruitment team reviews your skills and portfolio." },
  { number: "03", name: "HR Discussion", desc: "A brief conversation about your career goals and expectations." },
  { number: "04", name: "Final Interview", desc: "A technical/strategic panel to discuss core capabilities." },
  { number: "05", name: "Welcome to VEXA TECH", desc: "Receive your offer letter and join the engineering team." },
];

const whyJoinUsList = [
  { title: "Career Growth", desc: "We provide clear paths for advancement and skill acquisition.", icon: Award },
  { title: "Learning Opportunities", desc: "Get mentored by industry experts and build enterprise solutions.", icon: CheckCircle2 },
  { title: "Friendly Team", desc: "Collaborate in a supportive, zero-ego environment built on mutual respect.", icon: Users },
  { title: "Performance Incentives", desc: "Be rewarded fairly for driving client success and business growth.", icon: Sparkles },
  { title: "Real Client Projects", desc: "Build systems used by real-world companies and see immediate impact.", icon: Globe },
  { title: "Modern Technologies", desc: "Work with frameworks like Next.js 16, TypeScript, Tailwind, and AI tools.", icon: Code },
];

export default function CareersPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-bg-base text-text-primary pt-20">
        
        {/* Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden border-b border-border-subtle bg-bg-light">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-125 bg-brand-accent/3 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="system-tag mb-8 mx-auto w-fit bg-white/80 backdrop-blur shadow-sm">
                <span className="status-dot" />
                SYS // JOIN VEXA TECH
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-text-primary mb-6 tracking-tight">
                Build the Future <br />
                <span className="text-gradient-blue">With VEXA TECH</span>
              </h1>
              <p className="text-text-muted text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-10">
                Join a passionate team building modern websites, AI solutions, branding, and digital experiences.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/careers/apply"
                  target="_blank"
                  className="group glass-btn-primary px-8 py-3.5 text-sm font-bold shadow-sm h-auto inline-flex items-center gap-1.5"
                >
                  Apply Now
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 shrink-0" />
                </Link>
                <Link
                  href="/team"
                  className="group glass-btn-secondary px-8 py-3.5 text-sm font-bold shadow-sm h-auto"
                >
                  Explore Team
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Job Details Card */}
        <section className="py-20 max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-4xl border border-border-subtle bg-white p-8 md:p-12 shadow-sm mb-20"
          >
            {/* Job Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-black/5 mb-8">
              <div>
                <div className="system-tag mb-4 bg-brand-accent/5 border-brand-accent/10 text-brand-accent w-fit">
                  CURRENT OPENING
                </div>
                <h2 className="text-3xl font-black text-text-primary tracking-tight">
                  Business Executive
                </h2>
              </div>
              <Link
                href="/careers/apply"
                target="_blank"
                className="group glass-btn-primary px-8 py-4 rounded-2xl font-bold justify-center text-center h-auto text-sm shrink-0 inline-flex items-center gap-1.5"
              >
                Apply for this Position
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 shrink-0" />
              </Link>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-brand-accent shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/65">Location</p>
                  <p className="text-sm font-bold text-text-primary">Madurai, TN</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-brand-accent shrink-0">
                  <Briefcase size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/65">Employment</p>
                  <p className="text-sm font-bold text-text-primary">Full Time</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-brand-accent shrink-0">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/65">Experience</p>
                  <p className="text-sm font-bold text-text-primary">0–2 Years</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-brand-accent shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/65">Department</p>
                  <p className="text-sm font-bold text-text-primary">Development</p>
                </div>
              </div>
            </div>

            {/* Main content grid */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Responsibilities */}
              <div>
                <h3 className="text-xl font-black text-text-primary mb-6">Key Responsibilities</h3>
                <ul className="space-y-4">
                  {responsibilities.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start font-normal text-text-muted">
                      <div className="w-5 h-5 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent mt-0.5 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                      </div>
                      <span className="text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-xl font-black text-text-primary mb-6">Skills & Requirements</h3>
                <ul className="space-y-4">
                  {requirements.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start font-normal text-text-muted">
                      <div className="w-5 h-5 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent mt-0.5 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                      </div>
                      <span className="text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- RECRUITMENT PROCESS SECTION --- */}
        <section className="py-24 bg-bg-light border-y border-border-subtle overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <div className="system-tag bg-white shadow-sm mx-auto w-fit mb-6">
                🚀 STEP PROTOCOL
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">Recruitment Process</h2>
              <p className="text-text-muted text-base font-normal leading-relaxed">
                We believe in keeping things simple, fast, and structured. Here is how you join our crew.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6 relative">
              {recruitmentSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white border border-border-subtle rounded-3xl p-6 relative flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div>
                    <span className="text-3xl font-black text-brand-accent/20 group-hover:text-brand-accent transition-colors block mb-4">
                      {step.number}
                    </span>
                    <h4 className="text-lg font-black text-text-primary mb-2">{step.name}</h4>
                    <p className="text-xs text-text-muted font-normal leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- WHY JOIN US SECTION --- */}
        <section className="py-24 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="system-tag bg-white shadow-sm mx-auto w-fit mb-6">
              👑 TEAM BENEFITS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Why Join VEXA TECH?</h2>
            <p className="text-text-muted text-base font-normal leading-relaxed">
              We compile high-performance ecosystems and we treat our human capital with the same meticulous precision.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyJoinUsList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-6 md:p-8 bg-white border border-border-subtle rounded-3xl shadow-sm flex items-start gap-5 hover:border-brand-accent/15 transition-all hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-text-primary mb-2">{item.title}</h4>
                    <p className="text-sm text-text-muted font-normal leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA Area */}
        <section className="pb-24 max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 lg:p-16 rounded-3xl bg-white border border-border-subtle text-center shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,113,227,0.03),transparent_60%)] pointer-events-none" />
            
            <div className="system-tag mb-6 mx-auto w-fit bg-white shadow-sm">
              SYS // READY TO GROW
            </div>
            <h2 className="relative z-10 text-3xl md:text-5xl font-black mb-6">
              Ready to grow with us?
            </h2>
            <p className="relative z-10 text-text-muted text-lg mb-10 font-normal max-w-xl mx-auto">
              Submit your resume and details to our HR team and we will be in touch shortly.
            </p>
            
            <Link
              href="/careers/apply"
              target="_blank"
              className="relative z-10 group glass-btn-primary px-10 py-4.5 rounded-2xl font-bold h-auto justify-center text-base inline-flex items-center gap-1.5"
            >
              Apply Now
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
          </motion.div>
        </section>

      </main>
      <ScrollToTop />
    </PageTransition>
  );
}
