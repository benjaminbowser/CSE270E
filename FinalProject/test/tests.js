var dataModel = require("/model/game.js");

var chai = require("chai")'
var expect = chai.expect;

var validGameID = "";

describe("createId", function() {
	it("Creates a random game ID that is unique in the db", function() {
	  expect(createId()).not.to.equal(""); // It should return something
	  expect(createId()).not.to.equal(" "); // Not a blank space
	});
});

describe("getGame", function() {
	it("Returns a promise to find the game given the game id", function() {
	  expect(getGame(validGameID)).to.be.a("object");
	  expect(getGame(validGameID)).not.to.equal("");
	});
});

describe("newGame", function() {
	it("Returns a promise to setup a new game", function() {
	  expect(newGame("Test1", "djrpqd")).to.be.a("object");
	  expect(newGame("Test1", "djrpqd")).not.to.equal("");
	});
});

describe("move", function() {
	it("Returns a promise with the gameModel or reject if an error occurs"), function() {
	  expect(move("djrpqd", "Test1", 0)).to.be.a("object");
	  expect(move("abcdef", "Test2", 5)).to.be.a("object");
	});
});

describe("getGames", function() {
	it("Returns a promise to return array of games"), function() {
	  expect(getGames().to.be.a("object");
	});
});

describe("clear", function() {
	it("Clears the database out"), function() {
	  expect(clear().not.to.be.a("object");
	});
});

describe("testAdd", function() {
	it("Creates a game instance for testing only"), function() {
	  expect(testAdd([0, 0, 0, 1, 1, 0, 1, 0, 0]).to.be.a("object");
	});
});

