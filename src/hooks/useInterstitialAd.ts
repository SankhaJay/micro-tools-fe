'use client';

import { useCallback, useRef } from 'react';

interface UseInterstitialAdOptions {
  frequencyCapMinutes?: number; // Minimum minutes between ads
}

const DEFAULT_FREQUENCY_CAP = 2; // 2 minutes default

export function useInterstitialAd(options: UseInterstitialAdOptions = {}) {
  const lastAdTimeRef = useRef<number>(0);
  const adCountRef = useRef<number>(0);
  const frequencyCap = options.frequencyCapMinutes || DEFAULT_FREQUENCY_CAP;

  const showInterstitial = useCallback(() => {
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
  }, [frequencyCap]);

  const canShowAd = useCallback(() => {
    const now = Date.now();
    const timeSinceLastAd = (now - lastAdTimeRef.current) / (1000 * 60);

    return timeSinceLastAd >= frequencyCap || lastAdTimeRef.current === 0;
  }, [frequencyCap]);

  return {
    showInterstitial,
    canShowAd,
    adCount: adCountRef.current,
  };
}

