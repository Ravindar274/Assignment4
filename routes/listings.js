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


const express = require("express");
const router = express.Router();
const controller = require("../controllers/listingController");

// CRUD routes
router.get("/", controller.getAll);            // Show all listings
router.get("/:id", controller.getOne);         // Show specific listing
router.post("/", controller.create);           // Insert new listing
router.put("/:id", controller.update);         // Update title & price
router.delete("/:id", controller.remove);      // Delete listing

module.exports = router;
