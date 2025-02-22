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

const rentalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    typeOfRental: {
        type: String,
        required: false,
        enum: ['House','Condo','Cat Tree', 'Dog house', 'Yard'],
    },
    padOwner: {
        type: String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        // required: false,
    },
    reviews: [reviewSchema]
})

const RentalModel = mongoose.model('Rental', rentalSchema);

module.exports = RentalModel;