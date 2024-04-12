const express = require("express");
const bodyParser = require("body-parser");
const subscriberRoutes = require("./routes/subscriberRoutes");
const { connectDatabase } = require("./utils/database");

const app = express();

// Middleware to parse JSON request bodies
// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Database connection setup
// Database connection setup
const dbPath = "./database/newsletter.db"; // Replace with the path to your SQLite database file
const db = connectDatabase(dbPath);

// Attach the database connection to the request object
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes for handling subscriber-related requests
app.use("/api/subscribers", subscriberRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the newsletter application API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
