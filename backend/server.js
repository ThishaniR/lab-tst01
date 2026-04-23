const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const itemRoutes = require("./routes/itemRoutes");

dotenv.config();

const app = express();

// Allow the React frontend to send requests to this backend.
app.use(cors());

// Allow Express to read JSON data from request bodies.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MERN CRUD Lab backend is running");
});

// All item routes start with /api/items.
app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is missing. Create backend/.env and add your MongoDB connection string.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

