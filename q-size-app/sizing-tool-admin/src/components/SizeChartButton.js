import React, { useState } from "react";
import SizeChartModal from "./SizeChartModal";

const SizeChartButton = ({ productId }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button onClick={handleOpenModal} className="size-chart-button">
        View Size Chart
      </button>
      {modalOpen && (
        <SizeChartModal
          productId={productId}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default SizeChartButton;
