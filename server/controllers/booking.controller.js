const router = require("express").Router();
const { Booking } = require("../models/Booking");
const { Room } = require("../models/Room");
const moment = require("moment");

router.get("/allBookings", (req, res) => {
  Booking.find({ isCompleted: false, isApproved: true }, (err, data) => {
    res.send({ success: true, message: data });
  }).catch(error => {
    console.log(error);
    res.send({ success: false, error });
  });
});

router.post("/user/bookings", (req, res) => {
  console.log(req.body);

  Booking.find({ user: req.body.user_id })
    .sort({ createdAt: "desc" })
    .then(response => {
      res.send({ success: true, response });
    })
    .catch(error => {
      console.log(error);
      res.send({ success: false, error });
    });
});

router.post("/checkin", (req, res) => {
  Booking.findById(req.body.booking_id)
    .then(booking => {
      console.log(booking);style="display: block;"

      const newBooking = booking;

      newBooking["isApproved"] = true;
      newBooking["checkInDate"] = new Date();
      newBooking["hasCheckedIn"] = true;

      Booking.findByIdAndUpdate(req.body.booking_id, newBooking, { new: true })
        .then(updatedDocument => {

          res.send({ success: true, updatedDocument });
        })
        .catch(error => {
          console.log(error);
          res.send({ success: false, error });
        });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/checkout", (req, res) => {
  Booking.findById(req.body.booking_id)
    .then(booking => {
      console.log(booking);

      const newBooking = booking;
      newBooking["isCompleted"] = true;

      Booking.findByIdAndUpdate(req.body.booking_id, newBooking, { new: true })
        .then(updatedDocument => {
          console.log("Updated", updatedDocument["isCompleted"]);

          res.send({ success: true, updatedDocument });
        })
        .catch(error => {
          console.log(error);
          res.send({ success: false, error });
        });
    })
    .catch(error => {
      console.log(error);
    });
});

const checkIntersection = (response, newBooking) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < response.length; i++) {
      if (
        new Date(response[i].checkOutDate).getTime() <=
          new Date(newBooking.checkInDate).getTime() ||
        new Date(response[i].checkInDate).getTime() >=
          new Date(newBooking.checkOutDate).getTime()
      ) {
      } else {
        reject();
      }
    }

    resolve();
  });
};

router.post("/bookRoom", (req, res) => {

  const newBooking = new Booking({
    user_id: req.body.user_id,
    room_id: req.body.room_id,
    user: req.body.user_id,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    guests: req.body.guests.map(guest => {
      return { name: guest.trim() };
    })
  });

  console.log("BOOK ROOM", req.body);

  Booking.find({ room_id: req.body.room_id, isCompleted: false }).then(response => {
    console.log("FOUND PREVIOUS BOOKINGS", response);

    checkIntersection(response, newBooking)
      .then(() => {
        newBooking
          .save()
          .then(response => {
            res.send({ success: true, response });
          })
          .catch(error => {
            console.log(error);
            res.send({ success: false, error });
          });
      })
      .catch(() => {
        res.send({
          success: false,
          error: "Room booked for the specified dates"
        });
      });
  });

});

router.post("/cancelRoom", async (req, res) => {


    const booking = await Booking.findById(req.body.booking_id);

    console.log(booking);

  Booking.findByIdAndRemove(req.body.booking_id, (error, data) => {
    if (error) {
      console.log("error in deleting yo!");
      throw error;
    } else {



      console.log("data all gone and deleted yo");
      res.send({ success: true, data });
    }
  }).catch(error => {
    console.log(error);
    res.send({ success: false, error });
  });
});

router.post("/getRoomBookings", (req, res) => {
  Booking.find(
    { isCompleted: false, room_id: req.body.room_id },
    (err, data) => {
      console.log("getRoomBookings", data, req.body.room_id);

      res.send({ success: true, data });
    }
  ).catch(error => {
    console.log(error);
    res.send({ success: false, error });
  });
});

module.exports = router;
