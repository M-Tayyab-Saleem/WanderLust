const Listing = require("../models/listings");
const ExpressError = require("../utils/ExpressError");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };

module.exports.newListingForm =(req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if (!listing) {
      req.flash("error", "Listing you looking for doesn't Exist!");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  };

  module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let listing = req.body.listings;
    let newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = {url , filename}
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  };

  module.exports.editListingForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you looking for doesn't Exist!");
      res.redirect("/listings");
    }
    let originalImageURL = listing.image.url;
    originalImageURL = originalImageURL.replace("/upload","/upload/c_fill,w_200")
    res.render("listings/edit.ejs", { listing , originalImageURL});
  };

  module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listings });
    if(typeof req.file !== "undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url, filename};
      await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  };

  module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  };

  // module.exports.searchListing = async (req,res) =>{
  //     let {searched} = req.body;
  //     const allListings = await Listing.find({});
  //     let listings = allListings.filter((listing)=>(listing.title === searched));
  //     if(!listings.length){
  //       req.flash("error" ,"Enter Correct name")
  //       res.redirect("/listings")
  //     }else{
  //     res.render("listings/search.ejs", {listings});
  //   }
  // }