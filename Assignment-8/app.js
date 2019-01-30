// Benjamin Bowser
// CSE270e - Assignment 8
// 1/14/18

var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

// Load the index file when / requested
app.get("/", function(req, res) {
  res.render("index");
});

// Load new-entry page
app.get("/new-entry", function(req, res) {
  res.render("new-entry");
});

// Load about page
app.get("/about", function(req, res) {
  res.render("about");
});

// Clear out entries then load index page
app.get("/clear", function(req, res) {
  entries = [];
  app.locals.entries = entries;
  res.render("index");
});

// Check that entries are filled
app.post("/new-entry", function(req, res) {
  if (!req.body.title || !req.body.body || !req.body.name) {
    res.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({
    title: req.body.title,
    body: req.body.body,
    name: req.body.name,
    published: new Date()
  });
  res.redirect("/");
});

// Load a 404 screen
app.use(function(req, res) {
  res.status(404).render("404");
});

// Run the server on port 3008
http.createServer(app).listen(3008, function() {
  console.log("Guestbook app started on port 3008.");
});
