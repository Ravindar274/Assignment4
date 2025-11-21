/******************************************************************************
***
* ITE5315 – Assignment 4
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Ravindar Pudugurthi Student ID: N01670407 Date: 20-11-2025
*
*
******************************************************************************
**/


const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    id: String,
    NAME: String,
    "host id": String,
    "host_identity_verified": String,
    "host name": String,
    "neighbourhood group": String,
    neighbourhood: String,
    country: String,
    "country code": String,
    "instant_bookable": String,
    "cancellation_policy": String,
    "room type": String,
    "Construction year": String,
    price: String,
    "service fee": String,
    "minimum nights": String,
    "number of reviews": String,
    "last review": String,
    "reviews per month": String,
    "review rate number": String,
    "calculated host listings count": String,
    "availability 365": String,
    house_rules: String,
    license: String,
    property_type: String,
    thumbnail: String,
    images: [String]
  },
  {
    timestamps: false,
    collection: "airbnb"  // USE YOUR CORRECT COLLECTION NAME
  }
);

module.exports = mongoose.model("Listing", ListingSchema);
