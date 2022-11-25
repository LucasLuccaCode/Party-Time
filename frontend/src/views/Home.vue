<template>
  <div class="c-home">
    <Loader v-if="activeLoader" />
    <Publications v-else :parties="parties" />
  </div>
</template>

<script>
import Publications from "@/components/Publications";
import Loader from "@/components/Loader.vue";

export default {
  name: "Home",
  data() {
    return {
      parties: [],
      activeLoader: true
    };
  },
  methods: {
    async getParties() {
      try {
        const token = this.$store.getters.token;
        const req = await fetch(`${this.SERVER_BASE_URL}/party/all/`, {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        });
        const res = await req.json();

        if (!res.error) this.parties = res.parties;
        this.activeLoader = false;
      } catch (err) {
        console.log(err);
      }
    },
    updateParties(){
      this.getParties()
    }
  },
  created(){
    this.getParties()
  },
  components: {
    Publications,
    Loader
  },
};
</script>

<style scoped>
.c-home {
  width: 100%;
  margin: 0 auto;
  max-width: 500px;
  padding: var(--horizontal-margin);
}
</style>
