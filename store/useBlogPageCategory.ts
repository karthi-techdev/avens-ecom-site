import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { API } from "@/lib/urls";

export interface blogCategory {
    _id: string;
    name: string;
    slug: string;
    isActive: boolean;
    createdAt: string;
}

interface blogCategoryState{
   blogcategory: blogCategory[];
   loading: Boolean;
   error: string | null;
    fetchBlogCategorys: () => Promise<void>;
}

export const useBlogCategory = create<blogCategoryState>((set)=>({
    blogcategory:[],
    loading: false,
    error: null,

    fetchBlogCategorys: async() =>{
        set({ loading: false, error: null})

        try{
            const response = await apiClient.get(`${API.listBlogsCategory}?status=active&limit=100`);

            let blogCategorydata: blogCategory[] =[];
            
            if (response.data.data && Array.isArray(response.data.data)) {
                blogCategorydata = response.data.data;
            } else if (Array.isArray(response.data)) {
                blogCategorydata = response.data;
            } else if (response.data.data?.data) {
               blogCategorydata = response.data.data.data;
            }
           
            const activeBlogcategory = blogCategorydata
                .filter((blogCategory: blogCategory) => blogCategory.isActive !== false)
                .sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
                .slice(0, 7)
                .map((item) => ({
                    ...item
                }));
            set({
                blogcategory: activeBlogcategory,
                loading: false,
            });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Failed to fetch blogctegorys",
                loading: false,
            })
        }
    }
}));
