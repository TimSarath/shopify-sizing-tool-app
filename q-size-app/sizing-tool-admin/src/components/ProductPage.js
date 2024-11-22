import React, { useState } from "react";
import { Button } from "@shopify/polaris";
import SizeChartModal from "./SizeChartModal";

const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Product Page</h1>
      <Button onClick={handleModalToggle} primary>
        View Size Chart
      </Button>
      <SizeChartModal
        productId="sample-product-id"
        open={isModalOpen}
        onClose={handleModalToggle}
      />
    </div>
  );
};

export default ProductPage;
