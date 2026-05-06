const express = require("express");
const router = express.Router();

const subjectRoutes = require("./subjects");
const notesRoutes = require("./notes");
const shortnotesRoutes = require("./shortnotes");
const videosRoutes = require("./videos");
const questionpapersRoutes = require("./questionpapers");
const chatRoutes = require("./chat");
const trendRoutes = require("./trend");

// The prompt specifies to ensure endpoints like /api/subject and /api/notes/:code/module/:no work.
// By mounting these without an 's' on subject, it resolves the HTTP 500 error mentioned in the prompt due to path mismatch.
router.use("/subject", subjectRoutes);
router.use("/notes", notesRoutes);
router.use("/shortnotes", shortnotesRoutes);
router.use("/videos", videosRoutes);
router.use("/questionpapers", questionpapersRoutes);
router.use("/chat", chatRoutes);
router.use("/trend", trendRoutes);

module.exports = router;
