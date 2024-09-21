const User = require("../models/user");

module.exports.signupForm = (req, res) => {
    res.render("users/signup.ejs");
  };

 module.exports.signup = async (req, res,next) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ username, email });
      let registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser,(err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", "Welcome to WanderLust");
        res.redirect("/listings");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  };

  module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
  };

  module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to WanderLust");
    let redirectURL = res.locals.redirectURL || "/listings"
    res.redirect(redirectURL);
  };

  module.exports.logout = (req, res, next)=>{
    req.logOut((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success", "You Logged Out!");
      res.redirect("/listings");
    });
  };