import Team from "../components/Team";
import PageTransition from "../components/PageTransition";
import ScrollToTop from "../components/ScrollToTop";

export const metadata = {
  title: "Team | VEXA TECH",
  description: "Meet the visionary leadership behind VEXA TECH.",
};

export default function TeamPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-white pt-20">
        <Team />
        <ScrollToTop />
      </main>
    </PageTransition>
  );
}
