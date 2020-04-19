const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    require: true
  },
  roll_number: {
    type: String,
  },
  displayPictureUrl: {
    type: String
  },
  google_id: {
    type: String,
    required: true
  },
  is_admin: {
    type: Boolean,
    default: false
  }
});

const User = new mongoose.model("user", UserSchema);

module.exports = { User };
