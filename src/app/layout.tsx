import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ras.sc"),
  title: {
    template: "%s | Retailers Association of Seychelles",
    default: "Retailers Association of Seychelles (RAS) — Official Website",
  },
  description:
    "The Retailers Association of Seychelles (RAS) is the official body supporting retail businesses across Mahé, Praslin, and La Digue — compliance guidance, STC & FTC notices, and a certified member directory.",
  keywords: [
    "Retailers Association of Seychelles",
    "RAS Seychelles",
    "RAS",
    "seychelles retailers",
    "retail association seychelles",
    "seychelles retail membership",
    "seychelles business association",
    "retail business seychelles",
    "seychelles trading corporation retailers",
    "FTC seychelles",
    "Mahé retailers",
    "Praslin retailers",
    "La Digue retailers",
    "Victoria Seychelles retail",
    "seychelles compliance retail",
  ],
  openGraph: {
    title: "Retailers Association of Seychelles (RAS)",
    description:
      "Official body supporting retail businesses across Mahé, Praslin, and La Digue — compliance guidance, STC & FTC notices, certified member directory.",
    url: "https://ras.sc",
    siteName: "Retailers Association of Seychelles",
    locale: "en_SC",
    type: "website",
    images: [
      {
        url: "https://ras.sc/images/logo.jpg",
        width: 800,
        height: 800,
        alt: "Retailers Association of Seychelles Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Retailers Association of Seychelles (RAS)",
    description:
      "Official body supporting retail businesses across Mahé, Praslin, and La Digue.",
    images: ["https://ras.sc/images/logo.jpg"],
  },
  alternates: {
    canonical: "https://ras.sc",
  },
  verification: {
    other: {
      "msvalidate.01": "CCDA76ADA45C8B3150E744DB4C3E86E9",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ras.sc/#organization",
      name: "Retailers Association of Seychelles",
      alternateName: "RAS",
      url: "https://ras.sc",
      logo: {
        "@type": "ImageObject",
        url: "https://ras.sc/images/logo.jpg",
      },
      description:
        "The Retailers Association of Seychelles (RAS) is the official body supporting retail businesses across Mahé, Praslin, and La Digue with compliance guidance, STC & FTC notices, and a certified member directory.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Docklands",
        addressLocality: "Victoria",
        addressRegion: "Mahé",
        addressCountry: "SC",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+248-2-521-500",
          contactType: "customer support",
          availableLanguage: "English",
        },
      ],
      sameAs: ["https://ras.sc"],
    },
    {
      "@type": "WebSite",
      "@id": "https://ras.sc/#website",
      name: "Retailers Association of Seychelles",
      url: "https://ras.sc",
      publisher: { "@id": "https://ras.sc/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://ras.sc/members?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClerkProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ClerkProvider>
        <Analytics />
      </body>
    </html>
  );
}
