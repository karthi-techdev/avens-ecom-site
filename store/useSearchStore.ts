import { create } from 'zustand';
import apiClient from '@/lib/api-client';

export interface SearchHistory {
    _id: string;
    query: string;
    createdAt: string;
}


interface SearchHistoryState {
    history: SearchHistory[];
    isLoading: boolean;
    error: string | null;
    fetchHistory: () => Promise<void>;
    addSearch: (searchQuery: string) => Promise<void>;
    removeSearchItem: (id: string) => Promise<void>; // Added
    clearHistory: () => Promise<void>; // Added
}

export const useSearchHistoryStore = create<SearchHistoryState>((set, get) => ({
    history: [],
    isLoading: false,
    error: null,

    fetchHistory: async () => {
        try {
            const response = await apiClient.get('/admin/search-history');
            set({ history: response.data.history || [] });
        } catch (error) {
            set({ history: [] });
        }
    },

    addSearch: async (searchQuery: string) => {
        if (!searchQuery) return;
        try {
            await apiClient.post('/admin/search-history/add', { query: searchQuery });
            const response = await apiClient.get('/admin/search-history');
            set({ history: response.data.history || [] });
        } catch (error) { console.error(error); }
    },

    removeSearchItem: async (id: string) => {
        try {
            await apiClient.delete(`/admin/search-history/remove/${id}`);
            set({ history: get().history.filter(item => item._id !== id) });
        } catch (error) { console.error(error); }
    },

    clearHistory: async () => {
        try {
            await apiClient.delete('/admin/search-history/clear');
            set({ history: [] });
        } catch (error) { console.error(error); }
    }
}));