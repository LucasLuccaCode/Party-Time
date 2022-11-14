<template>
  <div class="c-profile">
    <div class="c-profile__cover"></div>
    <div class="c-profile__info">
      <div class="c-profile__info__photo">
        <img src="/img/user.png" alt="Photo User" />
      </div>
      <div class="c-profile__info__content">
        <h2>{{ user.name }}</h2>
        <p>50 Amigos</p>
      </div>
      <div class="c-profile__info__actions">
        <a class="bigger-button" href="#" @click.prevent>Enviar mensagem</a>
      </div>
    </div>
    <div class="c-profile__nav">
      <ul>
        <li @click="handlePosts">Publicações</li>
        <li @click="handlePhotos">Fotos</li>
        <li @click="handleAbout">Sobre</li>
      </ul>
    </div>
    <Publications :parties="parties" v-show="navView == 'posts'" />
    <ul class="c-gallery" v-show="navView == 'photos'">
      <li v-for="(url, index) in urlPhotos" :key="index">
        <img :src="`${url}`" alt="" />
      </li>
    </ul>
    <ul class="c-about" v-show="navView == 'about'">
      <p>Mais informações...</p>
    </ul>
  </div>
</template>

<script>
import Publications from "../components/Publications.vue";

export default {
  name: "UserPage",
  data() {
    return {
      userId: this.$route.params.userId,
      urlPhotos: [],
      navView: "posts",
      parties: [],
      user: [],
    };
  },
  methods: {
    async getUser() {
      const token = this.$store.getters.token;

      const req = await fetch(`http://localhost:3000/user/${this.userId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      });
      const res = await req.json();
      this.user = res.user;
    },
    async getUserParties() {
      try {
        const token = this.$store.getters.token;
        const req = await fetch(
          `http://localhost:3000/party/userparties/${this.userId}`,
          {
            method: "GET",
            headers: {
              "auth-token": token,
            },
          }
        );
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
        this.activeLoader = false;
      } catch (err) {
        console.log(err);
      }
    },
    seeMorePosts() {
      const { page, perPage } = this.statePosts;
      const totalPosts = this.parties.length;
      const currentPost = page + perPage;
      this.statePosts.page =
        currentPost > totalPosts ? totalPosts : currentPost;
    },
    splitPhotos() {
      const parties = this.parties;
      this.urlPhotos = parties.reduce((acc, party) => {
        const photos = party.photos;
        if (photos.length) {
          const filenames = party.photos.map((photo) => photo);
          acc.push(...filenames);
          return acc;
        }
        return acc;
      }, []);
    },
    handlePosts() {
      this.activeLoader = true;
      this.navView = "posts";
      this.activeLoader = false;
    },
    handlePhotos() {
      this.activeLoader = true;
      this.splitPhotos();
      this.navView = "photos";
      this.activeLoader = false;
    },
    handleAbout() {
      this.activeLoader = true;
      this.navView = "about";
      this.activeLoader = false;
    },
  },
  computed: {
    currentPosts() {
      return this.parties.slice(0, this.statePosts.page);
    },
  },
  created() {
    this.getUser();
    this.getUserParties();
  },
  components: {
    Publications,
  },
};
</script>

<style scoped>
.c-profile {
  --_margin-h: 1.5rem;
  width: 100%;
  margin: 0 auto;
  max-width: 500px;
  /* padding: var(--horizontal-margin); */
}

.c-profile__cover {
  background: var(--secondary-color);
  width: 100%;
  height: 150px;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.c-profile__info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.5rem var(--_margin-h);
}

.c-profile__info__photo {
  display: flex;
}

.c-profile__info__photo img {
  width: 6rem;
  height: 6rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border: 3px solid #efefff;
  margin-top: -30%;
}

.c-profile__info__content {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  margin-left: 1rem;
  margin-right: 0.5rem;
  gap: 0.3rem;
}

.c-profile__info__content h2 {
  font-size: 1.3rem;
  color: #efefff;
  text-transform: capitalize;
}

.c-profile__info__content p {
  font-size: 0.8rem;
  color: #aaaab0;
}

.c-profile__info__actions {
  /* min-width: 6rem; */
  height: 100%;
  padding: 0 0.5rem;
}

/* NAV */

.c-profile__nav {
  position: sticky;
  top: 0px;
  background: var(--primary-color);
  /* margin: 0 var(--horizontal-margin); */
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.c-profile__nav ul {
  display: flex;
}

.c-profile__nav ul li {
  cursor: pointer;
  padding: 0.7rem var(--horizontal-margin);
  font-size: 0.8rem;
  color: #cacad0;
  font-weight: bold;
  border-bottom: 2px solid transparent;
  transition: 0.3s;
}

.c-profile__nav ul li:hover {
  box-shadow: 0 2px 0px var(--details-color);
}

.c-profile__nav ul li:active {
  background: rgba(2255, 255, 255, 0.1);
}

.c-profile__nav ul {
  display: flex;
}

.c-profile__nav ul {
  display: flex;
}

/* GALLERY */

.c-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 95%;
  gap: 0.5rem;
  margin: var(--horizontal-margin) auto;
  padding: var(--horizontal-margin);
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}

.c-gallery li img {
  max-width: 100%;
}
</style>