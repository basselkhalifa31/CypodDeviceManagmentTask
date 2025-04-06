import React from "react";
import { Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotAdminErrorPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterBottom color="error">
        Access Denied
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Only admins can view this page.
      </Typography>
      <Button variant="contained" onClick={handleBack}>
        Go to Home
      </Button>
    </Container>
  );
}

export default NotAdminErrorPage;