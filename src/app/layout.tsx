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
  title: "Retailers Association of Seychelles | Fair Service to Our Nation",
  description:
    "The Retailers Association of Seychelles (RAS) supports retail businesses across Mahé and the islands with compliance guidance, resources, and a strong member community.",
  keywords: [
    "Seychelles",
    "retailers",
    "retail association",
    "RAS",
    "business",
    "Victoria",
    "Mahé",
  ],
  authors: [{ name: "Balavivek Sivanantham", url: "https://www.balavivek.pro/" }],
  creator: "Balavivek Sivanantham",
  openGraph: {
    title: "Retailers Association of Seychelles",
    description: "Fair Service to Our Nation — supporting Seychelles retailers since inception.",
    url: "https://ras.sc",
    siteName: "Retailers Association of Seychelles",
    locale: "en_SC",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Retailers Association of Seychelles",
      url: "https://ras.sc",
      description:
        "The Retailers Association of Seychelles supports retail businesses across Mahé and the islands with compliance guidance, resources, and a strong member community.",
      creator: {
        "@type": "Person",
        name: "Balavivek Sivanantham",
        url: "https://www.balavivek.pro/",
        jobTitle: "Full Stack Developer",
      },
    },
    {
      "@type": "Person",
      name: "Balavivek Sivanantham",
      url: "https://www.balavivek.pro/",
      jobTitle: "Full Stack Developer",
      sameAs: ["https://www.balavivek.pro/"],
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
