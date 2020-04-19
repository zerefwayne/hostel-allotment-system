<template>
  <div class="app-user-navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">BookMyHostel</a>
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
            :to="{ name: 'user-profile' }"
          >
            <a class="nav-link" href="#">Profile</a>
          </router-link>
          <router-link
            tag="li"
            class="nav-item"
            active-class="active"
            :to="{ name: 'user-view-rooms' }"
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
          <img src="../assets/iiit.png" style=" height: 2rem; width: 2rem;" />
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
import { mapState } from "vuex";

export default {
  name: "UserNavbar",
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
  },
  computed: mapState(["user"])
};
</script>

<style scoped lang="scss">
nav.navbar {
  background-color: black;
}
</style>
