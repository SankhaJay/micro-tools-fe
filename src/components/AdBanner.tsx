'use client';

import { useRef, useState, useCallback } from 'react';
import Script from 'next/script';

interface AdBannerProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function AdBanner({ className, style }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adSenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adSenseSlotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;
  const [adInitialized, setAdInitialized] = useState(false);

  // Show placeholder in development when AdSense is not configured
  if (!adSenseClientId || !adSenseSlotId) {
    return (
      <div
        className={`${className || ''} flex items-center justify-center bg-gray-200 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 min-h-[100px]`}
        style={style}
      >
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Ad Banner Placeholder
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Configure AdSense in .env.local to show ads
          </p>
        </div>
      </div>
    );
  }

  const initializeAd = useCallback(() => {
    if (adInitialized || !adRef.current || !window.adsbygoogle) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setAdInitialized(true);
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [adInitialized]);

  const handleScriptLoad = () => {
    initializeAd();
  };

  return (
    <>
      {/* Load AdSense script */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
        onLoad={handleScriptLoad}
      />
      
      {/* Ad container */}
      <div className={className} style={style}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adSenseClientId}
          data-ad-slot={adSenseSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

