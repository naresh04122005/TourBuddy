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

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/places",
    failureRedirect: "/users/login",
  })
);

// Logout

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/places");
});

module.exports = router;
