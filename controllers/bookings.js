const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.js");
const verifyToken = require("../middleware/verify-token");

// CRUD functions needed:
// index and show
// users cannot create, edit, or delete yet

//route mounted at /users/bookings

router.get("/", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});


module.exports = router;
