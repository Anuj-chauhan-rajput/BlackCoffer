const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("📩 Received email:", email);
  console.log("🔑 Received password:", password);

  try {
    const user = await User.findOne({ email });
    console.log("👤 Found user:", user);

    if (!user) return res.status(400).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔐 Password match:", isMatch);

    if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;
