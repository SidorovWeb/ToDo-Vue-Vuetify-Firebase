import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import tasks from '@/store/modules/tasks'
import dialog from '@/store/modules/dialog'
import profile from '@/store/modules/profile'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    auth,
    tasks,
    dialog,
    profile,
  },
})
