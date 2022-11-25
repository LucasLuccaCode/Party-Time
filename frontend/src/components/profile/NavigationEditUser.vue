<template>
  <div>
    <UserForm
      :user="user"
      page="profile"
      btnText="Atualizar"
      :key="controllerUpdate"
    />
  </div>
</template>

<script>
import UserForm from "../UserForm.vue";

export default {
  name: "NavigationEditUser",
  props: ["user"],
  data() {
    return {
      controllerUpdate: 0,
    };
  },
  components: {
    UserForm,
  },
};
</script>