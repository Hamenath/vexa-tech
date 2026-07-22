"use client";

import { motion } from "framer-motion";

const clients = [
  { name: "IFORU GARMENTS", fontClass: "font-sans font-black tracking-widest text-[13px] sm:text-[14px]" },
  { name: "HAVS", fontClass: "font-mono font-black tracking-[0.3em] text-[16px] sm:text-[18px]" },
  { name: "SHS", fontClass: "font-display font-extrabold tracking-widest text-[18px] sm:text-[20px]" },
  { name: "Debuggers Technology", fontClass: "font-sans font-extrabold tracking-wide text-[12px] sm:text-[13px] uppercase" },
  { name: "Deity", fontClass: "font-mono font-bold tracking-[0.2em] text-[15px] sm:text-[16px]" },
];

export default function TrustedClients() {
  return (
    <section className="relative py-20 md:py-24 bg-bg-base text-text-primary border-t border-border-subtle overflow-hidden">
      {/* Light Ambient Glow */}
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
              SYS // TRUSTED CLIENTS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight tracking-tight mb-6">
              Trusted by Growing Businesses
            </h2>
            <p className="text-text-muted text-base sm:text-[18px] font-normal leading-relaxed">
              We&apos;re proud to partner with businesses across multiple industries, delivering premium digital solutions that create measurable impact.
            </p>
          </motion.div>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
          {clients.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="flex items-center justify-center p-6 h-24 sm:h-28 rounded-2xl bg-white border border-border-subtle hover:border-brand-accent/20 hover:shadow-md transition-all duration-300 select-none group text-center"
            >
              <span className={`${client.fontClass} text-text-muted/60 group-hover:text-brand-accent transition-colors duration-300`}>
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
