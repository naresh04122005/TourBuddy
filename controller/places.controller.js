const Place = require("../models/places.model");
const Review = require("../models/reviews.model");
const cloudinary = require("../config/cloudConfig");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.addNewPlace = async (req, res) => {
  const { title, description, location } = req.body;

  let response = await geocodingClient
    .forwardGeocode({
      query: location,
      limit: 1,
    })
    .send();

    // console.log(response.body.features[0].geometry);

  const result = await cloudinary.uploader.upload(req.file.path);
  const image = result.secure_url;
  const imageId = result.public_id;
  const newPlace = new Place({
    title,
    description,
    location,
    image,
    imageId,
    geometry: response.body.features[0].geometry,
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
  try {
    const { id } = req.params;
    const place = await Place.findById(id);

    if (!place) {
      req.flash("error", "Place not found");
      return res.redirect("/places");
    }

    // Check if a new image file is provided
    if (req.file) {
      try {
        // Delete the old image from Cloudinary
        if (place.imageId) {
          await cloudinary.uploader.destroy(place.imageId);
        }

        // Upload the new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        place.image = result.secure_url;
        place.imageId = result.public_id;
      } catch (error) {
        console.error("Cloudinary error:", error);
        req.flash("error", "Failed to update the image on Cloudinary");
        return res.redirect("/places/" + id + "/edit");
      }
    }

    // Update the location and geocode if location is provided
    if (req.body.location && req.body.location !== place.location) {
      try {
        let response = await geocodingClient
          .forwardGeocode({
            query: req.body.location,
            limit: 1,
          })
          .send();
        
        place.location = req.body.location;
        place.geometry = response.body.features[0].geometry;
      } catch (error) {
        console.error("Geocoding error:", error);
        req.flash("error", "Failed to update location");
        return res.redirect("/places/" + id + "/edit");
      }
    }

    // Update other fields
    place.title = req.body.title || place.title;
    place.description = req.body.description || place.description;

    // Save the updated place
    await place.save();

    req.flash("success", "Successfully updated place");
    res.redirect("/places/" + id);
  } catch (err) {
    console.error("Update place error:", err);
    req.flash("error", "Failed to update place");
    res.redirect("/places/" + req.params.id + "/edit");
  }
};

module.exports.deletePlace = async (req, res) => {
  try {
    // Find and delete the place by ID
    const place = await Place.findById(req.params.id);

    if (!place) {
      req.flash("error", "Cannot find that place");
      return res.redirect("/places");
    }

    // Delete the associated image from Cloudinary
    await cloudinary.uploader.destroy(place.imageId);

    // Remove the place from the database
    await Place.findByIdAndDelete(req.params.id);

    // Delete associated reviews
    await Review.deleteMany({ _id: { $in: place.reviews } });

    req.flash("success", "Successfully deleted place");
    res.redirect("/places");
  } catch (error) {
    console.error("Error deleting place:", error);
    req.flash("error", "Failed to delete place. Please try again.");
    res.redirect("/places");
  }
};
