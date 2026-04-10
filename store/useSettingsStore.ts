import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { API } from "@/lib/urls";

export interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  currency: string;
}

export interface Branding {
  siteLogo: string;
  adminLogo: string;
  favicon: string;
}

interface SettingsState {
  generalSettings: GeneralSettings;
  branding: Branding; // ✅ Added branding
  isLoading: boolean;
  error: string | null;
  fetchSettings: () => Promise<any>;
  updateSettings: (payload: any) => Promise<any>; // ✅ Changed to any to accept FormData or JSON
}

const initialGeneral: GeneralSettings = {
  siteName: '',
  siteDescription: '',
  address: '',
  phone: '',
  email: '',
  workingHours: '',
  currency: ''
};

const initialBranding: Branding = {
  siteLogo: '',
  adminLogo: '',
  favicon: ''
};

export const useSettingsStore = create<SettingsState>((set) => ({
  generalSettings: initialGeneral,
  branding: initialBranding,
  isLoading: false,
  error: null,

  // ✅ Fetch Settings (Handles both General and Branding)
  fetchSettings: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get(API.getSettings);
      
      const data = response.data?.data || response.data;
      
      const general = data?.generalSettings || data || initialGeneral;
      const branding = data?.branding || initialBranding;

      set({
        generalSettings: general,
        branding: branding,
        isLoading: false,
      });

      return { generalSettings: general, branding: branding };
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch settings",
        isLoading: false,
      });
      return null;
    }
  },

  // ✅ Update Settings (Handles JSON for General and FormData for Branding)
  updateSettings: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.put(API.updateSettings, payload);
      
      const data = response.data?.data || response.data;
      
      // Update local state with whatever the server returned
      const updatedGeneral = data?.generalSettings || (payload.generalSettings ? payload.generalSettings : null);
      const updatedBranding = data?.branding || null;

      set((state) => ({
        generalSettings: updatedGeneral || state.generalSettings,
        branding: updatedBranding || state.branding,
        isLoading: false,
      }));

      return data;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to update settings",
        isLoading: false,
      });
      throw error; 
    }
  },
}));