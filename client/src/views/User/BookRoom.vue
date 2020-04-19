<template>
  <div class="app-user-book-room">
    <div class="container">
      <h3 class="display-4">
        Book Room
      </h3>
      <template v-if="hasLoaded">
        <div style="display: flex;">
          <div style="flex: 0 0 60%;">
            <div style="max-width: 60%; margin-top: 1rem;">
              <form class="add-room-form" @submit.prevent="handleSubmit">

                <div class="form-group" v-for="(guest, index) of room.capacity" :key="index">
                  <label for="exampleInputEmail1">Guest {{ index + 1 }}:</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="guests[index]"
                    required
                    placeholder=""
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Check In Date</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="checkInDate"
                    :min="date"
                    :max="max_date"
                  />
                </div>

                <div class="form-group">
                  <label for="exampleInputEmail1">Check Out Date</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="checkOutDate"
                    :min="checkInDate"
                    @change="changeDate"
                  />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>

              </form>
            </div>
          </div>

          <div style="flex: 1">
            <div
              class="card"
              style="width: 20rem; margin: 1rem; margin-left: 0;"
            >
              <img :src="room.room_photo" class="card-img-top" height="200px" />
              <div class="card-body">
                <h5 class="card-title">
                  {{ room.room_number }} | ₹{{ room.price }}
                </h5>
                <div class="card-text">
                  <div>Type: {{ room.room_type }}</div>
                  <div>Facilities: {{ room.room_facilities }}</div>
                  <div>Capacity: {{ room.capacity }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        Please wait while your content loads.
      </template>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "BookRoom",
  props: {},
  data() {
    return {
      hasLoaded: false,
      room_id: null,
      room: null,
      user_id: null,
      max_date: '2030-11-11',
      checkInDate: null,
      checkOutDate: null,
      considerForAutoUpgrade: false,
      guests: null,
      guest_string: null,
      date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
    };
  },
  methods: {

    changeDate(event){

      console.log(event);
      this.max_date = event.target.value;
    },

    handleSubmit() {


      const newBooking = {
        user_id: this.user_id,
        room_id: this.room_id,

        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        guests: this.guests

      };

      this.$http.post('/booking/bookRoom', {...newBooking}).then(({data}) => {

        if(data.success == false) {

          window.alert(data.error);

        } else {

          this.$router.push({name: 'user-profile'});

        }


      }).catch((error) => {
        console.log(error);
      });

    }

  },
  mounted() {
    this.room_id = this.$route.params.room_id;
    this.user_id = this.user["_id"];


    console.log(this.date);

    this.$http
      .post("room/getRoom", { room_id: this.room_id })
      .then(({ data }) => {
        this.room = data.room;
        this.guests = new Array(this.room.capacity);
        this.hasLoaded = true;
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: mapState(["user"])
};
</script>

<style scoped lang="scss">
.app-user-book-room {
  margin-top: 5rem;
  margin-bottom: 5rem;

  .container {
    max-width: 80%;
  }

  .display-4 {
    font-size: 2.5rem;
  }
}
</style>
