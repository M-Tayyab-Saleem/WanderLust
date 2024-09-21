const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { storeOriginalURL } = require("../midllewares");
const userController = require("../controller/user")

// User
// Get Form // Register User
router.route("/signup").get( userController.signupForm).post(
  wrapAsync(userController.signup)
);


//Login
//Get Form // Login User
router.route("/login").get(userController.loginForm ).post(
storeOriginalURL,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

//Logout
router.get("/logout", userController.logout);

module.exports = router;
