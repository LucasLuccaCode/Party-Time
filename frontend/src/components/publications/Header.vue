<template>
  <div class="c-header">
    <div class="c-header__title">
      <div
        class="c-header__title__profile"
        :style="`background-image: url(/img/user.png)`"
      ></div>
      <div class="c-header__title__content">
        <router-link :to="`/user/${party.user_id}`"
          >{{ party.user_name }}
        </router-link>
        <div>
          <span>{{ treatDates(party.date) }}</span>
          <i
            :class="{
              'ph-lock-simple-fill': party.privacy,
              'ph-globe-hemisphere-west-fill': !party.privacy,
            }"
          >
          </i>
        </div>
      </div>
      <div class="c-header__options" v-if="userId === party.user_id">
        <div
          class="c-header__options__pointers"
          @click="hideOptions = !hideOptions"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul
          :class="['c-dialog__post_options', { hidden: hideOptions }]"
          @click="handlePublicationOptions"
          @blur="hideOptions = true"
        >
          <li data-option="edit">Editar publicação</li>
          <li data-option="delete">Excluir publicação</li>
        </ul>
      </div>
    </div>
    <div class="c-header__legend">
      <p>{{ party.description }}</p>
      <router-link :to="`/party/${party._id}`" class="c-party__more"
        >Ver mais</router-link
      >
    </div>
  </div>
</template>

<script>
import FormatDate from "../mixins/FormatDate.vue";

export default {
  name: "Header",
  data() {
    return {
      userId: this.$store.getters.user_id,
      partyId: this.party._id,
      hideOptions: true,
    };
  },
  props: ["party"],
  mixins: [FormatDate],
  methods: {
    treatDates(dateMs) {
      return this.formatDate(dateMs);
    },
    async deletePost() {
      try {
        const token = this.$store.getters.token;
        const req = await fetch(
          `${this.SERVER_BASE_URL}/party/${this.partyId}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
              "auth-token": token,
            },
          }
        );

        const res = await req.json();

        if (res.error) {
          console.log(error);
        } else {
          this.$parent.updateParties();
        }
      } catch (err) {
        console.log(err);
      }
    },
    handlePublicationOptions({ target: el }) {
      const actions = {
        edit: () => this.$parent.editPublication(this.partyId),
        privacy: () => {},
        delete: () => this.deletePost(),
      };

      const action = el.getAttribute("data-option");
      const fn = actions[action];
      if (fn) fn();
      this.hideOptions = true;
    },
  },
};
</script>

<style scoped>
.c-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--_padding-h);
}

.c-header__title {
  display: flex;
  align-items: center;
  width: 100%;
}

.c-header__title__profile {
  background-position: center;
  background-size: cover;
  width: 2rem;
  height: 2rem;
  /* background: var(--primary-color); */
  border-radius: 50px;
  overflow: hidden;
}

.c-header__title__content {
  margin-left: 0.5rem;

}

.c-header__title__content a {
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  color: #efefff;
  text-transform: capitalize;
  font-weight: bold;
  font-family: sans-serif;
}

.c-header__title__content div {
  display: flex;
  align-items: center;
  margin-top: 3px;
}

.c-header__title__content span,
.c-header__title__content i {
  font-size: 0.55rem;
  color: #babac0;
}

.c-header__title__content i {
  margin-left: .3rem;
  margin-top: .1rem;
}

.c-header__options {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  margin-right: 0;
  overflow: hidden;
}

.c-header__options__pointers {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.18rem;
  width: 100%;
  height: 100%;
  transition: 0.1s;
  border-radius: 50px;
}

.c-header__options__pointers:hover {
  background: rgba(0, 0, 0, 0.1);
}

.c-header__options__pointers span {
  width: 0.2rem;
  height: 0.2rem;
  background: #cacad0;
  border-radius: 50px;
}

.c-header__legend {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0.7rem;
  /* color: var(--details-color); */
}

.c-header__legend p {
  color: #efefff;
  font-size: 0.75rem;
}

.c-header__legend a {
  margin-top: 0.4rem;
  color: var(--details-color);
  font-size: 0.68rem;
  font-weight: bold;
}

.c-dialog__post_options {
  cursor: pointer;
  position: absolute;
  /* top: 0%; */
  right: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 10px;
  background: #5a5a60;
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.1);
  z-index: 11;
}

.c-dialog__post_options::before {
  content: "";
  position: absolute;
  top: -0.3rem;
  right: 0.7rem;
  background: #5a5a60;
  width: 1rem;
  height: 1rem;
  transform: rotate(45deg);
  z-index: 0;
}

.c-dialog__post_options.hidden {
  display: none;
}

.c-dialog__post_options li {
  padding: 0.5rem;
  font-size: 0.7rem;
  color: #cacad0;
  white-space: nowrap;
  font-weight: bold;
  z-index: 1;
}

.c-dialog__post_options li:not(:last-child) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.05);
}

.c-dialog__post_options li:hover {
  background: rgba(0, 0, 0, 0.05);
}
</style>