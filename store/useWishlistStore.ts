import { create } from "zustand";

interface WishlistStore {
  wishlistItems: any[];

  addWishlist: (product: any) => boolean;
  removeWishlist: (id: string) => void;
  getAllWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  wishlistItems: [],

  // Get all wishlist items
  getAllWishlist: () => {
    if (typeof window !== "undefined") {
      const saved = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      set({ wishlistItems: saved });
    }
  },

  // Add to wishlist
  addWishlist: (product: any) => {
    // Check login token
    const token = localStorage.getItem("loginSuccess");

    // User not logged in
    if (!token) {
      return false;
    }

    const saved = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    // Check duplicate product
    const exists = saved.some(
      (item: any) => item.productId?._id === product._id
    );

    if (!exists) {
      const newItem = {
        _id: `wish_${Date.now()}`,

        productId: {
          ...product,

          // Image fallback
          thumbnail:
            product.thumbnail ||
            product.images?.[0] ||
            "",

          // Convert to number
          price: Number(product.price) || 0,

          discountPrice:
            Number(product.discountPrice) || 0,

          // Default stock
          stockQuantity:
            product.stockQuantity ?? 10,
        },
      };

      const updated = [...saved, newItem];

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updated)
      );

      set({ wishlistItems: updated });

      return true;
    } else {
      throw new Error("Product already in wishlist");
    }
  },

  // Remove wishlist item
  removeWishlist: (id: string) => {
    const saved = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    const updated = saved.filter(
      (item: any) => item._id !== id
    );

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );

    set({ wishlistItems: updated });
  },
}));