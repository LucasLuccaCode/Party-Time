<template>
  <div class="c-party">
    <h1>{{ party.title }}</h1>
    <div class="c-party__container">
      <div class="c-party__images">
        <div
          class="c-party__banner"
          :style="
            party.photos.length
              ? `background-image: url(${party.photos[0]})`
              : ''
          "
        ></div>
        <div class="c-party__mini_images" v-show="party.photos[1]">
          <div
            class="c-party__mini_image"
            v-for="(photo, index) in party.photos.slice(1)"
            :key="index"
            :style="`background-image: url(${photo})`"
          ></div>
        </div>
      </div>
      <div class="c-party__details">
        <div class="c-party__details__description">
          <h2>Descrição da festa:</h2>
          <p>{{ party.description }}</p>
        </div>
        <div class="c-party__details__date">
          <h2>Data da festa:</h2>
          <p>{{ party.party_date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Party",
  data() {
    return {
      party: {
        title: "...",
        description: "...",
        party_date: "...",
        photos: [],
      },
    };
  },
  created() {
    this.getParty();
  },
  methods: {
    async getParty() {
      const id = this.$route.params.id;
      const token = this.$store.getters.token;

      try {
        const req = await fetch(`${this.SERVER_BASE_URL}/party/${id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": token,
          },
        });
        const res = await req.json();
        if (res.error) return this.$router.push("/");

        this.party = res.party;
        this.party.party_date = new Date(
          this.party.party_date
        ).toLocaleDateString();
        this.party.photos = this.party.photos.map(
          (filename) => `${this.SERVER_BASE_URL}/photos/${filename}`
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.c-party h1 {
  margin-bottom: 2rem;
}

.c-party__container {
  display: flex;
}

.c-party__images {
  width: 380px;
  margin-right: 1rem;
}

.c-party__banner {
  width: 100%;
  height: 200px;
  background: #ccc;
  background-position: center;
  background-size: cover;
  margin-bottom: 1rem;
}

.c-party__mini_images {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.c-party__mini_image {
  width: 80px;
  height: 80px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  background: #ccc;
  background-position: center;
  background-size: cover;
}

.c-party__details {
  display: flex;
  flex-direction: column;
}

.c-party__details div {
  margin-bottom: 1rem;
}

.c-party__details h2 {
  font-size: 0.8rem;
  color: #cacad0;
  margin-bottom: 0.5rem;
}

.c-party__details p {
  font-size: 0.9rem;
  color: var(--details-color);
  font-weight: bold;
}
</style>