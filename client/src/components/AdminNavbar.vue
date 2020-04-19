<template>
  <div class="app-auth-navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">BookMyHostel | Admin Panel</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link
            tag="li"
            class="nav-item"
            active-class="active"
            :to="{ name: 'admin-add-room' }"
          >
            <a class="nav-link" href="#">Add Room</a>
          </router-link>
          <!-- <router-link tag="li" class="nav-item" active-class="active" :to="{name: 'admin-bookings'}">
            <a class="nav-link" href="#">View Bookings</a>
        </router-link> -->
          <router-link
            tag="li"
            class="nav-item"
            active-class="active"
            :to="{ name: 'admin-view-rooms' }"
          >
            <a class="nav-link" href="#">View Rooms</a>
          </router-link>
          <li class="nav-item" v-if="user !== null">
            <a class="nav-link" style="" href="#" @click="handleLogout"
              >Logout</a
            >
          </li>
        </ul>
      </div>

      <div
          class="display: flex; flex-direction: row; justify-content: space-between; margin-right: 1rem;"
        >
          <a href="https://www.iiita.ac.in" target="_">
          <img
            src="../assets/iiit.png"
            style=" height: 2rem; width: 2rem;"
          />
          </a>
          <img
            src="../assets/2020.gif"
            style=" height: 2rem; width: 2rem; margin-left: 1rem;"
          />
        </div>

    </nav>
  </div>
</template>

<script>
export default {
  name: "AuthNavbar",
  props: {},
  methods: {
    handleLogout() {
      this.$http
        .get("/auth/logout")
        .then(response => {
          console.log("Successfully logged out!", response.data);

          this.$store.dispatch("initApp", null).then(() => {
            this.$router.push({ name: "login" });
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss"></style>
