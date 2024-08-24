if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
const ejsMate = require("ejs-mate");
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const methodOverride = require("method-override");
const placesRoute = require("./routes/places.route");
const User = require("./models/user.model");
const flash = require("connect-flash");

// Connect To Database
main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/tourBuddy");
}

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

// Express Session Options
const options = {
  secret: process.env.SESSION_SECRET || "djsjfdshfdkfdfdgjbdvdhvdbds",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(options));

// Connect Flash
app.use(flash());

// Passport Config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((user, done) => {
  done(null, user.id); // Store user id in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Find user by id
    done(null, user); // Pass user to request
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth Strategy

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      // If user does not exist, create a new user
      const username = profile.displayName || null; // Use displayName as username if available

      user = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        username: username // Optionally set username if available
      });

      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Middleware to make flash messages available to views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Routes for Google Auth
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    req.flash('success', 'Welcome back to TourBuddy!');
    res.redirect('/places');
  }
);


// routes
app.get("/", (req, res) => {
  res.send("Hello Boyyy");
});

// places routes
app.use("/places", placesRoute);

// user routes
app.use("/users", require("./routes/users.route"));

// review routes
app.use("/places/:id/reviews", require("./routes/review.route"));

// Catch-all for 404 errors
app.all("*", (req, res, next) => {
  next(new Error("Page Not Found", 404));
});

// Error Handler
app.use((err, req, res, next) => {
  // console.log(err);
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("./places/error.ejs", { status, message });
});

// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
