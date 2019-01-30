// Benjamin Bowser
// CSE270e
// Final Project
// 1/26/19

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var rest = require("./model/gameModel.js");
var helmet = require("helmet");
var http = require("http");

app.use(helmet.xssFilter());

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, "public")));
app.set("views", path.resolve(__dirname, "public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/manage", function(req, res) {
  res.render("manage");
});

app.get("/manage/statistics", function(req, res) {
 rest.getStats().then(function(result) {
	res.render("statistics", { stats: result });
 });
});

app.get("/manage/games", function(req, res) {
  rest.getGames().then(function(result) {
	res.render("games", { stats: result });
 });
});

app.get("/manage/orphaned", function(req, res) {
 rest.getOrphaned().then(function(result) {
	res.render("orphaned", { stats: result });
 });
});

app.get("/manage/games", function(req, res) {
  res.render("games");
});

app.get("/manage/inprogress", function(req, res) {
 rest.inProgress().then(function(result) {
	res.render("inprogress", { stats: result });
});
});

app.get("/manage/orphaned", function(req, res) {
  res.render("orphaned");
});

app.get("/manage/clear", function(req, res) {
  res.render("clear", { msg: [""] });
});


app.post("/manage/clear", function(req, res) {
if (!req.body.password || !req.body.time) {
 res.render("clear", {msg: ["Password and time required"] });
} else {
 if (req.body.password == "CLEAR") {
	rest.clearOld(req.body.time).then(function(result) {
	res.render("clear", { msg: ["Cleared Entries"] });
	});
 } else {
	res.render("clear", { msg: ["Wrong password."] });
	}
  }
});

app.listen(3016, function() {
  console.log("App started on port 3016");
});

// API Below
app.get("/api/v1/games", function(req, res) {
	rest.getGames().then(function(result) {
		res.json({ message: result});
	});
});

app.post("/api/v1/game", function(req, res) {
	var playerName = (req.body.playerName);
	var gameID = (req.body.gameID);
	if (playerName == null) {
		console.log("No player name");
	} else {
	console.log("Player Name: " +playerName + " GameID: " + gameID);
		if (gameID == null) {
			console.log("In no gameID");
			rest.play(playerName,"0").then(function(result) {
				res.json({status: "OK", game: result });
			});
		} else {
			console.log("In playername and iD");
			rest.play(playerName, gameID).then(function(result) {
				res.json({status: "OK", game: result });
			});
		}
	}
});

app.get("/api/v1/game/:gameID", function(req, res) {
	var gameID = (req.params.gameID);
	if (gameID == null) {
		console.log("error");
	} else {
		rest.getGame(gameID).then(function(result) {
			res.json({status: "OK", game: result });
		});
	}
});

app.get("/api/v1/play/:gameID/:playerName", function(req, res) {
	var gameID = (req.params.gameID);
	var playerName = (req.params.playerName);
	if (playerName == null) {
		console.log("Player name needed");
	} else {

	console.log("Player name: " + playerName + " GameID: " + gameID);
		if (gameID == "0") {
			console.log("In no gameID");
			rest.play(playerName, "0").then(function(result) {
				res.json( {status: "OK", game: result });
			});
		} else {
			console.log("In playername and ID");
			rest.play(playerName, gameID).then(function(result) {
				res.json( {status: "OK", game: result });
			});
		}
	}
});

app.get("/api/v1/move/:gameID/:playerName/:movePosition", function(req, res) {
	var gameID = (req.params.gameID);
	var playerName = (req.params.playerName);
	var movePosition = (req.params.movePosition);

	if (gameID == null || playerName == null || movePosition == null) {
		console.log("Not enough parameters");
	} else {
	console.log("Game: " + gameID + " Name: " + playerName + " Pos: " + movePosition);
	rest.move(gameID, playerName, movePosition).then(function(result) {
		res.json({status: "OK", game: result });
	});
	}
});

module.exports = app;
