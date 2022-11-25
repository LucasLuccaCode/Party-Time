import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const myGlobalVariables = {
  data(){
    return {
      APP_BASE_URL: "http://localhost:8080",
      SERVER_BASE_URL: "http://localhost:3000"
    }
  }
}

const app = createApp(App)
app.use(store)
app.use(router)
app.mixin(myGlobalVariables)
app.mount('#app')
