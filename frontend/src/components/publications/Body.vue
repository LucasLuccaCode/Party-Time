<template>
  <div class="c-post__body">
    <a
      class="c-post__body__like"
      href="#"
      @click.prevent="this.$parent.likesPost(party._id)"
    >
      <img src="/img/like.png" alt="Like" />
      <span class="total-likes">{{ party.likes.length }}</span>
      <p href="#">{{ statusPostLike }}</p>
    </a>
    <a class="total-comments">{{ comments.length }} comments</a>
  </div>
</template>

<script>
export default {
  name: "Body",
  computed: {
    statusPostLike() {
      const user_id = this.$store.getters.user_id;
      return this.party.likes.includes(user_id) ? "Deslike" : "Like";
    },
  },
  props: ["party", "comments"],
};
</script>

<style scoped>
.c-post__body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  width: 100%;
  padding: 0.5rem var(--_padding-h);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.c-post__body__like {
  display: flex;
  align-items: center;
  border: 2px solid rgba(255, 255, 255, .1);
  border-radius: 50px;
  padding: .3rem;
  font-size: 0.6rem;
  color: #aaaab0;
  font-weight: bold;
  text-decoration: none;
}

.c-post__body__like:hover {
  background: rgba(255, 255, 255, .05);
}

.c-post__body__like img {
  width: 0.9rem;
  height: 0.9rem;
}

.c-post__body__like span {
  margin-left: 0.3rem;
}

.c-post__body__like p {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 0.3rem;
  border-left: 2px solid rgba(255, 255, 255, .1);
  padding-left: 0.3rem;
}

.c-post__body .total-comments {
  cursor: pointer;
  font-size: 0.75rem;
  color: #aaaab0;
}
</style>