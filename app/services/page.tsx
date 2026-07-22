import TrustedClients from "../components/TrustedClients";
import Services from "../components/Services";
import Process from "../components/Process";
import WhyChooseUs from "../components/WhyChooseUs";
import PageTransition from "../components/PageTransition";
import ScrollToTop from "../components/ScrollToTop";

export const metadata = {
  title: "Services | VEXA TECH",
  description: "Explore our premium digital solutions including Web Development, UI/UX Design, and our strategic process.",
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-bg-base text-text-primary pt-20">
        <TrustedClients />
        <Services />
        <Process />
        <WhyChooseUs />
        <ScrollToTop />
      </main>
    </PageTransition>
  );
}
