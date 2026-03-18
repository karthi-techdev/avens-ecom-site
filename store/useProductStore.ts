import { create } from 'zustand';
import apiClient from '@/lib/api-client';
import { API } from '@/lib/urls';

export interface Product {
  _id: string;
  name: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;

  fetchFilteredProducts: (tag: string) => Promise<void>;
  fetchNewProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchFilteredProducts: async (tag: string) => {
    set({ loading: true, error: null });
    try {
      const res = await apiClient.get(`${API.filterProducts}?tag=${tag}`);

      set({
        products: res.data.data || [],
        loading: false
      });
    } catch (err: any) {
      set({
        error: err.message || 'Error fetching products',
        loading: false
      });
    }
  },

  fetchNewProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await apiClient.get(API.newProducts);

      set({
        products: res.data.data || [],
        loading: false
      });
    } catch (err: any) {
      set({
        error: err.message || 'Error fetching new products',
        loading: false
      });
    }
  }
}));