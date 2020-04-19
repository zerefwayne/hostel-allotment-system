<template>
  <div class="app-user-book-room">
    <div class="container">
      <h3 class="display-4">
        {{ room.room_number }}
      </h3>
      <template v-if="hasLoaded">
        <div style="display: flex;">
          <div style="flex: 0 0 60%;">
            <div style="max-width: 60%; margin-top: 1rem;">
              <h6>CURRENT BOOKINGS</h6>

              <div v-if="bookings.length > 0">
              <div
                class="mt-3"
                v-for="(booking, index) of bookings"
                :key="index"
              >
                <div class="card" style="width: 80%;">
                  <div class="card-body">
                    <h5 class="card-title">ID: {{ booking["_id"] }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                      {{ booking["user_id"]["name"] }}
                    </h6>
                    <h6 class="card-subtitle mb-2 mt-1">
                      Check In: {{ booking["checkInDate"] }} Check Out:
                      {{ booking["checkOutDate"] }}
                    </h6>
                    <div class="card-text">
                      Guests:
                      <ul class="mt-2 list-group">
                        <li
                          class="list-group-item"
                          v-for="(guest, index) in booking['guests']"
                          :key="index"
                        >
                          {{ index + 1 }}. {{ guest["name"] }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button
                      class="btn btn-success btn-sm"
                      v-if="!booking['hasCheckedIn']"
                      @click="
                        () => {
                          handleCheckIn(booking['_id']);
                        }
                      "
                    >
                      Check In
                    </button>
                    <button
                      class="btn btn-danger btn-sm"
                      v-if="booking['hasCheckedIn']"
                      @click="
                        () => {
                          handleCheckOut(booking['_id']);
                        }
                      "
                    >
                      Check Out
                    </button>
                  </div>
                </div>
              </div>
              </div>
              <div v-else>

                <img src="../../assets/not_found.png" style="height: 300px; margin-top: 3rem;">
                <h6 class="display-4" style="font-size: 1.6rem; margin-top: 2rem; color: #555555;">No bookings to show.</h6>

              </div>


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
  name: "EditBooking",
  props: {},
  data() {
    return {
      hasLoaded: false,
      bookings: null,
      room: null
    };
  },
  methods: {
    handleCheckIn(booking_id) {
      this.$http
        .post("/booking/checkin", { booking_id })
        .then(({ data }) => {
          console.log("Data!", data);
          this.$router.push({name: 'admin-view-rooms'});
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCheckOut(booking_id) {
      this.$http
        .post("/booking/checkout", { booking_id })
        .then(({ data }) => {
          console.log("Data!", data);
          this.$router.push({name: 'admin-view-rooms'});
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.room_id = this.$route.params.room_id;
    this.user_id = this.user["_id"];

    this.$http
      .post("room/getRoom", { room_id: this.room_id })
      .then(({ data }) => {
        this.$http
          .post("booking/getRoomBookings", { room_id: this.room_id })
          .then(response => {
            this.bookings = response.data.data;
            this.room = data.room;
            this.hasLoaded = true;
          });
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
