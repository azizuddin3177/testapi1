const mongoose = require('mongoose');

console.log("config.js is running");

const url = "mongodb://127.0.0.1:27017/e-comm";


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection error:");
    console.log(err.message);
  });
