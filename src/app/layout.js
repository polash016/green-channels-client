import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ClientProviders from "./Providers/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Green Channels | Leading Textile & Garment Sourcing in Bangladesh",
    template: "%s | Green Channels"
  },
  description: "Green Channels Ltd. is a premier textile and garment sourcing agency in Bangladesh, specializing in sustainable manufacturing and ethical trade for global brands.",
  keywords: ["textile sourcing", "garment manufacturing", "Bangladesh textiles", "sustainable fashion", "ethical sourcing", "garment trade", "Green Channels"],
  authors: [{ name: "Green Channels Ltd." }],
  creator: "Green Channels Ltd.",
  publisher: "Green Channels Ltd.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Green Channels | Textile & Garment Sourcing Excellence",
    description: "Leading the way in sustainable textile sourcing and ethical manufacturing practices across Bangladesh.",
    url: "https://greenchannels.com",
    siteName: "Green Channels",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Green Channels - Textile & Garment Sourcing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Channels | Textile & Garment Sourcing",
    description: "Sustainable textile sourcing and ethical manufacturing in Bangladesh.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
