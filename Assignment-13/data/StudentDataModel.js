// Benjamin Bowser
// Assignment 13
// CSE270e - Winter 2019

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/StudentPerformanceData");

var active=0;

var studentDataSchema = new mongoose.Schema({
	gender: String,
	race: String,
	parentEducation: String,
	lunch: String,
	testPrep: String,
	math: String,
	reading: String,
	writing: String });

var myModel = mongoose.model("StudentPerformanceData", studentDataSchema);

// Add a student to the database
function addStudent(r) {
	return new Promise((resolv, reject) => {
	var newData = new myModel(r);
	newData.save(function(err,v) {
		if (err) {
			reject(err);
		} else {
		resolv();
		}
	});
	});
	}
function close() {
	mongoose.disconnect();
}

// Clears out the database
function clear() {
	myModel.collection.drop();
}

// Count the contents in the database for display
function getCount(table) {
	var data = { parentEducation: { masters: 0, bachelors: 0, associates: 0, someCollege: 0, highSchool: 0, someHighSchool: 0 }, lunch: { standard: 0, free: 0 }, testPrep: { none: 0, completed: 0 } };
	
	table.forEach(function(line) {
		
		// Parent Education 
		if (line.parentEducation == 'master\'s degree') {
			data.parentEducation.masters++;
		}
		else if (line.parentEducation == 'bachelor\'s degree') {
			data.parentEducation.bachelors++;
		}
		else if (line.parentEducation == 'associate\'s degree') {
			data.parentEducation.associates++;
		}
		else if (line.parentEducation == 'some college') {
			data.parentEducation.someCollege++;
		}
		else if (line.parentEducation == 'high school') {
			data.parentEducation.highSchool++;
		} 
		else if (line.parentEducation == 'some high school') { 
			data.parentEducation.someHighSchool++;
		}

		// Lunch cost
		if (line.lunch == 'standard') {
			data.lunch.standard++;
		} 
		if (line.lunch == 'free/reduced') {
			data.lunch.free++;
		}
		
		// Test Prep
		if (line.testPrep == 'none') {
			data.testPrep.none++;
		} 
		if (line.testPrep == 'completed') {
			data.testPrep.completed++;
		}
	});
	
	return data;
}

// Process function of loading database
function getStats(math, reading, writing) {
	return new Promise(function(resolv, reject) {
		myModel.find({
			math: {$gt: math},
			reading: {$gt: reading},
			writing: {$gt: writing}
		})
		.then(function(data) {
			var data = getCount(data);
			return data;
		})
		.then(function(data) {
			resolv(data);
		});
	});
}

// Not used
function getFilters() {
}

exports.addStudent = addStudent;
exports.close = close;
exports.clear = clear;
exports.getFilters = getFilters;
exports.getCount = getCount;
exports.getStats = getStats;
