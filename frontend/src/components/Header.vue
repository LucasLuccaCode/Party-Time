<template>
  <div class="c-header">
    <router-link to="/" id="logo-container">
      <img src="/img/partytimelogo.png" alt="Party Time" />
    </router-link>
    <h2 class="c-header_title">Party Time</h2>
    <div class="c-header_links">
      <router-link to="/">Home</router-link>
      <router-link to="/dashboard" v-show="authenticated">Dashboard</router-link>
      <router-link to="/login" v-show="!authenticated">Entrar</router-link>
      <router-link to="/register" v-show="!authenticated">Cadastrar</router-link>
      <router-link to="/profile" v-show="authenticated">Perfil</router-link>
      <button @click="logout" v-show="authenticated">Logout</button>
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
  background: var(--secondary-color);
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
  gap: 1rem;
}

.c-header button {
  font-size: 0.7rem;
  color: #fff;
  padding: 0.3rem;
  background-color: rgba(255, 255, 255, 0.12);
  border-radius: 0.2rem;
}

.c-header button:hover {
  color: #efefff;
  background-color: var(--details-color);
}
</style>