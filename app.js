const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
const ejsMate = require("ejs-mate");
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Place = require("./models/places.model");

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

// Connect To Database
main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/tourBuddy");
}

// routes
app.get("/", (req, res) => {
  res.send("Hello Boyyy");
});

// places routes
app.get("/places", (req, res) => {
 let places=Place.find();
  res.render("./places/home",{places});
});

app.get("/places/add", (req, res) => {
  res.send("add places");
});

app.post("/places/add", (req, res) => {
  const { title, description,location,image } = req.body;
  const newPlace = new Place({
    title,
    description,
    location,
    image,
  });

  newPlace.save();
  res.redirect("/places/home");
});

app.get("/places/edit", (req, res) => {
  res.render("./places/edit");
});

app.get("/places/details", (req, res) => {
  res.render("./places/details");
});

// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
