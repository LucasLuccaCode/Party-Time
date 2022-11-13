<template>
  <div class="c-home">
    <Loader v-show="activeLoader" />
    <ul class="c-parties__container">
      <Post
        v-for="(party, index) in currentPosts"
        :party="party"
        :key="index"
      />
      <div
        class="c-parties__container__more_parties"
        v-show="currentPosts.length < parties.length"
      >
        <a @click.prevent="seeMorePosts" href="#">Mostrar mais festas</a>
      </div>
    </ul>
    <p class="not-parties" v-show="!parties.length && !activeLoader">
      Nenhuma festa publicada ainda...
    </p>
  </div>
</template>

<script>
import Post from "@/components/Post";
import Loader from "@/components/Loader";

export default {
  name: "Home",
  data() {
    return {
      statePosts: {
        page: 4,
        perPage: 4,
      },
      parties: [],
      activeLoader: true
    };
  },
  computed: {
    currentPosts() {
      return this.parties.slice(0,this.statePosts.page);
    },
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
        this.activeLoader = false
      } catch (err) {
        console.log(err);
      }
    },
    seeMorePosts() {
      const { page, perPage } = this.statePosts;
      const totalPosts = this.parties.length;
      const currentPost = page + perPage
      this.statePosts.page = currentPost > totalPosts ? totalPosts : currentPost;
    },
  },
  components: {
    Post,
    Loader
  },
};
</script>

<style scoped>
.c-home {
  width: 100%;
  margin: 0 auto;
}

.not-parties {
  font-size: 0.9rem;
  color: #aaaab0;
  text-align: center;
}

.c-parties__container__more_parties {
  width: 40%;
  margin: 0 auto;
}

.c-parties__container__more_parties a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 0.7rem;
  color: var(--secondary-color);
  padding: 0.3rem 0;
  border-radius: 5rem;
  border: 2px solid var(--details-color);
  background: var(--details-color);
}

.c-parties__container__more_parties a:hover {
  text-decoration: none;
  background: transparent;
  color: var(--details-color);
}
</style>
