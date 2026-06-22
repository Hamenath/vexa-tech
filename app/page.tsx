import Hero from "./components/Hero";
import AboutPreview from "./components/AboutPreview";
import CTASection from "./components/CTASection";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-white text-[#1d1d1f] selection:bg-blue-500/10 selection:text-[#0071e3] relative">
        <Hero />
        <AboutPreview />
        <CTASection />
        <ScrollToTop />
      </main>
    </PageTransition>
  );
}
