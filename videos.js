const express = require("express");
const router = express.Router();
const subjects = require("../data/db");

router.get("/:code", (req, res) => {
  try {
    const code = req.params.code ? req.params.code.trim().toUpperCase() : "UNKNOWN";
    
    // Attempt to lookup the subject name for better titles, fallback to code if not found
    const subject = subjects.find(s => s.code === code);
    const subjectName = subject ? subject.name : code;

    let videos = [];

    // Dynamically generate unique video entries based on the specific subject Code and Name
    for (let i = 1; i <= 3; i++) {
       let topicPrefix = `${code} Module ${i}`;
       let searchSuffix = encodeURIComponent(`${subjectName} module ${i} KTU`);

       if (code === "MAT101") {
          if (i === 1) { topicPrefix = "Matrices Explained - Linear Algebra"; searchSuffix = "MAT101+Linear+Algebra+KTU"; }
          if (i === 2) { topicPrefix = "Differentiation Explained"; searchSuffix = "MAT101+Differentiation+KTU"; }
          if (i === 3) { topicPrefix = "Integration Basics"; searchSuffix = "MAT101+Integration+KTU"; }
       }

       videos.push({
          title: topicPrefix,
          youtubeUrl: `https://www.youtube.com/results?search_query=${searchSuffix}`
       });
    }

    res.json({
      success: true,
      data: videos
    });
  } catch (err) {
    res.status(500).json({ success: false, data: [] });
  }
});

module.exports = router;
