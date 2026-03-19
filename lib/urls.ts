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
  addBrand: `${ROOTURL}brands/`,
  listBrand: `${ROOTURL}brands/`,
  getBrand: `${ROOTURL}brands/getBrandById/`,
  updateBrand: `${ROOTURL}brands/updateBrand/`,
  softDeleteBrand: `${ROOTURL}brands/softDeleteBrand/`,
  restoreBrand: `${ROOTURL}brands/restore`,
  hardDeleteBrand: `${ROOTURL}brands/permanentDelete`,
  toggleBrandStatus: `${ROOTURL}brands/togglestatus`,
  trashBrands: `${ROOTURL}brands/trash`,
  checkDuplicateBrand: `${ROOTURL}brands/check-duplicate`,

  // Settings endpoints
  getSettings: `${ROOTURL}admin/settings/`,
  updateSettings: `${ROOTURL}admin/settings/`,

  // You can add more as needed following the pattern
  // Category endpoints
  listCategory: `${ROOTURL}admin/categories/`,
  // Product endpoints
  listProduct: `${ROOTURL}admin/products/`,

  // Promotion endpoints
  listPromotions: `${ROOTURL}admin/promotions`,
};

const URLs = { API, LIVEURL, FILEURL, SETTINGS_ID };
export default URLs;
