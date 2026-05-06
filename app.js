require("dotenv").config();
const express = require("express");
const app = express();

// CORS Middleware to ensure frontend integration works smoothly
app.use((req, res, next) => {
  // Allow the frontend specifically, assuming it runs on localhost:3000
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).send();
  }
  next();
});

app.use(express.json());

const apiRoutes = require("./routes/index");
const path = require("path");

// Serve statically generated PDF notes
app.use("/notes", express.static(path.join(__dirname, "../public/notes")));

// Mount the API routes at /api 
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "KTU Study API is running." });
});

// 404 handler for missing routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route '${req.originalUrl}' not found.` });
});

// Global error handler for catching unexpected errors and preventing crashes
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ success: false, error: "Internal server error." });
});

// Run backend on 5000 to avoid conflict with frontend on 3000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
