<template>
  <div class="c-header">
    <router-link to="/" id="logo-container">
      <img src="/img/partytimelogo.png" alt="Party Time" />
    </router-link>
    <h2 class="c-header_title">Party Time</h2>
    <div class="c-header_links">
      <router-link to="/">Home</router-link>
      <router-link to="/dashboard" v-show="authenticated">Dashboard</router-link>
      <router-link to="/login" v-show="!authenticated">Login</router-link>
      <router-link to="/register" v-show="!authenticated">Register</router-link>
      <router-link to="/profile" v-show="authenticated">Profile</router-link>
      <a @click.prevent="logout" v-show="authenticated">Logout</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    }
  },
  computed: {
    authenticated() {
      return this.$store.getters.authenticated;
    },
  },
};
</script>

<style scoped>
.c-header {
  /* background: var(--secondary-color); */
  background-image: linear-gradient(to right, #00b1ff, cyan);
}

.c-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.4rem var(--horizontal-margin);
  background: var(--secondary-color);
  box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.12);
}

.c-header_title {
  font-size: 1rem;
  color: #efefff;
}

#logo-container,
.c-header_links {
  width: 400px;
}

.c-header img {
  height: 1.5rem;
}

.c-header_links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: .7rem;
}

.c-header_links a {
  color: #babac0;
  font-size: 0.6rem;
  font-weight: 550;
  padding: 0.3rem .5rem;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, .1);
  transition: .3s;
}

.c-header_links a.router-link-active,
.c-header_links a:hover {
  color: #4a4a50;
  background-color: var(--details-color);
  text-decoration: none;
}
</style>