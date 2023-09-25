import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from "@/pages/Main.vue";
import Register from "@/pages/Register.vue";
import Login from "@/pages/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Main,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('token')){
        return next({
          name: "login"
        })
      }

      next()
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('token')){
        return next({
          name: "home"
        })
      }

      next()
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('token')){
        return next({
          name: "home"
        })
      }

      next()
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
