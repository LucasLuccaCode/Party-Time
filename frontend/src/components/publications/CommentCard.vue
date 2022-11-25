<template>
  <li class="c-comment__card">
    <div
      class="c-comment__card__profile"
      :style="`background-image: url(/img/user_default.png)`"
    ></div>
    <div class="c-comment__card__body">
      <div class="c-comment__card__content">
        <router-link :to="`/user/${comment.user_id}`">{{
          comment.username
        }}</router-link>
        <p>{{ comment.comment }}</p>
      </div>
      <div class="c-comment__card__actions" :class="{ hidden: !authenticated }">
        <a href="#" @click.prevent="handleLikeComment(comment._id)">Curtir</a>
        <a
          href="#"
          @click.prevent="$parent.handleEditComment(comment._id)"
          v-show="user_id == comment.user_id"
          >Editar</a
        >
        <a
          href="#"
          v-show="user_id == comment.user_id || user_id == partyUserId"
          @click.prevent="$parent.handleDeleteComment(comment._id)"
        >
          Excluir
        </a>
        <span>{{ formatDate(comment.date) }}</span>
      </div>
    </div>
  </li>
</template>

<script>
import FormatDate from "../mixins/FormatDate.vue"

export default {
  name: "Comment",
  props: ["comment", "authenticated", "user_id", "partyUserId"],
  mixins: [FormatDate]
};
</script>

<style scoped>
.c-comment__card {
  display: flex;
  width: 100%;
  border-radius: 3px;
  font-size: 0.8rem;
  color: #efefff;
}

.c-comment__card:focus {
  /* background: red; */
  display: none;
}

.c-comment__card__profile {
  width: 1.2rem;
  height: 1.2rem;
  min-width: 1.2rem;
  min-height: 1.2rem;
  /* background: var(--primary-color); */
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
  font-size: 0.65rem;
  text-transform: capitalize;
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

.hidden {
  pointer-events: none;
  opacity: 0.3;
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
</style>