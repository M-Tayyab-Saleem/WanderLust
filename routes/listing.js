const express = require("express");
const router = express.Router();
const Listing = require("../models/listings");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, listingValidator } = require("../midllewares.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage}= require("../storageConfig.js");
const upload = multer({ storage  });

// Index Router , Create Route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single('listings[image]'),
    listingValidator,
    wrapAsync(listingController.createListing)
  );

  
//New Route
router.get("/new", isLoggedIn, listingController.newListingForm);

// Show Route //Update Route  //Delete Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listings[image]'),
    listingValidator,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListingForm)
);

// Search
// router.post("/search", listingController.searchListing);


module.exports = router;
