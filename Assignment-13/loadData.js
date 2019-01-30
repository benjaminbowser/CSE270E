// Benjamin Bowser
// Assignment 13
// CSE270e - Winter 2019

var mongoose = require("mongoose");
var fs = require("fs");
var csv = require("csv-parse");

fs.createReadStream('data/StudentsPerformance.csv')
.pipe(csv())
.on('data', function(data){
    try {
	var record = {gender: data[0], race: data[1], parentEducation: data[2], lunch: data[3], testPrep: data[4], math: data[5], reading: data[6], writing: data[7] };
	add(record);
    }
    catch(err) {
        console.log("Something went wrong.");
    }
})
.on('end',function(){
    // Completed
});


mongoose.connect("mongodb://localhost:27017/StudentPerformanceData");

var studentDataSchema = new mongoose.Schema({
	gender: String,
	race: String,
	parentEducation: String,
	lunch: String,
	testPrep: String,
	math: String,
	reading: String,
	writing: String
});

var myModel = mongoose.model("StudentPerformanceData", studentDataSchema);

// Clear the database
function clear() {
	myModel.collection.drop();
}

// Add to the database
function add(r) {
	//console.log(r);
	return new Promise((resolv, reject) => {
	var newData = new myModel(r);
	newData.save(function(err,v) {
		if (err) {
			reject(err);
		} else {
		//console.log("Saved");
		resolv();
		}
	});
	});
}

// Read the db
function get(cb) {
	return new Promise((resolv, reject) => {
	myModel.find(function( err, values) {
	console.log(values);
		if (err) {
			reject(err);
		} else {
			resolv(values);
		}
	});
	});
}
