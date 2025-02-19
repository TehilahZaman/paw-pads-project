const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dates: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  typeOfRental: String,

  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Rental = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
