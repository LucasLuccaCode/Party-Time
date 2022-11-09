<template>
  <div class="c-comments">
    <ul class="c-comments__content">
      <a 
        v-show="currentsComment.length < comments.length" 
        class="more-comments" 
        @click.prevent="seeMoreComments" 
        href="#">
        Ver comentários anteriores
      </a>
      <li class="c-comment__card" v-for="(comment, index) in currentsComment" :key="index">
        <div class="c-comment__card__image"></div>
        <div class="c-comment__card__body">
          <div class="c-comment__card__content">
            <a>{{comment.name}}</a>
            <p>{{comment.message}}</p>
          </div>
          <div class="c-comment__card__actions">
            <a href="#">Curtir</a>
            <a href="#">Responder</a>
            <a href="#" onclick="comments.delete(${i})">Excluir</a>
            <span>{{comment.date}} h</span>
          </div>
        </div>
      </li>
      <form @submit.prevent="addComment" class="c-comments__form">
        <div class="c-comments__form__profile"></div>
        <div class="c-comments__form__input">
          <input type="text" name="comment" v-model="comment" id="comment" placeholder="Escreva um comentário">
        </div>
      </form>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data(){
    return {
      comment: null
    }
  },
  props: ["comments", "state"],
  computed: {
    currentsComment(){
      const { page } = this.state
      return this.comments.slice(-page)
    }
  },
  methods: {
    addComment(){
      this.$parent.updateComments({
        name: "Mr Robot",
        message: this.comment,
        date: "13"
      })
      this.comment = null
    },
    seeMoreComments(){
      this.$parent.setPage(this.state.page + 2)
    }
  }
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
  line-height: .75rem;
}

.c-comment__card__actions {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 0.4rem;
}

.c-comment__card__actions a {
  color: #efefff;
  font-size: .65rem;
  /* text-decoration: none; */
}

.c-comment__card__actions span {
  color: #aaaab0;
  font-size: .65rem;
}

.c-comment__card__actions a:hover {
  text-decoration: underline;
}

.more-comments {
  margin-top: .5rem;
  font-size: .7rem;
}

.c-comments__form {
  display: flex;
  align-items: center;
  width: 100%;
  padding: .4rem 0;
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
  margin-left: .5rem;
}

.c-comments__form__input input {
  width: 100%;
  height: 1.6rem;
  border-radius: 50px;
  padding: 0 .5rem;
  font-size: .7rem;
  color: #efefff;
  background: rgba(255, 255, 255, 0.1);
}

.c-comments__form__input input::placeholder {
  color: #aaaab0;
}
</style>