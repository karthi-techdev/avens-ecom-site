
import { create } from 'zustand';
import apiClient from '@/lib/api-client';
import { API } from '@/lib/urls';

export interface Product {
    _id: string;
    name: string;
    slug: string;
    title: string;
    price: number;
    discountPrice?: number;
    images: string[];
    colors?: string[];
    sizes?: string[]; // Adjusted to array for mapping
    badge?: string;
    shortDescription?: string;
    rating?: number;
    categoryId?: { name: string };
    mainCategoryId?: { name: string };
    isActive: boolean;
}

interface ProductState {
    products: Product[];
    selectedProduct: Product | null; // Added for Quick View
    isLoading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    setSelectedProduct: (product: Product | null) => void; // Action
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    selectedProduct: null,
    isLoading: false,
    error: null,

    setSelectedProduct: (product) => set({ selectedProduct: product }),

    fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.get(`${API.fetchProducts}?status=active&limit=100`);
            let productData = response.data?.data?.data || response.data?.data || response.data || [];
            const activeProducts = productData.filter((p: Product) => p.isActive !== false);
            set({ products: activeProducts, isLoading: false });
        } catch (error: any) {
            set({ error: 'Failed to fetch products', isLoading: false });
        }
    },
}));