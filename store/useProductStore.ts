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
  mainCategoryId?: string | { name: string };
  subCategoryId?: string;
  categoryId?: string | { name: string };
  images: string[];
  colors?: string[];
  sizes?: string[] | string;
  badge?: string;
  shortDescription?: string;
  status: "active" | "inactive";
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  rating?: number;
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null; // For Quick View functionality
  isLoading: boolean;
  error: string | null;
  activeTab: string; // Tab filtering state
  setActiveTab: (tab: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  fetchProducts: (tab?: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  activeTab: "featured",

  // Set the product currently viewed in a modal/quickview
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  // Logic for setting active tab
  setActiveTab: (tab: string) => {
    set({ activeTab: tab });
  },

  fetchProducts: async (tab) => {
    set({ isLoading: true, error: null });
    
    // If a specific tab was requested, update it in the state
    if (tab) set({ activeTab: tab });

    try {
      const response = await apiClient.get(
        `${API.fetchProducts}?status=active&limit=100`
      );

      // Handle various response structures safely
      let productData = [];
      if (response.data?.data && Array.isArray(response.data.data)) {
        productData = response.data.data;
      } else if (Array.isArray(response.data)) {
        productData = response.data;
      } else if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
        productData = response.data.data.data;
      }

      // Filter for active products only
      const activeProducts = productData.filter(
        (product: Product) => product.isActive !== false && !product.isDeleted
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