"use client";
import { ChevronRight, ShoppingCart, Headphones, Trash } from "lucide-react";

export default function WishlistPage() {
  const wishlistItems = [
    {
      id: 1,
      name: "J.Crew Mercantile Women's Short-Sleeve",
      description: "Maboriosam in a tonto nesciung eget distingy magndapibus.",
      price: 65.00,
      stock: "In Stock",
      inStock: true,
      image: "/product-view/product-img1.jpg"
    },
    {
      id: 2,
      name: "Amazon Essentials Women's Tank",
      description: "Sit at ipsum amet clita no est, sed amet sadipscing et gubergren",
      price: 75.00,
      stock: "In Stock",
      inStock: true,
      image: "/product-view/products-img2.jpg"
    },
    {
      id: 3,
      name: "Amazon Brand - Daily Ritual Women's Jersey",
      description: "Erat amet et et amet diam et et. Justo amet at dolore",
      price: 62.00,
      stock: "Out of stock",
      inStock: false,
      image: "/product-view/product-img4.jpg"
    },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm !mb-6 !px-8 sm:!px-18 !py-4 rounded bg-[var(--bg-light)] text-[var(--text-muted)]">
        <a href="/" className="!text-[var(--primary)]">Home</a>
        <span className="!mx-2">
          <ChevronRight size={16} />
        </span>
        <a href="/">Shop</a>
        <span className="!mx-2">
          <ChevronRight size={16} />
        </span>
        <a href="/">Wishlist</a>
      </nav>

      <main className="main">
        <div className="max-w-[1400px] mx-auto !px-3 sm:!px-6 md:!px-10 lg:!px-[60px] !py-5">



          <div >
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
                  <tr key={item.id} className="border border-[var(--border-color)] md:table-row block !mb-6 md:mb-0">
                    {/* Image Column */}
                    <td className="block md:table-cell text-center !py-4 border-b md:border-r border-[var(--border-color)]">
                      <div className="flex justify-center">
                        <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                        </div>
                      </div>
                    </td>

                    {/* Product Details Column */}
                    <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)] !px-5">
                      <div>
                        <h3 className="font-semibold text-[var(--primary)] !mb-1">{item.name}</h3>
                        <p className="text-sm text-[var(--text-muted)] ">{item.description}</p>
                      </div>
                    </td>

                    <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)]">
                      <div className="relative">

                        <span className="md:hidden font-semibold absolute left-3">
                          Price:
                        </span>

                        <span className="block text-center">
                          ${item.price.toFixed(2)}
                        </span>

                      </div>
                    </td>

                    {/* Stock Status Column */}
                    <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)]">
                      <div className="relative">

                        <span className="md:hidden font-semibold absolute left-3">
                          Stock:
                        </span>

                        <span
                          className={`text-sm font-medium block text-center ${item.inStock
                            ? "text-[var(--text-muted)]"
                            : "text-[var(--red-color)]"
                            }`}
                        >
                          {item.stock}
                        </span>

                      </div>
                    </td>

                    {/* Action Column */}
                    <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)]">
                      <div className="relative">

                        <span className="md:hidden font-semibold absolute left-3">
                          Cart:
                        </span>

                        <div className="flex justify-center">
                          {item.inStock ? (
                            <button className="inline-flex items-center gap-2 bg-[var(--primary)] text-white !px-4 !py-2 rounded-lg text-sm hover:bg-[var(--primary-hover)] transition-colors duration-200">
                              <ShoppingCart size={16} />
                              Add to cart
                            </button>
                          ) : (
                            <button className="inline-flex items-center gap-2 bg-[#41506b] text-white !px-4 !py-2 rounded-lg text-sm">
                              <Headphones size={16} />
                              Contact Us
                            </button>
                          )}
                        </div>

                      </div>
                    </td>

                    {/* Remove Column */}
                    <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)]">
                      <div className="relative">

                        <span className="md:hidden font-semibold absolute left-3">
                          Remove:
                        </span>

                        <div className="flex justify-center">
                          <button className="inline-flex justify-center text-[var(--text-muted)] hover:text-[var(--red-color)] transition-colors">
                            <Trash size={18} />
                          </button>
                        </div>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}