'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components';
import ComingSoonBadge from '@/components/ComingSoonBadge';
import AdBanner from '@/components/AdBanner';
import { tools, Tool } from '@/data/tools';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) {
      return tools;
    }
    const query = searchQuery.toLowerCase();
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleToolClick = (tool: Tool) => {
    if (!tool.available) {
      // Show coming soon message or prevent navigation
      return;
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Micro Tools',
            description: 'Free online utility tools including JSON formatter, unit converter, text case converter, QR code generator, and more',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://micro-tools.com',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: tools.map((tool) => tool.name),
          }),
        }}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <img
                src="/logo.png"
                alt="Micro Tools Logo"
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Micro Tools
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Essential utilities for developers and everyday tasks
            </p>
          </header>

          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredTools.map((tool) => (
              <div key={tool.id} onClick={() => handleToolClick(tool)} className="flex flex-col">
                {tool.available ? (
                  <Link href={tool.href} className="flex-1 flex flex-col">
                    <Card
                      title={tool.name}
                      description={tool.description}
                      icon={<span className="text-4xl">{tool.icon}</span>}
                      className="h-full hover:shadow-xl transition-shadow"
                    />
                  </Link>
                ) : (
                  <div className="relative flex-1 flex flex-col">
                    <Card
                      title={tool.name}
                      description={tool.description}
                      icon={<span className="text-4xl">{tool.icon}</span>}
                      className="h-full opacity-75 cursor-not-allowed"
                    />
                    <div className="absolute top-4 right-4">
                      <ComingSoonBadge />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No tools found matching &quot;{searchQuery}&quot;
              </p>
            </div>
          )}

          {/* Ad Banner */}
          <div className="mb-8">
            <AdBanner className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
