import Image from "next/image";
import { Star, ShoppingBag, Trash2, Headphones } from "lucide-react";

export default function ProductCompareTable() {
  const products = [
    {
      name: "J.Crew Mercantile Women's Short",
      price: "$45.00",
      rating: 5,
      reviews: 121,
      stock: "In Stock",
      weight: "320 gram",
      colors: [
        "var(--yellow-color)",
        "var(--blue-color)",
        "var(--green-color)",
        "var(--pink-color)",
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      image: "/shop/product-1.jpg",
    },
    {
      name: "Amazon Essentials Women's Tanks",
      price: "$55.00",
      rating: 5,
      reviews: 35,
      stock: "Out of stock",
      weight: "370 gram",
      colors: [
        "var(--red-color)",
        "var(--blue-color)",
        "var(--green-color)",
        "var(--pink-color)",
      ],
      sizes: ["S", "XL", "XXL"],
      image: "/shop/product-2.jpg",
    },
    {
      name: "Amazon Brand - Daily Ritual Women",
      price: "$68.00",
      rating: 5,
      reviews: 125,
      stock: "In Stock",
      weight: "380 gram",
      colors: [
        "var(--red-color)",
        "var(--yellow-color)",
        "var(--primary)",
      ],
      sizes: ["M", "L", "XL", "XXL"],
      image: "/shop/product-3.jpg",
    },
  ];

  return (
  <div className="max-w-[1400px] mx-auto my-9 mx-2 overflow-x-auto">
    <table className="min-w-full w-full text-center border border-[var(--border-color)] border-collapse text-sm md:text-base lg:text-md">
        <tbody>

          {/* PREVIEW */}
          <tr className="block md:table-row   border md:border-0 border-[var(--border-color)]">
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">Preview</td>

            {products.map((p, i) => (
             <td key={i} className="p-4 border border-[var(--border-color)] block md:table-cell text-center md:text-center">
                <Image
                src={p.image}
                alt="shirt"
                width={400}
                height={400}
                className="w-full h-auto"
                />
              </td>
            ))}
          </tr>

          {/* NAME */}
          <tr className="block md:table-row   border md:border-0 border-[var(--border-color)]">
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">Name</td>

            {products.map((p, i) => (
              <td key={i} className="p-4 border border-[var(--border-color)] block md:table-cell text-center md:text-center">
                {p.name}
              </td>
            ))}
          </tr>

          {/* PRICE */}
          <tr className="block md:table-row   border md:border-0 border-[var(--border-color)]">
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">Price</td>

            {products.map((p, i) => (
              <td key={i} className="p-4 border border-[var(--border-color)] block md:table-cell text-center md:text-center">
                {p.price}
              </td>
            ))}
          </tr>

          {/* RATING */}
          <tr className="block md:table-row   border md:border-0 border-[var(--border-color)]">
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">Rating</td>

            {products.map((p, i) => (
              <td key={i} className="p-4 border border-[var(--border-color)] block md:table-cell text-center md:text-center">
                <div className="flex justify-center items-center">
                  {[...Array(p.rating)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill="var(--star-rating)"
                      color="var(--star-rating)"
                    />
                  ))}
                  <span className="text-sm text-[var(--text-muted)]">
                    ({p.reviews})
                  </span>
                </div>
              </td>
            ))}
          </tr>

          {/* DESCRIPTION */}
          <tr className="block md:table-row   border md:border-0 border-[var(--border-color)]">
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">Description</td>

            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">
              Lorem Ipsum is simply dummy text of the printing industry.
            </td>
           <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">
              Lorem Ipsum is simply dummy text of the printing industry.
            </td>
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">
              Lorem Ipsum is simply dummy text of the printing industry.
            </td>
          </tr>

          {/* COLOR */}
          <tr className="block md:table-row   border md:border-0 border-[var(--border-color)]">
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">Color</td>

            {products.map((p, i) => (
              <td key={i} className="p-4 border border-[var(--border-color)] block md:table-cell text-center md:text-center">
                <div className="flex justify-center gap-1">
                  {p.colors.map((color, index) => (
                    <span
                      key={index}
                      className="w-6 h-6 rounded-full cursor-pointer"
                      style={{ background: color }}
                    ></span>
                  ))}
                </div>
              </td>
            ))}
          </tr>

          {/* SIZES */}
          <tr className="block md:table-row   border md:border-0 border-[var(--border-color)]">
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">Sizes Available</td>

            {products.map((p, i) => (
             <td key={i} className="p-4 border border-[var(--border-color)] block md:table-cell text-center md:text-center">
                <div className="flex justify-center gap-1 flex-wrap ">
                  {p.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="border border-[var(--border-color)] px-3 py-1 rounded hover:bg-[var(--primary)] hover:text-white transition cursor-pointer"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </td>
            ))}
          </tr>

          {/* STOCK */}
          <tr className="block md:table-row   border md:border-0 border-[var(--border-color)]">
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">Stock status</td>

            {products.map((p, i) => (
              <td
                key={i}
                className={
                  p.stock === "Out of stock"
                    ? "text-[var(--red-color)] p-4 border border-[var(--border-color)] block md:table-cell text-center md:text-center"
                    : "p-4 border border-[var(--border-color)] block md:table-cell text-center md:text-center"
                }
              >
                {p.stock}
              </td>
            ))}
          </tr>

          {/* WEIGHT */}
          <tr className="block md:table-row   border md:border-0 border-[var(--border-color)]">
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">Weight</td>

            {products.map((p, i) => (
              <td key={i} className="p-4 border border-[var(--border-color)] block md:table-cell text-center md:text-center">
                {p.weight}
              </td>
            ))}
          </tr>

          {/* DIMENSIONS */}
          <tr className="block md:table-row   border md:border-0 border-[var(--border-color)]">
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">Dimensions</td>

            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">N/A</td>
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">N/A</td>
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">N/A</td>
          </tr>

          {/* BUY */}
          <tr className="block md:table-row   border md:border-0 border-[var(--border-color)]">
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center">Buy now</td>

            {products.map((p, i) => (
              <td key={i} className="p-4 border border-[var(--border-color)] block md:table-cell text-center md:text-center">
                {p.stock === "Out of stock" ? (
                  <button className="bg-gray-600 text-white px-5 py-2 rounded flex items-center gap-2 mx-auto cursor-pointer">
                    <Headphones size={16} /> Contact Us
                  </button>
                ) : (
                  <button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-5 py-2 rounded cursor-pointer flex items-center gap-2 mx-auto transition">
                    <ShoppingBag size={16} /> Add to cart
                  </button>
                )}
              </td>
            ))}
          </tr>

           <tr className="block md:table-row   border md:border-0 border-[var(--border-color)]">
            <td className="p-4 md:p-6 text-[var(--text-muted)] border border-[var(--border-color)] font-bold block md:table-cell text-center md:text-center"></td>

            {products.map((p, i) => (
              <td key={i} className="p-4 border border-[var(--border-color)] block md:table-cell text-center md:text-center">
                <div className="flex justify-center text-[var(--primary-hover)] gap-1 cursor-pointer">
                  <Trash2 size={16} /> Remove
                </div>
              </td>
            ))}
          </tr>

        </tbody>
      </table>
    </div>
  );
}
