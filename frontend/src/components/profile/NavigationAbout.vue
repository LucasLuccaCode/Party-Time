<template>
  <div>
    <ul class="c-about" v-if="showInfos">
      <p>Mais informações...</p>
    </ul>
    <p v-else class="not-parties">Nenhuma informação encontrada...</p>
  </div>
</template>

<script>
export default {
  name: "NavigationAbout",
  data(){
    return {
      showInfos: false
    }
  }
};
</script>

<style scoped>
</style>