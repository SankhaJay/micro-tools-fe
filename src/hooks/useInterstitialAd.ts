'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import Script from 'next/script';

interface UseInterstitialAdOptions {
  frequencyCapMinutes?: number; // Minimum minutes between ads
}

const DEFAULT_FREQUENCY_CAP = 2; // 2 minutes default

export function useInterstitialAd(options: UseInterstitialAdOptions = {}) {
  const { isAdsRemoved } = useAppStore();
  const lastAdTimeRef = useRef<number>(0);
  const adCountRef = useRef<number>(0);
  const frequencyCap = options.frequencyCapMinutes || DEFAULT_FREQUENCY_CAP;

  // Load AdSense script if not already loaded
  useEffect(() => {
    if (isAdsRemoved) {
      return;
    }

    const adSenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    if (!adSenseClientId) {
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector(
      `script[src*="adsbygoogle.js"]`
    );
    if (existingScript) {
      return;
    }

    // Script will be loaded via Next.js Script component in layout or page
  }, [isAdsRemoved]);

  const showInterstitial = useCallback(() => {
    if (isAdsRemoved) {
      return false;
    }

    const adSenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    const adSenseSlotId = process.env.NEXT_PUBLIC_ADSENSE_INTERSTITIAL_SLOT_ID;

    if (!adSenseClientId || !adSenseSlotId) {
      return false;
    }

    // Check frequency cap
    const now = Date.now();
    const timeSinceLastAd = (now - lastAdTimeRef.current) / (1000 * 60); // Convert to minutes

    if (timeSinceLastAd < frequencyCap && lastAdTimeRef.current > 0) {
      // Too soon since last ad
      return false;
    }

    // Show interstitial ad
    try {
      // For interstitial ads, we typically use a different approach
      // This is a placeholder - actual implementation depends on AdSense setup
      // You might need to use Google Ad Manager or a different ad network for interstitials
      // Or use AdSense display ads in a modal/overlay format
      
      console.log('Interstitial ad would be shown here');
      lastAdTimeRef.current = now;
      adCountRef.current += 1;
      
      return true;
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
      return false;
    }
  }, [isAdsRemoved, frequencyCap]);

  const canShowAd = useCallback(() => {
    if (isAdsRemoved) {
      return false;
    }

    const now = Date.now();
    const timeSinceLastAd = (now - lastAdTimeRef.current) / (1000 * 60);

    return timeSinceLastAd >= frequencyCap || lastAdTimeRef.current === 0;
  }, [isAdsRemoved, frequencyCap]);

  return {
    showInterstitial,
    canShowAd,
    adCount: adCountRef.current,
  };
}

