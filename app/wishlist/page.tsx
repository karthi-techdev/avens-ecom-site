
"use client";
import { ShoppingCart, Headphones, Trash2, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useCartStore } from "../../store/cartStore";
import URLs from "../../lib/urls";
import Link from "next/link";

export default function WishlistPage() {
  const [token, setToken] = useState<any>(null);
  const { wishlistItems, getAllWishlist, removeWishlist } = useWishlistStore();
  const { addCart, getAllCart } = useCartStore();

  useEffect(() => {
    // 1. Get real user info to fix the "Add to Cart" issue
    const user = JSON.parse(localStorage.getItem("user") || "null");
    setToken(user);
    
    // 2. Load wishlist items
    getAllWishlist();
  }, []);

  const handleAddToCart = async (item: any) => {
    // Check if user is logged in
    if (!token?._id) {
      toast.warn('Please login to add items to cart');
      return;
    }

    try {
      const prod = item.productId;
      
      // Calculate price correctly
      const price = Number(prod.price || 0);
      const discount = Number(prod.discountPrice || 0);
      const finalPrice = discount > 0 ? price - (price * (discount / 100)) : price;

      await addCart({
        quantity: 1,
        selectedColor: prod.colors?.[0] || null,
        selectedSize: prod.size || null,
        totalPrice: finalPrice,
        product: prod,
        userId: token._id // Use real ID instead of "guest"
      });

      // Update the Cart counter in the header
      await getAllCart(token._id);
      
      // Remove from wishlist
      removeWishlist(item._id);
      toast.success('Moved to Cart!');
    } catch (error: any) {
      toast.error(error.message || "Failed to add to cart");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb matching your UI */}
      <nav className="flex items-center text-sm px-10 py-6 text-gray-500 border-b border-gray-100">
        <Link href="/" className="text-[#3BB77E] hover:underline font-medium">Home</Link>
        <span className="mx-2 text-gray-400"><ChevronRight size={14} /></span>
        <span className="text-gray-400">Shop</span>
        <span className="mx-2 text-gray-400"><ChevronRight size={14} /></span>
        <span className="text-gray-400">Wishlist</span>
      </nav>

      <main className="max-w-[1400px] mx-auto px-4 py-10">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Your wishlist is empty</p>
            <Link href="/" className="text-[#3BB77E] mt-4 inline-block hover:underline">Return to Shop</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-100">
              {/* Exact Table Header from Image */}
              <thead>
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
                  const prod = item.productId;
                  const imgPath = prod?.thumbnail?.replace(/^\/+/, "") || "";
                  const fullImgUrl = imgPath.startsWith('http') ? imgPath : `${URLs.FILEURL}${imgPath}`;
                  const isInStock = prod?.stockQuantity > 0;

                  return (
                    <tr key={item._id} className="border-b border-gray-100 hover:shadow-sm transition-shadow">
                      {/* Image */}
                      <td className="py-6 px-4 border-r border-gray-100 w-[120px]">
                        <div className="flex justify-center">
                          <div className="w-24 h-24 bg-white border border-gray-100 rounded-xl p-2 flex items-center justify-center">
                            <img 
                              src={fullImgUrl} 
                              alt="" 
                              className="w-full h-full object-contain" 
                            />
                          </div>
                        </div>
                      </td>

                      {/* Title & Description */}
                      <td className="py-6 px-6 border-r border-gray-100 text-left min-w-[300px]">
                        <div>
                          <Link href={`/product-view/${prod?.slug}`}>
                            <h3 className="font-bold text-[#3BB77E] text-lg mb-2 hover:text-[#29A56C] transition-colors">
                              {prod?.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                            {prod?.shortDescription || "No description available."}
                          </p>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="text-center border-r border-gray-100 px-4">
                        <span className="text-xl font-bold text-[#253D4E]">
                          ₹{Number(prod?.price || 0).toFixed(2)}
                        </span>
                      </td>

                      {/* Stock Status */}
                      <td className="text-center border-r border-gray-100 px-4">
                        <span className={`text-base font-medium ${isInStock ? "text-gray-500" : "text-[#F74B81]"}`}>
                          {isInStock ? "In Stock" : "Out of stock"}
                        </span>
                      </td>

                      {/* Action Button */}
                      <td className="text-center border-r border-gray-100 px-6">
                        {isInStock ? (
                          <button 
                            onClick={() => handleAddToCart(item)} 
                            className="inline-flex items-center gap-2 bg-[#3BB77E] text-white px-6 py-3 rounded-md text-sm font-bold hover:bg-[#29A56C] transition-all"
                          >
                            <ShoppingCart size={16} /> Add to cart
                          </button>
                        ) : (
                          <button className="inline-flex items-center gap-2 bg-[#41506B] text-white px-6 py-3 rounded-md text-sm font-bold hover:bg-[#344156] transition-all">
                            <Headphones size={16} /> Contact Us
                          </button>
                        )}
                      </td>

                      {/* Remove */}
                      <td className="text-center px-4">
                        <button 
                          onClick={() => removeWishlist(item._id)} 
                          className="text-gray-300 hover:text-red-500 transition-colors"
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