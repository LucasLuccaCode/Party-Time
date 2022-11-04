<template>
  <div class="c-register">
    <h1>Criar conta</h1>
    <UserForm :user="{}" page="register" btnText="Cadastrar" />
  </div>
</template>

<script>
  import UserForm from "../components/UserForm" 

  export default {
    name: "Register",
    components: {
      UserForm
    }
  }
</script>

<style scoped>

</style>
