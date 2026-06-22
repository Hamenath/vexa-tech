import PageTransition from "../../components/PageTransition";
import ScrollToTop from "../../components/ScrollToTop";
import Link from "next/link";
import { ArrowLeft, Code2, CheckCircle2, Zap, Shield, Globe, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Web Development | VEXA TECH",
  description: "High-performance, scalable, and SEO-optimized digital ecosystems.",
};

const features = [
  { title: "Next.js & React", desc: "Building fast, dynamic, and responsive front-end experiences." },
  { title: "SEO Optimized", desc: "Engineered for maximum visibility on search engines from day one." },
  { title: "Cloud Scale", desc: "Serverless and edge-ready architectures for global performance." },
  { title: "Elite Security", desc: "Hardened systems with modern authentication and data protection." },
];

export default function WebDevelopmentPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-white pt-32 pb-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-50/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Back Link */}
          <Link 
            href="/services"
            className="inline-flex items-center gap-1.5 text-[#6e6e73] hover:text-[#0071e3] transition-colors mb-16 group font-medium"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>

          {/* Hero */}
          <div className="mb-24">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-10">
              <Code2 className="text-[#0071e3]" size={32} strokeWidth={1.5} />
            </div>
            <h1 className="text-5xl md:text-8xl font-bold text-[#1d1d1f] leading-[1.1] tracking-tight mb-10">
              Web <br />
              <span className="text-[#0071e3]">Development</span>
            </h1>
            <p className="text-[#6e6e73] text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
              We architect high-performance digital ecosystems that command authority 
              and accelerate growth. Our engineering is focused on speed, scale, 
              and uncompromising quality.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-32">
            {features.map((f, i) => (
              <div key={i} className="p-10 rounded-[32px] border border-black/5 bg-white shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-blue-50 transition-colors">
                  <CheckCircle2 className="text-[#0071e3]" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">{f.title}</h3>
                <p className="text-[#6e6e73] text-[15px] font-light leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Content Block */}
          <div className="mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-12 tracking-tight">The Engineering Edge</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <div className="p-3 w-fit rounded-xl bg-slate-50">
                  <Zap className="text-[#0071e3]" size={20} />
                </div>
                <h4 className="text-xl font-bold text-[#1d1d1f]">Performance First</h4>
                <p className="text-[#6e6e73] font-light leading-relaxed">
                  We utilize modern frameworks like Next.js to deliver instant load 
                  times and fluid interactions that keep users engaged.
                </p>
              </div>
              <div className="space-y-6">
                <div className="p-3 w-fit rounded-xl bg-slate-50">
                  <Shield className="text-[#0071e3]" size={20} />
                </div>
                <h4 className="text-xl font-bold text-[#1d1d1f]">Uncompromising Security</h4>
                <p className="text-[#6e6e73] font-light leading-relaxed">
                  Security is baked into every line of code. We protect your brand 
                  with hardened systems and modern data protection.
                </p>
              </div>
              <div className="space-y-6">
                <div className="p-3 w-fit rounded-xl bg-slate-50">
                  <Globe className="text-[#0071e3]" size={20} />
                </div>
                <h4 className="text-xl font-bold text-[#1d1d1f]">Global Scalability</h4>
                <p className="text-[#6e6e73] font-light leading-relaxed">
                  We build for the global stage. Our architectures scale effortlessly 
                  as your user base grows across continents.
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="p-16 rounded-[48px] bg-[#f5f5f7] border border-black/5 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-50/30 blur-3xl -z-10" />
            <h3 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-8">Start your digital transformation</h3>
            <p className="text-[#6e6e73] text-lg font-light mb-12 max-w-xl mx-auto">
              Ready to elevate your digital presence? Connect with our engineering 
              team today.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-lg transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              Consult an Architect
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        <ScrollToTop />
      </main>
    </PageTransition>
  );
}
