import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="p-3 bg-light vh-100">
      <h5>Menu</h5>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/products">Product List</Nav.Link>
        <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>
        <Nav.Link as={Link} to="/users">User List</Nav.Link>
        <Nav.Link as={Link} to="/add-user">Add User</Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;
