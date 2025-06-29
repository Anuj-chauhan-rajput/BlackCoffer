const express = require("express");
const router = express.Router();

// Dummy login — accepts ANY email + password
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    console.log("✅ Dummy login success for:", email);
    return res.json({ success: true, token: "demo-token" }); // Dummy token
  } else {
    return res.status(400).json({ msg: "Missing credentials" });
  }
});

module.exports = router;
