<template>
  <main class="c-main">
    <router-view />
  </main>
</template>

<script>
export default {
  name: "Main",
}
</script>

<style scoped>
  .c-main {
    min-height: 500px;
    padding: var(--horizontal-margin);
  }
</style>
