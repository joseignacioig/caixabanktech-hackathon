import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import PropTypes from "prop-types";

const ExportButton = React.memo(function ExportButton({
  data,
  filename,
  headers,
  label,
}) {
  const handleExport = useCallback(() => {
    // Convert data to CSV format
    // Instructions:
    // - Use the convertArrayOfObjectsToCSV function to convert the data array to a CSV string.
    // - Create a Blob object with CSV content
    // - Create a temporary link to download the file
    const csvContent = convertArrayOfObjectsToCSV(data, headers);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [data, filename, headers]);

  // Function to convert object array to CSV
  // Instructions:
  // - Implement logic to convert an array of objects into a CSV string.
  // - Ensure the headers are used to extract the correct fields from each object in the data array.
  const convertArrayOfObjectsToCSV = () => {
    if (!data || data.length === 0) return "";

    const csvHeaders = headers.join(",") + "\n";
    const csvRows = data
      .map((row) =>
        headers
          .map((header) => JSON.stringify(row[header.toLowerCase()]) || "")
          .join(",")
      )
      .join("\n");

    return csvHeaders + csvRows;
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<DownloadIcon />}
      onClick={handleExport}
      disabled={!data || data.length === 0}
    >
      {label || "Export CSV"}
    </Button>
  );
});

// Define types of props for better verification and documentation
ExportButton.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filename: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
};

// Define default props
ExportButton.defaultProps = {
  filename: "data.csv",
  label: "Export CSV",
};

export default ExportButton;
