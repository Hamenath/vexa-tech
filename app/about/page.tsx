import About from "../components/About";
import PageTransition from "../components/PageTransition";
import ScrollToTop from "../components/ScrollToTop";

export const metadata = {
  title: "About | VEXA TECH",
  description: "Learn more about VEXA TECH and our mission to architect elite digital ecosystems.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-bg-base text-text-primary pt-20">
        <About />
        <ScrollToTop />
      </main>
    </PageTransition>
  );
}
