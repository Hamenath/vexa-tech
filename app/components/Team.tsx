"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const team = [
  {
    name: "Srinivas K A",
    role: "CEO & Founder",
    sysCode: "EXEC // 01",
    desc: "A visionary leader with a passion for innovation and digital transformation. Srinivas drives VEXA TECH's mission with strategic clarity, ensuring every solution delivers real value, scalability, and long-term impact for clients.",
    linkedin: "https://www.linkedin.com/in/srinivas-k-a-83a027372/",
    instagram: "https://www.instagram.com/srini_xolo_?igsh=bDl5ajBseGh4eWVt",
    avatar: "/team/ceo.png",
  },
  {
    name: "Hamenath B",
    role: "Chief Technology Officer",
    sysCode: "EXEC // 02",
    desc: "A technology-driven problem solver focused on building modern, scalable, and high-performance digital solutions. Hamenath leads development with precision, ensuring every product meets the highest standards of performance and reliability.",
    linkedin: "https://www.linkedin.com/in/hamenathbdesigner/",
    instagram: "https://www.instagram.com/editor_ak._?igsh=MXI0MmlhajI1YWRvNg%3D%3D",
    avatar: "/team/cto.png",
  },
  {
    name: "Jeya Jothi D",
    role: "Human Resource",
    sysCode: "EXEC // 03",
    desc: "Dedicated to building a strong, collaborative, and growth-oriented work culture. Jeya Jothi ensures seamless team coordination, talent development, and a people-first approach that strengthens the foundation of VEXA TECH.",
    linkedin: "https://www.linkedin.com/in/jeyajothi-d-a99544299/",
    instagram: "https://www.instagram.com/itzz_me_jo18?igsh=MXJjdGU2MDAzbWY3Ng%3D%3D",
    avatar: "/team/hr.png",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

export default function Team() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="team"
      className="relative py-32 md:py-40 bg-bg-base text-text-primary border-t border-border-subtle overflow-hidden"
    >
      {/* Light Ambient Background */}
      <div className="absolute top-0 left-1/4 w-150 h-150 bg-brand-accent/3 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 md:mb-28 max-w-4xl mx-auto"
          >
            <div className="system-tag mb-8 mx-auto w-fit bg-white/50 backdrop-blur shadow-sm">
              <span className="status-dot" />
              SYS // EXECUTIVE LEADERSHIP
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-primary leading-tight tracking-tight mb-8">
              The <span className="text-gradient-blue">minds</span> behind VEXA TECH
            </h2>
            <p className="text-text-muted text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-normal">
              Building the future of enterprise digital experiences with a relentless commitment to innovation and engineering precision.
            </p>
          </motion.div>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              onMouseMove={handleMouseMove}
              className="group glass-card-interactive flex flex-col p-8 lg:p-10 rounded-3xl bg-white border border-border-subtle hover:border-brand-accent/20 hover:shadow-[0_8px_30px_rgba(0,113,227,0.06)] transition-all duration-500 relative"
            >
              {/* Avatar & Code */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-full border border-border-subtle overflow-hidden relative shrink-0 shadow-sm">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <span className="text-[10px] font-mono text-text-muted/65 tracking-wider">
                  {member.sysCode}
                </span>
              </div>

              {/* Name & Role */}
              <div className="mb-6">
                <h3 className="text-2xl font-black text-text-primary tracking-tight mb-1.5 group-hover:text-brand-accent transition-colors">
                  {member.name}
                </h3>
                <p className="font-bold text-xs uppercase tracking-wider text-brand-accent">
                  {member.role}
                </p>
              </div>

              <div className="w-full h-px bg-black/5 mb-6" />

              {/* Description */}
              <p className="grow text-text-muted text-base leading-relaxed mb-8 font-normal">
                {member.desc}
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3 mt-auto">
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black/5 border border-black/5 text-text-primary hover:text-white hover:bg-brand-accent hover:border-brand-accent transition-all duration-300 text-xs font-bold uppercase tracking-wider"
                >
                  LinkedIn
                </Link>
                <Link
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-black/5 border border-black/5 text-text-primary hover:text-white hover:bg-brand-accent hover:border-brand-accent transition-all duration-300 flex items-center justify-center"
                  aria-label="Instagram Profile"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-brand-accent transition-colors group"
          >
            Work with our leadership team{" "}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
