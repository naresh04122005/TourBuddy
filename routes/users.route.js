const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const passport = require("passport");

// Register
router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    await User.register(user, password);
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "Welcome to TourBuddy!");
      res.redirect("/places");
    });
  } catch (err) {
    //   console.log(err);
    req.flash("error", err.message);
    res.redirect("/user/register");
  }
});

// Login
router.get("/login", (req, res) => {
  res.render("users/login");
});

//login route with success and failure flash messages and redirect
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
    successRedirect: "/places",
    successFlash: "Welcome back to TourBuddy!",
  })
);

// Logout

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  req.flash("success", "Logged out successfully");
  res.redirect("/places");
});

module.exports = router;
