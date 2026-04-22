import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { API } from "@/lib/urls";

interface subscribeState {
  loading: boolean;
  error: string | null;
  success: boolean;
  subscribeEmail: (email: string) => Promise<void>;
}

export const useSubscribeStore = create<subscribeState>((set) => ({
  loading: false,
  error: null,
  success: false,

  subscribeEmail: async (email: string) => {
    set({ loading: true, error: null, success: false });

    try {
      const response = await apiClient.post(API.addSubscribe, { email });

      set({
        loading: false,
        success: true,
      });

    } catch (error: any) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to subscribe email",
        loading: false,
        success: false,
      });
    }
  },
}));