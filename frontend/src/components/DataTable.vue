<template>
  <div class="c-data__container">
    <Message :msg="msg" :msgClass="msgClass" v-show="msg" />
    <div class="c-data__table">
      <div class="c-data__table__header">
        <div class="c-data__header__id">ID</div>
        <div class="c-data__header__title">Nome da festa</div>
        <div class="c-data__header__actions">Ações</div>
      </div>
      <div class="c-data__table__body">
        <div
          class="c-data__table__row"
          v-for="(party, index) in parties"
          :key="index"
        >
          <div class="c-data__body__id">{{ index + 1 }}</div>
          <div class="c-data__body__title">
            <router-link :to="`/party/${party._id}`">{{
              party.title
            }}</router-link>
          </div>
          <div class="c-data__body__actions">
            <router-link
              :to="`/editparty/${party._id}`"
              class="btn"
              style="--color: #007bff"
              >Editar</router-link
            >
            <button
              class="btn"
              style="--color: #dc3545"
              @click="remove(party._id)"
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./Message";

export default {
  name: "DataTable",
  data() {
    return {
      msg: null,
      msgClass: null,
    };
  },
  props: ["parties"],
  components: {
    Message,
  },
  methods: {
    async remove(id) {
      try {
        const token = this.$store.getters.token
        const req = await fetch(`http://localhost:3000/party/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            "auth-token": token
          }
        });

        const res = await req.json();

        if (res.error) {
          this.msg = res.error;
          this.msgClass = "error";
        } else {
          this.msg = res.message;
          this.msgClass = "success";

          this.$parent.getUserParties();
        }
        this.cleanMessage();
      } catch (err) {
        console.log(err);
      }
    },
    cleanMessage() {
      setTimeout(() => {
        this.msg = null;
        this.msgClass = null;
      }, 3000);
    },
  },
};
</script>


<style scoped>
.c-data__container {
  width: 100%;
}

.c-data__table__header,
.c-data__table__row {
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.c-data__table__header div,
.c-data__table__row div {
  flex: 1 1 0;
}

.c-data__table__header div {
  color: var(--details-color);
  font-size: 0.7rem;
  font-weight: bold;
}

.c-data__table__body div,
.c-data__table__body a,
.c-data__table__body button {
  color: #dadae0;
  font-size: 0.6rem;
}

.btn {
  padding: 0.3rem 0.5rem;
  background: var(--color);
  border: 2px solid var(--color);
  border-radius: 0.2rem;
  font-weight: bold;
}

.btn:hover {
  background: transparent;
  transition: 0.3s;
  color: var(--color);
}

.btn:first-child {
  text-decoration: none;
  margin-right: 0.5rem;
}

.c-data__header__id,
.c-data__body__id {
  max-width: 2.5rem;
}

.c-data__body__title a {
  font-size: 0.8rem;
}
</style>