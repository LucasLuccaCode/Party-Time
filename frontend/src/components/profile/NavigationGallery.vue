<template>
  <div>
    <ul class="c-gallery" v-if="urlPhotos.length">
      <li v-for="(url, index) in urlPhotos" :key="index">
        <img
          :src="`${this.SERVER_BASE_URL}/photos/${url}`"
          alt="Photo from user gallery"
        />
      </li>
    </ul>
    <p class="not-parties" v-else>
      Nenhuma imagem encontrada...
    </p>
  </div>
</template>

<script>
export default {
  name: "NavigationGallery",
  props: ["urlPhotos"],
};
</script>

<style scoped>
.c-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 95%;
  gap: 0.5rem;
  margin: var(--horizontal-margin) auto;
  padding: var(--horizontal-margin);
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}

.c-gallery li img {
  max-width: 100%;
}
</style>