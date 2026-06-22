import Contact from "../components/Contact";
import PageTransition from "../components/PageTransition";
import ScrollToTop from "../components/ScrollToTop";

export const metadata = {
  title: "Contact | VEXA TECH",
  description: "Get in touch with us to start your next premium digital project.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-white pt-20">
        <Contact />
        <ScrollToTop />
      </main>
    </PageTransition>
  );
}
