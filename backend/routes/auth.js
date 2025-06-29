const router = require("express").Router();

// ✅ TEST ROUTE
router.get("/test", (req, res) => {
  res.json({ status: "✅ /api/auth is working!" });
});

// 🔐 Dummy Login Route (if you're keeping this)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    return res.json({ token: "dummy-token" });
  } else {
    return res.status(400).json({ msg: "Missing credentials" });
  }
});

module.exports = router;
