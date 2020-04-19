const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const morgan = require("morgan");

const KEYS = require("./config/keys.config");

require("./config/passport.config");

const PORT = process.env.PORT || 3000;

const app = express();

const authController = require("./controllers/authentication.controller");
const roomController = require("./controllers/room.controller");
const bookingController = require("./controllers/booking.controller");

mongoose
  .connect("mongodb://localhost:27017/hostel-allotment", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(params => {
    console.log(`> Successfully connected to mongodb on port 27017.`);
  });

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(cookieParser(KEYS.cookie.encryption_key));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [KEYS.cookie.encryption_key]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("tiny"));

app.use("/auth", authController);
app.use("/room", roomController);
app.use("/booking", bookingController);

app.listen(PORT, () => {
  console.log(`> Listening on port ${PORT}.`);
});
