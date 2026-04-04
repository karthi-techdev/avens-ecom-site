import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { API } from "@/lib/urls";

export interface Blog {
  _id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt?: string;
}

interface BlogState {
  blogs: Blog[];
  blog: Blog | null;
  isLoading: boolean;
  error: string | null;

  fetchBlogs: () => Promise<void>;
  fetchBlogBySlug: (slug: string) => Promise<void>;
}
const BASE_URL = "http://localhost:5000";
const getImageUrl = (img?: string) => {
  if (!img) return "/placeholder.png";

  const baseUrl = BASE_URL.endsWith("/")
    ? BASE_URL
    : `${BASE_URL}/`;

  const path = img.startsWith("/") ? img.substring(1) : img;

  return `${baseUrl}${path}`;
};

export const useBlogStore = create<BlogState>((set) => ({
  blogs: [],
  blog: null,
  isLoading: false,
  error: null,

  // Get all blogs
  fetchBlogs: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiClient.get(API.listBlog);

      let data: Blog[] = [];

      if (response.data.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (response.data.data?.data) {
        data = response.data.data.data;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      }

        const activeBlog = data
        .filter((b) => b.isActive !== false)
        .map((item) => ({
          ...item,
          image: getImageUrl(item.image),
        }));

      set({ blogs: activeBlog, isLoading: false });

    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch blogs",
        isLoading: false,
      });
    }
  },

  //  Get single blog
  fetchBlogBySlug: async (slug: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiClient.get(
        API.getBlog(slug)
      );

      const blog = response.data.data;

       const formattedBlog = {
        ...blog,
       image: getImageUrl(blog.image),
      };

      set({ blog: formattedBlog, isLoading: false });

      ;

    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch blog",
        isLoading: false,
      });
    }
  },
}));