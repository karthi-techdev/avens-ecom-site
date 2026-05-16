"use client";

import { useEffect, useState } from "react";
import { ChevronRight, ShoppingCart, Headphones, X, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useCartStore } from "@/store/cartStore";
import URLs from "@/lib/urls"; // Using your URL utility

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [token, setToken] = useState<any>(null);
  const { addCart, getAllCart } = useCartStore();

  // Load user token and wishlist on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    setToken(user);

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistItems(savedWishlist);
  }, []);

  const addToCart = async (id: any) => {
    if (!token?._id) {
      toast.warn("Please login to add items to cart");
      return;
    }

    try {
      const product = wishlistItems.find((item) => item._id === id);
      if (!product) return;

      // Price calculation logic
      const originalPrice = Number(product?.price || 0);
      const discountPercent = Number(product?.discountPrice || 0);
      const finalPrice =
        discountPercent > 0
          ? Math.round(originalPrice - (originalPrice * discountPercent) / 100)
          : originalPrice;

      // Parse colors safely
      let color = null;
      try {
        color = typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors;
      } catch (e) {
        color = product.colors;
      }

      const data = {
        userId: token._id,
        quantity: 1,
        selectedColor: Array.isArray(color) ? color[0] : (color || null),
        selectedSize: product?.sizes || product?.size || null,
        totalPrice: finalPrice,
        product: product, // Passing full product object as required by many store patterns
        productId: product._id,
      };

      await addCart(data);
      
      // Update local state and storage
      const updatedData = wishlistItems.filter((item: any) => (item._id || item.id) !== id);
      setWishlistItems(updatedData);
      localStorage.setItem("wishlist", JSON.stringify(updatedData));
      
      // Sync cart counter
      await getAllCart(token._id);

      toast.success("Added to cart!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error: any) {
      console.error("Cart Error:", error);
      toast.error(error.message || "Failed to add to cart");
    }
  };

  const removeFromWishlist = (id: string) => {
    const updated = wishlistItems.filter((item: any) => (item._id || item.id) !== id);
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    // Custom event for header counters if needed
    window.dispatchEvent(new Event("wishlistUpdated"));

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="bg-white min-h-screen">
      <ToastContainer />
      
      {/* Alert Message UI */}
      {showAlert && (
        <div className="fixed top-5 right-5 z-[9999] bg-white border-l-4 border-[#3BB77E] shadow-xl p-4 rounded-md flex items-center gap-3 animate-in fade-in slide-in-from-right-5 duration-300 min-w-[300px]">
          <div className="bg-[#3BB77E] rounded-full p-1">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-800 font-bold text-sm">Success!</span>
            <span className="text-gray-600 text-xs">Item removed from wishlist.</span>
          </div>
          <button onClick={() => setShowAlert(false)} className="ml-auto text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center text-sm px-10 py-6 text-gray-500 border-b border-gray-100 bg-[#f8f9fa]">
        <Link href="/" className="text-[#3BB77E] hover:underline font-medium">Home</Link>
        <span className="mx-2 text-gray-400"><ChevronRight size={14} /></span>
        <span className="text-gray-400">Shop</span>
        <span className="mx-2 text-gray-400"><ChevronRight size={14} /></span>
        <span className="text-[#253D4E]">Wishlist</span>
      </nav>

      <main className="max-w-[1400px] mx-auto px-4 py-10">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-400">Your wishlist is empty!</h2>
            <Link href="/" className="text-[#3BB77E] underline mt-4 block">Return to Shop</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-100">
              <thead className="hidden md:table-header-group">
                <tr className="bg-white text-[#253D4E] border-b border-gray-100">
                  <th className="text-center border-r border-gray-100 py-6 text-xl font-bold" colSpan={2}>
                    Product
                  </th>
                  <th className="text-center border-r border-gray-100 py-6 text-xl font-bold w-[12%]">
                    Price
                  </th>
                  <th className="text-center border-r border-gray-100 py-6 text-xl font-bold w-[15%]">
                    Stock Status
                  </th>
                  <th className="text-center border-r border-gray-100 py-6 text-xl font-bold w-[18%]">
                    Action
                  </th>
                  <th className="text-center py-6 text-xl font-bold w-[10%]">
                    Remove
                  </th>
                </tr>
              </thead>

              <tbody>
                {wishlistItems.map((item) => {
                  const imgPath = item.thumbnail?.replace(/^\/+/, "") || "";
                  const fullImgUrl = imgPath.startsWith('http') ? imgPath : `${URLs.FILEURL}${imgPath}`;
                  const isInStock = item.stockQuantity > 0;

                  return (
                    <tr key={item._id} className="border-b border-gray-100 hover:shadow-sm transition-shadow md:table-row block mb-6 md:mb-0">
                      {/* Image */}
                      <td className="py-6 px-4 border-r border-gray-100 w-[120px] block md:table-cell">
                        <div className="flex justify-center">
                          <div className="w-24 h-24 bg-white border border-gray-100 rounded-xl p-2 flex items-center justify-center">
                            <img 
                              src={fullImgUrl} 
                              alt={item.title || item.name} 
                              className="w-full h-full object-contain" 
                              onError={(e: any) => e.target.src = '/placeholder.jpg'}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Title & Description */}
                      <td className="py-6 px-6 border-r border-gray-100 text-left min-w-[300px] block md:table-cell">
                        <div className="text-center md:text-left">
                          <h3 className="font-bold text-[#3BB77E] text-lg mb-1">
                            {item.title || item.name}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                            {item.shortDescription || "No description available."}
                          </p>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="text-center border-r border-gray-100 px-4 py-4 block md:table-cell">
                        <div className="relative">
                          <span className="md:hidden font-bold mr-2 text-gray-500">Price:</span>
                          <span className="text-xl font-bold text-[#253D4E]">
                            ₹{Number(item.price || 0).toFixed(2)}
                          </span>
                        </div>
                      </td>

                      {/* Stock Status */}
                      <td className="text-center border-r border-gray-100 px-4 py-4 block md:table-cell">
                        <div className="relative">
                          <span className="md:hidden font-bold mr-2 text-gray-500">Status:</span>
                          <span className={`text-base font-medium ${isInStock ? "text-[#3BB77E]" : "text-[#F74B81]"}`}>
                            {isInStock ? "In Stock" : "Out of stock"}
                          </span>
                        </div>
                      </td>

                      {/* Action Button */}
                      <td className="text-center border-r border-gray-100 px-6 py-4 block md:table-cell">
                        <div className="flex justify-center">
                          {isInStock ? (
                            <button 
                              onClick={() => addToCart(item._id)} 
                              className="inline-flex items-center justify-center gap-2 bg-[#3BB77E] text-white px-6 py-3 rounded-md text-sm font-bold hover:bg-[#29A56C] transition-all min-w-[150px]"
                            >
                              <ShoppingCart size={16} /> Add to cart
                            </button>
                          ) : (
                            <button className="inline-flex items-center justify-center gap-2 bg-[#41506B] text-white px-6 py-3 rounded-md text-sm font-bold hover:bg-[#344156] transition-all min-w-[150px]">
                              <Headphones size={16} /> Contact Us
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Remove */}
                      <td className="text-center px-4 py-4 block md:table-cell">
                        <button 
                          onClick={() => removeFromWishlist(item._id)} 
                          className="text-gray-300 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 size={22} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}