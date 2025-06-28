const express = require("express");
const router = express.Router();
const Insight = require("../models/Insight");

// ✅ FIXED: route should be /data, not /datatghis
router.get("/data", async (req, res) => {
  try {
    const filters = req.query;
    const query = {};

    // Optional: Build a dynamic filter query
    for (let key in filters) {
      if (filters[key]) query[key] = filters[key];
    }

    const data = await Insight.find(query).limit(100);
    console.log("✅ /api/data →", data.length);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: Filter values
router.get("/filters", async (req, res) => {
  try {
    const fields = ["end_year", "topic", "sector", "region", "pestle", "source", "country"];
    const data = await Insight.find({}).limit(1000);

    const result = {};
    fields.forEach((field) => {
      result[field] = [...new Set(data.map((d) => d[field]).filter(Boolean))];
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
