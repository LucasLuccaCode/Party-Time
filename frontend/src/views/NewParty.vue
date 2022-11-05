<template>
  <div class="c-new_party">
    <h1>Adicione a sua festa:</h1>
    <PartyForm :party="{}" page="newparty" btnText="Criar Festa" />
  </div>
</template>

<script>
import PartyForm from "../components/PartyForm"

export default {
  name: "NewParty",
  data() {
    return {
      
    }
  },
  components: {
    PartyForm
  }
}
</script>

<style scoped>

</style>