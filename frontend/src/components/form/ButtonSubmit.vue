<template>
  <button :class="['bigger-button', { 'publishing': publishing }]" type="submit">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ButtonSubmit",
  props: {
    text: String,
    publishing: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style scoped>
.bigger-button {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  border: 0;
  box-shadow: 0 0 0 2px var(--details-color);
  border-radius: 5px;
}

.bigger-button.publishing {
  background: transparent;
  border: 0;
  box-shadow: 0 0 0 2px var(--details-color);
}

.bigger-button.publishing::before {
  content: "";
  position: absolute;
  left: 0;
  width: 0%;
  height: 100%;
  background: var(--details-color);
  animation: publishing 1s linear infinite;
  /* z-index: 0; */
}

@keyframes publishing {
  to {
    width: 100%;
  }
}
</style>