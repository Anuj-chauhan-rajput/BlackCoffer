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
console.log("🔌 Mounting /api");
app.use("/api", dataRoutes);      // e.g. /api/data


console.log("🔐 Mounting /api/auth");
app.use("/api/auth", authRoutes); // ✅ /api/auth/login

// ✅ TEMP route to create admin user
console.log("👤 Mounting /create-admin");
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


const path = require("path");

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all route for React (after API routes)
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ msg: "API route not found" });
  }

  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});





// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
