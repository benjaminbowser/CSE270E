// Benjamin Bowser
// CSE270e - Assignment 9
// 1/15/18

var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();

// Create access.log file to write logs from Morgan to
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// Setup the logger using the short format
app.use(logger('short', { stream: accessLogStream }))

var entries = [];
app.locals.entries = entries;

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

// Load a 404 screen with contact info for the developer
app.use(function(req, res) {
  res.status(404).render("404");
 });

// Catch an error with middleware
app.use(function(err, req, res, next) {
 console.error(err);
 next(err);
});

// Run the server on port 3009
http.createServer(app).listen(3009, function() {
  console.log("Guestbook app started on port 3009.");
});
