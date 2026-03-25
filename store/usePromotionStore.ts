import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { API } from "@/lib/urls";

export interface Promotion {
  _id: string;
  name: string;
  image: string;
  isActive: boolean;
  createdAt: string;
}

interface PromotionState {
  promotions: Promotion[];
  isLoading: boolean;
  error: string | null;
  fetchPromotions: () => Promise<void>;
}

export const usePromotionStore = create<PromotionState>((set) => ({
  promotions: [],
  isLoading: false,
  error: null,

  fetchPromotions: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiClient.get(
        `${API.listPromotions}?status=active&limit=100`,
      );

      let promotionData: Promotion[] = [];

      if (response.data.data && Array.isArray(response.data.data)) {
        promotionData = response.data.data;
      } else if (Array.isArray(response.data)) {
        promotionData = response.data;
      } else if (response.data.data?.data) {
        promotionData = response.data.data.data;
      }

      const activePromotions = promotionData
        .filter((item) => item.isActive !== false)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ) // latest first
        .slice(0, 6)
        .map((item) => ({
          ...item,
          image: `${(process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/$/, "")}/${item.image.replace(/^\/+/, "")}`,
        }));

      set({
        promotions: activePromotions,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch promotions",
        isLoading: false,
      });
    }
  },
}));
