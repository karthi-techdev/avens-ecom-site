
import { create } from 'zustand';
import apiClient from '@/lib/api-client';
import { API } from '@/lib/urls';

export interface Category {
    _id: string;
    name: string;
    slug: string;
    status: 'active' | 'inactive';
}

interface CategoryState {
    categories: Category[];
    isLoading: boolean;
    fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    isLoading: false,
    fetchCategories: async () => {
        set({ isLoading: true });
        try {
            // NOTE: If you want to see "mani-code", ensure status is "active" in DB 
            // or remove "?status=active" from the line below
            const response = await apiClient.get(`${API.listCategory}?limit=100`);
            
            let categoryData = [];
            if (response.data.data && Array.isArray(response.data.data)) {
                categoryData = response.data.data;
            } else if (Array.isArray(response.data)) {
                categoryData = response.data;
            } else if (response.data.data?.data) {
                categoryData = response.data.data.data;
            }

            set({ categories: categoryData, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
        }
    },
}));




