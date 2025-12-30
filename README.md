This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Site Configuration (for SEO)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Google AdSense Configuration (optional for development)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT_ID=xxxxxxxxxx
NEXT_PUBLIC_ADSENSE_INTERSTITIAL_SLOT_ID=xxxxxxxxxx
```

### Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## SEO Optimization

This app is fully optimized for search engines with:

- **Metadata**: Comprehensive meta tags, Open Graph, and Twitter Card support
- **Structured Data**: JSON-LD schema markup for better search engine understanding
- **Sitemap**: Automatic sitemap generation at `/sitemap.xml`
- **Robots.txt**: Proper robots.txt configuration at `/robots.txt`
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **Canonical URLs**: Prevents duplicate content issues

### SEO Features

- Page-specific metadata for each tool
- Open Graph tags for social media sharing
- Twitter Card support
- Structured data (Schema.org) for rich snippets
- Automatic sitemap generation
- SEO-friendly URLs

Make sure to set `NEXT_PUBLIC_SITE_URL` in your environment variables for production to ensure all SEO features work correctly.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
