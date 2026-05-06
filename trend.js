const express = require("express");
const router = express.Router();
const subjects = require("../data/db");

// GET /api/trend/:code
router.get("/:code", (req, res) => {
  try {
    const code = req.params.code ? req.params.code.toUpperCase() : "UNKNOWN";
    const subject = subjects.find(s => s.code === code) || { name: code };
    
    const trendData = {
      importantTopics: [
        `Introduction to ${subject.name}`,
        "Core Algorithms & Time Complexity",
        "Advanced Architectural Models",
        "Real-world Applications & Case Studies"
      ],
      repeatedQuestions: [
        `Explain the fundamental concepts of ${subject.name} with examples. (10 Marks)`,
        "Compare and contrast the primary algorithms used in Module 2. (9 Marks)",
        "Write detailed short notes on the topics from Module 4. (5 Marks)",
        "Deduce the mathematical formulation for the given system. (15 Marks)"
      ],
      weightage: {
        module1: "15%",
        module2: "20%",
        module3: "20%",
        module4: "20%",
        module5: "25%"
      }
    };

    res.json({
      success: true,
      data: trendData
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, data: { importantTopics: [], repeatedQuestions: [], weightage: {} } });
  }
});

module.exports = router;
