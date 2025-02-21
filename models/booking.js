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
    }

});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
