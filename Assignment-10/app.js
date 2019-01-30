// Benjamin Bowser
// 1/17/19
// CSE270e
// Module 10 Weather Assignment

var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var ForecastIo = require("forecastio");

var app = express();
// !!Private API key below!!
var weather = new ForecastIo("4bf8130485c363f4908772ffbf20afe3");

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index");
});

// Summary handler
app.get("/summary", function(req, res) {
  res.render("summary");
});

app.get(/^\/(\d{5})$/, function(req, res, next) {
  var zipcode = req.params[0];
  var location = zipdb.zipcode(zipcode);
  if (!location.zipcode) {
    next();
    return;
  }

  var latitude = location.latitude;
  var longitude = location.longitude;

  weather.forecast(latitude, longitude, function(err, data) {
    if (err) {
      next();
      return;
    }

    res.json({
      zipcode: zipcode,
      temperature: data.currently.temperature,
      summary: data.daily.summary
    });
  });
});

app.use(function(req, res) {
  res.status(404).render("404");
});
app.listen(3010);
