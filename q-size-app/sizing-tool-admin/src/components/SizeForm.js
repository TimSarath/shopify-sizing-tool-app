import React, { useState } from "react";
import {
  Page,
  FormLayout,
  TextField,
  Button,
  Card,
  Modal,
  LegacyStack,
  Popover,
  ActionList,
  Banner,
} from "@shopify/polaris";

const SizeForm = () => {
  const [chartName, setChartName] = useState("");
  const [descriptionAbove, setDescriptionAbove] = useState("");
  const [descriptionBelow, setDescriptionBelow] = useState("");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [popoverActive, setPopoverActive] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Existing charts (to simulate searching for a chart)
  const existingCharts = [
    {
      name: "Women's Dress Chart",
      columns: ["Size", "Bust", "Waist", "Hip"],
      rows: [{ Size: "S", Bust: "34", Waist: "28", Hip: "36" }],
    },
    {
      name: "Men's Shirt Chart",
      columns: ["Size", "Chest", "Waist", "Length"],
      rows: [{ Size: "M", Chest: "38", Waist: "32", Length: "28" }],
    },
  ];

  const [columns, setColumns] = useState(["Size", "Bust", "Waist", "Hip"]);
  const [rows, setRows] = useState([
    { Size: "", Bust: "", Waist: "", Hip: "" },
  ]);

  // Handle cell changes dynamically
  const handleCellChange = (rowIndex, columnName, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][columnName] = value;
    setRows(updatedRows);
  };

  // Add/Delete Rows
  const handleAddRow = () => {
    const newRow = columns.reduce((acc, col) => ({ ...acc, [col]: "" }), {});
    setRows([...rows, newRow]);
  };
  const handleDeleteRow = (rowIndex) => {
    const updatedRows = rows.filter((_, i) => i !== rowIndex);
    setRows(updatedRows);
  };

  // Add/Delete Columns
  const handleAddColumn = () => {
    const newColumnName = prompt("Enter column name:");
    if (newColumnName && !columns.includes(newColumnName)) {
      setColumns([...columns, newColumnName]);
      setRows(rows.map((row) => ({ ...row, [newColumnName]: "" })));
    }
  };
  const handleDeleteColumn = (columnName) => {
    if (columns.length <= 1) {
      alert("You must have at least one column.");
      return;
    }
    setColumns(columns.filter((col) => col !== columnName));
    setRows(
      rows.map((row) => {
        const { [columnName]: _, ...updatedRow } = row;
        return updatedRow;
      })
    );
  };

  // Handle Preview and Submit
  const handlePreview = () => setPreviewModalOpen(true);

  const handleSubmit = () => {
    if (!chartName.trim()) {
      alert("Chart name is required.");
      return;
    }

    // Ensure all required fields (Size, Bust, Waist, Hip) are filled in
    for (let row of rows) {
      if (!row.Size || !row.Bust || !row.Waist || !row.Hip) {
        alert("All fields (Size, Bust, Waist, Hip) must be filled!");
        return;
      }
    }

    const requestData = {
      chartName,
      descriptionAbove,
      descriptionBelow,
      columns,
      rows,
    };

    console.log("Submitting:", requestData);
    alert("Submitted! Check console for data.");
  };

  // Toggle Popover for actions
  const togglePopoverActive = () => setPopoverActive(!popoverActive);

  // Handle Search for Chart
  const handleSearch = (query) => {
    setSearchQuery(query);
    const foundChart = existingCharts.find((chart) =>
      chart.name.toLowerCase().includes(query.toLowerCase())
    );
    setSelectedChart(foundChart);
  };

  // Handle actions for selected chart
  const handleAction = (action) => {
    if (action === "edit" && selectedChart) {
      setChartName(selectedChart.name);
      setColumns(selectedChart.columns);
      setRows(selectedChart.rows);
      setEditMode(true);
    } else if (action === "delete" && selectedChart) {
      const updatedCharts = existingCharts.filter(
        (chart) => chart.name !== selectedChart.name
      );
      alert(`Chart "${selectedChart.name}" deleted!`);
      setSelectedChart(null);
      setSearchQuery(""); // Reset search
    }
    setPopoverActive(false); // Close popover after action
  };

  return (
    <Page title="Create Size Chart">
      <FormLayout>
        {/* Search and Other Actions Section */}
        <Card sectioned>
          <TextField
            labelHidden
            placeholder="Search by Size Chart"
            value={searchQuery}
            onChange={(value) => handleSearch(value)}
          />
          {selectedChart && (
            <Banner status="success">
              <p>Chart "{selectedChart.name}" found!</p>
            </Banner>
          )}
          {searchQuery && !selectedChart && (
            <Banner status="critical">
              <p>No chart found with this name!</p>
            </Banner>
          )}
          <Popover
            active={popoverActive}
            activator={
              <Button onClick={togglePopoverActive} disclosure>
                Other Actions
              </Button>
            }
            onClose={togglePopoverActive}
          >
            <ActionList
              items={[
                { content: "Edit Chart", onAction: () => handleAction("edit") },
                {
                  content: "Delete Chart",
                  destructive: true,
                  onAction: () => handleAction("delete"),
                },
              ]}
            />
          </Popover>
        </Card>

        <TextField
          label="Chart Name"
          value={chartName}
          onChange={(value) => setChartName(value)}
          placeholder="E.g., Women's Dress Chart"
        />
        <TextField
          label="Description Above Chart"
          value={descriptionAbove}
          onChange={(value) => setDescriptionAbove(value)}
          multiline
        />

        {/* Dynamic Table */}
        <Card title="Size Chart">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      position: "relative",
                    }}
                  >
                    {col}
                    {col !== "Size" && (
                      <button
                        onClick={() => handleDeleteColumn(col)}
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          background: "none",
                          border: "none",
                          color: "black",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td
                      key={col}
                      style={{ border: "1px solid #ccc", padding: "8px" }}
                    >
                      {col === "Size" ? (
                        <TextField
                          value={row[col]}
                          onChange={(value) =>
                            handleCellChange(rowIndex, col, value)
                          }
                          placeholder="Enter custom size"
                        />
                      ) : (
                        <TextField
                          value={row[col]}
                          onChange={(value) =>
                            handleCellChange(rowIndex, col, value)
                          }
                          placeholder={col}
                        />
                      )}
                    </td>
                  ))}
                  <td>
                    <Button
                      destructive
                      onClick={() => handleDeleteRow(rowIndex)}
                      disabled={rows.length === 1}
                    >
                      Remove Row
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={handleAddRow}>Add Row</Button>
          <Button onClick={handleAddColumn}>Add Column</Button>
        </Card>

        <TextField
          label="Description Below Chart"
          value={descriptionBelow}
          onChange={(value) => setDescriptionBelow(value)}
          multiline
        />
        <LegacyStack>
          <Button onClick={handlePreview}>Preview Chart</Button>
          <Button primary onClick={handleSubmit}>
            Submit
          </Button>
        </LegacyStack>
      </FormLayout>

      {previewModalOpen && (
        <Modal
          open={previewModalOpen}
          onClose={() => setPreviewModalOpen(false)}
          title="Preview Size Chart"
        >
          <Modal.Section>
            <h2>{chartName}</h2>
            <p>{descriptionAbove}</p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col}
                      style={{ border: "1px solid #ccc", padding: "8px" }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((col) => (
                      <td
                        key={col}
                        style={{ border: "1px solid #ccc", padding: "8px" }}
                      >
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p>{descriptionBelow}</p>
          </Modal.Section>
        </Modal>
      )}
    </Page>
  );
};

export default SizeForm;
