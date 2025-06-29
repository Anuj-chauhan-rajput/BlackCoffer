require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const dataRoutes = require("./routes/data");  // existing data routes
const authRoutes = require("./routes/auth");  // ✅ login/register routes

const bcrypt = require("bcryptjs");
const User = require("./models/User"); // ✅ Needed for /create-admin

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route mounting
app.use("/api", dataRoutes);         // e.g., /api/something
app.use("/api/auth", authRoutes);    // ✅ now /api/auth/login will work

// ✅ TEMP ROUTE to create admin user — remove later
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

// Connect DB and start server
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
