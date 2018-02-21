const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sports-store', {});
mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server.");
});
mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Errors
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;