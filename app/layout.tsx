import "@/styles/tokens.css";
import "@/styles/globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Sofia_Sans, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";
import { Suspense } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
import { siteMetadata } from "@/lib/siteMetadata";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sofia = Sofia_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-sofia" });
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex" });

const ogImageUrl = new URL(siteMetadata.ogImage, siteMetadata.url).toString();

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteMetadata.url}/#nivesh`,
  name: siteMetadata.name,
  alternateName: siteMetadata.legalName,
  givenName: siteMetadata.givenName,
  familyName: siteMetadata.familyName,
  jobTitle: siteMetadata.jobTitle,
  description: siteMetadata.description,
  url: siteMetadata.url,
  image: ogImageUrl,
  email: `mailto:${siteMetadata.email}`,
  telephone: siteMetadata.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteMetadata.location.city,
    addressRegion: siteMetadata.location.region,
    addressCountry: siteMetadata.location.country,
  },
  nationality: siteMetadata.nationality,
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "UCLA Anderson School of Management",
      description: "Master of Science in Business Analytics (MSBA)",
    },
  ],
  knowsAbout: siteMetadata.knowsAbout,
  hasOccupation: {
    "@type": "Occupation",
    name: siteMetadata.occupation.name,
    occupationalCategory: siteMetadata.occupation.category,
    description: siteMetadata.occupation.description,
  },
  sameAs: siteMetadata.sameAs,
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteMetadata.title,
  url: siteMetadata.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteMetadata.url}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteMetadata.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: `${siteMetadata.url}/#projects`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Resume",
      item: `${siteMetadata.url}/resume`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contact",
      item: `${siteMetadata.url}/#contact`,
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  keywords: [...siteMetadata.keywords],
  applicationName: siteMetadata.name,
  creator: siteMetadata.legalName,
  publisher: siteMetadata.legalName,
  alternates: {
    canonical: siteMetadata.url,
  },
  authors: [{ name: siteMetadata.legalName, url: siteMetadata.url }],
  openGraph: {
    type: "website",
    url: siteMetadata.url,
    siteName: siteMetadata.name,
    title: siteMetadata.title,
    description: siteMetadata.description,
    locale: siteMetadata.locale,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    "geo.region": "US-CA",
    "geo.placename": siteMetadata.location.city,
    "geo.position": "34.0522;-118.2437",
    "msvalidate.01": "48A73D3EFF38FE364E22984A165EA361",
  },
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
        <Analytics />
        <SpeedInsights />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-script" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        ) : null}
        <Script id="person-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(personJsonLd)}
        </Script>
        <Script id="website-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(webSiteJsonLd)}
        </Script>
        <Script id="breadcrumb-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(breadcrumbJsonLd)}
        </Script>
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
