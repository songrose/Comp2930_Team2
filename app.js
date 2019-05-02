const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug")("comp2930-team2:server");
const consolidate = require("consolidate");
const mongoose = require("mongoose");

const mainRouter = require("./routes/main");
const gameRouter = require("./routes/game");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/login");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set the rendering engine to mustache
app.engine("html", consolidate.mustache);
app.set("view engine", "html");

// Starting database connection
mongoose
  .connect("mongodb://localhost/ecoQuest")
  .then(() => console.log("Connected to mongo...\n"))
  .catch(err => console.log("Failed connection to mongo ", err));

// Setting the console color to include time and color
require("console-stamp")(console, {
  pattern: "ddd mmm dd HH:MM:ss",
  colors: {
    stamp: "yellow"
  }
});

// Not sure if we are going to use cookies, maybe for game data
app.use(cookieParser());

// public will hold static basic files
// game/public will hold static files for games

// / - route basic windows such as logging in and stuff
// /game - route to game files
app.use("/", mainRouter);
app.use("/game", gameRouter);
app.use("/users", usersRouter);
app.use("/login", authRouter);

// Remove the public static folder if handling all UI with Phaser
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "game/public")));

module.exports = app;