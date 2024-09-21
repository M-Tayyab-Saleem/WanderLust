const Listing = require("./models/listings");
const Review = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema , reviewSchema} = require("./joiSchema.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectURL = req.originalUrl;
        req.flash("error", "You have to login to complete that task!");
        return res.redirect("/login");
      }
    next();
}

module.exports.storeOriginalURL = (req,res,next)=>{
    if(req.session.redirectURL){
      res.locals.redirectURL = req.session.redirectURL;
    }
    next()
};

module.exports.isOwner = async (req,res,next)=>{
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)){
     req.flash("error" , "you are not owner of this listing");
     return res.redirect(`/listings/${id}`)
  }
  next()
};

module.exports.listingValidator = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let result = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, result);
  } else {
    next();
  }
};

module.exports.reviewValidator = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
      let result = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,result)
  }else{
      next();
  }
};

module.exports.isReviewAuthor = async (req,res,next)=>{
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
     req.flash("error" , "you are not Author of this Review");
     return res.redirect(`/listings/${id}`)
  }
  next()
};
