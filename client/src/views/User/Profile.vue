<template>
  <div class="app-profile">
    <template v-if="hasLoaded">
      <div class="container">
        <div class="details">
          <img :src="user.displayPictureUrl" class="photo" />
          <div class="text">
            <div class="name">{{ user.name }}</div>
            <div class="email text-muted">{{ user.email }}</div>
          </div>
        </div>

        <div style="display: flex; margin-top: 2rem; margin-bottom: 4rem;">
          <div style="flex: 0 0 90%;">
            <div style="max-width: 100%; margin-top: 1rem;">
              <h6>BOOKINGS</h6>

              <div
                class="mt-3"
                v-for="(booking, index) of current"
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
                      class="btn btn-outline-danger"
                      @click="
                        () => {
                          handleCancelRoom(booking['_id']);
                        }
                      "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      Loading
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Profile",
  props: {},
  data() {
    return {
      current: null,
      past: null,
      hasLoaded: false
    };
  },
  methods: {
    handleCancelRoom(booking_id) {
      this.$http
        .post("booking/cancelRoom", {booking_id})
        .then(response => {
          console.log(response);
          this.$router.push({ name: "user-view-rooms" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.user_id = this.user["_id"];

    this.$http
      .post("booking/user/bookings", { user_id: this.user_id })
      .then(({ data }) => {
        this.current = data.response;
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
.details {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4rem;

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 3rem;
  }

  .photo {
    height: 100px;
    border-radius: 50%;
  }

  .email {
    font-size: 1.6rem;
  }

  .name {
    font-size: 2rem;
  }
}
</style>
