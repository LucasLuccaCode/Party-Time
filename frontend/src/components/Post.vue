<template>
  <li class="c-post">
    <Header :party="party" />
    <PostImage :party="party" v-show="party.photos.length" />
    <Body :party="party" :comments="comments" />
    <Comments
      :comments="comments"
      :partyId="partyId"
      :partyUserId="party.user_id"
      :state="state"
    />
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
        page: 3,
        perPage: 3,
      },
      comments: []
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
          `http://localhost:3000/party/likeparty/${partyId}`,
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
        const req = await fetch(`http://localhost:3000/party/comment/${partyId}`, {
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
        const req = await fetch(`http://localhost:3000/party/comment`, {
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
          `http://localhost:3000/party/comment/${this.partyId}/${commentId}`,
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
          `http://localhost:3000/party/comment`,
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
    formatDate(dateMs) {
      const currentDateMs = Date.now();
      const date = new Date(currentDateMs - Number(dateMs));

      // Format date
      const [y, m, d] = date.toISOString().substring(0, 10).split("-");
      let years = Math.abs(y);
      let months = Math.abs(m);
      let days = Math.abs(d);

      if (years > 1970) return date.toISOString().substring(0, 10);
      if (--months) return months + " month";
      if (--days) return days + " d";

      // Format hours
      const [h, min, sec] = date.toISOString().substring(11, 19).split(":");
      const hours = Math.abs(h);
      const minutes = Math.abs(min);
      const seconds = Math.abs(sec);

      if (hours) return hours + " h";
      if (minutes) return minutes + " min";
      if (seconds) return seconds + " s";
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