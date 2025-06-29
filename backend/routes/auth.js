const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("📩 Email:", email);
  console.log("🔑 Password:", password);
  console.log("✅ auth.js loaded");


  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    if (!user.password) {
      console.log("❌ Password not stored in DB");
      return res.status(400).json({ msg: "Password missing" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔐 Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    if (!process.env.JWT_SECRET) {
      console.log("❌ JWT_SECRET is undefined");
      return res.status(500).json({ msg: "JWT secret missing" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router; 