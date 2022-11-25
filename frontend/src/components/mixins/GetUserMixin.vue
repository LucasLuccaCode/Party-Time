<script>
export default {
  methods: {
    async getUser(userId) {
      const token = this.$store.getters.token;

      const req = await fetch(`${this.SERVER_BASE_URL}/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      });
      const res = await req.json();
      this.user = res.user;
    }
  }
}
</script>