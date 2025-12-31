import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://micro-tools.com';

export const metadata: Metadata = {
  title: 'JSON Formatter - Format, Minify & Validate JSON Online',
  description: 'Free online JSON formatter, validator, and minifier. Format JSON with syntax highlighting, validate JSON syntax, minify JSON files, and more. Fast and secure JSON tools.',
  keywords: [
    'json formatter',
    'json validator',
    'json minify',
    'json beautifier',
    'format json',
    'json parser',
    'json editor',
    'online json tools',
  ],
  openGraph: {
    title: 'JSON Formatter - Format, Minify & Validate JSON Online',
    description: 'Free online JSON formatter, validator, and minifier. Format JSON with syntax highlighting, validate JSON syntax, minify JSON files, and more.',
    type: 'website',
    url: `${siteUrl}/json-formatter`,
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'JSON Formatter Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter - Format, Minify & Validate JSON Online',
    description: 'Free online JSON formatter, validator, and minifier. Format JSON with syntax highlighting, validate JSON syntax, minify JSON files, and more.',
    images: [`${siteUrl}/logo.png`],
  },
  alternates: {
    canonical: `${siteUrl}/json-formatter`,
  },
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

