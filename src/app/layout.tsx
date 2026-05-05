import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/lenis";
import Background from "@/components/background";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Closer Intellect AI | AI Sales Enablement Platform",
  description: "Automate your outreach with AI Voice & SMS. The 'Second Brain' for your sales team."
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
        <Background />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
