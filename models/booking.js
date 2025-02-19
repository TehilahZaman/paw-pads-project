const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

})

const Rental = mongoose.model('Booking', bookingSchema);

module.exports = Booking;