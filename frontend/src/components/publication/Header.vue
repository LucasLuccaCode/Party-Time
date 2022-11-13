<template>
  <div class="c-header">
    <div class="c-header__title">
      <div 
        class="c-header__profile"
        :style="`background-image: url(/img/user.png)`"
      >
      </div>
      <router-link :to="`/profile/${party.user_id}`">{{ party.user_name }} <span>{{treatDates(party.date)}}</span></router-link>
      <div class="c-header__options"><span>...</span></div>
    </div>
    <div class="c-header__legend">
      <p>{{ party.party_date }} - {{ party.title }}</p>
      <router-link :to="`/party/${party._id}`" class="c-party__more">Ver mais</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["party"],
  methods: {
    treatDates(dateMs){
      return this.$parent.formatDate(dateMs)
    }
  }
};
</script>

<style scoped>
.c-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem var(--_padding-h);
}

.c-header__title {
  display: flex;
  align-items: center;
  width: 100%;
}

.c-header__profile {
  background-position: center;
  background-size: cover;
  width: 25px;
  height: 25px;
  /* background: var(--primary-color); */
  border-radius: 50px;
  overflow: hidden;
}

.c-header__title a {
  display: flex;
  flex-direction: column;
  font-size: .75rem;
  color: #efefff;
  margin-left: 0.5rem;
  font-weight: bold;
  font-family: sans-serif;
}

.c-header__title a span {
  font-size: 0.55rem;
  color: #babac0;
  margin-top: 3px;
}

.c-header__options {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  margin-right: 0;
  border-radius: 50px;
  overflow: hidden;
  transition: 0.1s;
}

.c-header__options:hover {
  background: rgba(0, 0, 0, 0.1);
}

.c-header__options span {
  font-size: 1.4rem;
  margin-bottom: .8rem;
  color: #cacad0;
}

.c-header__legend {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: .7rem;
  /* color: var(--details-color); */
}

.c-header__legend p {
  color: #efefff;
  font-size: 0.75rem;
}

.c-header__legend a {
  margin-top: .4rem;
  color: var(--details-color);
  font-size: 0.68rem;
  font-weight: bold;
}
</style>