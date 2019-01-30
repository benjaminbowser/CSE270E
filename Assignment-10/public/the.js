// Benjamin Bowser
// 1/17/19
// CSE270e
// Module 10 Weather Assignment
$(function() {
  var $h1 = $("h1");
  var $zip = $("input[name='zip']");
  // Load the temperature
  $("#indexForm").on("submit", function(event) {
    event.preventDefault();
    var zipCode = $.trim($zip.val());
    $h1.text("Loading...");
    var request = $.ajax({
      url: "/" + zipCode,
      dataType: "json"
    });
    request.done(function(data) {
      var temperature = data.temperature;
      $h1.text("It is " + temperature + "º in " + zipCode + ".");
    });
    request.fail(function() {
      $h1.text("Error!");
    });
  });
 // Load the summary of the forecast
 $("#summaryForm").on("submit", function(event) {
    event.preventDefault();
    var zipCode = $.trim($zip.val());
    $h1.text("Loading...");
    var request = $.ajax({
      url: "/" + zipCode,
      dataType: "json"
    });
    request.done(function(data) {
      var summary = data.summary;
      $h1.text("Today is " + summary + " in " + zipCode + ".");
    });
    request.fail(function() {
      $h1.text("Error!");
    });
  });


});
