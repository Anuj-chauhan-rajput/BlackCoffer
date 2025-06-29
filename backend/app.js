require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const dataRoutes = require("./routes/data");
const authRoutes = require("./routes/auth");
const User = require("./models/User");

const app = express();

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", dataRoutes);      // e.g. /api/data
app.use("/api/auth", authRoutes); // ✅ /api/auth/login
app.use("/api/auth", require("./routes/auth"));

// ✅ TEMP route to create admin user
app.get("/create-admin", async (req, res) => {
  try {
    const existing = await User.findOne({ email: "admin@demo.com" });
    if (existing) return res.send("⚠️ Admin user already exists.");

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const user = new User({ email: "admin@demo.com", password: hashedPassword });
    await user.save();
    res.send("✅ Admin user created: admin@demo.com / admin123");
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    res.status(500).send("Server error");
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
