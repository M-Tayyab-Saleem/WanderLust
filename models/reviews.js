const mongoose = require("mongoose");
const { type } = require("../joiSchema");
const Schema = mongoose.Schema;


let reviewSchema = new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
});

const Review = mongoose.model("Review" , reviewSchema);

module.exports = Review;