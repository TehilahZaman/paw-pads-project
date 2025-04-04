// npm
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

// Import routers
const authRouter = require("./controllers/auth");
const testJwtRouter = require("./controllers/test-jwt");
const usersRouter = require("./controllers/users");
const bookingsRouter = require("./controllers/bookings.js");
const rentalRouter = require("./controllers/rentals.js");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes
// query: do we want users to have to be signed in to see rentals listing?

app.use("/auth", authRouter);
app.use("/test-jwt", testJwtRouter);

// if you want to verify whole controllers
// import verifytoken above
// then just set it up as a middleware function like below
// app.use(verifyToken)
app.use("/users", usersRouter);
app.use("/rentals", rentalRouter);
app.use("/bookings", bookingsRouter);

// Start the server and listen on port 3000
// app.listen(3000, () => {
//   console.log("The express app is ready!");
// });

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});
