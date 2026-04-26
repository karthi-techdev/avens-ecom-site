import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { API } from "@/lib/urls";
import URLs from "@/lib/urls";

export interface Blog {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    categoryId: {
        _id: string;
        name: string;
    }
    isActive: boolean;
    createdAt: string;
};


interface BlogState {
    blog: Blog[];
    isLoading: Boolean;
    error: string | null;
    fetchBlogs: () => Promise<void>;
}

export const useBlogStore = create<BlogState>((set) => ({
    blog: [],
    isLoading: false,
    error: null,

    fetchBlogs: async () => {
        set({ isLoading: true, error: null })

        try {
            const response = await apiClient.get(`${API.listBlogs}?status=active&limit=100`);

            let blogData: Blog[] = [];

            if (response.data.data && Array.isArray(response.data.data)) {
                blogData = response.data.data;
            } else if (Array.isArray(response.data)) {
                blogData = response.data;
            } else if (response.data.data?.data) {
                blogData = response.data.data.data;
            }

            const activeBlog = blogData
                .filter((blog: Blog) => blog.isActive !== false)
                .sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
                .map((item) => ({
                    ...item,
                    image: item.image
                        ? `${URLs.LIVEURL}uploads/blog/${item.image}`
                        : ""
                }));
            set({
                blog: activeBlog,
                isLoading: false,
            });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Failed to fetch blogs",
                isLoading: false,
            })
        }
    }
}))
