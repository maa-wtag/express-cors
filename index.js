const express = require("express");
const cors = require("cors");

const app = express();

// Define a route for the root URL ("/")
app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Enable CORS for all routes and origins
app.use(cors());

const allowedOrigins = [
  "https://www.example.com",
  "http://localhost:4200", // Example: Allow a local development frontend
  "https://another-site.com",
];

// const corsOptions = {
//   // origin: "http://example.com", // Allow only this origin
//   origin: allowedOrigins, // Allow only these origins
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
//   optionsSuccessStatus: 200, // Some legacy browsers choke on 204
// };

// const corsOptions = {
//   origin: 'https://www.example.com', // Allow only requests from this origin
// };

// const corsOptions = {
//   origin: 'https://www.example.com',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed custom headers
//   credentials: true, // Allow cookies and authorization headers to be sent
//   preflightContinue: false, //important as default value is false.
//   optionsSuccessStatus: 200 // Set the status code for successful OPTIONS requests
// 	 debug: true // Enable debugging
// };

const corsOptions = {
  origin: (origin, callback) => {
    // `origin` will be undefined for same-origin requests (which we always allow)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the request
    }
  },
};

app.use(cors(corsOptions));

app.get("/public", cors(), (req, res) => {
  res.json({ message: "This route is CORS-enabled for all origins." });
});

app.get("/restricted", cors(corsOptions), (req, res) => {
  res.json({ message: "This route is CORS-enabled for a specific origin." });
});

// app.options('*', cors()); // Enable preflight requests for all routes

// app.options('/api/data', cors()); // Enable preflight for a specific route

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
