import React from "react";
import { Typography, Box } from "@mui/material";

const ExecutePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "80vh",
        mt: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: "#1F2937",
          textAlign: "center",
          borderBottom: "2px solid #E5E7EB",
          pb: 1,
          width: "100%",
          maxWidth: 720,
        }}
      >
        Execute Page
      </Typography>
    </Box>
  );
};

export default ExecutePage;
