<template>
  <section class="c-container">
    <Header />
    <Main />
  </section>
</template>

<script>
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Main,
    Footer,
  },
};
</script>

<style>
:root {
  --primary-color: #2a2a30;
  --secondary-color: #3a3a40;
  --details-color: #00b1ff;
  --font-size: 18px;
  --horizontal-margin: 0.8rem;
  --b-radius: 0.3rem;
  --max-width: 500px;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body,
html {
  width: 100%;
  height: 100%;
  background: var(--primary-color);
  font-size: var(--font-size);
  font-family: Helvetica, sans-serif;
}

#app {
  width: 100%;
  height: 100%;
}

.c-container {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

a {
  cursor: pointer;
  font-size: 0.8rem;
  color: #9a9aa0;
  text-decoration: none;
  transition: 0.3s;
}

a:hover {
  color: #efefff;
  text-decoration: underline;
}

li {
  list-style: none;
}

h1 {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #efefff;
  text-align: center;
}

.bigger-button {
  display: flex;
  justify-content: center;
  border: 2px solid var(--details-color);
  color: var(--secondary-color);
  padding: 0.3rem 0.5rem;
  background: var(--details-color);
  font-size: 0.7rem;
  font-weight: bold;
  border: 2px solid var(--details-color);
  border-radius: 5rem;
}

.bigger-button:hover {
  text-decoration: none;
  background: transparent;
  color: var(--details-color);
}

input,
button,
textarea {
  outline: 0;
  border: 0;
}

button {
  cursor: pointer;
}
</style>
