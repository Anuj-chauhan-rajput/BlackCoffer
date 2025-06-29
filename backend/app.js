require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const dataRoutes = require("./routes/data");
const authRoutes = require("./routes/auth");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", dataRoutes);      // /api/data
app.use("/api/auth", authRoutes); // /api/auth/login

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
