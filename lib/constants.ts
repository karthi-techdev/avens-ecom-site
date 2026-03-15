export const products = [
    {
      id: 1,
      name: "Colorful Pattern Shirt",
      category: "Clothing",
      price: 1299,
      oldPrice: 1999,
      rating: 4.5,
      discount:'14%',
      badge: "New",
      type: "feature",
      img1: "/home/product-1-1.jpg",
      img2: "/home/product-1-2.jpg",
    },
    {
      id: 2,
      name: "Summer Casual T-Shirt",
      category: "Clothing",
      price: 799,
      oldPrice: 900,
      rating: 4,
      discount:'12%',
      badge: "Best Seller",
      type: "feature",
      img1: "/home/product-2-1.jpg",
      img2: "/home/product-2-2.jpg",
    },
    {
      id: 3,
      name: "Slim Fit Denim Jacket",
      category: "Fashion",
      price: 2199,
      oldPrice: 2999,
      rating: 5,
      badge: "Hot",
      discount:'90%',
      type: "popular",
      img1: "/home/product-3-1.jpg",
      img2: "/home/product-3-2.jpg",
    },
    {
      id: 4,
      name: "Printed Hoodie",
      category: "Winter Wear",
      price: 1499,
      oldPrice: 1899,
      rating: 4.2,
      badge: "New",
      discount:'59%',
      type: "newone",
      img1: "/home/product-1-1.jpg",
      img2: "/home/product-1-2.jpg",
    },
    {
      id: 5,
      name: "Sports Track Pants",
      category: "Sportswear",
      price: 999,
      oldPrice: 1200,
      rating: 4.3,
      discount:'54%',
      badge: "Trending",
      type: "popular",
      img1: "/home/product-2-1.jpg",
      img2: "/home/product-2-2.jpg",
    },
    {
      id: 6,
      name: "Leather Casual Shoes",
      category: "Footwear",
      price: 2499,
      oldPrice: 3199,
      rating: 4.7,
      discount:'10%',
      badge: "Sale",
      type: "popular",
      img1: "/home/product-3-1.jpg",
      img2: "/home/product-3-2.jpg",
    },
    {
      id: 7,
      name: "Printed Oversized T-Shirt",
      category: "Clothing",
      price: 899,
      oldPrice: 1000,
      rating: 4,
      badge: "New",
      discount:'20%',
      type: "feature",
      img1: "/home/product-1-1.jpg",
      img2: "/home/product-1-2.jpg",
    },
    {
      id: 8,
      name: "Women’s Handbag",
      category: "Accessories",
      price: 1799,
      oldPrice: 2299,
      rating: 4.6,
      badge: "Best Seller",
      type: "popular",
      discount:'70%',
      img1: "/home/product-2-1.jpg",
      img2: "/home/product-2-2.jpg",
    },
    {
      id: 9,
      name: "Formal Slim Shirt",
      category: "Clothing",
      price: 1399,
      discount:'89%',
      oldPrice: 1699,
      rating: 4.4,
      badge: "Hot",
      type: "newone",
      img1: "/home/product-3-1.jpg",
      img2: "/home/product-3-2.jpg",
    },
    {
      id: 10,
      name: "Running Sneakers",
      category: "Footwear",
      price: 2999,
      discount:'30%',
      oldPrice: 3599,
      rating: 4.8,
      badge: "Trending",
      type: "popular",
      img1: "/home/product-1-1.jpg",
      img2: "/home/product-1-2.jpg",
    },
];

export interface ShopProduct {
    id: number;
    badge: string;
    category: string;
    name: string;
    price: number;
    oldPrice: number;
    rating: number;
    img1: string;
    img2: string;
    description?: string;
}

export const shopProducts: ShopProduct[] = [
    {
        id: 101,
        badge: "Hot",
        category: "Music",
        name: "Colorful Pattern Shirts",
        price: 238.85,
        oldPrice: 245.8,
        rating: 90,
        img1: "/shop/product-1.jpg",
        img2: "/shop/product-hover-1.jpg",
        description: "Experience the ultimate comfort and style with our Colorful Pattern Shirts. Made from premium cotton, these shirts feature vibrant patterns that make a bold statement."
    },
    {
        id: 102,
        badge: "New",
        category: "Music",
        name: "Cartoon Astronaut T-Shirts",
        price: 138.85,
        oldPrice: 255.8,
        rating: 50,
        img1: "/shop/product-2.jpg",
        img2: "/shop/product-hover-2.jpg",
        description: "Reach for the stars with our Cartoon Astronaut T-Shirts. Perfect for space enthusiasts and those who love a quirky, modern look."
    },
    {
        id: 103,
        badge: "Best Sell",
        category: "Watch",
        name: "Plain Striola Shirts",
        price: 338.85,
        oldPrice: 445.8,
        rating: 95,
        img1: "/shop/product-3.jpg",
        img2: "/shop/product-hover-3.jpg",
        description: "The Plain Striola Shirts offer a classic, timeless design. Ideal for both formal and semi-formal occasions, these shirts are a must-have in every wardrobe."
    },
    {
        id: 104,
        badge: "Sale",
        category: "Music",
        name: "Landscape Painting Shirt",
        price: 123.85,
        oldPrice: 245.8,
        rating: 95,
        img1: "/shop/product-4.jpg",
        img2: "/shop/product-hover-1.jpg",
        description: "Wear a piece of art with our Landscape Painting Shirt. Featuring beautiful, scenic prints, this shirt is designed to turn heads."
    },
    {
        id: 105,
        badge: "-30%",
        category: "Speaker",
        name: "Letter Print T-Shirt",
        price: 38.85,
        oldPrice: 45.8,
        rating: 95,
        img1: "/shop/product-5.jpg",
        img2: "/shop/product-hover-1.jpg",
        description: "Our Letter Print T-Shirt is a versatile addition to your casual collection. Simple yet stylish, it's perfect for everyday wear."
    },
    {
        id: 106,
        badge: "-22%",
        category: "Camera",
        name: "Element Pattern Print Shirts",
        price: 238.85,
        oldPrice: 445.8,
        rating: 95,
        img1: "/shop/product-6.jpg",
        img2: "/shop/product-hover-1.jpg",
        description: "Bring a touch of modern design to your outfit with our Element Pattern Print Shirts. Features a unique geometric print for a contemporary look."
    },
    {
        id: 107,
        badge: "New",
        category: "Phone",
        name: "Vintage Henley Shirts",
        price: 1338.85,
        oldPrice: 1445.8,
        rating: 95,
        img1: "/shop/product-7.jpg",
        img2: "/shop/product-hover-4.jpg",
        description: "The Vintage Henley Shirts offer a relaxed, classic fit. Made with breathable fabric, they're the ideal choice for a comfortable day out."
    },
    {
        id: 108,
        badge: "Best Sell",
        category: "Accessories",
        name: "Cotton Leaf Printed",
        price: 338.85,
        oldPrice: 445.8,
        rating: 95,
        img1: "/shop/product-8.jpg",
        img2: "/shop/product-hover-5.jpg",
        description: "Stay fresh and focused with our Cotton Leaf Printed accessories. Inspired by nature, these items add a natural touch to any ensemble."
    },
    {
        id: 109,
        badge: "Best Sell",
        category: "Watch",
        name: "Plain Striola Shirts",
        price: 338.85,
        oldPrice: 445.8,
        rating: 95,
        img1: "/shop/product-9.jpg",
        img2: "/shop/product-hover-6.jpg",
        description: "Another variation of our popular Plain Striola Shirts. Consistent quality and style in every stitch."
    }
];

export const categories = [
    { name: "T-Shirt", logo: "/home/category-thumb-1.jpg" },
    { name: "Bags", logo: "/home/category-thumb-2.jpg" },
    { name: "Sandal", logo: "/home/category-thumb-3.jpg" },
    { name: "Scarf cap", logo: "/home/category-thumb-4.jpg" },
    { name: "Shoes", logo: "/home/category-thumb-5.jpg" },
    { name: "Pillowcase", logo: "/home/category-thumb-6.jpg" },
    { name: "Jumpsuits", logo: "/home/category-thumb-7.jpg" },
    { name: "Hats", logo: "/home/category-thumb-8.jpg" },
];

export const brands = [
    { name: "A DESIGN HUB", logo: "/home/brand-1.png" },
    { name: "Travel", logo: "/home/brand-2.png" },
    { name: "Mockup BAR", logo: "/home/brand-3.png" },
    { name: "Backyard Studio", logo: "/home/brand-4.png" },
    { name: "Travel 2", logo: "/home/brand-5.png" },
    { name: "Travel 2", logo: "/home/brand-6.png" }
];

export const productImages = [
    {
      main: "/product-16-1.jpg",
      thumb: "/thumbnail-1.jpg ",
    },
    {
      main: "/product-16-2.jpg",
      thumb: "/thumbnail-2.jpg ",
    },
    {
      main: "/product-16-3.jpg",
      thumb: "/thumbnail-3.jpg ",
    },
    {
      main: "/product-16-4.jpg",
      thumb: "/thumbnail-4.jpg ",
    },
    {
      main: "/product-16-5.jpg",
      thumb: "/thumbnail-5.jpg ",
    },
    {
      main: "/product-16-6.jpg",
      thumb: "/thumbnail-6.jpg ",
    },
    {
      main: "/product-16-7.jpg",
      thumb: "/thumbnail-7.jpg ",
    },
    {
      main: "/product-16-1.jpg",
      thumb: "/thumbnail-8.jpg ",
    },
    {
      main: "/product-16-2.jpg",
      thumb: "/thumbnail-9.jpg ",
    },
];

export const colors = [
    "#e63946",
    "#f6fe52",
    "#ffffff",
    "#ffb703",
    "#00a8e8",
    "#90bd3c",
    "#ff66c4",
];  

export const sizes = ["S", "M", "L", "XL", "XXL"];
