import Hero from "./components/Hero";
import ProductAnnouncement from "./components/ProductAnnouncement";
import AboutPreview from "./components/AboutPreview";
import RecentProjects from "./components/RecentProjects";
import TeamPreview from "./components/TeamPreview";
import HiringBanner from "./components/HiringBanner";
import CTASection from "./components/CTASection";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-bg-base text-text-primary selection:bg-brand-accent/10 selection:text-brand-accent relative">
        <Hero />
        <ProductAnnouncement />
        <AboutPreview />
        <RecentProjects />
        <TeamPreview />
        <HiringBanner />
        <CTASection />
        <ScrollToTop />
      </main>
    </PageTransition>
  );
}
