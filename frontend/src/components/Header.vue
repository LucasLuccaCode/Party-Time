<template>
  <div class="c-header">
    <div class="c-header__logo">
      <router-link to="/">
        <img src="/img/partytimelogo.png" alt="Party Time" />
        <h2>Party Time</h2>
      </router-link>
    </div>
    <div class="c-header__links">
      <router-link to="/">Home</router-link>
      <router-link to="/dashboard" v-show="authenticated"
        >Dashboard</router-link
      >
      <router-link to="/login" v-show="!authenticated">Login</router-link>
      <router-link to="/register" v-show="!authenticated">Register</router-link>
      <router-link to="/profile" v-show="authenticated"
        >Profile</router-link
      >
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
    },
  },
  computed: {
    authenticated() {
      return this.$store.getters.authenticated;
    },
    userId(){
      return this.$store.getters.user_id
    }
  },
};
</script>

<style scoped>
.c-header {
  /* grid-area: header; */
  position: sticky;
  top: 0;
  /* height: 50px; */
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

.c-header__logo {
  display: flex;
  align-items: center;
}

.c-header__logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.c-header img {
  height: 1.5rem;
}

.c-header__logo h2 {
  font-size: 1rem;
  color: #efefff;
  margin-left: 0.5rem;
}


.c-header__links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.7rem;
}

.c-header__links a {
  color: #babac0;
  font-size: 0.6rem;
  font-weight: 550;
  padding: 0.3rem 0.5rem;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: 0.3s;
}

.c-header__links a.router-link-active,
.c-header__links a:hover {
  color: #4a4a50;
  background-color: var(--details-color);
  text-decoration: none;
}
</style>