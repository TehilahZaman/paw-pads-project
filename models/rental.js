const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
        type: String,
        required: true,
    },
  })



const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;