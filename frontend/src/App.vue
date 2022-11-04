<template>
  <section id="c-container">
    <Header />
    <Main />
    <Footer />
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

#c-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

a {
  font-size: 0.8rem;
  color: #9a9aa0;
  text-decoration: none;
  transition: 0.3s;
}

a:hover {
  color: #efefff;
  text-decoration: underline;
}

h1 {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #efefff;
  text-align: center;
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
