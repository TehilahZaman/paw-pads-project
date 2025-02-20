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
    const bookings = await Booking.find({});
    console.log(bookings);
    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

router.get("/:bookingId", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);

      // verify the user is the user that made the booking 
      // not sure about how i set this up 
    if (req.user._id !== booking.renter) {
      return res.status(403).json({ err: "Unauthorized" });
    }

    // check if the booking exists
    if (!booking) {
      return res.status(404).json({ err: "Booking not found." });
    }
    console.log(booking);
    res.status(200).json(booking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
