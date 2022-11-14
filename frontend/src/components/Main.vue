<template>
  <main class="c-main">
    <router-view />
  </main>
</template>

<script>
export default {
  name: "Main",
};
</script>

<style scoped>
.c-main {
  /* grid-area: main; */
  /* padding: var(--horizontal-margin); */
  overflow-y: auto;
}

.c-main::-webkit-scrollbar {
  width: 0.3rem;
}

.c-main::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
