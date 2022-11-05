<template>
  <div>
    <h1>Atualizar seus dados de usuário</h1>
    <UserForm
      :user="user"
      page="profile"
      btnText="Atualizar"
      :key="componentKey"
    />
  </div>
</template>

<script>
import UserForm from "../components/UserForm";

export default {
  name: "Profile",
  data() {
    return {
      user: {},
      componentKey: 0,
    };
  },
  components: {
    UserForm,
  },
  methods: {
    async getUser() {
      const id = this.$store.getters.user_id;
      const token = this.$store.getters.token;

      const req = await fetch(`http://localhost:3000/user/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      });
      const res = await req.json();
      this.user = res.user;
      this.componentKey++;
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<style scoped>
</style>