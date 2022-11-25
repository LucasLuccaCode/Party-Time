<template>
  <div class="c-photos">
    <div
      v-if="nPhoto"
      @click="scroll('prev')"
      class="c-photos__button prev"
    >
      <i class="ph-caret-circle-left-fill"></i>
    </div>
    <div
      v-if="nPhoto < photos.length - 1"
      @click="scroll('next')"
      class="c-photos__button next"
    >
      <i class="ph-caret-circle-right-fill"></i>
    </div>
    <ul ref="c_photos">
      <li
        v-for="(photo, index) in photos"
        :key="index"
        :data-photo="index"
        class="c-photos__image"
        :style="`background-image: url(${this.SERVER_BASE_URL}/photos/${photo})`"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PostImage",
  data() {
    return {
      nPhoto: 0,
    };
  },
  props: ["photos"],
  methods: {
    scroll(action) {
      const actions = {
        prev: () => {
          this.nPhoto--;
          if (this.nPhoto < 0) this.nPhoto = 0;
        },
        next: () => {
          this.nPhoto++;
          const totalPhotos = this.photos.length - 1;
          if (this.nPhoto > totalPhotos) this.nPhoto = totalPhotos;
        },
      };
      const fn = actions[action];
      if (fn) fn();

      const discountMargin =
        this.$refs.c_photos.querySelector(`[data-photo='0']`).offsetLeft;
      const photoElem = this.$refs.c_photos.querySelector(
        `[data-photo='${this.nPhoto}']`
      );
      const to = photoElem.offsetLeft - discountMargin;
      this.$refs.c_photos.scroll(to, 0);
    },
  },
  created() {
    // console.log(this.photos);
  },
};
</script>

<style scoped>
.c-photos {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.c-photos ul {
  display: flex;
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
  scroll-behavior: smooth;
  overflow-x: auto;
}

.c-photos ul::-webkit-scrollbar {
  display: none;
}

.c-photos ul::-webkit-scrollbar-thumb {
  display: none;
}

.c-photos__image {
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 180px;
  background-position: center;
  background-size: cover;
}

.c-photos__button {
  cursor: pointer;
  position: absolute;
  display: flex;
  /* box-shadow: 0 1px 1px 2px rgba(0 0 0 / 10%); */
}

.c-photos__button.prev {
  left: 0.5rem;
}

.c-photos__button.next {
  right: 0.5rem;
}

.c-photos__button i {
  font-size: 1.5rem;
  color: #efefff;
}

</style>