<template>
  <div class="c-publications">
    <Loader v-show="activeLoader" />
    <ul class="c-publications__content">
      <Post
        v-for="(party, index) in currentParties"
        :party="party"
        :key="index"
      />
      <div
        class="c-publications__more__posts"
        v-show="currentParties.length < parties.length"
      >
        <a class="bigger-button" @click.prevent="seeMorePosts" href="#"
          >Mostrar mais festas</a
        >
      </div>
    </ul>
    <p class="not-parties" v-show="!parties.length && !activeLoader">
      Nenhuma festa encontrada...
    </p>
  </div>
</template>

<script>
import Post from "./publications/Post";
import Loader from "./Loader";

export default {
  name: "Publications",
  data() {
    return {
      statePosts: {
        page: 4,
        perPage: 4,
      },
      activeLoader: true,
    };
  },
  props: ["parties"],
  watch: {
    parties() {
      this.activeLoader = false;
    },
  },
  methods: {
    seeMorePosts() {
      const { page, perPage } = this.statePosts;
      const totalPosts = this.parties.length;
      const currentPost = page + perPage;
      this.statePosts.page =
        currentPost > totalPosts ? totalPosts : currentPost;
    },
  },
  computed: {
    currentParties() {
      return this.parties.slice(0, this.statePosts.page);
    },
  },
  components: {
    Post,
    Loader,
  },
};
</script>

<style scoped>
.c-publications {
  padding: var(--horizontal-margin);
}

.c-publications__content {
  display: grid;
  gap: 0.8rem;
}

.not-parties {
  font-size: 0.9rem;
  color: #aaaab0;
  text-align: center;
}

.c-publications__more__posts {
  display: flex;
  justify-content: center;
  width: 40%;
  margin: 0 auto;
}
</style>