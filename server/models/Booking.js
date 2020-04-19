const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    gender: {
      type: String,
    },
    age: {
      type: String,
    }
  },
  { _id: false }
);

const BookingSchema = new mongoose.Schema({
  room_id: {
    type: mongoose.Types.ObjectId,
    ref: "room",
    autopopulate: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    autopopulate: true
  },
  guests: [GuestSchema],
  checkInDate: {
    type: String,
    required: true
  },
  checkOutDate: {
    type: String,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isPaymentApproved: {
    type: Boolean,
    default: false
  },
  considerForAutoUpgrade: {
      type: Boolean,
      default: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  hasCheckedIn: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

BookingSchema.plugin(require("mongoose-autopopulate"));

const Booking = mongoose.model("booking", BookingSchema);

module.exports = { Booking };
