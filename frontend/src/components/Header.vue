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
      <router-link to="/login" v-show="!authenticated">Login</router-link>
      <router-link to="/register" v-show="!authenticated">Cadastrar</router-link>
      <router-link to="/profile" v-show="authenticated">Perfil</router-link>
      <button @click.prevent="logout" v-show="authenticated">
        <i class="ph-sign-out-bold"></i>
        <p>Sair</p>
      </button>
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
    userId() {
      return this.$store.getters.user_id;
    },
  },
};
</script>

<style scoped>
.c-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 var(--horizontal-margin);
  background: var(--secondary-color);
  box-shadow: 0px 2px 1px rgba(255, 255, 255, 0.12);
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
  height: 100%;
  gap: .2rem;
  align-items: center;
  justify-content: flex-end;
}

.c-header__links a {
  position: relative;
  display: flex;
  justify-content: center;
  color: #babac0;
  font-size: 0.7rem;
  font-weight: 550;
  text-decoration: none;
  padding: 0.8rem 0.6rem;
  /* border-radius: 5px; */
  /* background-color: rgba(255, 255, 255, 0.1); */
  transition: 0.3s;
  /* box-shadow: 0 2px 0 0 rgba(255, 255, 255, 0.1); */
}

.c-header__links a::before {
  content: "";
  position: absolute;
  /* left: 0; */
  bottom: -2px;
  background: rgba(255, 255, 255, 0.05);
  width: 0%;
  height: 2px;
  transition: width 0.3s ease;
}

.c-header__links a.router-link-active::before {
  background: var(--details-color);
  width: 100%;
  color: #efefff;
}

.c-header__links a:hover,
.c-header__links a.router-link-active,
.c-header__links button:hover {
  color: #efefff;
}

.c-header__links a:active,
.c-header__links button:active {
  background: rgba(255, 255, 255, 0.1);
}

.c-header__links button {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #babac0;
  height: 100%;
  padding-left: .4rem;
  background: transparent;
}

.c-header__links button i {
  font-size: 0.8rem;
}

.c-header__links button p {
  font-size: 0.7rem;
}
</style>