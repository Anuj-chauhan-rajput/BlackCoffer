require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dataRoutes = require("./routes/data");
const authRoutes = require("./routes/auth"); // ✅ NEW LINE

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", dataRoutes);        // existing data routes
app.use("/api/auth", authRoutes);   // ✅ NEW LOGIN ROUTES

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

