import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://micro-tools.com';

export const metadata: Metadata = {
  title: 'QR Code Scanner - Scan QR Codes Online with Camera',
  description:
    'Scan QR codes instantly using your device camera. Free online QR code scanner that works in your browser without any app installation.',
  keywords: [
    'qr code scanner',
    'scan qr code',
    'qr code reader',
    'online qr scanner',
    'camera qr scanner',
    'web qr scanner',
    'qr code decoder',
  ],
  openGraph: {
    title: 'QR Code Scanner - Scan QR Codes Online with Camera',
    description:
      'Scan QR codes instantly using your device camera. Free online QR code scanner that works in your browser without any app installation.',
    url: `${siteUrl}/qr-code-scanner`,
    images: [
      {
        url: `${siteUrl}/og-qr-scanner.jpg`,
        width: 1200,
        height: 630,
        alt: 'QR Code Scanner Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Scanner - Scan QR Codes Online with Camera',
    description:
      'Scan QR codes instantly using your device camera. Free online QR code scanner that works in your browser without any app installation.',
    images: [`${siteUrl}/twitter-qr-scanner.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/qr-code-scanner`,
  },
};

export default function QrCodeScannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

