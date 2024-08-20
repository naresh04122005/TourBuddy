const express = require("express");
const router = express.Router();
const Review = require("../models/reviews.model");
const Place = require("../models/places.model");
const isLoggedIn = require("../utils/isLoggedIn");
const wrapAsync = require("../utils/wrapAsync");
const { validateReview } = require("../utils/validateReview");

router.post(
  "/add",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    const review = new Review(req.body.review);
    review.createdBy = req.user._id;
    place.reviews.push(review._id);
    await review.save();
    await place.save();
    req.flash("success", "Review added successfully");
    res.redirect(`/places/${place._id}`);
  })
);

router.delete(
  "/:placeId/:reviewId",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { placeId, reviewId } = req.params;
    await Place.findByIdAndUpdate(placeId, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully");
    res.redirect(`/places/${placeId}`);
  })
);

module.exports = router;
