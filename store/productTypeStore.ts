import { create } from 'zustand';
import apiClient from '@/lib/api-client';
import { API } from '@/lib/urls';

export interface Product {
    _id: string;
    name: string;
    slug: string;
    price: number;
    discountPrice: number;
    thumbnail: string;
    type: string;
    isActive: boolean;
}

interface ProductTypeState {
    deals: Product[];
    topSelling: Product[];
    hotReleases: Product[];
    isLoading: boolean;
    error: string | null;

    fetchDeals: () => Promise<void>;
    fetchTopSelling: () => Promise<void>;
    fetchHotReleases: () => Promise<void>;
}

export const useProductTypeStore = create<ProductTypeState>((set) => ({
    deals: [],
    topSelling: [],
    hotReleases: [],
    isLoading: false,
    error: null,

    fetchDeals: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.get(
                `${API.listProduct}?type=deals&status=active&limit=100`
            );

            let data: Product[] = [];

            if (response.data.data && Array.isArray(response.data.data)) {
                data = response.data.data;
            } else if (response.data.data?.data) {
                data = response.data.data.data;
            } else if (Array.isArray(response.data)) {
                data = response.data;
            }

            data = data.filter(p => p.isActive !== false);

            set({ deals: data, isLoading: false });

            set({ deals: data, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch deals',
                isLoading: false
            });
        }
    },

    fetchTopSelling: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.get(
                `${API.listProduct}?type=topSelling&status=active&limit=100`
            );

            let data: Product[] = [];

            if (response.data.data && Array.isArray(response.data.data)) {
                data = response.data.data;
            } else if (response.data.data?.data) {
                data = response.data.data.data;
            } else if (Array.isArray(response.data)) {
                data = response.data;
            }

            data = data.filter(p => p.isActive !== false);
            set({ topSelling: data, isLoading: false });

            set({ topSelling: data, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch top selling',
                isLoading: false
            });
        }
    },

    fetchHotReleases: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.get(
                `${API.listProduct}?type=hotReleases&status=active&limit=100`
            );

            let data: Product[] = [];

            if (response.data.data && Array.isArray(response.data.data)) {
                data = response.data.data;
            } else if (response.data.data?.data) {
                data = response.data.data.data;
            } else if (Array.isArray(response.data)) {
                data = response.data;
            }

            data = data.filter(p => p.isActive !== false);
            set({ hotReleases: data, isLoading: false });

            set({ hotReleases: data, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch hot releases',
                isLoading: false
            });
        }
    }
}));