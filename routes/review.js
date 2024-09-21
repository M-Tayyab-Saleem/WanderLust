const express = require("express");
const router = express.Router( {mergeParams: true});
const Listing = require("../models/listings");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/reviews.js");
const {reviewValidator, isLoggedIn , isReviewAuthor} = require("../midllewares.js");
const reviewController = require("../controller/review.js")


  //Reviews
//Post Route
router.post("/",isLoggedIn, reviewValidator,wrapAsync(reviewController.createReview)
  );
  
  router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor ,
    wrapAsync(reviewController.deleteReview));
  
  module.exports = router