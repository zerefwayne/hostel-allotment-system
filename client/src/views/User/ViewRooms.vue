<template>
  <div class="app-admin-view-room">
    <div class="container">
      <h3 class="display-4">
        Rooms
      </h3>
      <template v-if="hasLoaded">
        <div style="display: flex;">
          <div v-for="(room, index) in rooms" :key="index">
            <div class="card" style="width: 20rem; margin: 1rem; margin-left: 0;">
              <img :src="room.room_photo" class="card-img-top" height="200px" />
              <div class="card-body">
                <h5 class="card-title">{{room.room_number}} | ₹{{ room.price }}</h5>
                <div class="card-text">
                  <div>Type: {{ room.room_type }}</div>
                  <div>Facilities: <span v-for="facility of room.room_facilities" :key="facility">{{ facility }} | </span></div>
                  <div>Capacity: {{ room.capacity }}</div>
                </div>
              </div>
              <div class="card-footer">
                <router-link tag="a" class="btn btn-success" :to="{name: 'user-book-room', params: {room_id: room['_id']}}">Book</router-link>
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
export default {
  name: "ViewRooms",
  props: {

  },
  data() {
    return {
      hasLoaded: false,
      rooms: null
    };
  },
  mounted() {
    this.$http
      .get("/room/getRooms")
      .then(({ data }) => {
        if (data.success) {
          this.rooms = data.rooms;
          this.hasLoaded = true;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped lang="scss">
.app-admin-view-room {
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
