// Benjamin Bowser
// Assignment 11
// CSE270e
// 1/18/19

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();

var value = 0;
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "public"))); 

app.get("/", function(req, res) {
  res.render("index");
});

// Random min to max
app.get("/api/v1/random/:min/:max", function(req, res) {
  var min = parseInt(req.params.min);
  var max = parseInt(req.params.max);
  // Assume positive numbers only
  if (isNaN(min) || isNaN(max) || max <= min || max < 0 || min < 0) {
    res.status(404);
    res.json({ result: "msg" });
    return;
  }
  var result = Math.round((Math.random() * (max - min)) + min);
  res.json({ result: result });
});

// Random 0 to max
app.get("/api/v1/random/:max", function(req, res) {
  var max = parseInt(req.params.max);
  if (isNaN(max) || max < 0) {
    res.status(404);
    res.json({ result: "msg" });
    return;
  }
  var result = Math.round((Math.random() * (max - 0)) + 0);
  res.json({ result: result });
});

// Set game max
app.post("/api/v1/game", function(req, res, next) {
   var maxValue = parseInt(req.body.max);
   value = Math.round((Math.random() * (maxValue - 0)) + 0);
   if (isNaN(value) || value < 0) {
     res.status(404);
     res.json({ result: "Error" });
     return;
   }
   res.json({ result: "OK" });
});

// Test number against server
app.get("/api/v1/game/:number", function(req, res) {
  var testVal = parseInt(req.params.number);
  if (isNaN(testVal)) {
    res.status(404);
    res.json({ result: "ERROR" });
    return;
  }
  var check;
  if (testVal == value) {
   check = "MATCH";
  }
  if (testVal > value) {
    check = "HIGH";
  }
  if (testVal < value) {
    check = "LOW";
  }
  res.json({ result: check });
});

app.listen(3011, function() {
  console.log("App started on port 3011");
});
