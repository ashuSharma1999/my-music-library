import React from "react";
import { Typography, Box } from "@mui/material";

export default function NotFound() {
  return (
    <Box sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h3" color="error">404</Typography>
      <Typography variant="h6">Page Not Found</Typography>
    </Box>
  );
}
