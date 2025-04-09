import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sir Wicknell Chivayo | Exclusive VIP Concierge Service",
  description: "Connect directly with Sir Wicknell Chivayo through our exclusive VIP concierge service. Experience premium business networking and luxury lifestyle insights.",
  keywords: "Wicknell Chivayo, Sir Wicknell, Zimbabwe Business, VIP Service, Luxury Lifestyle, Premium Concierge",
  openGraph: {
    title: "Sir Wicknell Chivayo - VIP Concierge Service",
    description: "Experience exclusive access to Sir Wicknell's premium business network and luxury lifestyle insights.",
    images: [
      {
        url: "/wc-premium-crest.png",
        width: 800,
        height: 600,
        alt: "Sir Wicknell Chivayo Premium Crest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sir Wicknell Chivayo - VIP Concierge Service",
    description: "Experience exclusive access to Sir Wicknell's premium business network and luxury lifestyle insights.",
    images: ["/wc-premium-crest.png"],
  },
  icons: {
    icon: "/wc-premium-crest.png",
    shortcut: "/wc-premium-crest.png",
    apple: "/wc-premium-crest.png",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#d4af37",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics/>
        {children}
      </body>
    </html>
  );
}
