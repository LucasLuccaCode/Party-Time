<template>
  <li class="c-post">
    <Header :party="party" />
    <PostImage :party="party" v-show="party.photos.length" />
    <Body :totalComments="party.comments.length" :likes="state.likes" />
    <Comments :comments="party.comments" :state="state" />
  </li>
</template>

<script>
import Header from "./publication/Header";
import PostImage from "./publication/PostImage";
import Body from "./publication/Body";
import Comments from "./publication/Comments";

export default {
  name: "Post",
  data() {
    return {
      partyId: this.party._id || null,
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
    async insertComment(comment) {
      const token = this.$store.getters.token;

      const CommentData = { 
        party_id: this.partyId,
        comment: comment 
      }
      const commentJson = JSON.stringify(CommentData);

      try {
        const req = await fetch(
          `http://localhost:3000/party/comment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
            body: commentJson,
          }
        );
        const res = await req.json();
        if(!res.error) this.party.comments = res.comments
      } catch (err) {
        console.log(err);
      }
    },
    async deleteComment(commentId) {
      const token = this.$store.getters.token;

      try {
        const req = await fetch(
          `http://localhost:3000/party/comment/${this.partyId}/${commentId}`,
          {
            method: "DELETE",
            headers: {
              "auth-token": token,
            }
          }
        );

        const res = await req.json();
        console.log(res)
        if(!res.error) this.party.comments = res.comments
      } catch (err) {
        console.log(err);
      }
    },
  },
  components: {
    Header,
    PostImage,
    Body,
    Comments,
  },
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