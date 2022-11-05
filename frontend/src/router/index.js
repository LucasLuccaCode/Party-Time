import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/index"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/newparty",
    name: "NewParty",
    component: () => import("../views/NewParty.vue"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/editparty/:id",
    name: "EditParty",
    component: () => import("../views/EditParty.vue"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/party/:id",
    name: "Party",
    component: () => import("../views/Party.vue"),
    meta: {
      requireAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from , next) => {
  if(to.matched.some( record => record.meta.requireAuth) && !store.getters.authenticated)
    return next("/login")
  next()
})

export default router
