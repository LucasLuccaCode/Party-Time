<script>
export default {
  methods: {
    async getUserParties(userId) {
      try {
        const token = this.$store.getters.token;
        const req = await fetch(
          `${this.SERVER_BASE_URL}/party/userparties/${userId}`,
          {
            method: "GET",
            headers: {
              "auth-token": token,
            },
          }
        );
        const res = await req.json();

        res.parties.forEach((party) => {
          // if (party.party_date) {
          //   party.party_date = new Date(party.party_date).toLocaleDateString();
          // }
        });

        this.parties = res.parties;
        this.activeLoader = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>