<template>
  <div
    class="c-post__image"
    :style="
      party.photos.length ? `background-image: url(${party.photos[0]})` : ''
    "
  ></div>
</template>

<script>
export default {
  name: "PostImage",
  props: ["party"]
}
</script>

<style scoped>
.c-post__image {
  height: 180px;
  /* background-image: url("/public/img/image.jpg"); */
  background-position: center;
  background-size: cover;
}
</style>