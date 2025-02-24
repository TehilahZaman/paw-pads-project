const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    message: {
        type: String,
        required: false,
    },
    renter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
