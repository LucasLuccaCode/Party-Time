<template>
  <div
    class="c-post__image"
    :style="
      photos.length ? `background-image: url(${photos[0]})` : ''
    "
  ></div>
</template>

<script>
export default {
  name: "PostImage",
  props: ["photos"]
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