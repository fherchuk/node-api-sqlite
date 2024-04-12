const sqlite3 = require("sqlite3").verbose();

// Function to connect to SQLite database
function connectDatabase(databasePath) {
  return new sqlite3.Database(databasePath, (err) => {
    if (err) {
      console.error("Error connecting to database:", err.message);
    } else {
      console.log("Connected to the database");
    }
  });
}

module.exports = { connectDatabase };
