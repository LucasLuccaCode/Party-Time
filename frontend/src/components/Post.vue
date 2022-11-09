<template>
  <li class="c-post">
    <Header :party="party" />
    <PostImage :party="party" v-show="party.photos.length" />
    <Body :totalComments="party.comments.length" :likes="state.likes" />
    <Comment :comments="party.comments" :state="state" />
  </li>
</template>

<script>
import Header from "./publication/Header";
import PostImage from "./publication/PostImage";
import Body from "./publication/Body";
import Comment from "./publication/Comment";

export default {
  name: "Post",
  data() {
    return {
      state: {
        page: 2,
        perPage: 2,
        likes: 18,
      },
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
    },
    deleteComment(index){
      this.party.comments.splice(index, 1)
    }
  },
  components: {
    Header,
    PostImage,
    Body,
    Comment,
  }
};
</script>

<style scoped>
.c-post {
  --_padding-h: 0.8rem;
  width: 80%;
  margin: 0 auto;
  margin-top: 0.2rem;
  margin-bottom: 0.8rem;
  max-width: 460px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.05);
  list-style: none;
}
</style>