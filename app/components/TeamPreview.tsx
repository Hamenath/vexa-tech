"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const teamMembers = [
  {
    name: "Srinivas K A",
    role: "CEO & Founder",
    quote: "Leading innovation through strategy and vision.",
    avatar: "/team/ceo.png",
    linkedin: "https://www.linkedin.com/in/srinivas-k-a-83a027372/",
  },
  {
    name: "Hamenath B",
    role: "Chief Technology Officer",
    quote: "Architecting high-performance engineering systems.",
    avatar: "/team/cto.png",
    linkedin: "https://www.linkedin.com/in/hamenathbdesigner/",
  },
  {
    name: "Jeya Jothi D",
    role: "Human Resources",
    quote: "Building a supportive, growth-oriented culture.",
    avatar: "/team/hr.png",
    linkedin: "https://www.linkedin.com/in/jeyajothi-d-a99544299/",
  },
];

export default function TeamPreview() {
  return (
    <section className="relative py-24 md:py-32 bg-bg-base text-text-primary border-t border-border-subtle overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-brand-accent/2 rounded-full blur-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="system-tag mb-8 mx-auto w-fit bg-white/50 backdrop-blur shadow-sm">
              <span className="status-dot" />
              SYS // LEADERSHIP PROFILE
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight tracking-tight mb-6">
              Meet Our Team
            </h2>
            <p className="text-text-muted text-base sm:text-[18px] font-normal leading-relaxed">
              The core strategists and engineers guiding VEXA TECH&apos;s mission to build smart solutions for smarter businesses.
            </p>
          </motion.div>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col p-8 rounded-3xl bg-white border border-border-subtle hover:border-brand-accent/20 hover:shadow-[0_8px_30px_rgba(0,113,227,0.06)] transition-all duration-500 justify-between h-full"
            >
              <div>
                <div className="w-14 h-14 rounded-full border border-border-subtle overflow-hidden relative shadow-sm mb-6">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-black text-text-primary mb-1 group-hover:text-brand-accent transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-4">
                  {member.role}
                </p>
                <p className="text-text-muted text-sm font-normal italic leading-relaxed mb-6">
                  &quot;{member.quote}&quot;
                </p>
              </div>

              <div>
                <div className="w-full h-px bg-black/5 mb-6" />
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-text-muted hover:text-brand-accent transition-colors duration-300 uppercase tracking-wider"
                >
                  LinkedIn <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}

          {/* Careers Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -6 }}
            className="group flex flex-col p-8 rounded-3xl bg-white border border-dashed border-brand-accent/30 hover:border-brand-accent/60 hover:shadow-[0_8px_30px_rgba(0,113,227,0.06)] transition-all duration-500 justify-between h-full relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(0,113,227,0.03),transparent_60%)] pointer-events-none" />
            <div>
              <div className="system-tag mb-6 bg-brand-accent/5 border-brand-accent/10 text-brand-accent w-fit">
                WE&apos;RE HIRING
              </div>
              <h3 className="text-xl font-black text-text-primary mb-2">
                Business Executive
              </h3>
              <p className="text-text-muted text-sm font-normal leading-relaxed mb-6">
                Help VEXA TECH grow and support businesses transform their digital potential.
              </p>
            </div>

            <div>
              <div className="w-full h-px bg-black/5 mb-6" />
              <Link
                href="/careers/apply"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent hover:text-brand-accent-hover transition-colors"
              >
                Apply Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
