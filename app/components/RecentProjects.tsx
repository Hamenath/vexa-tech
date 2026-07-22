"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const projects = [
  {
    client: "IFORU GARMENTS",
    project: "E-Commerce Website Development",
    desc: "Designed and developed a premium, responsive e-commerce platform with modern UI/UX, seamless shopping experience, and optimized performance.",
    services: ["UI/UX Design", "E-Commerce Development", "Responsive Website", "Performance Optimization"],
    status: "Completed",
  },
  {
    client: "HAVS",
    project: "Complete Brand Building",
    desc: "Created a complete brand identity including visual design, branding strategy, marketing creatives, and digital presence.",
    services: ["Brand Strategy", "Logo & Identity", "Graphic Design", "Brand Guidelines"],
    status: "Completed",
  },
  {
    client: "SHS",
    project: "Digital Marketing",
    desc: "Executed strategic digital marketing campaigns focused on increasing reach, engagement, lead generation, and online growth.",
    services: ["Digital Marketing", "Campaign Management", "Content Strategy", "Social Media Marketing"],
    status: "Completed",
  },
  {
    client: "Debuggers Technology",
    project: "SEO Optimization",
    desc: "Improved website visibility through technical SEO, keyword strategy, content optimization, and performance enhancements.",
    services: ["Technical SEO", "On-Page SEO", "Keyword Research", "Performance Optimization"],
    status: "Completed",
  },
  {
    client: "Deity",
    project: "Social Media Marketing",
    desc: "Developed engaging social media strategies, creative campaigns, and consistent brand communication across digital platforms.",
    services: ["Social Media Marketing", "Content Creation", "Creative Design", "Audience Growth"],
    status: "Completed",
  },
];

export default function RecentProjects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 bg-bg-base text-text-primary border-t border-border-subtle overflow-hidden">
      {/* Light Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-200 h-125 bg-brand-accent/2 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="system-tag mb-8 bg-white/50 backdrop-blur shadow-sm">
              <span className="status-dot" />
              SYS // RECENT PROJECTS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary leading-tight tracking-tight mb-6">
              Helping Businesses Grow Through Smart Digital Solutions
            </h2>
            <p className="text-text-muted text-[18px] font-normal leading-relaxed">
              We partner with ambitious businesses to build websites, strengthen brands, improve online visibility, and accelerate business growth through strategic digital solutions.
            </p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group p-8 rounded-3xl bg-white border border-border-subtle hover:border-brand-accent/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono text-brand-accent font-bold tracking-widest uppercase">
                    {proj.client}
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/5 text-emerald-600 border border-emerald-500/10 text-[9px] font-mono uppercase tracking-wider">
                    <Check size={10} strokeWidth={3} />
                    {proj.status}
                  </div>
                </div>

                <h3 className="text-xl font-black text-text-primary mb-3 group-hover:text-brand-accent transition-colors">
                  {proj.project}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6 font-normal">
                  {proj.desc}
                </p>
              </div>

              <div>
                <div className="w-full h-px bg-black/5 mb-6" />
                <div className="flex flex-wrap gap-1.5">
                  {proj.services.map((srv, j) => (
                    <span
                      key={j}
                      className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/2 text-text-muted border border-black/5"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
