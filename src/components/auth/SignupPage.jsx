import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username && form.password && form.email) {
      // Fake signup success
      localStorage.setItem("user", JSON.stringify(form));
      navigate("/login");
    } else {
      setError("Please fill all fields");
    }
  };

  return (
    <Card className="p-4 mt-4 mx-auto" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3">Signup</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
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
          />
        </Form.Group>
        <Button type="submit" className="w-100">Signup</Button>
      </Form>
      <div className="mt-3 text-center">
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </Card>
  );
}
