const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
require("dotenv").config();

// Create server
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Start server
app.listen(process.env.PORT || 3000, function () {
  // console.log("Server is up and running on port 3000");
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/src/signup.html");
});

// Post data to mailchimp
app.post("/", function (request, response) {
  const userEmail = request.body.email;
  const data = {
    members: [
      {
        email_address: userEmail,
        status: "subscribed",
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  //  API auth details
  const serverCode = process.env.SERVERCODE;
  const listID = process.env.LISTID;
  const apiKey = process.env.APIKEY;

  const url =
    "https://" + serverCode + ".api.mailchimp.com/3.0/lists/" + listID;
  const options = {
    method: "POST",
    auth: "apiKey:" + apiKey,
  };
  const req = https.request(url, options, function (res) {
    res.on("data", function (data) {
      const r = JSON.parse(data);
      const errCount = r.error_count;
      if (errCount > 0) {
        response.sendFile(__dirname + "/src/error.html");
      } else {
        response.sendFile(__dirname + "/src/success.html");
      }
    });
  });
  req.write(jsonData);
  req.end();
});

app.post("/success", function (req, res) {
  res.redirect("/");
});

app.post("/error", function (req, res) {
  res.redirect("/");
});
