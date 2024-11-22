import React, { useState, useEffect } from "react";
import {
  Card,
  Page,
  Button,
  ResourceItem,
  ResourceList,
  Modal,
  FormLayout,
  TextField as PolarisTextField,
  Spinner,
} from "@shopify/polaris";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [charts, setCharts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newChartName, setNewChartName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch size charts from backend
  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const response = await axios.get("/api/size-charts"); // Replace with your API endpoint
        setCharts(response.data); // Assuming the response is an array of size charts
      } catch (error) {
        console.error("Error fetching size charts:", error);
      } finally {
        setIsLoading(false); // Stop loading spinner
      }
    };

    fetchCharts();
  }, []);

  const handleSaveNewChart = async () => {
    if (newChartName) {
      try {
        const newChart = {
          id: newChartName.toLowerCase().replace(/\s+/g, "-"),
          title: newChartName,
          date: new Date().toISOString().split("T")[0],
        };
        await axios.post("/api/size-charts", newChart); // Save the new chart in the database
        setCharts([...charts, newChart]);
        setShowCreateModal(false);
        setNewChartName("");
      } catch (error) {
        console.error("Error saving new chart:", error);
      }
    }
  };

  return (
    <Page>
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px" }}>Q-Size App</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          {/* Create Size Chart Button */}
          <Link to="/create-chart" style={{ textDecoration: "none" }}>
            <Button primary>Create Size Chart</Button>
          </Link>
        </div>
      </div>

      {/* Description */}
      <Card sectioned>
        <h2 style={{ marginBottom: "10px" }}>
          Size Charts Made Simple for your store!
        </h2>
        <p style={{ marginTop: "0px" }}>
          Welcome to the Q-size App dashboard! Here you can create, view, and
          manage your size charts. Ensure accurate, seamless integration with
          your product pages to improve customer experience and reduce returns.
          For seamless display on product pages, ensure the tags in our app
          match those on your products.
        </p>
      </Card>

      {/* Add spacing between containers */}
      <div style={{ marginBottom: "20px" }}></div>

      {/* Modal for Creating a New Size Chart */}
      {showCreateModal && (
        <Modal
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create New Size Chart"
          primaryAction={{
            content: "Save",
            onAction: handleSaveNewChart,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: () => setShowCreateModal(false),
            },
          ]}
        >
          <Modal.Section>
            <FormLayout>
              <PolarisTextField
                label="Chart Name"
                value={newChartName}
                onChange={(value) => setNewChartName(value)}
                autoComplete="off"
              />
            </FormLayout>
          </Modal.Section>
        </Modal>
      )}
    </Page>
  );
};

export default HomePage;
