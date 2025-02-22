const express = require("express");
const router = express.Router();
const RentalModel = require("../models/rental.js");
const verifyToken = require("../middleware/verify-token");
const User = require("../models/user");

// CRUD functions needed:
// index and show
// users cannot create, edit, or delete yet

// query:
// i have not included the verifyToken but that can be added

// show route
router.get("/:rentalId", async (req, res) => {
  try {
    const rental = await RentalModel.findById(req.params.rentalId);
    res.status(200).json(rental);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// index route
router.get("/", async (req, res) => {
  try {
    const rentals = await RentalModel.find({});
    console.log(rentals);
    res.status(200).json(rentals);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// index route
router.get("/", async (req, res) => {
  try {
    const rentals = await RentalModel.find({});
    res.status(200).json(rentals);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

router.post("/", async function (req, res) {
  try {
    const createdRental = await RentalModel.create(req.body);
    res.status(201).json(createdRental);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// we can make it so that only users can add comments

//create a review
router.post("/:rentalId/reviews", verifyToken, async function (req, res) {
  try {
    req.body.author = req.user._id;
    req.body.userName = req.user.username;
    const rental = await RentalModel.findById(req.params.rentalId);
    rental.reviews.push(req.body);
    await rental.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// delete a review
router.delete(
  "/:rentalId/reviews/:reviewId",
  verifyToken,
  async function (req, res) {
    try {
      // find the rental
      const rental = await RentalModel.findById(req.params.rentalId);

      // find the review
      const review = rental.reviews.id(req.params.reviewId);
      //rental.reviews[1].author,

      // make sure the user is the creator of the review
      // .string() ?
      if (review.author.toString() !== req.user._id) {
        return res
          .status(403)
          .json({ message: "You are not authroized to delte this review" });
      }
      // remove the comment
      rental.reviews.remove({ _id: req.params.reviewId });
      //save
      await rental.save();
      // success message
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: err.message });
    }
  }
);

// update a review ...

module.exports = router;
