import React from "react";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/dashboard">E-Commerce Admin</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={2} className="bg-light vh-100 p-3">
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/dashboard/products">Product List</Nav.Link>
              <Nav.Link as={Link} to="/dashboard/products/add">Add Product</Nav.Link>
              <Nav.Link as={Link} to="/dashboard/users">Users</Nav.Link>
              <Nav.Link as={Link} to="/dashboard/users/add">Add User</Nav.Link>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col md={10} className="p-4">
            <Outlet /> {/* Nested pages render here */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
