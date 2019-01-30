// Benjamin Bowser
// Assignment 11
// CSE270e
// 1/18/19

$(function() {
var $max = $("input[id='max']");
var $h2 = $("h2[id='result']");
// Setting the max value with POST
  $("#setMax").on("submit", function(event) {
   event.preventDefault();
   var maxValue = $.trim($max.val());
   var request = $.ajax({
	url: "/api/v1/game",
	type: "POST",
	dataType: "JSON",
	contentType: "application/json",
	data: JSON.stringify( {"max": maxValue })
   });
   $h2.html("New max set");
  });

var $guess = $("input[id='guess']");
// Play the actual game
  $("#game").on("submit", function(event) {
   event.preventDefault();
   var guessed = $.trim($guess.val());
   var request = $.ajax({
	url: "/api/v1/game/" + guessed,
	dataType: "json"
   });
   request.done(function(data) {
	var location = data.result;
	$h2.html(guessed + " is " + location);
   });
   });
});

