/**
 * AdService - Utility functions for ad management
 */

/**
 * Check if ads should be displayed
 */
export function shouldShowAds(): boolean {
  // Ads are always shown (no removal feature implemented yet)
  return true;
}

/**
 * Get AdSense configuration from environment
 */
export function getAdSenseConfig() {
  return {
    clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
    slotId: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || '',
    interstitialSlotId: process.env.NEXT_PUBLIC_ADSENSE_INTERSTITIAL_SLOT_ID || '',
  };
}

/**
 * Check if AdSense is properly configured
 */
export function isAdSenseConfigured(): boolean {
  const config = getAdSenseConfig();
  return !!(config.clientId && config.slotId);
}

/**
 * Track ad impression (for analytics if needed)
 */
export function trackAdImpression(adType: 'banner' | 'interstitial') {
  // Placeholder for analytics tracking
  if (process.env.NODE_ENV === 'development') {
    console.log(`Ad impression tracked: ${adType}`);
  }
}

