const LIVE = process.env.NODE_ENV === "production";

const SITEURL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com/";
const LIVEURL = LIVE ? SITEURL : (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/");
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

  // You can add more as needed following the pattern
  // Category endpoints
  addCategory: `${ROOTURL}admin/categories/`,
  listCategory: `${ROOTURL}admin/categories/`,
  getCategory: `${ROOTURL}admin/categories/getCategoryById/`,
  updateCategory: `${ROOTURL}admin/categories/updateCategory/`,
  softDeleteCategory: `${ROOTURL}admin/categories/softDeleteCategory/`,
  restoreCategory: `${ROOTURL}admin/categories/restore`,
  hardDeleteCategory: `${ROOTURL}admin/categories/permanentDelete`,
  toggleCategoryStatus: `${ROOTURL}admin/categories/togglestatus`,
  trashCategories: `${ROOTURL}admin/categories/trash`,
  checkDuplicateCategory: `${ROOTURL}admin/categories/check-duplicate`,
  // ---------------- Main Category ----------------
  listMainCategory: `${ROOTURL}admin/main-categories`,
  addMainCategory: `${ROOTURL}admin/main-categories`,
  getMainCategory: `${ROOTURL}admin/main-categories/`,
  updateMainCategory: `${ROOTURL}admin/main-categories/`,
  deleteMainCategory: `${ROOTURL}admin/main-categories/soft-delete/`,
  toggleMainCategoryStatus: `${ROOTURL}admin/main-categories/toggle-status/`,
  checkDuplicateMainCategory: `${ROOTURL}admin/main-categories/check-duplicate`,
  getTrashMainCategory: `${ROOTURL}admin/main-categories/trash`,
  restoreMainCategory: `${ROOTURL}admin/main-categories/restore/`,
  permanentDeleteMainCategory: `${ROOTURL}admin/main-categories/permanent-delete/`,
  activeMainCategory: `${ROOTURL}admin/main-categories/activeMainCategories`,
  listAllMainCategory: `${ROOTURL}admin/main-categories`,
  // ---------------- Sub Category ----------------
   addSubCategory: `${ROOTURL}admin/subcategory/`,
  listSubCategory: `${ROOTURL}admin/subcategory/`,
  getSubCategoryById: `${ROOTURL}admin/subcategory/getSubCategoryById/`,
  updateSubCategory: `${ROOTURL}admin/subcategory/updateSubCategory/`,
  deleteSubCategory: `${ROOTURL}admin/subcategory/softDeleteSubCategory/`,
  hardDeleteSubCategory: `${ROOTURL}admin/subcategory/permanentDelete/`,
  restoreSubCategory: `${ROOTURL}admin/subcategory/restore/`,
  toggleStatusSubCategory: `${ROOTURL}admin/subcategory/togglestatus/`,
  checkDuplicateSubCategory: `${ROOTURL}admin/subcategory/check-duplicate`,
  listSubCategoryTrash: `${ROOTURL}admin/subcategory/trash/`,
  subCategoryByMainCategoryId:`${ROOTURL}admin/subcategory/activeSubCategory/`,
  listActiveMainCategory: `${ROOTURL}admin/subcategory/activemain-categorylist`,
  
  // Product endpoints
  listProduct: `${ROOTURL}admin/products/`,

  //Contact endpoints
  addContact: `${ROOTURL}admin/contact`,
  listContacts: `${ROOTURL}admin/contact`,
  getContact: `${ROOTURL}admin/contact/getContactById/`,
  updateContact: `${ROOTURL}admin/contact/updateContact/`,
  softDeleteContact: `${ROOTURL}admin/contact/softDeleteContact/`,
  toggleStatusContact: `${ROOTURL}admin/contact/togglestatus/`,

  getSettings: `${ROOTURL}admin/settings/`,
updateSettings: `${ROOTURL}admin/settings/`,
};

const URLs = { API, LIVEURL, FILEURL, SETTINGS_ID };
export default URLs;
