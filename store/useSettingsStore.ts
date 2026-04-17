import { create } from 'zustand';
import apiClient from '@/lib/api-client';
import { API } from '@/lib/urls';

// 1. Data Structure Interfaces
export interface ISettings {
  generalSettings: {
    siteName: string;
    siteDescription: string;
    address: string;
    phone: string;
    email: string;
    workingHours: string;
    currency?: string; // Included from first snippet
  };
  branding: {
    adminLogo: string;
    siteLogo: string;
    favicon: string;
  };
  mailConfiguration?: {
    mailHost: string;
    mailPort: number;
    mailUsername: string;
    mailPassword: string;
    mailEncryption: string;
    mailFromAddress: string;
    mailFromName: string;
  };
}

export interface SecuritySettingsFormData {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

// 2. State Interface
interface SettingsState {
  settings: ISettings | null;
  isLoading: boolean;
  error: string | null;
  fetchSettings: () => Promise<ISettings | null>;
  updateSettings: (
    payload: FormData | Partial<ISettings> | SecuritySettingsFormData
  ) => Promise<ISettings | null>;
}

// 3. Store Implementation
export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  isLoading: false,
  error: null,

  fetchSettings: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get(API.getSettings);
      
      // Robust data extraction logic
      let settingsData = null;
      const resData = response.data;

      if (resData.data && typeof resData.data === 'object' && !Array.isArray(resData.data)) {
        // Standard: { data: { generalSettings: ... } }
        settingsData = resData.data;
      } else if (resData && typeof resData === 'object' && !Array.isArray(resData) && resData.generalSettings) {
        // Flat: { generalSettings: ... }
        settingsData = resData;
      } else if (resData.data?.data) {
        // Double nested: { data: { data: { ... } } }
        settingsData = resData.data.data;
      }

      set({ settings: settingsData, isLoading: false });
      return settingsData;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch settings';
      set({ error: errorMessage, isLoading: false });
      return null;
    }
  },

  updateSettings: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      // Determine if we need 'multipart/form-data' (for logos) or 'application/json'
      const config = payload instanceof FormData 
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : {};

      const response = await apiClient.put(API.updateSettings, payload, config);
      
      // Extract updated data
      const updatedData = response.data?.data || response.data;

      set((state) => ({
        // If the update response doesn't return the full object, 
        // we merge or keep the old state
        settings: updatedData && updatedData.generalSettings ? updatedData : state.settings,
        isLoading: false,
      }));

      return updatedData;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update settings';
      set({ error: errorMessage, isLoading: false });
      // Rethrow so the component can show a toast notification
      throw error;
    }
  },
}));