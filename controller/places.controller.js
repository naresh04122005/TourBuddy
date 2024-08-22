const Place = require("../models/places.model");
const Review = require("../models/reviews.model");

module.exports.addNewPlace = async (req, res) => {
  const { title, description, location, image } = req.body;
  const newPlace = new Place({
    title,
    description,
    location,
    image,
  });

  newPlace.addedBy = req.user._id;
  await newPlace.save();
  req.flash("success", "Successfully created a new place");
  res.redirect("/places");
};

module.exports.getPlaceById = async (req, res) => {
  let place = await Place.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "createdBy" } })
    .populate("addedBy");
  // console.log(place);
  if (!place) {
    req.flash("error", "Cannot find that place");
    return res.redirect("/places");
  }
  res.render("./places/show.ejs", { place: place });
};

module.exports.renderEditPlaceFrom = async (req, res) => {
  let place = await Place.findById(req.params.id);
  if (!place) {
    req.flash("error", "Cannot find that place");
    return res.redirect("/places");
  }
  res.render("./places/edit.ejs", { place: place });
};

module.exports.updatePlace = async (req, res) => {
  const place = await Place.findByIdAndUpdate(req.params.id, req.body);
  await place.save();
  req.flash("success", "Successfully updated place");
  res.redirect("/places/" + req.params.id);
};

module.exports.deletePlace = async (req, res) => {
  await Place.findByIdAndDelete(req.params.id);
  await Review.deleteMany({ _id: { $in: place.reviews } });
  req.flash("success", "Successfully deleted place");
  res.redirect("/places");
};
