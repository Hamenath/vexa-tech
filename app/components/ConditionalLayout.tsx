"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admin");

  if (isAdminPath) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <Navbar />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <div key={pathname}>
          {children}
        </div>
      </AnimatePresence>
      <Footer />
    </SmoothScroll>
  );
}
