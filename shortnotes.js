const express = require("express");
const router = express.Router();

router.get("/:code", (req, res) => {
  try {
    const code = req.params.code ? req.params.code.trim().toUpperCase() : "UNKNOWN";
    let summaryItems = [
      "Key formulas and equations from the syllabus.",
      "Primary algorithms and computational theories.",
      "Review typical previous year exam questions."
    ];

    if (code === "MAT101") {
       summaryItems = [
         "Matrix is a rectangular array of numbers",
         "Determinant is used to find inverse",
         "Differentiation measures rate of change"
       ];
    }

    res.json({
      success: true,
      data: {
         summary: summaryItems
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, data: { summary: [] } });
  }
});

module.exports = router;
