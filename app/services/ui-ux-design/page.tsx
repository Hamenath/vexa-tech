import PageTransition from "../../components/PageTransition";
import ScrollToTop from "../../components/ScrollToTop";
import Link from "next/link";
import { ArrowLeft, Figma , CheckCircle2, Layout, MousePointer2, Palette, ArrowRight, Zap, Shield, Globe } from "lucide-react";

export const metadata = {
  title: "UI / UX Design | VEXA TECH",
  description: "Strategic, user-centric design that converts and captivates.",
};

const features = [
  { title: "User Research", desc: "Deep diving into user behavior to inform strategic design decisions." },
  { title: "Prototyping", desc: "High-fidelity interactive mockups for rapid validation and testing." },
  { title: "Visual Identity", desc: "Crafting a unique, premium aesthetic that aligns with your brand." },
  { title: "Design Systems", desc: "Building scalable, consistent component libraries for long-term growth." },
];

export default function UIUXDesignPage() {
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
              <Figma className="text-[#0071e3]" size={32} strokeWidth={1.5} />
            </div>
            <h1 className="text-5xl md:text-8xl font-bold text-[#1d1d1f] leading-[1.1] tracking-tight mb-10">
              UI / UX <br />
              <span className="text-[#0071e3]">Design</span>
            </h1>
            <p className="text-[#6e6e73] text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
              We design digital products that feel intuitive and look exceptional. 
              Our approach blends psychology with aesthetics to create high-conversion 
              experiences.
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-12 tracking-tight">The Design Advantage</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <div className="p-3 w-fit rounded-xl bg-slate-50">
                  <Layout className="text-[#0071e3]" size={20} />
                </div>
                <h4 className="text-xl font-bold text-[#1d1d1f]">User-Centric</h4>
                <p className="text-[#6e6e73] font-light leading-relaxed">
                  Every pixel has a purpose. We prioritize usability to ensure 
                  your users achieve their goals with zero friction.
                </p>
              </div>
              <div className="space-y-6">
                <div className="p-3 w-fit rounded-xl bg-slate-50">
                  <Palette className="text-[#0071e3]" size={20} />
                </div>
                <h4 className="text-xl font-bold text-[#1d1d1f]">Aesthetic Precision</h4>
                <p className="text-[#6e6e73] font-light leading-relaxed">
                  We build premium visual languages that communicate your brand&apos;s 
                  authority and values at first glance.
                </p>
              </div>
              <div className="space-y-6">
                <div className="p-3 w-fit rounded-xl bg-slate-50">
                  <MousePointer2 className="text-[#0071e3]" size={20} />
                </div>
                <h4 className="text-xl font-bold text-[#1d1d1f]">Fluid Interaction</h4>
                <p className="text-[#6e6e73] font-light leading-relaxed">
                  Motion and feedback are essential. We design responsive 
                  interactions that feel alive and satisfying.
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="p-16 rounded-[48px] bg-[#f5f5f7] border border-black/5 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-50/30 blur-3xl -z-10" />
            <h3 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-8">Design your digital future</h3>
            <p className="text-[#6e6e73] text-lg font-light mb-12 max-w-xl mx-auto">
              Ready to transform your vision into a premium user experience? 
              Let&apos;s talk design.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-lg transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              Consult a Designer
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        <ScrollToTop />
      </main>
    </PageTransition>
  );
}