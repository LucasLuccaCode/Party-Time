<template>
  <div class="c-publications">
    <PublicationForm
      v-if="!hideCardForm"
      :party="party"
      :page="page"
      :enableContainer="enableContainerEditPost"
      :key="newPostController"
    />
    <ul class="c-publications__content">
      <Post v-for="party in currentParties" :party="party" :key="party._id" />
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
      Nenhuma publicação encontrada...
    </p>
  </div>
</template>

<script>
import Post from "./publications/Post";
import PublicationForm from "./publications/PublicationForm";

export default {
  name: "Publications",
  data() {
    return {
      statePosts: {
        page: 4,
        perPage: 4,
      },
      userId: this.$store.getters.user_id,
      page: "newPost",
      party: {},
      newPostController: 0,
      enableContainerEditPost: false,
    };
  },
  props: {
    parties: Array,
    activeLoader: Boolean,
    hideCardForm: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    editPublication(partyId) {
      this.party = this.parties.find((party) => party._id === partyId)
      this.page = "editPost"
      this.newPostController++
      this.enableContainerEditPost = true;
    },
    seeMorePosts() {
      const { page, perPage } = this.statePosts;
      const totalPosts = this.parties.length;
      const currentPost = page + perPage;
      this.statePosts.page =
        currentPost > totalPosts ? totalPosts : currentPost;
    },
    updateParties() {
      const userId = this.$store.getters.user_id;
      this.$parent.updateParties(userId);
    },
  },
  computed: {
    currentParties() {
      return this.parties.slice(0, this.statePosts.page);
    },
  },
  components: {
    Post,
    PublicationForm,
  },
};
</script>

<style scoped>
.c-publications {
  width: 100%;
  padding: 0 2%;
}

.c-publications__content {
  display: grid;
}

.c-publications__more__posts {
  display: flex;
  justify-content: center;
  width: 40%;
  margin: 0 auto;
  margin-top: 1rem;
}
</style>