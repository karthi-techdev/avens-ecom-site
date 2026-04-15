import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { API } from "@/lib/urls";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  status: string;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiClient.get(
        `${API.listCategory}?status=active&limit=100`
      );

      let categoryData: Category[] = [];

      if (response.data.data && Array.isArray(response.data.data)) {
        categoryData = response.data.data;
      } else if (Array.isArray(response.data)) {
        categoryData = response.data;
      } else if (response.data.data?.data) {
        categoryData = response.data.data.data;
      }

      const activeCategories = categoryData.filter(
        (cat: Category) => cat.status !== "inactive"
      );

      set({ categories: activeCategories, isLoading: false });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch categories",
        isLoading: false,
      });
    }
  },
}));