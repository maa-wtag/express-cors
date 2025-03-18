const express = require("express");
const cors = require("cors");

const app = express();

// CORS options for the /api/data route
const dataCorsOptions = {
  origin: "https://www.example.com",
};

// No CORS middleware applied globally
// app.use(cors());

// Apply CORS only to this route
app.get("/api/data", cors(dataCorsOptions), (req, res) => {
  res.json({ data: "Some data from the API" });
});

// No CORS restrictions on this route
app.get("/", (req, res) => {
  res.send("Hello from the homepage!");
});

// Enable CORS for a specific route
// app.get("/api/data", cors(), (req, res) => {
//   res.json({ message: "This route has CORS enabled" });
// });

// Another route without CORS
app.get("/no-cors", (req, res) => {
  res.send("This route does not have CORS enabled");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
