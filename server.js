const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
// Middlewares
app.use(bodyParser.json());
app.use(bodyParser({ extended: true }));
// ROUTES

const category = require("./route/category");
app.use("/api/category", category);

// CONNECT TO DATABASE
mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("database connected");
  })
  .catch(err => {
    console.log("database error", err);
  });

// RUN SERVER
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
