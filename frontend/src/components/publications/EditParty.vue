<template>
  <div class="c-form__container" @click="handleContainer">
    <div>
      <form
        @submit.prevent="updatePublication"
        class="c-form"
        enctype="multipart/form-data"
      >
        <input type="hidden" name="party_id" id="party_id" v-model="party_id" />
        <input type="hidden" name="user_id" id="user_id" v-model="user_id" />

        <div class="c-form__header">
          <div
            class="c-form__header__profile"
            :style="`background-image: url(/img/user.png)`"
          ></div>
          <select v-model="privacy">
            <option :value="false">Publica</option>
            <option :value="true">Privada</option>
          </select>
        </div>

        <textarea
          class="c-form__textarea"
          name="description"
          v-model="description"
          placeholder="Escreva sobre uma nova festa..."
        ></textarea>

        <div class="c-form__photos_preview" v-if="photos.length">
          <ul>
            <li v-for="(photo, index) in photos" :key="index">
              <div class="delete" @click="removeFileFromFileList(index)"></div>
              <img
                :src="`${this.SERVER_BASE_URL}/photos/${photo}`"
                alt="Image preview"
              />
            </li>
          </ul>
        </div>

        <div class="c-form__options">
          <div class="c-form__option">
            <label for="party_date">
              <img src="/img/date.png" alt="Adicionar imagens" />
              Data da festa:
            </label>
            <input
              type="date"
              name="party_date"
              id="party_date"
              v-model="party_date"
            />
          </div>
          <div class="c-form__option">
            <label for="photos">
              <img src="/img/add-image.png" alt="Adicionar imagens" />
              Adicionar imagens
            </label>
            <input
              type="file"
              name="photos"
              id="photos"
              multiple="multiple"
              ref="file"
              @change="handleFiles"
            />
          </div>
        </div>

        <ButtonSubmit :text="btnText" :publishing="publishing" />
      </form>

      <Message :msg="msg" :msgClass="msgClass" />
    </div>
  </div>
</template>

<script>
import ButtonSubmit from "../form/ButtonSubmit.vue";
import Message from "../Message.vue";

export default {
  name: "NewPost",
  data() {
    return {
      party_id: this.party._id || null,
      user_id: this.party.user_id || null,
      user_name: this.party.user_name || null,
      description: this.party.description || null,
      party_date: this.party.party_date.substring(0,10) || null,
      privacy: this.party.privacy || false,
      photos: this.party.photos || [],
      photosPreview: [],
      msg: null,
      msgClass: null,
      formData: null,
      publishing: false,
    };
  },
  props: ["party", "btnText"],
  methods: {
    pushPhoto(codeB64) {
      this.photos.unshift(codeB64);
    },
    handleContainer({ target: el }) {
      const className = el.className;
      if (className !== "c-form__container") return;

      this.$parent.enableContainerEditPost = false;
    },
    handleFiles({ target: el }) {
      const files = el.files;
      if (files && files.length) {
        for (let currentFile of files) {
          const file = new FileReader();
          file.onload = (e) => {
            const codeB64 = e.target.result;
            this.pushPhoto(codeB64);
          };
          file.readAsDataURL(currentFile);
        }
      }
      // this.photos = el.files;
    },
    updatePublication(){
      console.log(this.description, this.privacy, this.party_date, this.photos)
    },
    removeFileFromFileList(index) {
      this.photos.splice(index, 1);
    },
    handleForm() {
      if (this.page === "newparty") this.register();
      if (this.page === "editparty") this.update();
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

      const hasPhotos = this.photos.length;
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
      }, 5000);
    },
    resetFields() {
      this.description = null;
      this.party_date = null;
      this.privacy = false;
      this.photos = [];
      this.photosPreview = [];
      this.formData = null;
      this.publishing = false;
    },
  },
  components: {
    Message,
    ButtonSubmit,
  },
};
</script>

<style scoped>
.c-form__container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0 0 0 / 60%);
  z-index: 200;
}

.c-form__container > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
}

.c-form {
  --_b-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  width: 95%;
  /* gap: .5rem; */
  padding: var(--horizontal-margin);
  background: var(--secondary-color);
  border-radius: 5px;
}

.c-form__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.c-form__header__profile {
  background-position: center;
  background-size: cover;
  width: 2rem;
  height: 2rem;
  background: var(--primary-color);
  border-radius: 50px;
  overflow: hidden;
}

.c-form__header select {
  font-size: 0.6rem;
  color: #babac0;
  padding: 0.3rem;
  border-radius: var(--_b-radius);
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  border: none;
}

.c-form__textarea {
  width: 100%;
  height: 3.5rem;
  font-size: 0.7rem;
  color: #efefff;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: var(--_b-radius);
  background: rgba(255, 255, 255, 0.1);
  resize: none;
  border: 3px solid transparent;
}

.c-form__textarea:focus {
  border: 3px solid var(--details-color);
}

/* Photo preview */
.c-form__photos_preview {
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: var(--_b-radius);
  border: 2px solid rgba(255 255 255 / 5%);
  overflow: hidden;
}

.c-form__photos_preview ul,
.c-form__photos_preview ul li {
  width: 100%;
}

.c-form__photos_preview ul {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
}

.c-form__photos_preview ul li {
  position: relative;
}

.c-form__photos_preview ul li .delete {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 27px;
  border-radius: 50px;
  border: 2px solid rgba(0 0 0 / 10%);
  background: #efefff;
  box-shadow: 0 1px 1px 1px rgba(0 0 0 / 10%);
}

.c-form__photos_preview ul li .delete::before {
  content: "";
  position: absolute;
  width: 0.1rem;
  height: 0.8rem;
  background: var(--secondary-color);
  transform: rotate(-45deg);
  border-radius: 50px;
}

.c-form__photos_preview ul li .delete::after {
  content: "";
  position: absolute;
  width: 0.1rem;
  height: 0.8rem;
  background: var(--secondary-color);
  transform: rotate(45deg);
  border-radius: 50px;
}

.c-form__photos_preview ul li .delete:hover {
  background: #ffffff;
}

.c-form__photos_preview ul li .delete:active {
  transform: scale(0.95);
}

.c-form__photos_preview img {
  width: 100%;
  max-width: 100%;
  border-radius: 10px;
  /* background: var(--primary-color); */
}

/* Actions */
.c-form__options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
}

.c-form__option {
  display: flex;
  gap: 0.4rem;
  padding: 0 0.5rem;
  border-radius: var(--_b-radius);
  background: rgba(255 255 255 / 10%);
}

.c-form__option label {
  cursor: pointer;
  align-items: center;
  display: flex;
  gap: 0.5rem;
  flex: 1;
  color: #efefff;
  font-size: 0.6rem;
  white-space: nowrap;
  padding: 0.5rem 0;
}

.c-form__option img {
  width: 0.9rem;
  width: 0.9rem;
}

.c-form__option:hover {
  background: rgba(255 255 255 / 20%);
}

.c-form__option:click {
  transform: scale(0.95);
}

.c-form__options input#party_date {
  font-size: 0.65rem;
  color: #efefff;
  font-weight: bold;
  background: transparent;
}

.c-form__options input#party_date::-webkit-calendar-picker-indicator {
  display: none;
}

.c-form__options input#photos {
  display: none;
}

.c-form button {
  margin-top: 0.8rem;
}
</style>