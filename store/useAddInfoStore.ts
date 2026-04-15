import { create } from 'zustand';
import apiClient from '@/lib/api-client';
import { API } from '@/lib/urls';

// 1. Data Structure Interface
export interface IAddInfo {
    _id: string;
    key: string;
    value: string;
    isActive: boolean;
}

// 2. State Interface
interface AddInfoState {
    addInfos: IAddInfo[];
    isLoading: boolean;
    error: string | null;
    fetchAddInfos: () => Promise<void>;
}

// 3. Store Implementation
export const useAddInfoStore = create<AddInfoState>((set) => ({
    addInfos: [],
    isLoading: false,
    error: null,

    fetchAddInfos: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.get(API.listAddInfos);
            
            // Handle various data structures as per your Brand Store logic
            let data = [];
            if (response.data.data && Array.isArray(response.data.data)) {
                data = response.data.data;
            } else if (Array.isArray(response.data)) {
                data = response.data;
            } else if (response.data.data && response.data.data.data) {
                data = response.data.data.data;
            }

            // Filter for active items only
            const activeInfos = data.filter((item: IAddInfo) => item.isActive !== false);
            
            set({ addInfos: activeInfos, isLoading: false });
        } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Failed to fetch additional info', 
                isLoading: false 
            });
        }
    },
}));