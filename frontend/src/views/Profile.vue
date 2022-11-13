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
      <div class="c-profile__info__actions" v-show="isPersonalAccount">
        <a href="#">Editar perfil</a>
      </div>
      <!-- <div class="c-profile__info__container">
      </div> -->
    </div>
    <div class="c-profile__nav">
      <ul>
        <li @click="handlePosts">Publicações</li>
        <li @click="handlePhotos">Fotos</li>
        <li @click="handleAbout">Sobre</li>
      </ul>
    </div>
    <div class="c-profile__body">
      <Loader v-show="activeLoader" />
      <ul class="c-parties__container" v-show="navView == 'posts'">
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
      <ul class="c-parties__gallery" v-show="navView == 'photos'">
        <li v-for="(url, index) in urlPhotos" :key="index">
          <img :src="url" alt="Party Photo" />
        </li>
      </ul>
      <p class="not-parties" v-show="!parties.length && !activeLoader">
        Nenhuma festa publicada ainda...
      </p>
    </div>
  </div>

  <!-- <div>
    <h1>Atualizar seus dados de usuário</h1>
    <UserForm
      :user="user"
      page="profile"
      btnText="Atualizar"
      :key="componentKey"
    />
  </div> -->
</template>

<script>
import Post from "@/components/Post";
import Loader from "@/components/Loader";

export default {
  name: "Profile",
  data() {
    return {
      user: {},
      parties: [],
      statePosts: {
        page: 4,
        perPage: 4,
      },
      urlPhotos: [],
      navView: "posts",
      activeLoader: true,
    };
  },
  methods: {
    async getUser() {
      const userId = this.$route.params.userId;

      const token = this.$store.getters.token;

      const req = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      });
      const res = await req.json();
      this.user = res.user;
      this.componentKey++;
    },
    async getParties() {
      try {
        const userId = this.$route.params.userId;
        const token = this.$store.getters.token;
        const req = await fetch(
          `http://localhost:3000/party/userparties/${userId}`,
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
    isPersonalAccount() {
      return this.$store.getters.user_id == this.$route.params.userId;
    },
  },
  watch: {
    isPersonalAccount() {
      this.getUser();
      this.getParties();
    },
  },
  created() {
    this.getUser();
    this.getParties();
  },
  components: {
    Post,
    Loader,
  },
};
</script>

<style scoped>
.c-profile {
  --_margin-h: 1.5rem;
  width: 100%;
  margin: 0 auto;
  max-width: 5500px;
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
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
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
  width: 6rem;
  height: 100%;
}

.c-profile a {
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

.c-profile a:hover {
  text-decoration: none;
  background: transparent;
  color: var(--details-color);
}

/* NAV */

.c-profile__nav ul {
  display: flex;
}

.c-profile__nav ul li {
  cursor: pointer;
  padding: 0.7rem 1rem;
  font-size: 0.8rem;
  color: #cacad0;
  font-weight: bold;
  border-bottom: 2px solid transparent;
}

.c-profile__nav ul li:hover {
  border-bottom: 2px solid var(--details-color);
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

/* BODY */

.c-profile__body {
  background: rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
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

/* GALLERY */

.c-parties__gallery {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  /* padding: .5rem; */
}

.c-parties__gallery li {
  width: 100%;
}

.c-parties__gallery li img {
  max-width: 100%;
}
</style>