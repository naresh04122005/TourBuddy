const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
const ejsMate = require("ejs-mate");
var cookieParser = require("cookie-parser");

//Milddleware setup
app.use(cookieParser());
app.engine("ejs", ejsMate);

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set ejs as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Index Route

app.get("/", (req, res) => {
  res.send("Hello Boyyy");
});

app.get("/home", (req, res) => {
  res.render("./places/home");
});


// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
