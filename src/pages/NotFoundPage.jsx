// src/pages/NotFoundPage.jsx
import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Container className="text-center mt-5">
      <h2>404 — Page not found</h2>
      <p>The page you requested doesn't exist.</p>
      <Button as={Link} to="/" className="mt-2">Back to Home</Button>
    </Container>
  );
}

export default NotFoundPage;
