import React, { useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../services/context/AuthContext";


export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // From context
  const { setUser, setLoggedIn } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/", // Django JWT endpoint
        {
          username: form.username,
          password: form.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Save tokens
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      // Update context
      setUser(form.username);
      setLoggedIn(true);

      setError("");
      navigate("/dashboard"); // redirect after login
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError("Invalid username or password");
    }
  };

  return (
    <Card className="p-4 mt-4 mx-auto" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </Form.Group>
        <Button type="submit" className="w-100">
          Login
        </Button>
      </Form>
      <div className="mt-3 text-center">
        <span>Don’t have an account? </span>
        <Link to="/signup">Signup</Link>
      </div>
    </Card>
  );
}
