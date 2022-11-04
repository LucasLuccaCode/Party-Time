<template>
  <div class="c-message">
    <p :class="msgClass" v-show="msg">{{msg}}</p>
  </div>
</template>

<script>
  export default {
    name: "Message",
    props: ["msg", "msgClass"]
  }
</script>

<style scoped>
  .c-message {
    width: 100%;
  }

  .c-message p {
    max-width: 50%;
    margin: .5rem auto;
    padding: .3rem;
    font-size: .8rem;
    border-radius: .2rem;
    border: 1px solid #ccc;
    text-align: center;
  }

  .success {
    color: #546d5a;
    background: #d4edda;
    border: 1px solid #c3e6cb;
  }

  .error {
    color: #923c44;
    background: #f8d7da;
    border: 1px solid #f5c6cb;
  }
</style>