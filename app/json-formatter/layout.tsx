import type { Metadata } from 'next';

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
    url: '/json-formatter',
  },
  alternates: {
    canonical: '/json-formatter',
  },
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

