var supertest = require("supertest");
var express = require("express");

const app = express();

app.get("/api/v1/games", function(req, res) {
  res.status(200).json({"message":[{"board":[0,0,0,0,0,0,0,0,0],_id:"5c4a06358d743a1ab8748430",player1Name:"player2",player2Name:"Ben",moveCnt:0,lastMoveTime:0,state:"player1Turn"});
});

request(app)
  .get("/api/v1/games")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
});

app.post("/api/v1/game", function(req, res) {
  res.status(200).json({status: "OK" });
});

request(app)
  .post("/api/v1/game")
  .send({playerName: "Test"}
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
});

var gameID = "zhlkkn";
var playerName = "Mark";
var movePosition = 2
app.get("/api/v1/move/"+gameID+"/"+playerName+"/"+movePosition, function(req, res) {
  res.status(200).json({status: "OK" });
});

request(app)
  .get("/api/v1/move/"+gameID+"/"+playerName+"/"+movePosition)
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
});
