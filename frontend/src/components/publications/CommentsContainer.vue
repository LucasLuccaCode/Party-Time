<template>
  <div class="c-comments">
    <div class="c-comments__content">
      <ul v-if="comments.length" ref="c_comments">
        <div
          class="c-comments__more_comments"
          v-show="currentsComment.length < comments.length"
        >
          <a @click.prevent="seeMoreComments"> Ver comentários anteriores</a>
          <p>{{ currentsComment.length }} / {{ comments.length }}</p>
        </div>
        <CommentCard
          v-for="comment in currentsComment"
          :key="comment._id"
          :comment="comment"
          :user_id="user_id"
          :partyUserId="partyUserId"
          :authenticated="authenticated"
        />
      </ul>
      <Loader v-show="showLoader" v-else />
    </div>
    <div class="c-comments__form__container">
      <div class="c-comments__editing__comment" v-show="commentIdEditing">
        <img src="/img/edit.png" alt="Edit Comment" />
        <p>{{ commentTextEditing }}</p>
        <button @click="resetCommentEditing">X</button>
      </div>
      <form @submit.prevent="handleCommentForm" class="c-comments__form">
        <div
          class="c-comments__form__profile"
          :style="`background-image: url(/img/user.png)`"
        ></div>
        <div class="c-comments__form__input">
          <input
            type="text"
            name="comment"
            ref="input_comment"
            v-model="comment"
            placeholder="Escreva um comentário"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Loader from "../Loader.vue";
import CommentCard from "./CommentCard.vue";

export default {
  name: "Comment",
  data() {
    return {
      authenticated: this.$store.getters.authenticated,
      user_id: this.$store.getters.user_id || null,
      comment: null,
      commentTextEditing: null,
      commentIdEditing: null,
      showLoader: true,
    };
  },
  props: ["comments", "partyId", "partyUserId", "state"],
  computed: {
    currentsComment() {
      const { page } = this.state;
      return this.comments.slice(-page);
    },
  },
  watch: {
    comments(newComments, oldComments) {
      const totalNewComments = newComments.length;
      const totalOldComments = oldComments.length;
      if (totalNewComments > totalOldComments) this.scrollBottom();
    },
  },
  methods: {
    scrollBottom() {
      this.$refs.c_comments && this.$refs.c_comments.scroll(0, 100000000);
    },
    handleDeleteComment(commentId) {
      this.$parent.deleteComment(commentId);
    },
    handleCommentForm() {
      if (this.commentIdEditing) {
        this.$parent.updateComment(this.commentIdEditing, this.comment);
        this.resetCommentEditing();
        return;
      }
      this.$parent.insertComment(this.comment);
      this.comment = null;
    },
    handleEditComment(commentId) {
      this.$refs.input_comment.focus();
      const { comment } = this.currentsComment.find(
        (comment) => comment._id == commentId
      );

      this.commentIdEditing = commentId;
      this.comment = comment;
      this.commentTextEditing = comment;
    },
    handleLikeComment(commentId) {
      console.log(commentId);
    },
    resetCommentEditing() {
      this.commentIdEditing = null;
      this.commentTextEditing = null;
      this.comment = null;
    },
    seeMoreComments() {
      const { page, perPage } = this.state;
      const totalComments = this.comments.length;
      const currentComment = page + perPage;
      const newPage =
        currentComment > totalComments ? totalComments : currentComment;
      this.$parent.setPage(newPage);
    },
  },
  async mounted() {
    await this.$parent.getComments(this.partyId);
    this.showLoader = false;
  },
  components: {
    Loader,
    CommentCard
  },
};
</script>

<style scoped>
/* POST COMMENTS */

.c-comments {
  width: 100%;
}

.c-comments__content {
  width: 100%;
}

.c-comments__content ul {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  max-height: 150px;
  padding: 0 var(--_padding-h);
  padding-bottom: 0.5rem;
  margin-top: 0.5rem;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.c-comments__content ul::-webkit-scrollbar {
  width: 0.3rem;
}

.c-comments__content ul::-webkit-scrollbar-thumb {
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


/* Form Container */

.c-comments__form__container {
  width: 100%;
}

.c-comments__editing__comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.3rem var(--_padding-h);
  background: rgba(0, 0, 0, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.c-comments__editing__comment img {
  width: 0.9rem;
  height: 0.9rem;
}

.c-comments__editing__comment p {
  flex: 1;
  font-size: 0.7rem;
  color: #babac0;
  margin: 0 0.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.c-comments__editing__comment button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50px;
  font-size: 0.6rem;
  color: #aaaab0;
  font-weight: bold;
  border: 2px solid transparent;
  background: transparent;
  transition: 0.3s;
}

.c-comments__editing__comment button:hover {
  color: #efefff;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.c-comments__form {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.8rem var(--horizontal-margin);
}

.c-comments__form__profile {
  background-position: center;
  background-size: cover;
  width: 25px;
  height: 25px;
  /* background: var(--primary-color); */
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