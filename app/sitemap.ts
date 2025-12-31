import { MetadataRoute } from 'next';
import { tools } from '@/data/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://micro-tools.com';

  const toolRoutes = tools
    .filter((tool) => tool.available)
    .map((tool) => ({
      url: `${baseUrl}${tool.href}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...toolRoutes,
  ];
}

