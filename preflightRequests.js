const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all origins (for preflight, we'll handle it manually)
app.use(cors({ origin: "*" }));

// Manual preflight handler for a specific route
app.options("/api/complex", (req, res) => {
  //Set CORS headers for Options request.
  res.setHeader("Access-Control-Allow-Origin", "https://www.example.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400"); // Cache for 1 day
  res.sendStatus(204); // No Content
});

// Actual route handler
app.post("/api/complex", (req, res) => {
  //Set CORS headers for actual request.
  res.setHeader("Access-Control-Allow-Origin", "https://www.example.com");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.json({ message: "Complex operation successful!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
