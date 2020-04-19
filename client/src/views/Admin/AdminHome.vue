<template>
  <div class="app-admin-home">
    <admin-navbar />
    <router-view />
  </div>
</template>

<script>

import AdminNavbar from '../../components/AdminNavbar.vue';

export default {
  name: "AdminHome",
  props: {

  },
  components: {
    AdminNavbar
  }
};
</script>

<style scoped lang="scss">



</style>
