<template>
  <div class="app-user-home">
    <UserNavbar />
    <router-view></router-view>
  </div>
</template>

<script>

import UserNavbar from '../../components/UserNavbar.vue';

export default {
  name: "BookRoom",
  props: {

  },
  components: {
    UserNavbar
  }
};
</script>

<style scoped lang="scss">



</style>
