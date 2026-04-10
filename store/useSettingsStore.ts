import { create } from 'zustand';
import apiClient from '@/lib/api-client'; // Using your brand store's import style
import { API } from '@/lib/urls'; // Using your brand store's import style

// 1. Data Structure Interfaces
export interface ISettings {
    generalSettings: {
        siteName: string;
        siteDescription: string;
        address: string;
        phone: string;
        email: string;
        workingHours: string;
    };
    branding: {
        adminLogo: string;
        siteLogo: string;
        favicon: string;
    };
    mailConfiguration: {
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

// 2. State Interface (Following BrandState format)
interface SettingsState {
    settings: ISettings | null;
    isLoading: boolean;
    error: string | null;
    fetchSettings: () => Promise<ISettings | null>;
    updateSettings: (payload: FormData | Partial<ISettings> | SecuritySettingsFormData) => Promise<ISettings | null>;
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
            // console.log("res",response)
            // Handle both { data: {...} } and { data: { data: {...} } } structures
            // Exactly like the Brand Store data extraction logic
            let settingsData = null;
            if (response.data.data && typeof response.data.data === 'object' && !Array.isArray(response.data.data)) {
                settingsData = response.data.data;
            } else if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
                settingsData = response.data;
            } else if (response.data.data && response.data.data.data) {
                // Some endpoints return nested data structure
                settingsData = response.data.data.data;
            }

            // Note: Since Settings is an object, we don't use .filter(), 
            // but we ensure the object is set correctly
            set({ settings: settingsData, isLoading: false });
            return settingsData;
        } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Failed to fetch settings', 
                isLoading: false 
            });
            return null;
        }
    },

    updateSettings: async (payload) => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.put(API.updateSettings, payload);
            
            // Handle data extraction for updates
            let updatedData = null;
            if (response.data.data) {
                updatedData = response.data.data;
            } else {
                updatedData = response.data;
            }

            // Update local state (Secondary safety: check if data exists before setting)
            set((state) => ({
                settings: updatedData || state.settings,
                isLoading: false
            }));

            return updatedData;
        } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Failed to update settings', 
                isLoading: false 
            });
            throw error; // Rethrow for component-level toast handling
        }
    },
}));