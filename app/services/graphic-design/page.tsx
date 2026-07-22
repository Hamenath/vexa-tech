import PageTransition from "../../components/PageTransition";
import ScrollToTop from "../../components/ScrollToTop";
import Link from "next/link";
import { ArrowLeft, Palette, CheckCircle2, Layers, PenTool, Brush, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Graphic Design | VEXA TECH",
  description: "Impactful visual identities that define brand authority.",
};

const features = [
  { title: "Brand Identity", desc: "Creating cohesive visual systems that reflect your brand&apos;s core values." },
  { title: "Marketing Assets", desc: "Designing high-impact collateral for digital and print campaigns." },
  { title: "Custom Illustration", desc: "Crafting unique, hand-drawn elements that set your brand apart." },
  { title: "Print Design", desc: "High-quality layouts for brochures, business cards, and packaging." },
];

export default function GraphicDesignPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-white pt-32 pb-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-200 h-200 bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-slate-50/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Back Link */}
          <Link 
            href="/services"
            className="inline-flex items-center gap-1.5 text-[#6e6e73] hover:text-brand-accent transition-colors mb-16 group font-medium"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>

          {/* Hero */}
          <div className="mb-24">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-10">
              <Palette className="text-brand-accent" size={32} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-8xl font-bold text-[#1d1d1f] leading-[1.1] tracking-tight mb-10">
              Graphic <br />
              <span className="text-brand-accent">Design</span>
            </h1>
            <p className="text-[#6e6e73] text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
              We create visual languages that speak with authority. Our design 
              philosophy is rooted in clarity, elegance, and premium execution.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-32">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-6 sm:p-8 lg:p-10 rounded-4xl transition-all duration-500 group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-blue-50 transition-colors">
                  <CheckCircle2 className="text-brand-accent" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">{f.title}</h3>
                <p className="text-[#6e6e73] text-[15px] font-light leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Content Block */}
          <div className="mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-12 tracking-tight">The Visual Advantage</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <div className="p-3 w-fit rounded-xl bg-slate-50">
                  <PenTool className="text-brand-accent" size={20} />
                </div>
                <h4 className="text-xl font-bold text-[#1d1d1f]">Creative Precision</h4>
                <p className="text-[#6e6e73] font-light leading-relaxed">
                  Every element is crafted with intent. We focus on detail-oriented 
                  execution that elevates your brand&apos;s perceived value.
                </p>
              </div>
              <div className="space-y-6">
                <div className="p-3 w-fit rounded-xl bg-slate-50">
                  <Layers className="text-brand-accent" size={20} />
                </div>
                <h4 className="text-xl font-bold text-[#1d1d1f]">Cohesive Systems</h4>
                <p className="text-[#6e6e73] font-light leading-relaxed">
                  Consistency is key to authority. We build design systems that 
                  ensure your brand looks premium across every touchpoint.
                </p>
              </div>
              <div className="space-y-6">
                <div className="p-3 w-fit rounded-xl bg-slate-50">
                  <Brush className="text-brand-accent" size={20} />
                </div>
                <h4 className="text-xl font-bold text-[#1d1d1f]">Artistic Vision</h4>
                <p className="text-[#6e6e73] font-light leading-relaxed">
                  We blend technical skill with artistic vision to create 
                  impactful visuals that leave a lasting impression.
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="p-8 sm:p-12 lg:p-16 rounded-[48px] border border-white/60 glass-surface text-center relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-50/30 blur-3xl -z-10" />
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-8">Define your visual brand</h3>
            <p className="text-[#6e6e73] text-lg font-light mb-12 max-w-xl mx-auto">
              Ready to create a visual identity that commands attention? Let&apos;s 
              start designing.
            </p>
            <Link 
              href="/contact"
              className="group glass-btn-primary shadow-lg shadow-blue-500/10 text-lg"
            >
              Consult a Designer
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        <ScrollToTop />
      </main>
    </PageTransition>
  );
}
