const express = require("express");
const router = express.Router();
const Place = require("../models/places.model");
const wrapAsync = require("../utils/wrapAsync");
const { validatePlace } = require("../utils/validatePlace");
const isLoggedIn = require("../utils/isLoggedIn");
const isOwner = require("../utils/isOwner");
const placesController = require("../controller/places.controller");

router.get(
  "/",
  wrapAsync(async (req, res) => {
    let places = await Place.find();
    res.render("./places/home.ejs", { places: places });
  })
);

router.get("/add", isLoggedIn, (req, res) => {
  res.render("./places/add.ejs");
});

router.post(
  "/add",
  isLoggedIn,
  validatePlace,
  wrapAsync(placesController.addNewPlace)
);

router.get("/:id", wrapAsync(placesController.getPlaceById));

router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(placesController.renderEditPlaceFrom)
);

router.patch(
  "/:id",
  isLoggedIn,
  isOwner,
  validatePlace,
  wrapAsync(placesController.updatePlace)
);

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(placesController.deletePlace)
);

module.exports = router;
