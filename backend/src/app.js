const express = require("express");
const app = express();
const deviceRoutes = require("./routes/deviceRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use("/", authRoutes);
app.use("/devices", deviceRoutes);


const PORT = 3030;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
