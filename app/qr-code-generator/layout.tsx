import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://micro-tools.com';

export const metadata: Metadata = {
  title: 'QR Code Generator - Create QR Codes Online for Free',
  description:
    'Generate QR codes instantly from text, URLs, or any string. Free online QR code generator with customizable size and error correction levels.',
  keywords: [
    'qr code generator',
    'qr code maker',
    'free qr code',
    'online qr code generator',
    'qr code creator',
    'generate qr code',
    'qr code from text',
    'qr code from url',
  ],
  openGraph: {
    title: 'QR Code Generator - Create QR Codes Online for Free',
    description:
      'Generate QR codes instantly from text, URLs, or any string. Free online QR code generator with customizable size and error correction levels.',
    url: `${siteUrl}/qr-code-generator`,
    images: [
      {
        url: `${siteUrl}/og-qr-generator.jpg`,
        width: 1200,
        height: 630,
        alt: 'QR Code Generator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Generator - Create QR Codes Online for Free',
    description:
      'Generate QR codes instantly from text, URLs, or any string. Free online QR code generator with customizable size and error correction levels.',
    images: [`${siteUrl}/twitter-qr-generator.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/qr-code-generator`,
  },
};

export default function QrCodeGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

