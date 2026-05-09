import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { API } from "@/lib/urls";

export interface Offer {
  _id: string;
  name: string;
  image: string;
  link?: string;
  isActive: boolean;
  createdAt: string;
  displayName?: string;
  offerLabel?: string;
  
}

interface OfferState {
  offers: Offer[];
  isLoading: boolean;
  error: string | null;
  fetchOffers: () => Promise<void>;
}

export const useOfferStore = create<OfferState>((set) => ({
  offers: [],
  isLoading: false,
  error: null,

  fetchOffers: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiClient.get(
        `${API.listOffers}?status=active&limit=100`,
      );

      const rawData =
        response.data?.data?.data || response.data?.data || response.data || [];

      const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(
        /\/$/,
        "",
      );

      const activeOffers = rawData.map((item: any) => {
        const img = item.displayImage || item.image || "";

        return {
          ...item,
          displayName: item.displayName || item.name || "Special Offer",
          offerLabel: item.offerLabel || "Smart Offer",
          image: img.startsWith("http")
            ? img
            : `${backendUrl}/${img.replace(/^\/+/, "")}`,
        };
      });

      set({ offers: activeOffers, isLoading: false });
      console.log("Mapped Offers:", activeOffers);
    } catch (error: any) {
      set({ error: "Fetch failed", isLoading: false });
    }
  },
}));


