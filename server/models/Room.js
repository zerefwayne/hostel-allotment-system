const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  floor: {
    type: Number,
    required: true
  },
  room_number: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  room_type: {
    type: String,
    enum: ["SUITE", "SINGLE", "DOUBLE"],
    required: true
  },
  room_photo: {
    type: String,
    default:
      "https://image.freepik.com/free-photo/interior-minimal-bedroom-space-hotel_42090-333.jpg"
  },
  room_facilities: {
    type: [String],
    default: []
  },
  price: {
    type: Number,
    required: true,
    default: 0.0
  }
});

const Room = mongoose.model("room", RoomSchema);

module.exports = { Room };
