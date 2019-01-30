// Benjamin Bowser (bowserbl)
// CSE270E
// Assignment - Module 7, Chapter 2 NodeJS Intro

// Use express like Listing 1.1 example
var express = require("express"); // Import express pacakge
var app = express(); // Set app variable as express

// A request at / on the port being listened to will run this code block
app.get("/", function(request, response) {
	response.send("Hello World"); // Send Hello World
});

// Set the application to listen on port 3000
app.listen(3000, function() {
	console.log("Application has started on port 3000"); // Log console message
});

