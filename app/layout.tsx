import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "Micro Tools - Free Online Utility Tools",
    template: "%s | Micro Tools",
  },
  description: "Free online utility tools including JSON formatter, unit converter, text case converter, QR code generator, PDF tools, and more. Fast, secure, and easy to use.",
  keywords: [
    "json formatter",
    "json validator",
    "json minify",
    "unit converter",
    "text case converter",
    "qr code generator",
    "pdf converter",
    "online tools",
    "utility tools",
    "developer tools",
  ],
  authors: [{ name: "Micro Tools" }],
  creator: "Micro Tools",
  publisher: "Micro Tools",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Micro Tools",
    title: "Micro Tools - Free Online Utility Tools",
    description: "Free online utility tools including JSON formatter, unit converter, text case converter, QR code generator, PDF tools, and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Micro Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Micro Tools - Free Online Utility Tools",
    description: "Free online utility tools including JSON formatter, unit converter, text case converter, QR code generator, PDF tools, and more.",
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
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-8942568592232591" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
