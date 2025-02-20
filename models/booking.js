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
    renter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rental',
        required: true,
    },


});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
