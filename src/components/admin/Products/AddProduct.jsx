import React, { useState } from "react";
import { addProduct } from "../../../services/productService"; // should point to correct service

export default function AddProduct({ onProductAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert price and stock to numbers
    const productData = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock)
    };

    try {
      const newProduct = await addProduct(productData); // calls productService
      alert("Product added successfully!");
      // Clear form
      setName("");
      setDescription("");
      setPrice("");
      setStock("");

      // optional callback to refresh product list
      if (onProductAdded) onProductAdded(newProduct);
    } catch (err) {
      console.error("Failed to add product:", err);
      alert("Error adding product: " + (err.message || "Check console"));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
