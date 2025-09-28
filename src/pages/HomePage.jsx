// // src/pages/HomePage.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { Container, Button } from "react-bootstrap";
// import { AuthContext } from "./../services/context/AuthContext";
// function HomePage() {
//   const token = localStorage.getItem("token");
//   const {user,loggedIn,setUser,setloggedIn}=useContext(AuthContext);
//   return (
//     <Container className="text-center mt-5">
//       <h1>Welcome to Admin Dashboard</h1>
//       <p className="lead">Manage your products and users from a single place.</p>

//       {!token ? (
//         <div className="mt-4">
//           <Button as={Link} to="/login" className="me-2">Login</Button>
//           <Button variant="success" as={Link} to="/signup">Signup</Button>
//         </div>
//       ) : (
//         <div className="mt-4">
//           <Button as={Link} to="/dashboard">Go to Dashboard</Button>
//         </div>
//       )}
//     </Container>
//   );
// }

// export default HomePage;
import { useContext, useState } from "react";
import { AuthContext } from "../services/context/AuthContext";
import axios from "axios";

export function HomePage() {
  const { user, loggedIn, setUser, setLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/",
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Save JWT tokens to localStorage
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      // Set user context (you can decode token later if you need username)
      setUser(username);
      setLoggedIn(true);
      setError("");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <div className="container mt-5 text-center">
      <h1>Home Page</h1>
      {loggedIn ? (
        <>
          <h3>Welcome, {user}!</h3>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <div className="mb-3">
            <input
              className="form-control mb-2"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="btn btn-primary" onClick={login}>
            Login
          </button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </>
      )}
    </div>
  );
}
