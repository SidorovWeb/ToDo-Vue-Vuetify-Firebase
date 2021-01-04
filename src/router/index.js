import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../firebase/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      // маршруты, необходимые для аутентификации пользователя
      requiresAuth: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

// маршрут существует и требует аутентификации.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
