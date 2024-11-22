import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "10px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/create-chart" style={{ textDecoration: "none" }}>
        Get Started
      </Link>
    </nav>
  );
};

export default Navbar;
