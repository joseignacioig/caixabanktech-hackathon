import React from "react";
import { Button } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { profilerData } from "../utils/profilerData";

function DownloadProfilerData() {
  // Handle download functionality
  const handleDownload = () => {
    if (profilerData.length === 0) {
      alert("No profiler data available to download.");
      return;
    }

    // Convert profiler data to JSON
    const jsonData = JSON.stringify(profilerData, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonData], { type: "application/json" });

    // Generate a URL for the Blob and create a link element
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "profiler_data.json";

    // Trigger the download by clicking the link programmatically
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<DownloadIcon />}
      onClick={handleDownload}
    >
      Download Profiler Data
    </Button>
  );
}

export default DownloadProfilerData;
