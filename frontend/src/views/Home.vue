<template>
  <div class="c-home">
    <Publications :parties="parties" />
  </div>
</template>

<script>
import Publications from "@/components/Publications";

export default {
  name: "Home",
  data() {
    return {
      parties: [],
    };
  },
  methods: {
    async getParties() {
      try {
        const token = this.$store.getters.token;
        const req = await fetch(`http://localhost:3000/party/all/`, {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        });
        const res = await req.json();

        res.parties.forEach((party) => {
          if (party.party_date) {
            party.party_date = new Date(party.party_date).toLocaleDateString();
          }

          if (party.photos.length) {
            party.photos = party.photos.map(
              (filename) => `http://localhost:3000/photos/${filename}`
            );
          }
        });

        if (!res.error) this.parties = res.parties;
        this.activeLoader = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
  created(){
    this.getParties()
  },
  components: {
    Publications,
  },
};
</script>

<style scoped>
.c-home {
  width: 100%;
  margin: 0 auto;
  padding: var(--horizontal-margin);
}
</style>
