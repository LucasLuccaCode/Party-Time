<template>
  <li class="c-post">
    <Header :party="party" />
    <PostImage :photos="party.photos" v-show="party.photos.length" />
    <Body :party="party" :comments="comments" />
    <CommentsContainer
      v-show="showComments"
      :comments="comments"
      :partyId="partyId"
      :partyUserId="party.user_id"
      :state="state"
    />
  </li>
</template>
<script>
import Header from "./Header";
import PostImage from "./PostImage";
import Body from "./Body";
import CommentsContainer from "./CommentsContainer";

export default {
  name: "Post",
  data() {
    return {
      partyId: this.party._id || null,
      state: {
        page: 3,
        perPage: 3,
      },
      comments: [],
      showComments: false
    };
  },
  props: ["party"],
  methods: {
    setPage(page) {
      this.state.page = page;
    },
    async likesPost(partyId) {
      const token = this.$store.getters.token;
      try {
        const req = await fetch(
          `${this.SERVER_BASE_URL}/party/likeparty/${partyId}`,
          {
            method: "POST",
            headers: {
              "auth-token": token,
            },
          }
        );
        const res = await req.json();
        if (!res.error) this.party.likes = res.likes;
      } catch (err) {
        console.log(err);
      }
    },
    async getComments(partyId){
      const token = this.$store.getters.token;

      try {
        const req = await fetch(`${this.SERVER_BASE_URL}/party/comment/${partyId}`, {
          method: "GET",
          headers: {
            "auth-token": token,
          }
        });
        const res = await req.json();
        if (!res.error) this.comments = res.comments;
      } catch (err) {
        console.log(err);
      }
    },
    async insertComment(comment) {
      const token = this.$store.getters.token;

      const commentData = {
        partyId: this.partyId,
        comment: comment,
      };
      const commentJson = JSON.stringify(commentData);

      try {
        const req = await fetch(`${this.SERVER_BASE_URL}/party/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: commentJson,
        });
        const res = await req.json();
        if (!res.error) this.comments = res.comments;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteComment(commentId) {
      const token = this.$store.getters.token;

      try {
        const req = await fetch(
          `${this.SERVER_BASE_URL}/party/comment/${this.partyId}/${commentId}`,
          {
            method: "DELETE",
            headers: {
              "auth-token": token,
            },
          }
        );

        const res = await req.json();
        if (!res.error) this.comments = res.comments;
      } catch (err) {
        console.log(err);
      }
    },
    async updateComment(commentId, newComment) {
      const token = this.$store.getters.token;

      const data = {
        partyId: this.partyId,
        commentId,
        comment: newComment
      }
      const dataJson = JSON.stringify(data)

      try {
        const req = await fetch(
          `${this.SERVER_BASE_URL}/party/comment`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
            body: dataJson
          }
        );

        const res = await req.json();
        if (!res.error) this.comments = res.comments;
      } catch (err) {
        console.log(err);
      }
    },
    updateParties(){
      this.$parent.updateParties()
    },
    editPublication(partyId){
      this.$parent.editPublication(partyId)
    }
  },
  components: {
    Header,
    PostImage,
    Body,
    CommentsContainer,
  },
};
</script>

<style scoped>
.c-post {
  --_padding-h: 0.8rem;
  position: relative;
  width: 100%;
  margin-top: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.05);
}
</style>