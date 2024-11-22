import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "@shopify/polaris";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import SizeForm from "./components/SizeForm";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/create-chart" element={<SizeForm />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
