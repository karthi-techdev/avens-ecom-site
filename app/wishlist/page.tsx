"use client";
import { useEffect, useState } from "react";
import { ChevronRight, ShoppingCart, Headphones, X } from "lucide-react";


export default function WishlistPage() {

  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistItems(savedWishlist);
  }, []);


  const removeFromWishlist = (id: string) => {
    const updated = wishlistItems.filter((item: any) => (item._id || item.id) !== id);
    setWishlistItems(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));


    window.dispatchEvent(new Event("wishlistUpdated"));

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };


  // 1. CHANGE: id handle pandrathula chinna logic update
  // const removeFromWishlist = (id: string) => {
  //   // Unga data-la _id illati normal id-nu check panni filter pannum
  //   const updated = wishlistItems.filter((item: any) => (item._id || item.id) !== id);
  //   setWishlistItems(updated);
  //   localStorage.setItem('wishlist', JSON.stringify(updated));
  // };

  return (
    <>

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
      <nav className="flex items-center text-sm !mb-6 !px-8 sm:!px-18 !py-4 rounded bg-[var(--bg-light)] text-[var(--text-muted)]">
        <a href="/" className="!text-[var(--primary)]">Home</a>
        <span className="!mx-2"><ChevronRight size={16} /></span>
        <a href="/">Shop</a>
        <span className="!mx-2"><ChevronRight size={16} /></span>
        <span className="text-[var(--text-main)]">Wishlist</span>
      </nav>

      <main className="main">
        <div className="max-w-[1400px] mx-auto !px-3 sm:!px-6 md:!px-10 lg:!px-[60px] !py-5">
          <div>
            {wishlistItems.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-[var(--text-muted)]">Your wishlist is empty!</h2>
                <a href="/" className="text-[var(--primary)] underline mt-4 block">Go Shopping</a>
              </div>
            ) : (
              <table className="w-full border-collapse">
                <thead className="hidden md:table-header-group">
                  <tr className="border-b border-t border-[var(--border-color)]">
                    <th className="text-center border-r border-l border-[var(--border-color)] !py-4 !px-2 text-lg font-semibold text-[var(--text-main)]" colSpan={2}>Product</th>
                    <th className="text-center border-r border-[var(--border-color)] !py-4 !px-2 text-lg font-semibold text-[var(--text-main)]">Price</th>
                    <th className="text-center border-r border-[var(--border-color)] !py-4 !px-2 text-lg font-semibold text-[var(--text-main)]">Stock Status</th>
                    <th className="text-center border-r border-[var(--border-color)] !py-4 !px-2 text-lg font-semibold text-[var(--text-main)]">Action</th>
                    <th className="text-center border-r border-[var(--border-color)] !py-4 !px-2 text-lg font-semibold text-[var(--text-main)]">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((item) => (

                    <tr key={item._id} className="border border-[var(--border-color)] md:table-row block !mb-6 md:mb-0">

                      {/* Image - Dynamic URL */}
                      <td className="block md:table-cell text-center !py-4 border-b md:border-r border-[var(--border-color)]">
                        <div className="flex justify-center">
                          <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                            <img
                              src={item.thumbnail ? `http://localhost:5000${item.thumbnail}` : "/placeholder.jpg"}
                              alt={item.title}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        </div>
                      </td>

                      {/* Product Name & Short Description */}
                      <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)] !px-5">
                        <div>
                          <h3 className="font-semibold text-[var(--primary)] !mb-1">{item.title || item.name}</h3>
                          <p className="text-sm text-[var(--text-muted)] line-clamp-1">{item.shortDescription}</p>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)]">
                        <div className="relative">
                          <span className="md:hidden font-semibold absolute left-3">Price:</span>
                          <span className="block text-center">₹{item.price}</span>
                        </div>
                      </td>

                      {/* Stock Status */}
                      <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)]">
                        <div className="relative">
                          <span className="md:hidden font-semibold absolute left-3">Stock:</span>
                          <span className={`text-sm font-medium block text-center ${item.stockQuantity > 0 ? "text-[var(--primary)]" : "text-red-500"}`}>
                            {item.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                      </td>

                      {/* Action Button */}
                      <td className="block md:table-cell text-center !py-4 border-b md:border-r border-[var(--border-color)]">
                        <div className="flex justify-center px-2 mx-auto" style={{ width: '156px' }}>
                          {item.stockQuantity > 0 ? (
                            <button className="flex items-center justify-center gap-2 bg-[#3BB77E] hover:bg-[#2fa36d] text-white px-2 py-2.5 rounded shadow-sm transition-all text-sm font-bold w-full h-[45px]">
                              <ShoppingCart size={18} />
                              Add to cart
                            </button>
                          ) : (
                            <button className="flex items-center justify-center gap-2 bg-[#41506b] hover:bg-[#2d3a4d] text-white px-2 py-2.5 rounded shadow-sm transition-all text-sm font-bold w-full h-[45px]">
                              <Headphones size={18} />
                              Contact Us
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Remove Button - Linked to removeFromWishlist */}

                      <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)]">
                        <div className="flex justify-center">
                          <button
                            onClick={() => removeFromWishlist(item._id)}
                            className="inline-flex justify-center text-[var(--text-muted)] hover:text-red-500 transition-colors p-2"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </>
  );
}