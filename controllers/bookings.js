const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.js");
const verifyToken = require("../middleware/verify-token");
const RentalModel = require("../models/rental.js");
////
// CRUD functions needed:
// all CRUD
// controller mounted at /rentals

//route mounted at /users/bookings

//create route
// this is a create route so it must be a post route
router.post("/:rentalId", verifyToken, async (req, res) => {
  try {
    // make the renter the user
    // bookign has no tie to a user according to the model -Jim
    req.body.renter = req.user._id;
    req.body.name = req.user.username;
    req.body.rental = await RentalModel.findById(req.params.rentalId);
    // ['name', 'location', 'typeOfRental', 'padOwner', '_id']
    // this allows us to save the users info under renter and name
    const newBooking = await Booking.create(req.body);

    // make the renter is the mongoDB data base the entirety of the user's info
    res.status(200).json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// index route
// moved this so it wouldn't get caught in params
router.get("/", verifyToken, async (req, res) => {
  console.log("and the index runs");
  try {
    // const bookings = await Booking.find({}).populate("rental");
    const bookings = await Booking.find({ renter: req.user._id }).populate(
      "rental"
    );

    console.log(bookings, "<---- route bookings");
    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

//update route
router.put("/:bookingId", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);

    // confirm the user is the user that created the booking
    // check authorization
    if (!booking.renter.equals(req.user._id)) {
      return res
        .status(403)
        .send("You do not have access to update that booking");
    }

    // find the booking by Id, input form data, return updated booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// delete route
router.delete("/:bookingId", verifyToken, async (req, res) => {
  try {
    // find the booking you want to delete
    const booking = await Booking.findById(req.params.bookingId);

    // check authorization
    if (!booking.renter.equals(req.user._id)) {
      return res
        .status(403)
        .send("You do not have access to delete that booking");
    }
    // delete the booking
    const deletedBooking = await Booking.findByIdAndDelete(
      req.params.bookingId
    );
    res.status(200).json(deletedBooking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// show route
router.get("/:bookingId", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId).populate(
      "rental"
    );

    // verify the user is the user that made the booking
    console.log(req.user._id, booking.renter, "<----- ID");

    if (req.user._id != booking.renter) {
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
