import { create } from 'zustand';
import apiClient from '@/lib/api-client';
import { API } from '@/lib/urls';

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
    isActive: boolean;
}

interface BrandState {
    brands: Brand[];
    isLoading: boolean;
    error: string | null;
    fetchBrands: () => Promise<void>;
}

export const useBrandStore = create<BrandState>((set) => ({
    brands: [],
    isLoading: false,
    error: null,
    fetchBrands: async () => {
        set({ isLoading: true, error: null });
        try {
            // Filtering for active status directly in the API call
            const response = await apiClient.get(`${API.listBrand}?status=active&limit=100`);
            
            // Handle both { data: [...] } and { data: { data: [...] } } structures
            let brandData = [];
            if (response.data.data && Array.isArray(response.data.data)) {
                brandData = response.data.data;
            } else if (Array.isArray(response.data)) {
                brandData = response.data;
            } else if (response.data.data && response.data.data.data) {
                // Some endpoints return nested data structure
                brandData = response.data.data.data;
            }

            // Secondary safety filter: Ensure we only keep items where isActive is explicitly true
            const activeBrands = brandData.filter((brand: Brand) => brand.isActive !== false);
            
            set({ brands: activeBrands, isLoading: false });
        } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Failed to fetch brands', 
                isLoading: false 
            });
        }
    },
}));
