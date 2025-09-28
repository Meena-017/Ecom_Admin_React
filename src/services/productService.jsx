// // src/services/productService.jsx
// import {
//   fetchProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "../api/productApi";

// // fetch all products
// export const getAllProducts = async () => await fetchProducts();

// // add product
// export const addProduct = async (productData) => await createProduct(productData);

// // update product
// export const editProduct = async (id, productData) => await updateProduct(id, productData);

// // delete product
// export const removeProduct = async (id) => await deleteProduct(id);
import { fetchProducts as apiFetchProducts, addProduct as apiAddProduct, updateProduct as apiUpdateProduct, deleteProduct as apiDeleteProduct } from "../api/productApi";

// Get all products
export const fetchProducts = async () => {
  return await apiFetchProducts();
};

// Add a new product
export const addProduct = async (productData) => {
  return await apiAddProduct(productData);
};

// Update existing product
export const updateProduct = async (id, productData) => {
  return await apiUpdateProduct(id, productData);
};

// Delete a product
export const deleteProduct = async (id) => {
  return await apiDeleteProduct(id);
};
