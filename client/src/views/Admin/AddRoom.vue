<template>
  <div class="app-add-room">
    <div class="container">
      <h3 class="display-4">
        Add Room
      </h3>
      <form class="add-room-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="exampleInputEmail1">Room Number</label>
          <input
            type="text"
            class="form-control"
            v-model="room.room_number"
            required
            placeholder="Eg. A101"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Floor</label>
          <input
            type="number"
            class="form-control"
            v-model="room.floor"
            required
            placeholder="Eg. 2"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Capacity</label>
          <input
            type="number"
            class="form-control"
            v-model="room.capacity"
            required
            placeholder="Eg. 4"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Room Photo</label>
          <input
            type="text"
            class="form-control"
            required
            v-model="room.room_photo"
            placeholder="Enter Image URL"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Room Type</label>
          <input
            type="text"
            class="form-control"
            required
            v-model="room.room_type"
            placeholder="Eg. SINGLE | DOUBLE | SUITE"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Room Facilities</label>
          <input
            type="text"
            required
            class="form-control"
            v-model="room_facilities_string"
            placeholder="Enter a comma seperated list"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Price</label>
          <input
            type="number"
            class="form-control"
            required
            v-model="room.price"
            placeholder="Eg. 500"
          />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddRoom",
  props: {},
  data() {
    return {
      room_facilities_string: null,
      room: {
        floor: null,
        room_number: null,
        capacity: null,
        room_type: null,
        room_photo: null,
        room_facilities: [],
        price: null
      }
    };
  },
  methods: {

    handleSubmit() {

      this.room.room_facilities = this.room_facilities_string.split(',');

      axios.post("http://localhost:3000/room/addRoom", {room: this.room}).then((response) => {
        console.log(response);

        if(response.data.success) {

          this.$router.push({name: 'admin-view-rooms'})

        } else {

          window.alert(response.data.error);

        }


      }).catch((error) => {
        console.log(error);
      });

    }

  }
};
</script>

<style scoped lang="scss">
.app-add-room {
  margin-top: 5rem;

  .display-4 {
    font-size: 2.5rem;
  }

  .add-room-form {
    margin-top: 2rem;
  }
}
</style>
