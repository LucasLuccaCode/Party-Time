<template>
  <li class="c-post">
    <Header :party="party" />
    <PostImage :party="party" v-show="party.photos.length" />
    <Body :totalComments="party.comments.length" :likes="state.likes" />
    <Comment :comments="party.comments" :state="state" />
    <PageButtons
      v-show="party.comments.length"
      :state="state"
      :key="controllerButtons"
    />
  </li>
</template>

<script>
import Header from "./publication/Header";
import PostImage from "./publication/PostImage";
import Body from "./publication/Body";
import Comment from "./publication/Comment";
import PageButtons from "./publication/PageButtons";

export default {
  name: "Post",
  data() {
    return {
      state: {
        page: 1,
        perPage: 2,
        totalPages: 0,
        nButtons: 0,
        likes: 88,
      },
      controllerButtons: 0,
    };
  },
  props: ["party"],
  methods: {
    setPage(page) {
      this.state.page = page;
    },
    addLike() {
      this.state.likes++;
    },
    updateComments(comment) {
      this.party.comments.push(comment);

      const totalPages = Math.ceil(this.party.comments.length / this.state.perPage);
      this.state.totalPages = totalPages
      this.state.page = totalPages
      this.state.nButtons = totalPages < 5 ? totalPages : 5;
      
      this.controllerButtons++;
    },
  },
  components: {
    Header,
    PostImage,
    Body,
    Comment,
    PageButtons,
  },
  mounted() {
    const totalPages = Math.ceil(this.party.comments.length / this.state.perPage);
    this.state.totalPages = totalPages
    this.state.page = totalPages
    this.state.nButtons = totalPages < 5 ? totalPages : 5;
    this.controllerButtons++;
  },
};
</script>

<style scoped>
.c-post {
  --_padding-h: 0.8rem;
  width: 80%;
  margin: 0 auto;
  margin-top: .2rem;
  margin-bottom: .8rem;
  max-width: 460px;
  background: rgba(255, 255, 255, .08);
  border-radius: 12px;
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.05);
  list-style: none;
}
</style>