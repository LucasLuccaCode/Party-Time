<template>
  <div class="c-dashboard">
    <div class="c-dashboard__title">
      <h1>Gerencie seus eventos</h1>
      <router-link class="btn" to="/newparty">Cadastrar Festa</router-link>
    </div>
    <Loader v-show="activeLoader" /> 
    <div class="c-dashboard__table" v-show="parties.length">
      <DataTable :parties="parties" />
    </div>
    <div class="c-dashboard__empty" v-show="!parties.length && !activeLoader">
      <p>
        Você ainda não tem festas cadastradas,
        <router-link to="/newparty">clique aqui para cadastrar uma</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import DataTable from "../components/DataTable";
import Loader from "../components/Loader";

export default {
  name: "Dashboard",
  data() {
    return {
      parties: [],
      activeLoader: true
    };
  },
  methods: {
    async getUserParties() {
      const token = this.$store.getters.token;
      const userId = this.$store.getters.user_id;
      const req = await fetch(`http://localhost:3000/party/userparties/${userId}`, {
        method: "GET",
        headers: {
          "auth-token": token
        },
      });
      const res = await req.json();
      this.parties = res.parties;
      this.activeLoader = false
    },
  },
  created() {
    this.getUserParties();
  },
  components: {
    DataTable,
    Loader
  },
};
</script>

<style scoped>
.c-dashboard {
  padding: var(--horizontal-margin);
}
.c-dashboard__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.c-dashboard .btn {
  font-size: 0.7rem;
  background: var(--details-color);
  padding: 0.2rem 0.5rem;
  border-radius: 0.2rem;
  color: #fff;
  font-weight: bold;
  border: 2px solid var(--details-color);
}

.c-dashboard .btn:hover {
  text-decoration: none;
  background: transparent;
  color: var(--details-color);
}

.c-dashboard__empty {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #cacad0;
}

.c-dashboard__empty a {
  color: var(--details-color);
}
</style>