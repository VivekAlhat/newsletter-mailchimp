const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

// Create server
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, function () {
  console.log("Server is up and running on port 3000");
});
