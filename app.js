/******************************************************************************
***
* ITE5315 – Assignment 4
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Ravindar Pudugurthi Student ID: N01670407 Date: 20-11-2025
*
*
******************************************************************************
**/

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const path = require("path");

// Controller
const listingController = require("./controllers/listingController");

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars setup with helpers
const hbs = exphbs.create({
  extname: ".hbs",
  helpers: {
    serviceFeeValue: (serviceFee) => (serviceFee && serviceFee.trim() !== "" ? serviceFee : "0"),
    highlightEmptyFee: (serviceFee) => (serviceFee && serviceFee.trim() !== "" ? "" : "highlight-row"),
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    gt: (a, b) => a > b,
    lt: (a, b) => a < b
  }
});

app.engine(".hbs", hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { connectTimeoutMS: 30000 })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const db = mongoose.connection;

db.on("connected", () => console.log("Mongoose connected"));
db.on("error", (err) => console.error("Mongoose error:", err));
db.on("disconnected", () => console.log("Mongoose disconnected"));

// Graceful shutdown
process.on("SIGINT", async () => {
  await db.close();
  console.log("Mongoose disconnected on app termination");
  process.exit(0);
});

// Routes
const listingRoutes = require("./routes/listings");
app.use("/listings", listingRoutes);


app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation Error",
      errors: err.errors
    });
  }

  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
