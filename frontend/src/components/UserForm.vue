<template>
  <div>
    <Message :msg="msg" :msgClass="msgClass" />

    <form @submit.prevent="handleForm" class="c-user_form">
      <input type="hidden" name="id" id="id" v-model="id" />
      <div class="c-user_form__input" v-show="page !== 'login'">
        <label for="name">Nome: </label>
        <input type="text" name="name" id="name" v-model="name" />
      </div>
      <div class="c-user_form__input">
        <label for="email">E-mail: </label>
        <input type="text" name="email" id="email" v-model="email" />
      </div>
      <div class="c-user_form__input">
        <label for="password">Senha: </label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
        />
      </div>
      <div class="c-user_form__input" v-show="page !== 'login'">
        <label for="confirm_password">Confirmar senha: </label>
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          v-model="confirm_password"
        />
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
      id: this.user._id || null,
      name: this.user.name || null,
      email: this.user.email || null,
      password: null,
      confirm_password: null,
      formData: null,
      msg: null,
      msgClass: null,
      error: null,
    };
  },
  props: ["user", "page", "btnText"],
  methods: {
    handleForm() {
      if (this.page == "register") this.register();
      if (this.page == "login") this.login();
    },
    async register() {
      this.validateRegister();

      if (this.error) {
        this.msg = this.error;
        this.msgClass = "error";
        this.error = null;
        return;
      }

      const dataJson = JSON.stringify(this.formData);
      try {
        const req = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: dataJson,
        });
        const res = await req.json();

        if (res.error) {
          this.msg = res.error;
          this.msgClass = "error";
          this.removeMsg();
          return;
        }

        this.msg = res.msg;
        this.msgClass = "success";

        // Emit event to save user data in storage
        this.$store.commit("authenticate", {
          token: res.token,
          user_id: res.user_id,
        });

        // Redirect to dashboard page
        this.$router.push("/dashboard");
      } catch (err) {
        console.log(err);
        this.msg = "Erro no servidor, tente mais tarde!"
        this.msgClass = "error"
      }
    },
    async login() {
      this.validateLogin();

      if(this.error) {
        this.msg = this.error;
        this.msgClass = "error";
        this.error = null;
        return;
      }

      const dataJson = JSON.stringify(this.formData);
      try {
        const req = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: dataJson,
        });
        const res = await req.json();

        if (res.error) {
          this.msg = res.error;
          this.msgClass = "error";
          this.removeMsg();
          return;
        }

        this.msg = res.msg;
        this.msgClass = "success";

        // Emit event to save user data in storage
        this.$store.commit("authenticate", {
          token: res.token,
          user_id: res.user_id,
        });

        // Redirect to dashboard page
        this.$router.push("/dashboard");
      } catch (err) {
        console.log(err);
        this.msg = "Erro no servidor, tente mais tarde!"
        this.msgClass = "error"
      }
    },
    validateRegister() {
      if (!this.name || !this.email || !this.password || !this.confirm_password)
        return (this.error = "Preencha todos os campos para continuar.");

      if (this.password !== this.confirm_password)
        return (this.error = "As senhas não conferem.");

      this.formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
      };
    },
    validateLogin(){
      if (!this.email || !this.password)
        return (this.error = "Preencha todos os campos para continuar.");

      this.formData = {
        email: this.email,
        password: this.password,
      }
    },
    removeMsg() {
      setTimeout(() => {
        this.msg = null;
        this.msgClass = null;
      }, 4000);
    },
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

.c-user_form div {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.c-user_form label {
  font-size: 0.8rem;
  color: #efefff;
  margin-bottom: 0.5rem;
}

.c-user_form input {
  height: 1.5rem;
  padding: 0.3rem;
  font-size: 0.7rem;
  color: #babac0;
  border-radius: var(--_b-radius);
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
}

.c-user_form input:focus {
  border: 2px solid var(--details-color);
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
</style>