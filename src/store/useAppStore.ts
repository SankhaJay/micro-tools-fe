import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultCurrency: string;
  defaultDistanceUnit: 'km' | 'miles';
  defaultWeightUnit: 'kg' | 'lbs';
}

interface AppState {
  // Ads state
  isAdsRemoved: boolean;
  
  // User preferences
  preferences: UserPreferences;
  
  // Actions
  setAdsRemoved: (removed: boolean) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'system',
  defaultCurrency: 'USD',
  defaultDistanceUnit: 'km',
  defaultWeightUnit: 'kg',
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      isAdsRemoved: false,
      preferences: defaultPreferences,
      
      // Actions
      setAdsRemoved: (removed: boolean) => {
        set({ isAdsRemoved: removed });
      },
      
      updatePreferences: (prefs: Partial<UserPreferences>) => {
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        }));
      },
      
      resetPreferences: () => {
        set({ preferences: defaultPreferences });
      },
    }),
    {
      name: 'micro-tools-storage', // localStorage key
      partialize: (state) => ({
        isAdsRemoved: state.isAdsRemoved,
        preferences: state.preferences,
      }),
    }
  )
);

