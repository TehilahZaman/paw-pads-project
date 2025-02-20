const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    checkIn: {
        type: date,
        required: true,
    },
    checkOut: {
        type: date,
        required: true,
    },
    message: {
        type: String,
        required: false,
    }

});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
