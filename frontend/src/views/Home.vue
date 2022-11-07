<template>
  <div class="c-home">
    <h1>Home Page</h1>
    <div class="c-parties__container">
      <div
        class="c-party__container"
        v-for="(party, index) in this.parties"
        :key="index"
      >
        <div
          class="c-party__banner"
          :style="
            party.photos.length
              ? `background-image: url(${party.photos[0]})`
              : ''
          "
        ></div>
        <router-link class="c-party__title" :to="`/party/${party._id}`">{{
          party.title
        }}</router-link>
        <p class="c-party__author"><b>Author:</b> {{ party.user_name }}</p>
        <p class="c-party__date"><b>Data:</b> {{ party.party_date }}</p>
        <router-link :to="`/party/${party._id}`" class="c-party__more"
          >Ver mais</router-link
        >
      </div>
    </div>
    <p class="not-parties" v-show="!parties.length">
      Nenhuma festa publicada ainda...
    </p>
  </div>
</template>

<script>
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
};
</script>

<style scoped>
.c-home {
  width: 80%;
  margin: 0 auto;
}

.c-parties__container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 1rem;
}

.c-party__container {
  display: flex;
  flex-direction: column;
  width: 30.3%;
  margin: 1.5%;
  text-align: center;
}

.c-party__banner {
  width: 100%;
  height: 150px;
  margin-bottom: 0.7rem;
  background: #ccc;
  background-position: center;
  background-size: cover;
}

.c-party__title {
  color: #efefff;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.c-party__date,
.c-party__author {
  font-size: 0.7rem;
  color: #babac0;
  margin-bottom: 0.5rem;
}

.c-party__author {
  text-transform: capitalize;
}

.c-party__more {
  width: 100%;
  text-transform: uppercase;
  font-size: 0.6rem;
  background: var(--details-color);
  padding: 0.3rem 0;
  text-align: center;
  border-radius: 0.2rem;
  color: #fff;
  font-weight: bold;
  border: 2px solid var(--details-color);
}

.c-party__more:hover {
  text-decoration: none;
  background: transparent;
  color: var(--details-color);
}

.not-parties {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #cacad0;
}
</style>
