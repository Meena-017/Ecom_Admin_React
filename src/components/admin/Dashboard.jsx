// import React, { useEffect, useState } from "react";
// import { getAllProducts } from "../../services/productService";
// import { Card, Row, Col } from "react-bootstrap";

// export default function Dashboard() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadData() {
//       try {
//         const data = await getAllProducts();
//         setProducts(data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadData();
//   }, []);

//   if (loading) return <p>Loading dashboard...</p>;

//   // Calculated stats
//   const totalStock = products.reduce((sum, p) => sum + Number(p.stock), 0);
//   const averagePrice = products.length
//     ? (products.reduce((sum, p) => sum + Number(p.price), 0) / products.length).toFixed(2)
//     : 0;
//   const mostExpensive = products.length
//     ? products.reduce((max, p) => (p.price > max.price ? p : max), products[0])
//     : null;

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <Row className="mt-4">
//         <Col md={3}>
//           <Card bg="primary" text="white" className="mb-3">
//             <Card.Body>
//               <Card.Title>Total Products</Card.Title>
//               <Card.Text>{products.length}</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card bg="success" text="white" className="mb-3">
//             <Card.Body>
//               <Card.Title>Total Stock</Card.Title>
//               <Card.Text>{totalStock}</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card bg="warning" text="white" className="mb-3">
//             <Card.Body>
//               <Card.Title>Average Price</Card.Title>
//               <Card.Text>${averagePrice}</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card bg="danger" text="white" className="mb-3">
//             <Card.Body>
//               <Card.Title>Most Expensive</Card.Title>
//               <Card.Text>{mostExpensive ? mostExpensive.name + " ($" + mostExpensive.price + ")" : "N/A"}</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productService"; // fixed import
import { Card, Row, Col } from "react-bootstrap";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProducts(); // use fetchProducts instead of getAllProducts
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  // Calculated stats
  const totalStock = products.reduce((sum, p) => sum + Number(p.stock), 0);
  const averagePrice = products.length
    ? (products.reduce((sum, p) => sum + Number(p.price), 0) / products.length).toFixed(2)
    : 0;
  const mostExpensive = products.length
    ? products.reduce((max, p) => (Number(p.price) > Number(max.price) ? p : max), products[0])
    : null;

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <Row className="mt-4">
        <Col md={3}>
          <Card bg="primary" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text>{products.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="success" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Total Stock</Card.Title>
              <Card.Text>{totalStock}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="warning" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Average Price</Card.Title>
              <Card.Text>₹{averagePrice}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="danger" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Most Expensive</Card.Title>
              <Card.Text>
                    {mostExpensive ? `${mostExpensive.name} (₹${mostExpensive.price})` : "N/A"}

              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
