<template>
  <div class="c-dashboard">
    <div class="c-dashboard__title">
      <h1>Gerencie seus eventos</h1>
      <router-link class="btn" to="/">Cadastrar Festa</router-link>
    </div>
    <div class="c-dashboard__table" v-if="parties.length">
      <DataTable :parties="parties" />
    </div>
    <div class="c-dashboard__empty" v-else>
      <p>
        Você ainda não tem festas cadastradas,
        <router-link to="/">clique aqui para cadastrar uma</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import DataTable from "../components/DataTable";

export default {
  name: "Dashboard",
  data() {
    return {
      parties: [],
    };
  },
  methods: {
    async getUserParties() {
      const token = this.$store.getters.token;
      const req = await fetch(`http://localhost:3000/party/userparties`, {
        method: "GET",
        headers: {
          "auth-token": token
        },
      });
      const res = await req.json();
      console.log(res);
      this.parties = res.parties;
    },
  },
  created() {
    this.getUserParties();
  },
  components: {
    DataTable,
  },
};
</script>

<style scoped>
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