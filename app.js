const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
const ejsMate = require("ejs-mate");
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Place = require("./models/places.model");
const methodOverride=require("method-override");

//Milddleware setup
app.use(cookieParser());
app.use(methodOverride("_method"));
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
app.get("/places", async (req, res) => {
  let places = await Place.find();
  console.log(places);
  res.render("./places/home", { places: places });
});

app.get("/places/add", (req, res) => {
  res.render("./places/add.ejs");
});

app.post("/places/add", (req, res) => {
  const { title, description, location, image } = req.body;
  const newPlace = new Place({
    title,
    description,
    location,
    image,
  });

  newPlace.save();
  res.redirect("/places");
});

app.get("/places/:id", async(req, res) => {
  let place=await Place.findById(req.params.id);
  res.render("./places/show.ejs",{place:place});
});


// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
