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

const Listing = require("../models/Listing");

// GET all listings with pagination (for initial page load)
exports.getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 100;
    const skip = (page - 1) * limit;

    // const total = await Listing.countDocuments();
    const total = 102600;
    const listings = await Listing.find().skip(skip).limit(limit).lean();

    res.render("listings", {
      listings,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    next(err);
  }
};

// GET one listing by ID (for search)
exports.getOne = async (req, res, next) => {
  try {
    // Find listing by custom "id" field, not _id
    const listing = await Listing.findOne({ id: req.params.id }).lean();
    if (!listing) {
      return res.status(404).send("Listing not found");
    }

    // Render the same Handlebars template but only with this listing
    res.render("listings", {
      listings: [listing],  // wrap in array so Handlebars #each works
      currentPage: 1,
      totalPages: 1
    });
  } catch (err) {
    next(err);
  }
};


// CREATE new listing
exports.create = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.json(listing); // return created listing as JSON
  } catch (err) {
    next(err);
  }
};

// UPDATE listing (only name & price editable)
exports.update = async (req, res, next) => {
  try {
    const updatedData = {
      NAME: req.body.NAME,
      price: req.body.price
    };

    const listing = await Listing.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    res.json(listing);
  } catch (err) {
    next(err);
  }
};

// DELETE listing
exports.remove = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
