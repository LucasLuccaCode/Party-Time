<template>
  <div class="c-loader"></div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped>
.c-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.3rem 0;
}

.c-loader::before {
  content: "";
  display: inline-block;
  width: .7rem;
  height: .8rem;
  border-radius: 50px;
  border: 3px solid rgba(0, 177, 255, .4);
  border-top: 3px solid var(--details-color);
  animation: loading 1s ease infinite;
}

@keyframes loading {
  to {
    transform: rotate(360deg);
  }
}
</style>