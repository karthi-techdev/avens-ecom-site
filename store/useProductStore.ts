import { create } from 'zustand';
import apiClient from '@/lib/api-client';
import { API } from '@/lib/urls';

interface ProductState {
  products: any[];
  isLoading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  fetchProducts: (type: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  activeTab: "featured",

  setActiveTab: (tab) => set({ activeTab: tab }),

  fetchProducts: async (type) => {
    set({ isLoading: true });

    try {
      let url = API.filterProducts;

      if (type === "new") {
        url = `${API.filterProducts}?type=new`;
      } else {
        url = `${API.filterProducts}?type=${type}`;
      }

      const res = await apiClient.get(url);
      console.log("🌍 API URL:", url);
      console.log("🔥 FULL RESPONSE:", res);
      console.log("🔥 API DATA ONLY:", res.data);
      let data = [];

      if (res.data.data) {
        data = res.data.data;
      } else if (Array.isArray(res.data)) {
        data = res.data;
      }

      set({ products: data, isLoading: false });

    } catch (err) {
      console.log(err);
      set({ isLoading: false });
    }
  }
}));