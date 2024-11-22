import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "@shopify/polaris";
import axios from "axios";

const SizeChartModal = ({ productId, open, onClose }) => {
  const [sizeData, setSizeData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && productId) {
      setLoading(true);
      axios
        .get(`/api/size-chart/product/${productId}`)
        .then((response) => {
          setSizeData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching size chart:", error);
          setLoading(false);
        });
    }
  }, [open, productId]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Size Chart"
      primaryAction={{
        content: "Close",
        onAction: onClose,
      }}
    >
      <Modal.Section>
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spinner size="large" />
          </div>
        ) : sizeData && sizeData.length > 0 ? (
          <div
            style={{
              overflowX: "auto",
              padding: "10px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                margin: "10px 0",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{ borderBottom: "2px solid #ddd", padding: "8px" }}
                  >
                    Size
                  </th>
                  <th
                    style={{ borderBottom: "2px solid #ddd", padding: "8px" }}
                  >
                    Bust
                  </th>
                  <th
                    style={{ borderBottom: "2px solid #ddd", padding: "8px" }}
                  >
                    Waist
                  </th>
                  <th
                    style={{ borderBottom: "2px solid #ddd", padding: "8px" }}
                  >
                    Hip
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((entry, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "8px",
                      }}
                    >
                      {entry.size}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "8px",
                      }}
                    >
                      {entry.bust}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "8px",
                      }}
                    >
                      {entry.waist}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "8px",
                      }}
                    >
                      {entry.hip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: "center", margin: "20px 0" }}>
            No size chart available for this product.
          </p>
        )}
      </Modal.Section>
    </Modal>
  );
};

export default SizeChartModal;
