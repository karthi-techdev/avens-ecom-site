import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { API } from "@/lib/urls";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  title: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  brandId: string;
  mainCategoryId: string;
  subCategoryId?: string;
  categoryId?: string;
  images: string[];
  colors?: string[];
  sizes?: string;
  status: "active" | "inactive";
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string; // Added for sorting
  rating?: number; // Added as optional
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  activeTab: string; // New State
  setActiveTab: (tab: string) => void; // New Function
  fetchProducts: (tab?: string) => Promise<void>; // Updated to accept tab
  // fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  activeTab: "featured",

  // Logic for setting active tab
  setActiveTab: (tab: string) => {
    set({ activeTab: tab });
  },

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get(
        `${API.fetchProducts}?status=active&limit=100`,
      );

      let productData = [];
      if (response.data.data && Array.isArray(response.data.data)) {
        productData = response.data.data;
      } else if (Array.isArray(response.data)) {
        productData = response.data;
      } else if (response.data.data && response.data.data.data) {
        productData = response.data.data.data;
      }

      const activeProducts = productData.filter(
        (product: Product) => product.isActive !== false,
      );
      set({ products: activeProducts, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch products",
        isLoading: false,
      });
    }
  },
}));


