<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      hasLoaded: false
    };
  },
  mounted() {
    this.$http
      .get("/auth/user")
      .then(({ data }) => {
        if (data.success == false) {
          this.$router.push({ name: "login" });
        } else {
          this.$store.dispatch("initApp", data).then(() => {
            if (data.is_admin) {
              this.$router.push("/admin");
            } else {
              this.$router.push("/user");
            }

            console.log(this.$store.getters.isAuthenticated);
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
