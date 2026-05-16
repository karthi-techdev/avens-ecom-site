import { create } from 'zustand';
import apiClient from '@/lib/api-client';
import URLs from '../lib/urls';

export interface IReview {
    _id: string;
    name: string;
    email: string;
    rating: number;
    comment: string;
    productId: string;
    userId: string;
    website?: string;
    status: 'active' | 'inactive'; // Literal types
    createdAt: string;
}

interface ReviewMeta {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
}

interface ReviewState {
    reviews: IReview[];
    activeProductReviews: IReview[];
    meta: ReviewMeta | null;
    isLoading: boolean;
    error: string | null;
    
    fetchReviews: (page?: number, limit?: number, productId?: string, status?: string) => Promise<void>;
    fetchActiveReviews: (productId: string) => Promise<void>;
    addReview: (data: any) => Promise<void>;
    updateStatus: (id: string, status: string) => Promise<void>;
    removeReview: (id: string, userId: string) => Promise<void>; // Matches Component usage
}

export const useReviewStore = create<ReviewState>((set, get) => ({
    reviews: [],
    activeProductReviews: [],
    meta: null,
    isLoading: false,
    error: null,

    fetchReviews: async (page = 1, limit = 10, productId = '', status = '') => {
        set({ isLoading: true });
        try {
            const response = await apiClient.get(URLs.API.listReviews, {
                params: { page, limit, productId, status }
            });
            set({ 
                reviews: response.data.data.data || [], 
                meta: response.data.data.meta || null,
                isLoading: false 
            });
        } catch (error) {
            set({ reviews: [], isLoading: false });
        }
    },

    fetchActiveReviews: async (productId: string) => {
        set({ isLoading: true });
        try {
            const response = await apiClient.get(URLs.API.activeReviews(productId));
            set({ activeProductReviews: response.data.data || [], isLoading: false });
        } catch (error) {
            set({ activeProductReviews: [], isLoading: false });
        }
    },

    addReview: async (data: any) => {
        try {
            await apiClient.post(URLs.API.addReview, data);
        } catch (error) {
            console.error("Add review error:", error);
            throw error;
        }
    },

    updateStatus: async (id: string, status: string) => {
        try {
            const response = await apiClient.put(URLs.API.updateReviewStatus(id), { status });
            const updatedReview = response.data.data;
            set({
                reviews: get().reviews.map(item => item._id === id ? updatedReview : item)
            });
        } catch (error) {
            console.error("Update status error:", error);
        }
    },

    removeReview: async (id: string, userId: string) => {
        try {
            await apiClient.delete(URLs.API.deleteReview(id), { data: { userId } });
            set({ 
                reviews: get().reviews.filter(item => item._id !== id),
                activeProductReviews: get().activeProductReviews.filter(item => item._id !== id)
            });
        } catch (error) {
            console.error("Remove review error:", error);
        }
    }
}));