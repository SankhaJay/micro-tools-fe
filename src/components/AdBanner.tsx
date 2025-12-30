'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import Script from 'next/script';

interface AdBannerProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function AdBanner({ className, style }: AdBannerProps) {
  const { isAdsRemoved } = useAppStore();
  const adRef = useRef<HTMLDivElement>(null);
  const adSenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adSenseSlotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;

  useEffect(() => {
    if (isAdsRemoved || !adSenseClientId || !adSenseSlotId) {
      return;
    }

    // Initialize AdSense ad after script loads
    if (window.adsbygoogle && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [isAdsRemoved, adSenseClientId, adSenseSlotId]);

  // Don't render ads if removed or missing config
  if (isAdsRemoved || !adSenseClientId || !adSenseSlotId) {
    return null;
  }

  return (
    <>
      {/* Load AdSense script */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
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

