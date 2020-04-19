const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    required: true
  },
});

const User = new mongoose.model("user", UserSchema);

module.exports = { User };
