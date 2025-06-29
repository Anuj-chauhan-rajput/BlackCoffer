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

// ✅ Log every request (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ ADD TEST ROUTE HERE
app.get("/api/auth/test", (req, res) => {
  res.json({ status: "auth route connected" });
});

// Routes
app.use("/api/data", dataRoutes);     // for /api/data, /api/data/filters etc.
app.use("/api/auth", authRoutes);     // for /api/auth/login etc.

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
