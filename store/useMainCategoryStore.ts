import { create } from 'zustand';
import apiClient from '@/lib/api-client';
import { API } from '@/lib/urls';

export interface MainCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  icon: string;
  isActive: boolean;
}

interface MainCategoryState {
  mainCategories: MainCategory[];
  isLoading: boolean;
  error: string | null;
  fetchMainCategories: () => Promise<void>;
}

export const useMainCategoryStore = create<MainCategoryState>((set) => ({
  mainCategories: [],
  isLoading: false,
  error: null,

  fetchMainCategories: async () => {
    set({ isLoading: true, error: null });

    try {
      // API call (same pattern as brand)
      const response = await apiClient.get(
        `${API.listMainCategory}?status=active&limit=100`
      );

      // Handle multiple response formats
      let categoryData: MainCategory[] = [];

      if (Array.isArray(response.data?.data)) {
        categoryData = response.data.data;
      } else if (Array.isArray(response.data)) {
        categoryData = response.data;
      } else if (Array.isArray(response.data?.data?.data)) {
        categoryData = response.data.data.data;
      }

      // Safety filter (only active)
      const activeCategories = categoryData.filter(
        (cat) => cat.isActive !== false
      );

      set({
        mainCategories: activeCategories,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message ||
          'Failed to fetch main categories',
        isLoading: false,
      });
    }
  },
}));