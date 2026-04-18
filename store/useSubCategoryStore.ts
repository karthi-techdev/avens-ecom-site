import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { API } from "@/lib/urls";

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  isActive: boolean;
  mainCategoryId: string;
}

interface SubCategoryState {
  subCategories: SubCategory[];
  isLoading: boolean;
  error: string | null;
  fetchSubCategories: () => Promise<void>;
  fetchSubCategoryByMainCategory: (mainCategoryId: string) => Promise<void>;
}

export const useSubCategoryStore = create<SubCategoryState>((set) => ({
  subCategories: [],
  isLoading: false,
  error: null,

  // ✅ Get all active subcategories
  fetchSubCategories: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiClient.get(
        `${API.listSubCategory}?status=active&limit=100`
      );

      let subCategoryData: SubCategory[] = [];

      // Handle multiple API formats
      if (Array.isArray(response.data?.data)) {
        subCategoryData = response.data.data;
      } else if (Array.isArray(response.data)) {
        subCategoryData = response.data;
      } else if (Array.isArray(response.data?.data?.data)) {
        subCategoryData = response.data.data.data;
      }

      // Safety filter
      const activeSubCategories = subCategoryData.filter(
        (sub) => sub.isActive !== false
      );

      set({
        subCategories: activeSubCategories,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to fetch subcategories",
        isLoading: false,
      });
    }
  },

  // ✅ Get subcategories by main category
  fetchSubCategoryByMainCategory: async (mainCategoryId: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiClient.get(
        `${API.subCategoryByMainCategoryId}${mainCategoryId}`
      );

      let subCategoryData: SubCategory[] = [];

      if (Array.isArray(response.data?.data)) {
        subCategoryData = response.data.data;
      } else if (Array.isArray(response.data?.data?.data)) {
        subCategoryData = response.data.data.data;
      }

      const activeSubCategories = subCategoryData.filter(
        (sub) => sub.isActive !== false
      );

      set({
        subCategories: activeSubCategories,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to fetch subcategories",
        isLoading: false,
      });
    }
  },
}));