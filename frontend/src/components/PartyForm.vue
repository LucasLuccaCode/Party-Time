<template>
  <div>
    <Message :msg="msg" :msgClass="msgClass" />

    <form
      @submit.prevent="handleForm"
      class="c-user_form"
      enctype="multipart/form-data"
    >
      <input type="hidden" name="party_id" id="party_id" v-model="party_id" />
      <input type="hidden" name="user_id" id="user_id" v-model="user_id" />
      <input
        type="hidden"
        name="user_name"
        id="user_name"
        v-model="user_name"
      />
      <div class="c-user_form__input">
        <label for="title">Título do evento: </label>
        <input type="text" name="title" id="title" v-model="title" />
      </div>
      <div class="c-user_form__input">
        <label for="description">Descrição: </label>
        <textarea
          name="description"
          id="description"
          v-model="description"
        ></textarea>
      </div>
      <div class="c-user_form__input">
        <label for="party_date">Data da festa: </label>
        <input
          type="date"
          name="party_date"
          id="party_date"
          v-model="party_date"
        />
      </div>
      <div class="c-user_form__input">
        <label for="photos">Imagens: </label>
        <input
          type="file"
          name="photos"
          id="photos"
          multiple="multiple"
          ref="file"
          @change="handleFiles"
        />
      </div>
      <div v-show="page == 'editparty' && showMiniImages" class="c-images">
        <p>Imagens atuais:</p>
        <img v-for="(photo, index) in photos" :src="photo" :key="index" />
      </div>
      <div class="c-user_form__privacy">
        <input
          type="checkbox"
          name="privacy"
          id="privacy"
          v-model="privacy"
          value="privacy"
        />
        <label for="privacy">Evento privado?</label>
      </div>
      <ButtonSubmit :text="btnText" />
    </form>
  </div>
</template>

<script>
import ButtonSubmit from "./form/ButtonSubmit";
import Message from "./Message";

export default {
  data() {
    return {
      party_id: this.party._id || null,
      title: this.party.title || null,
      description: this.party.description || null,
      party_date: this.party.party_date || null,
      photos: this.party.photos || [],
      privacy: this.party.privacy || false,
      user_id: this.party.user_id || null,
      user_name: this.party.user_name || null,
      msg: null,
      msgClass: null,
      formData: null
    };
  },
  props: ["party", "page", "btnText"],
  methods: {
    handleFiles() {
      this.showMiniImages = false;
      this.photos = this.$refs.file.files;
    },
    handleForm() {
      if (this.page === "newparty") this.register();
      if (this.page === "editparty") this.update();
    },
    async register() {
      this.validate();

      try {
        // Get token form store
        const token = this.$store.getters.token;

        const req = await fetch("http://localhost:3000/party", {
          method: "POST",
          headers: {
            "auth-token": token,
          },
          body: this.formData,
        });
        const res = await req.json();

        if (res.error) {
          this.msg = res.error;
          this.msgClass = "error";
          this.cleanMessage();
          return;
        }
        this.msg = res.message;
        this.msgClass = "success";
        this.$router.push("/dashboard");
      } catch (err) {
        console.log(err);
        this.msg = "Erro no servidor, tente mais tarde.";
        this.msgClass = "error";
      }
    },
    async update() {
      this.validate();
      try {
        // Get token form store
        const token = this.$store.getters.token;

        const req = await fetch("http://localhost:3000/party", {
          method: "PATCH",
          headers: {
            "auth-token": token,
          },
          body: this.formData,
        });
        const res = await req.json();

        if (res.error) {
          this.msg = res.error;
          this.msgClass = "error";
          this.cleanMessage();
          return;
        }
        this.msg = res.message;
        this.msgClass = "success";
        this.$router.push("/dashboard");
      } catch (err) {
        console.log(err);
        this.msg = "Erro no servidor, tente mais tarde.";
        this.msgClass = "error";
      }
    },
    validate() {
      const formData = new FormData();

      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("party_date", this.party_date);
      formData.append("privacy", this.privacy);
      formData.append("party_id", this.party_id);
      formData.append("user_id", this.user_id);
      formData.append("user_name", this.user_name);

      const hasPhotos = this.$refs.file.files.length 
      if (hasPhotos) {
        for (let key of Object.keys(this.photos)) {
          formData.append("photos", this.photos[key]);
        }
      }
      this.formData = formData;
    },
    cleanMessage() {
      setTimeout(() => {
        this.msg = null;
        this.msgClass = null;
      }, 3000);
    },
  },
  computed: {
    showMiniImages(){
      return this.page === "editparty"
    }
  },
  components: {
    ButtonSubmit,
    Message,
  },
};
</script>

<style scoped>
.c-user_form {
  --_b-radius: 0.2rem;
  width: 40%;
  padding: 1rem;
  margin: 0 auto;
  margin-top: 1rem;
  /* background: var(--secondary-color); */
  border-radius: 5px;
}

.c-user_form__input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.c-user_form__privacy {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.c-user_form__privacy label {
  margin-left: 0.5rem;
  font-size: 0.8rem;
  color: #babac0;
}

.c-user_form__input label {
  font-size: 0.8rem;
  color: #efefff;
  margin-bottom: 0.5rem;
}

.c-user_form__input input,
.c-user_form__input textarea {
  height: 1.5rem;
  padding: 0.3rem;
  font-size: 0.7rem;
  color: #babac0;
  border-radius: var(--_b-radius);
  background: rgba(255, 255, 255, 0.1);
}

.c-user_form__input textarea {
  height: 60px;
  resize: none;
}

.c-user_form button {
  width: 100%;
  font-size: 0.7rem;
  color: #fff;
  padding: 0.3rem 0;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: var(--_b-radius);
  background: var(--details-color);
  border: 2px solid var(--details-color);
  transition: 0.3s;
}

.c-user_form button:hover {
  background: transparent;
  color: var(--details-color);
}

.c-images {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0px;
}
.c-images p {
  width: 100%;
  color: #babac0;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: left;
}
.c-images img {
  height: 50px;
  margin-right: 15px;
  margin-bottom: 15px;
}
</style>