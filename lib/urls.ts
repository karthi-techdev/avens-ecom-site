const LIVE = process.env.NODE_ENV === "production";

const SITEURL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com/";
const LIVEURL = LIVE
  ? SITEURL
  : process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/";
const ROOTURL = `${LIVEURL}api/v1/`;
const FILEURL = LIVEURL;
const SETTINGS_ID = "68ad8844bfdf0cec7f623bc2";

export const API = {
  // ---------------- Brand endpoints ----------------
  addBrand: `${ROOTURL}admin/brands/`,
  listBrand: `${ROOTURL}admin/brands/`,
  getBrand: `${ROOTURL}admin/brands/getBrandById/`,
  updateBrand: `${ROOTURL}admin/brands/updateBrand/`,
  softDeleteBrand: `${ROOTURL}admin/brands/softDeleteBrand/`,
  restoreBrand: `${ROOTURL}admin/brands/restore`,
  hardDeleteBrand: `${ROOTURL}admin/brands/permanentDelete`,
  toggleBrandStatus: `${ROOTURL}admin/brands/togglestatus`,
  trashBrands: `${ROOTURL}admin/brands/trash`,
  checkDuplicateBrand: `${ROOTURL}admin/brands/check-duplicate`,

  // Settings endpoints
  getSettings: `${ROOTURL}admin/settings/`,
  updateSettings: `${ROOTURL}admin/settings/`,

  // You can add more as needed following the pattern
  // Category endpoints
  listCategory: `${ROOTURL}admin/categories/`,


    // ---------------- Product endpoints ----------------
  addProduct: `${ROOTURL}admin/products/`,
  listProduct: `${ROOTURL}admin/products/`,
  getProductById: `${ROOTURL}admin/products/getProductById/`,
  updateProduct: `${ROOTURL}admin/products/updateProduct/`,
  softDeleteProduct: `${ROOTURL}admin/products/softDelete/`,
  permanentDeleteProduct: `${ROOTURL}admin/products/permanentDelete/`,
  restoreProduct: `${ROOTURL}admin/products/restore/`,
  toggleProductStatus: `${ROOTURL}admin/products/toggleStatus/`,
  trashProducts: `${ROOTURL}admin/products/trash`,
  checkProductSlug: `${ROOTURL}admin/products/checkSlugExist`,
  filterProducts: `${ROOTURL}admin/products/filter`,
  newProducts: `${ROOTURL}admin/products/new`,

        //  Blog endpoints
   addBlog: `${ROOTURL}admin/blogs/`,
  listBlog: `${ROOTURL}admin/blogs/`,
  getBlog: (slug: string) => `${ROOTURL}admin/blogs/get/${slug}`,
  updateBlog: (id: string) => `${ROOTURL}admin/blogs/update/${id}`,
  softDeleteBlog: (id: string) => `${ROOTURL}admin/blogs/delete/${id}`,
  trashBlog: `${ROOTURL}admin/blogs/trash`,
  toggleBlogStatus: (id: string) => `${ROOTURL}admin/blogs/status/${id}`,
  restoreBlog: (id: string) => `${ROOTURL}admin/blogs/restore/${id}`,
  permanentDelete: (id: string) => `${ROOTURL}admin/blogs/permanentDelete/${id}`,
  checkDuplicate: `${ROOTURL}admin/blogs/check-duplicate`,

  // Promotion endpoints
  listPromotions: `${ROOTURL}admin/promotions`,
  // Offer endpoints
  listOffers: `${ROOTURL}admin/offers/`,
//comments
  addComment: `${ROOTURL}admin/comments/`,
};

const URLs = { API, LIVEURL, FILEURL, SETTINGS_ID };
export default URLs;
