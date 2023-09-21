const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const setApiRoutes = require("./routes/api");

const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(cors());

// Set up API routes
app.use(setApiRoutes);

// Connect to database
mongoose
  .connect("mongodb://localhost/BookStore", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
