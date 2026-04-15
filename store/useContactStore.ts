import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { API } from "@/lib/urls";

export interface Contact {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status?: "active" | "inactive";
  createdAt?: string;
}

interface ContactStats {
  total: number;
  active: number;
  inactive: number;
}

interface ContactState {
  contacts: Contact[];
  stats: ContactStats;
  totalPages: number;
  loading: boolean;
  error: string | null;

  // Actions
  fetchContacts: (page: number, limit: number) => Promise<void>;
  addContact: (data: Contact) => Promise<void>;
}

export const useContactStore = create<ContactState>((set, get) => ({
  contacts: [],
  stats: { total: 0, active: 0, inactive: 0 },
  totalPages: 1,
  loading: false,
  error: null,

  // ✅ Fetch all contacts (for Admin Panel)
  fetchContacts: async (page: number, limit: number) => {
    set({ loading: true, error: null });

    try {
      const response = await apiClient.get(
        `${API.listContacts}?page=${page}&limit=${limit}`
      );

      const responseData = response.data;

      set({
        contacts: responseData?.data || [],
        totalPages: responseData?.totalPages || 1,
        stats: {
          total: responseData?.totalCount || 0,
          active: responseData?.activeCount || 0,
          inactive: responseData?.inactiveCount || 0,
        },
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch contacts",
        loading: false,
      });
    }
  },

  // ✅ Add a new contact (for UI Form)
  addContact: async (data: Contact) => {
    set({ loading: true, error: null });

    try {
      // Endpoint: `${ROOTURL}admin/contact`
      await apiClient.post(API.addContact, data);
      
      set({ loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to send message",
        loading: false,
      });
      throw error; 
    }
  },

}));