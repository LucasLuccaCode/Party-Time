<template>
  <div class="c-login">
    <h1>Logar na conta</h1>
    <UserForm :user="{}" page="login" btnText="Entrar" />
  </div>
</template>

<script>
  import UserForm from "../components/UserForm" 

  export default {
    name: "Login",
    components: {
      UserForm
    }
  }
</script>

<style scoped>

</style>
