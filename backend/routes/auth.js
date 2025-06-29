const router = require("express").Router();

// Dummy login (no DB, no password hash, no JWT)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@demo.com" && password === "admin123") {
    return res.json({ success: true, token: "demo-token" }); // No real JWT
  } else {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
});

module.exports = router;
