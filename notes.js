const express = require("express");
const router = express.Router();

router.get("/:code/module/:moduleNo", (req, res) => {
  try {
    const code = req.params.code ? req.params.code.trim().toUpperCase() : "UNKNOWN";
    const moduleNo = parseInt(req.params.moduleNo, 10) || 1;

    let titleMain = `Module ${moduleNo}`;
    let definitionText = "Proper explanation";
    let explanationText = "Detailed concept";
    let exampleText = "Example for exam";

    if (code === "MAT101") {
       if (moduleNo === 1) { titleMain = "Matrices"; definitionText = "A matrix is a rectangular array of numbers..."; explanationText = "Matrices simplify solving systems of linear equations."; exampleText = "Find the determinant of a 3x3 matrix."; }
       else if (moduleNo === 2) { titleMain = "Differentiation"; definitionText = "Measures rate of change..."; explanationText = "The derivative represents the slope."; exampleText = "Differentiate x^2 + cx."; }
       else if (moduleNo === 3) { titleMain = "Integration"; definitionText = "Measures area under curve..."; explanationText = "The integral represents continuous sum."; exampleText = "Integrate x^2 dx."; }
    }

    res.json({
      success: true,
      data: {
        moduleNo: moduleNo,
        title: titleMain,
        notes: [
          { heading: "Definition", content: definitionText },
          { heading: "Explanation", content: explanationText },
          { heading: "Example", content: exampleText }
        ]
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, data: { moduleNo: 1, title: "Error", notes: [{heading: "Error", content: "Error"}] } });
  }
});

router.get("/:code/download", (req, res) => {
  try {
    const code = req.params.code ? req.params.code.trim().toUpperCase() : "UNKNOWN";
    
    let fileContent = `STUDYMATE - COMPLETE NOTES FOR ${code}\n`;
    fileContent += `==============================================\n\n`;

    for (let i = 1; i <= 5; i++) {
        fileContent += `\n--- MODULE ${i} ---\n`;
        fileContent += `Definition:\nCore concepts and foundational semantics established for ${code} operations in module ${i}.\n\n`;
        fileContent += `Explanation:\nDetailed logic frameworks demonstrating how principles evaluate constraints to yield required theoretical outputs.\n\n`;
        fileContent += `Key Examples:\nImplementation step-by-step for university 10-mark examinations regarding this module's primary scope.\n`;
        fileContent += `----------------------------------------------\n`;
    }

    res.setHeader('Content-disposition', `attachment; filename=${code}_StudyMate_Notes.txt`);
    res.setHeader('Content-type', 'text/plain');
    res.send(fileContent);
  } catch (err) {
    res.status(500).send("Error generating notes file.");
  }
});

module.exports = router;
