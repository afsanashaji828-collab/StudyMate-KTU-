const express = require("express");
const router = express.Router();

router.get("/:code", (req, res) => {
  try {
    const code = req.params.code ? req.params.code.toUpperCase() : "UNKNOWN";
    res.json({
      success: true,
      data: [
        {
          year: "All",
          exam: "KTUHub",
          pdfUrl: `https://ktuhub.com/?s=${code}`
        }
      ]
    });
  } catch (err) {
    res.status(500).json({ success: false, data: [] });
  }
});

module.exports = router;
