<template>
  <div class="c-post__body">
    <a @click.prevent="this.$parent.likesPost(party._id)">
      <i :class="[`ph-heart-${heartIconType}`, { 'bold': heartIconType == 'fill'}]"></i>
      <span>{{ party.likes.length }}</span>
    </a>
    <a @click.prevent="this.$parent.showComments = true">
      <i class="ph-chat-circle-dots-bold"></i>
      <span>{{ comments.length }}</span>
    </a>
    <a @click.prevent="this.$parent.showComments = true">
      <i class="ph-share-network-bold"></i>
      <span>{{ shares }}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "Body",
  data(){
    return {
      shares: 1
    }
  },
  computed: {
    heartIconType() {
      const user_id = this.$store.getters.user_id;
      return this.party.likes.includes(user_id) ? "fill" : "bold";
    },
  },
  props: ["party", "comments"],
};
</script>

<style scoped>
.c-post__body {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
  padding: 0.5rem var(--_padding-h);
  border-top: 2px solid rgba(255, 255, 255, 0.05);
  border-bottom: 2px solid rgba(255, 255, 255, 0.05);
}

.c-post__body a {
  display: flex;
  align-items: center;
  gap: .3rem;
  border-radius: 50px;
  padding: .3rem;
  font-size: 0.6rem;
  color: #aaaab0;
  font-weight: bold;
  text-decoration: none;
  background: rgba(255, 255, 255, .05);
  /* border: 1px solid rgba(255, 255, 255, .1); */
}

.c-post__body a:hover {
  background: rgba(255, 255, 255, .1);
}

.c-post__body i {
  font-size: .7rem;
}

.c-post__body i.bold {
  color: var(--details-color);
}

</style>