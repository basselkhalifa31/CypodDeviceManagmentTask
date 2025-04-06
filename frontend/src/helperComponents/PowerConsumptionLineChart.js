import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Paper, Typography, Box } from '@mui/material';


const LineChartComponent = ({ monthlyPowerConsumption, title = "Monthly Power Consumption" }) => {
  if (!monthlyPowerConsumption) return null;

  const data = Object.entries(monthlyPowerConsumption).map(([month, value]) => ({
    month,
    power: parseInt(value.replace(" kw", ""), 10),
  }));

  return (
    <Box sx={{ width: '100%', maxWidth: 1300, mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'KW', angle: -90, position: 'insideLeft' }} />
            <Tooltip />

            <Line type="monotone" dataKey="power" stroke="#1976d2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default LineChartComponent;
