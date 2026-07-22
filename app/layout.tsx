import type { Metadata } from "next";
import { Quantico, Outfit, Bruno_Ace_SC, Electrolize, Play } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";

const quantico = Quantico({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-quantico" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const brunoAceSC = Bruno_Ace_SC({ subsets: ["latin"], weight: "400", variable: "--font-bruno" });
const electrolize = Electrolize({ subsets: ["latin"], weight: "400", variable: "--font-electrolize" });
const play = Play({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-play" });

export const metadata: Metadata = {
  title: "VEXA TECH | Building Smart Solutions for Smarter Businesses",
  description: "VEXA TECH is a growth-focused digital partner that combines strategy, design, and technology to help businesses launch stronger, communicate better, and scale confidently.",
  icons: {
    icon: "/vexatechlogo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${outfit.className} ${quantico.variable} ${outfit.variable} ${brunoAceSC.variable} ${electrolize.variable} ${play.variable} bg-bg-base text-text-primary antialiased selection:bg-brand-accent/10 selection:text-brand-accent`}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
