<template>
  <div>
    <h1>Edit a sua festa</h1>
    <PartyForm
      :party="party"
      page="editparty"
      btnText="Editar Festa"
      :key="componentKey"
    />
  </div>
</template>

<script>
import PartyForm from "../components/PartyForm";

export default {
  name: "EditParty",
  data() {
    return {
      party: {},
      componentKey: 0,
    };
  },
  methods: {
    async getParty() {
      // Get id from url and token from store
      const id = this.$route.params.id;
      const token = this.$store.getters.token;
      try {
        const req = await fetch(`http://localhost:3000/party/${id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": token,
          },
        });
        const res = await req.json();
        this.party = res.party;
        this.party.party_date = this.party.party_date.substring(0, 10);
        this.party.photos = res.party.photos.map( 
          filename => `http://localhost:3000/photos/${filename}`)
        this.componentKey++;
      } catch (err) {
        console.log(err);
      }
    },
  },
  components: {
    PartyForm,
  },
  created() {
    this.getParty();
  },
};
</script>

<style scoped>
</style>