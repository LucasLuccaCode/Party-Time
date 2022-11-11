<template>
  <div class="c-post__body">
    <div class="c-post__body__like">
      <img src="/img/like.png" alt="Like" />
      <span class="total-likes">{{party.likes.length}}</span>
      <a href="#" @click.prevent="this.$parent.likesPost(party._id)">{{statusPostLike}}</a>
    </div>
    <a class="total-comments">{{party.comments.length}} comments</a>
  </div>
</template>

<script>
export default {
  name: "Body",
  computed: {
    statusPostLike(){
      const user_id = this.$store.getters.user_id
      return this.party.likes.includes(user_id) ? "Deslike" : "Like"
    }
  },
  props: ["party"]
};
</script>

<style scoped>
.c-post__body {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem var(--_padding-h);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.c-post__body__like {
  display: flex;
  align-items: center;
}

.c-post__body__like img {
  width: .9rem;
  height: .9rem;
}

.c-post__body__like span {
  font-size: 0.7rem;
  color: #cacad0;
  margin-left: .4rem;
}

.c-post__body__like a {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  color: #cacad0;
  margin-left: 0.5rem;
  padding-left: 0.8rem;
  text-decoration: none;
}

.c-post__body__like a::before {
  content: "";
  position: absolute;
  left: 0;
  display: inline-block;
  width: 5px;
  height: 5px;
  background: var(--details-color);
  border-radius: 50px;
}

.c-post__body .total-comments {
  cursor: pointer;
  font-size: .75rem;
  color: #aaaab0;
}
</style>