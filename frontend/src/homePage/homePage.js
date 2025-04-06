import React, { useEffect, useState } from "react";
import { Table, Button, Container, TableBody, TableCell, TablePagination, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PowerConsumptionPieChart from "../helperComponents/PowerConsumptionPieChart ";
import DevicesLocation from "../helperComponents/devicesLocation";
import axios from "axios";
import { Box } from "@mui/system";

function HomePage() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const handleLogOut = async (device) => {
    localStorage.removeItem("token")
    navigate("/");
  }

  const onRowClick = async (device) => {

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(true);
      navigate("/");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3030/devices/${device.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });


      if (res.status === 200) {
        navigate(`/deviceDetails`, { state: res.data });
      }
    } catch (err) {
      setLoading(true);
      setError(err.response?.data?.message || "Something went wrong.");
      navigate('/errorPage')
    }
  };

  useEffect(() => {
    const fetchDevices = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(true);
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:3030/devices", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setLoading(true);
          navigate("/");
        }

        const data = await response.json();
        setDevices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container sx={{ padding: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleLogOut}>
          Log Out
        </Button>
      </Box>
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
            {devices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((device) => (
                <TableRow
                  key={device.id}
                  hover
                  style={{ cursor: "pointer" }}
                  onClick={() => onRowClick(device)}
                >
                  <TableCell>{device.id}</TableCell>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>{device.temperature}</TableCell>
                  <TableCell>{device.humidity}</TableCell>
                  <TableCell>{device.lat}</TableCell>
                  <TableCell>{device.lng}</TableCell>
                  <TableCell>{device.status}</TableCell>
                  <TableCell>{device.totalPowerConsumption}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={devices.length}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 20]}
      />

      <PowerConsumptionPieChart devices={devices} />
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center", mt: 8 }}>
        Devices Location
      </Typography>
      <Box sx={{ justifyContent: 'center', display: 'flex', mt: 4, md: 8 }} maxWidth={1400}>
        <DevicesLocation devices={devices} />
      </Box>

    </Container>
  );
}

export default HomePage;
