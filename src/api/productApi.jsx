// // src/api/productApi.jsx

// // Fetch all products
// export async function fetchProducts() {
//   const response = await fetch("http://127.0.0.1:8000/api/products/");
//   if (!response.ok) {
//     throw new Error("Failed to fetch products");
//   }
//   return await response.json();
// }

// // Create a new product
// export async function createProduct(productData) {
//   const response = await fetch("http://127.0.0.1:8000/api/products/create/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(productData),
//   });
//   if (!response.ok) {
//     throw new Error("Failed to create product");
//   }
//   return await response.json();
// }

// // Update an existing product
// export async function updateProduct(id, productData) {
//   const response = await fetch(
//     `http://127.0.0.1:8000/api/products/update/${id}/`,
//     {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(productData),
//     }
//   );
//   if (!response.ok) {
//     throw new Error("Failed to update product");
//   }
//   return await response.json();
// }

// // Delete a product
// export async function deleteProduct(id) {
//   const response = await fetch(
//     `http://127.0.0.1:8000/api/products/delete/${id}/`,
//     {
//       method: "DELETE",
//     }
//   );
//   if (!response.ok) {
//     throw new Error("Failed to delete product");
//   }
//   return true;
// }
// src/api/productApi.jsx
const API_BASE_URL = "http://127.0.0.1:8000/api/products/";

// Fetch all products
export const fetchProducts = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch products");
  return await response.json();
};

// Add new product
export const addProduct = async (productData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error("Failed to add product");
  return await response.json();
};

// Update existing product
export const updateProduct = async (id, productData) => {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),  
  });
  if (!response.ok) throw new Error("Failed to update product");
  return await response.json();
};

// Delete product
export const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete product");
  return true;
};

