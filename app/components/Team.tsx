"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const team = [
  {
    name: "Srinivas K A",
    role: "CEO & Founder",
    desc: "A visionary leader with a passion for innovation and digital transformation. Srinivas drives VEXA TECH's mission with strategic clarity, ensuring every solution delivers real value, scalability, and long-term impact for clients.",
    linkedin: "https://www.linkedin.com/in/srinivas-k-a-83a027372/",
    instagram: "https://www.instagram.com/srini_xolo_?igsh=bDl5ajBseGh4eWVt",
    initial: "S",
    gradient: "from-violet-600 to-indigo-600",
    glow: "rgba(124,58,237,0.5)",
    accent: "#a78bfa",
  },
  {
    name: "Hamenath B",
    role: "Chief Technology Officer",
    desc: "A technology-driven problem solver focused on building modern, scalable, and high-performance digital solutions. Hamenath leads development with precision, ensuring every product meets the highest standards of performance and reliability.",
    linkedin: "https://www.linkedin.com/in/hamenathbdesigner/",
    instagram: "https://www.instagram.com/editor_ak._?igsh=MXI0MmlhajI1YWRvNg%3D%3D",
    initial: "H",
    gradient: "from-blue-600 to-cyan-500",
    glow: "rgba(59,130,246,0.5)",
    accent: "#60a5fa",
  },
  {
    name: "Jeya Jothi D",
    role: "Human Resource",
    desc: "Dedicated to building a strong, collaborative, and growth-oriented work culture. Jeya Jothi ensures seamless team coordination, talent development, and a people-first approach that strengthens the foundation of VEXA TECH.",
    linkedin: "https://www.linkedin.com/in/jeyajothi-d-a99544299/",
    instagram: "https://www.instagram.com/itzz_me_jo18?igsh=MXJjdGU2MDAzbWY3Ng%3D%3D",
    initial: "J",
    gradient: "from-pink-600 to-rose-500",
    glow: "rgba(236,72,153,0.5)",
    accent: "#f472b6",
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

  return (
    <section
      id="team"
      className="relative py-32 md:py-40 bg-[#f5f5f7] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-slate-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 md:mb-28 max-w-4xl mx-auto"
          >
            <div className="section-tag mb-8 mx-auto w-fit">Visionary Leadership</div>
            <h2 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] leading-[1.1] tracking-tight mb-8">
              The <span className="text-[#0071e3]">minds</span> behind VEXA TECH
            </h2>
            <p className="text-[#6e6e73] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
              Building the future of digital experiences with a relentless commitment
              to innovation and excellence.
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
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="group relative flex flex-col p-10 rounded-[32px] border border-black/5 bg-white hover:border-black/10 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl"
            >
              {/* Top gradient accent line */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Inner glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[32px]"
                style={{
                  background: `radial-gradient(ellipse at top, ${member.glow}12 0%, transparent 60%)`,
                }}
              />

              {/* Monogram */}
              <div className="relative mb-8">
                <div
                  className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1d1d1f] text-2xl font-bold transition-all duration-500 group-hover:bg-[#0071e3] group-hover:text-white"
                >
                  {member.initial}
                </div>
              </div>

              {/* Name & Role */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#1d1d1f] tracking-tight mb-2">
                  {member.name}
                </h3>
                <p className="font-semibold text-xs uppercase tracking-wider text-[#0071e3]">
                  {member.role}
                </p>
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-slate-100 mb-8" />

              {/* Description */}
              <p className="grow text-[#6e6e73] text-base leading-relaxed mb-10 font-light">
                {member.desc}
              </p>

              {/* Social */}
              <div className="flex items-center gap-3 mt-auto">
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-[#6e6e73] hover:text-white hover:bg-[#1d1d1f] hover:border-[#1d1d1f] transition-all duration-300 text-xs font-semibold uppercase tracking-wider"
                >
                  LinkedIn
                </Link>
                <Link
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 text-[#6e6e73] hover:text-white hover:bg-[#1d1d1f] hover:border-[#1d1d1f] transition-all duration-300"
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
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#6e6e73] hover:text-[#0071e3] transition-colors group"
          >
            Working with the best{" "}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
