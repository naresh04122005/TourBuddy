const User = require("../models/user.model");
const passport = require("passport");

module.exports.registerUser = async (req, res) => {
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
    res.redirect("/users/register");
  }
};

module.exports.loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("error", info.message || "Login failed");
      return res.redirect("/users/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome back to TourBuddy!");
      const redirectUrl = res.locals.redirectUrl || "/places";
      // console.log(redirectUrl,"redirectUrl");
      res.redirect(redirectUrl);
    });
  })(req, res, next);
};

module.exports.logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  req.flash("success", "Logged out successfully");
  res.redirect("/places");
};
