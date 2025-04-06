import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Typography, Box } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const PowerConsumptionPieChart = ({ devices }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  });

  useEffect(() => {
    if (devices.length > 0) {
      const labels = devices.map((device) => device.name);
      const data = devices.map((device) => parseFloat(device.totalPowerConsumption));
      const colors = devices.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

      setChartData({
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors,
            hoverBackgroundColor: colors,
          },
        ],
      });
    }
  }, [devices]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Typography sx={{ mt: 4 }} variant="h5" gutterBottom>
        Device Power Consumption
      </Typography>
      <Pie data={chartData} />
    </Box>
  );
};

export default PowerConsumptionPieChart;
