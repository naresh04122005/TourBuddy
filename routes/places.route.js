const express = require("express");
const router = express.Router();
const Place = require("../models/places.model");
const wrapAsync = require("../utils/wrapAsync");
const { validatePlace } = require("../utils/validatePlace");

router.get(
  "/",
  wrapAsync(async (req, res) => {
    let places = await Place.find();
    res.render("./places/home.ejs", { places: places });
  })
);

router.get("/add", (req, res) => {
  res.render("./places/add.ejs");
});

router.post(
  "/add",
  validatePlace,
  wrapAsync(async (req, res) => {
    const { title, description, location, image } = req.body;
    const newPlace = new Place({
      title,
      description,
      location,
      image,
    });

    await newPlace.save();
    req.flash("success", "Successfully created a new place");
    res.redirect("/places");
  })
);

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let place = await Place.findById(req.params.id);
    if (!place) {
      req.flash("error", "Cannot find that place");
      return res.redirect("/places");
    }
    res.render("./places/show.ejs", { place: place });
  })
);

router.get("/:id/edit", async (req, res) => {
  let place = await Place.findById(req.params.id);
  if (!place) {
    req.flash("error", "Cannot find that place");
    return res.redirect("/places");
  }
  res.render("./places/edit.ejs", { place: place });
});

router.patch(
  "/:id",
  validatePlace,
  wrapAsync(async (req, res) => {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body);
    await place.save();
    req.flash("success", "Successfully updated place");
    res.redirect("/places/" + req.params.id);
  })
);

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    req.flash("success", "Successfully deleted place");
    res.redirect("/places");
  })
);

module.exports = router;
