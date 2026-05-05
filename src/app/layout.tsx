import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/lenis";
import Background from "@/components/background";
import JsonLd from "@/components/json-ld";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Closer Intellect AI | AI Sales Enablement & Automation",
  description: "Automate your sales outreach with AI Voice, SMS, and Lead Management. The ultimate 'Second Brain' for your sales team to close more deals.",
  keywords: ["AI Sales", "Sales Automation", "AI Voice", "AI SMS", "Lead Management", "Sales Enablement", "Closer Intellect", "SaaS"],
  authors: [{ name: "Closer Intellect Team" }],
  creator: "Closer Intellect AI",
  publisher: "Closer Intellect AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://closerintellect.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://closerintellect.com",
    siteName: "Closer Intellect AI",
    title: "Closer Intellect AI | AI Sales Enablement & Automation",
    description: "Automate your sales outreach with AI Voice, SMS, and Lead Management.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Closer Intellect AI Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Closer Intellect AI | AI Sales Enablement & Automation",
    description: "Automate your sales outreach with AI Voice, SMS, and Lead Management.",
    images: ["/og-image.png"],
    creator: "@closerintellect",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased w-full min-h-screen overflow-x-hidden relative`}
      >
        <JsonLd />
        <Background />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
