<template>
  <div class="c-home">
    <!-- <h1>Home Page</h1> -->
    <ul class="c-parties__container">
      <Post v-for="(party, index) in parties" :party="party" :key="index" />
    </ul>
    <p class="not-parties" v-show="!parties.length">
      Nenhuma festa publicada ainda...
    </p>
  </div>
</template>

<script>
import Post from "@/components/Post"

export default {
  name: "Home",
  data() {
    return {
      parties: [],
    };
  },
  created() {
    this.getPaties();
  },
  methods: {
    async getPaties() {
      try {
        const req = await fetch("http://localhost:3000/party/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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

        this.parties = res.parties;
      } catch (err) {
        console.log(err);
      }
    },
  },
  components: {
    Post
  },
};
</script>

<style scoped>
.c-home {
  width: 100%;
  margin: 0 auto;
}

.not-parties {
  font-size: .9rem;
  color: #aaaab0;
  text-align: center;
}
</style>
