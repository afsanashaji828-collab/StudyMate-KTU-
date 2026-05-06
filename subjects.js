const express = require("express");
const router = express.Router();
const subjects = require("../data/db");

// GET /api/subject
router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      data: subjects
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, data: [] });
  }
});

// GET /api/subject/:code
router.get("/:code", (req, res) => {
  try {
    const code = req.params.code ? req.params.code.trim().toUpperCase() : "";
    const subject = subjects.find(s => s.code === code);
    
    if (!subject) {
      return res.status(404).json({ success: false, data: null });
    }
    
    res.json({ success: true, data: subject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, data: null });
  }
});

module.exports = router;
