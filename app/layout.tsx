import "@/styles/tokens.css";
import "@/styles/globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Sofia_Sans, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sofia = Sofia_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-sofia" });
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex" });

export const metadata: Metadata = {
  title: "Nivesh Kannan Elangovanraaj — Data, AI, Impact",
  description: "Data → Decisions → Measurable Impact.",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sofia.variable} ${plex.variable}`}>
      <body>
        <div id="top" />
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          defer
          data-cf-beacon='{"token": "30aab1d339304a75a84e6fb39f8b82e6"}'
        />
      </body>
    </html>
  );
}
