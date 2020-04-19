const router = require("express").Router();
const { Room } = require("../models/Room");

router.post("/getRoom", (req, res) => {
  Room.findById(req.body.room_id).then(response => {
    res.send({ success: true, room: response });
  }).catch(err =>{
      res.send({success: false, error: err})
  });
});

router.get("/getRooms", (req, res) => {
  Room.find().then(response => {
    res.send({ success: true, rooms: response });
  }).catch(err =>{
      res.send({success: false, error: err})
  });
});

router.post("/addRoom", (req, res) => {

  const newRoom = {
    floor: req.body.room.floor,
    room_number: req.body.room.room_number,
    capacity: req.body.room.capacity,
    room_type: req.body.room.room_type,
    room_photo: req.body.room.room_photo,
    room_facilities: req.body.room.room_facilities,
    price: req.body.room.price
  };

  Room.create(newRoom).then((response) => {



    console.log("New room created successfully!");
    res.send({success: true, newRoom: response});
  }).catch((error) => {
    console.log(error);
    res.send({success: false, error});
  });

});

module.exports = router;
