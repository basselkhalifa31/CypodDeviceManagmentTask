
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, Box, TableHead, TableRow, Paper, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PowerConsumptionLineChart from "../helperComponents/PowerConsumptionLineChart";

function DeviceDetailsPage() {
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const navigate = useNavigate();
  var device = state;

  if (device === null) {
    device = []
  }

  const handleBack = () => {
    navigate("/home");
  };

  useEffect(() => {
    const checkLoggingIn = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(true);
        navigate("/");
        return;
      }
      setLoading(false)
    };
    checkLoggingIn();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }


  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Device Details
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="device table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Device ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Temperature</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Humidity</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Lat</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Lng</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Power Consumption</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{device.id}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell>{device.temperature}</TableCell>
              <TableCell>{device.humidity}</TableCell>
              <TableCell>{device.lat}</TableCell>
              <TableCell>{device.lng}</TableCell>
              <TableCell>{device.status}</TableCell>
              <TableCell>{device.totalPowerConsumption}</TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
      <PowerConsumptionLineChart monthlyPowerConsumption={device.monthlyPowerConsumption} />
      <Box sx={{ justifyContent: 'center', display: 'flex' }}>
        <Button sx={{ textAlign: "center", mt: 10 }} variant="contained" onClick={handleBack}>
          Go to Home
        </Button>
      </Box>

    </div>
  );
};

export default DeviceDetailsPage;
