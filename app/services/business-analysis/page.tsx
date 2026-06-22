import PageTransition from "../../components/PageTransition";
import ScrollToTop from "../../components/ScrollToTop";
import Link from "next/link";
import { ArrowLeft, LineChart, CheckCircle2, TrendingUp, Lightbulb, PieChart, ArrowRight, Zap, Shield, Globe } from "lucide-react";

export const metadata = {
  title: "Business Analysis | VEXA TECH",
  description: "Strategic insights that optimize operations and maximize value.",
};

const features = [
  { title: "Market Research", desc: "Identifying opportunities and threats in your industry landscape." },
  { title: "Process Optimization", desc: "Streamlining workflows to increase efficiency and reduce costs." },
  { title: "Data Insights", desc: "Unlocking the power of your business data to inform decisions." },
  { title: "Strategic Planning", desc: "Developing long-term roadmaps for sustainable growth and success." },
];

export default function BusinessAnalysisPage() {
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
              <LineChart className="text-[#0071e3]" size={32} strokeWidth={1.5} />
            </div>
            <h1 className="text-5xl md:text-8xl font-bold text-[#1d1d1f] leading-[1.1] tracking-tight mb-10">
              Business <br />
              <span className="text-[#0071e3]">Analysis</span>
            </h1>
            <p className="text-[#6e6e73] text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
              We translate complexity into clarity. Our analysis provides the 
              strategic foundation needed for decisive action and market leadership.
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-12 tracking-tight">The Strategic Edge</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <div className="p-3 w-fit rounded-xl bg-slate-50">
                  <TrendingUp className="text-[#0071e3]" size={20} />
                </div>
                <h4 className="text-xl font-bold text-[#1d1d1f]">Operational Clarity</h4>
                <p className="text-[#6e6e73] font-light leading-relaxed">
                  We identify bottlenecks and inefficiencies, providing clear 
                  recommendations to optimize your business processes.
                </p>
              </div>
              <div className="space-y-6">
                <div className="p-3 w-fit rounded-xl bg-slate-50">
                  <Lightbulb className="text-[#0071e3]" size={20} />
                </div>
                <h4 className="text-xl font-bold text-[#1d1d1f]">Informed Innovation</h4>
                <p className="text-[#6e6e73] font-light leading-relaxed">
                  Our research uncovers market gaps and consumer needs, 
                  fueling product and service innovation that wins.
                </p>
              </div>
              <div className="space-y-6">
                <div className="p-3 w-fit rounded-xl bg-slate-50">
                  <PieChart className="text-[#0071e3]" size={20} />
                </div>
                <h4 className="text-xl font-bold text-[#1d1d1f]">Data-Driven Strategy</h4>
                <p className="text-[#6e6e73] font-light leading-relaxed">
                  We transform raw data into a narrative that guides your 
                  long-term vision and ensures every move is calculated.
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="p-16 rounded-[48px] bg-[#f5f5f7] border border-black/5 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-50/30 blur-3xl -z-10" />
            <h3 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-8">Optimize your vision</h3>
            <p className="text-[#6e6e73] text-lg font-light mb-12 max-w-xl mx-auto">
              Ready to gain a definitive competitive advantage? Connect with our 
              business analysts today.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-lg transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              Consult an Analyst
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        <ScrollToTop />
      </main>
    </PageTransition>
  );
}
