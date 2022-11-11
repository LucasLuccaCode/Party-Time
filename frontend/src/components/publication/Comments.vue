<template>
  <div class="c-comments">
    <ul class="c-comments__content" v-show="comments.length">
      <div
        class="c-comments__more_comments"
        v-show="currentsComment.length < comments.length"
      >
        <a @click.prevent="seeMoreComments"> Ver comentários anteriores</a>
        <p>{{ currentsComment.length }} / {{ comments.length }}</p>
      </div>
      <li
        class="c-comment__card"
        v-for="(comment, index) in currentsComment"
        :key="index"
      >
        <div class="c-comment__card__image"></div>
        <div class="c-comment__card__body">
          <div class="c-comment__card__content">
            <a>{{ comment.username }}</a>
            <p>{{ comment.comment }}</p>
          </div>
          <div class="c-comment__card__actions">
            <a href="#">Curtir</a>
            <a href="#">Responder</a>
            <a
              href="#"
              v-show="user_id == comment.user_id || user_id == partyUserId"
              @click.prevent="handleDeleteComment(comment._id)"
            >
              Excluir
            </a>
            <span>{{ this.$parent.formatDate(comment.date) }}</span>
          </div>
        </div>
      </li>
    </ul>
    <form @submit.prevent="handleInsertComment" class="c-comments__form">
      <div class="c-comments__form__profile"></div>
      <div class="c-comments__form__input">
        <input
          type="text"
          name="comment"
          v-model="comment"
          id="comment"
          placeholder="Escreva um comentário"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      user_id: this.$store.getters.user_id || null,
      comment: null,
    };
  },
  props: ["comments", "partyUserId", "state"],
  computed: {
    currentsComment() {
      const { page } = this.state;
      return this.comments.slice(-page);
    },
  },
  methods: {
    handleDeleteComment(commentId) {
      this.$parent.deleteComment(commentId);
    },
    handleInsertComment() {
      this.$parent.insertComment(this.comment);
      this.comment = null;
    },
    seeMoreComments() {
      const { page, perPage } = this.state;
      this.$parent.setPage(page + perPage);
    },
  },
};
</script>

<style scoped>
/* POST COMMENTS */

.c-comments {
  width: 100%;
}

.c-comments__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 150px;
  padding: 0 var(--_padding-h);
  padding-bottom: 0.5rem;
  margin-top: 0.5rem;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.c-comments__content::-webkit-scrollbar {
  width: 0.3rem;
}

.c-comments__content::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
}

.c-comments__more_comments {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.c-comments__more_comments a,
.c-comments__more_comments p {
  font-size: 0.7rem;
  color: #babac0;
}

.c-comment__card {
  display: flex;
  width: 100%;
  border-radius: 3px;
  font-size: 0.8rem;
  color: #efefff;
}

.c-comment__card__image {
  width: 1.2rem;
  height: 1.2rem;
  min-width: 1.2rem;
  min-height: 1.2rem;
  /* background-image: url("/public/img/user.png"); */
  background: var(--primary-color);
  background-position: center;
  background-size: cover;
  border-radius: 50px;
}

.c-comment__card__body {
  margin-left: 0.5rem;
}

.c-comment__card__content {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
}

.c-comment__card__content a {
  font-size: 0.7rem;
  color: #efefff;
  font-weight: bold;
}

.c-comment__card__content p {
  font-size: 0.6rem;
  color: #efefff;
  margin-top: 2px;
  /* font-weight: bold; */
  line-height: 0.75rem;
}

.c-comment__card__actions {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 0.4rem;
}

.c-comment__card__actions a {
  color: #efefff;
  font-size: 0.65rem;
  /* text-decoration: none; */
}

.c-comment__card__actions span {
  color: #aaaab0;
  font-size: 0.65rem;
}

.c-comment__card__actions a:hover {
  text-decoration: underline;
}

.c-comments__form {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 0.4rem;
  padding-top: 0.4rem;
  padding-bottom: 0.6rem;
}

.c-comments__form__profile {
  background-position: center;
  background-size: cover;
  width: 25px;
  height: 25px;
  background: var(--primary-color);
  border-radius: 50px;
}

.c-comments__form__input {
  flex: 1;
  margin-left: 0.5rem;
}

.c-comments__form__input input {
  width: 100%;
  height: 1.6rem;
  border-radius: 50px;
  padding: 0 0.5rem;
  font-size: 0.7rem;
  color: #efefff;
  background: rgba(255, 255, 255, 0.1);
}

.c-comments__form__input input::placeholder {
  color: #aaaab0;
}
</style>