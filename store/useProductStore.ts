// import { create } from 'zustand';
// import apiClient from '@/lib/api-client';
// import { API } from '@/lib/urls';

// export interface Product {
//     _id: string;
//     name: string;
//     slug: string;
//     title: string;
//     shortDescription?: string;
//     thumbnail: string;
//     images: string[];
//     price: number;
//     discountPrice: number;
//     status: 'active' | 'inactive';
//     categoryId?: any;
// }

// interface ProductState {
//     products: Product[];
//     isLoading: boolean;
//     error: string | null;
//     listProduct: () => Promise<void>;
// }

// export const useProductStore = create<ProductState>((set) => ({
//     products: [],
//     isLoading: false,
//     error: null,
//     listProduct: async () => {
//         set({ isLoading: true, error: null });
//         try {
//             const response = await apiClient.get(`${API.listProduct}?status=active&limit=100`);
//             console.log("response",response)
//             const resData = response.data;
//             console.log("resData",resData)

//             let productData = [];

//             // Matching Brand Store logic exactly
//             if (resData.data && Array.isArray(resData.data)) {
//                 productData = resData.data;
//             } else if (Array.isArray(resData)) {
//                 productData = resData;
//             } else if (resData.data && resData.data.data) {
//                 productData = resData.data.data;
//             }

//             // Filter for active items
//             const activeProducts = productData.filter((p: Product) => p.status === 'active');
            
//             set({ products: activeProducts, isLoading: false });
//         } catch (error: any) {
//             set({ 
//                 error: error.response?.data?.message || 'Failed to fetch products', 
//                 isLoading: false 
//             });
//         }
//     },
// })); 

import { create } from 'zustand';
import apiClient from '@/lib/api-client';
import { API } from '@/lib/urls';

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
    mainCategoryId: string;
    subCategoryId?: string;
    categoryId?: string;

    images: string[];
    colors?: string[];
    sizes?: string;

    status: 'active' | 'inactive';
    isDeleted: boolean;
    isActive: boolean;
}

interface ProductState {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    isLoading: false,
    error: null,

    fetchProducts: async () => {
        set({ isLoading: true, error: null });

        try {
            // Same as Brand (active filter in API)
            const response = await apiClient.get(`${API.fetchProducts}?status=active&limit=100`);
            console.log("API URL:", `${API.fetchProducts}?status=active&limit=100`);
            // Same response handling logic
            console.log("response",response)

            let productData = [];
            if (response.data.data && Array.isArray(response.data.data)) {
                productData = response.data.data;
            } else if (Array.isArray(response.data)) {
                productData = response.data;
            } else if (response.data.data && response.data.data.data) {
                productData = response.data.data.data;
            }

            // Same safety filter
            const activeProducts = productData.filter(
                (product: Product) => product.isActive !== false
            );
            console.log("active",activeProducts)
            set({ products: activeProducts, isLoading: false });

        } catch (error: any) {
            set({ 
                error: error.response?.data?.message || 'Failed to fetch products', 
                isLoading: false 
            });
        }
    },
}));