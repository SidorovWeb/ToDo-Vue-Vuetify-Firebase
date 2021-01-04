import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { auth } from './firebase/firebase'
import { actionsTypes } from '@/store/modules/auth'

Vue.config.productionTip = false

let app

auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app')
  }

  if (user) {
    store.dispatch(actionsTypes.fetchUserProfile, user).then(() => {
      if (
        router.currentRoute.path === '/login' ||
        router.currentRoute.path === '/register'
      ) {
        router.push('/')
      }
    })
  }
})
