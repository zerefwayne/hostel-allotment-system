<template>
  <div class="app-login">
    <div class="card">
      <div class="login-card">
        <div
          class="display: flex; flex-direction: row; width: 100%; justify-content: space-between;"
        >
          <img
            src="../../assets/iiit.png"
            style=" height: 5rem; width: 5rem;"
          />
          <img
            src="../../assets/2020.gif"
            style=" height: 5rem; width: 5rem; margin-left: 2rem;"
          />
        </div>
        <h3 style="margin-top: 3rem;">Welcome to BookMyHostel</h3>
        <button
          style="margin-top: 2rem; outline: none; border: none; background: transparent; cursor: pointer;"
          @click="loginHandler"
        >
          <img src="../../assets/google.png" height="40px" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {},
  methods: {
    loginHandler() {
      window.location.href = "http://localhost:3000/auth/google";
    }
  }
};
</script>

<style scoped lang="scss">
.app-login {
  background-color: #000000;
  background: url('../../assets/login.jpg');
  background-size: cover;

  // background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23222' stroke-width='10' %3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E");
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    border-radius: 1rem;
    width: 35rem;
    height: 30rem;
    display: flex;
    background-color: rgba(255, 255, 255, 0.9);
    align-items: center;
    justify-content: center;
  }

  .login-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
  }
}
</style>
