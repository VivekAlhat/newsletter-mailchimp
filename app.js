const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

// Create server
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Start server
app.listen(3000, function () {
  console.log("Server is up and running on port 3000");
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/src/signup.html");
});
