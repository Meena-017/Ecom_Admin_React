// src/components/admin/products/UpdateProduct.jsx
import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import AdminLayout from "../AdminLayout";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { editProduct } from "../../../services/productService";
import LoadingSpinner from "../../common/LoadingSpinner";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({ name: "", price: "", stock: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch single product details
    const fetch = async () => {
      try {
        const res = await api.get(`products/${id}/`);
        // backend might return { id, name, price, stock } or similar
        setProduct({
          name: res.data.name ?? "",
          price: res.data.price ?? "",
          stock: res.data.stock ?? ""
        });
      } catch (err) {
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleChange = (field) => (e) =>
    setProduct((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editProduct(id, product); // uses services -> api.put
      alert("Product updated successfully");
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) {
    return <AdminLayout><LoadingSpinner /></AdminLayout>;
  }

  return (
    <AdminLayout>
      <Card className="p-4 shadow">
        <h3>Update Product</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" value={product.name} onChange={handleChange("name")} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" value={product.price} onChange={handleChange("price")} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" value={product.stock} onChange={handleChange("stock")} required />
          </Form.Group>

          <Button type="submit" variant="primary">Update Product</Button>
        </Form>
      </Card>
    </AdminLayout>
  );
}

export default UpdateProduct;
