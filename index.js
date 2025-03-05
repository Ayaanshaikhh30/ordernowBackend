require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json()); // JSON data accept karega
app.use(cors()); // Cross-origin requests allow karega

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "your-mongodb-connection-string-here";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Connection Error ❌", err));

// Sample Route
app.get("/", (req, res) => {
  res.send("Hello, Backend is Running! 🚀");
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));