import { createStore } from 'vuex'
import vuexPersistance from "vuex-persist"

const vuexLocal = new vuexPersistance({
  storage: window.localStorage
})

export default createStore({
  store() {
    return {
      authenticated: false,
      token: null,
      user_id: null
    }
  },
  getters: {
    authenticated: (store) => store.authenticated,
    token: (store) => store.token,
    user_id: (store) => store.user_id
  },
  mutations: {
    authenticate(store, data) {
      store.authenticated = true
      store.token = data.token
      store.user_id = data.user_id
    },
    logout(store, data) {
      store.authenticated = false
      store.token = null
      store.user_id = null
    }
  },
  plugins: [vuexLocal.plugin]
})
