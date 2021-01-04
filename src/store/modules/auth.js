import * as fb from '../../firebase/firebase'

const state = {
  isSubmitting: false,
  currentUser: {},
  validationErrors: null,
  isLoggedIn: null,
}

export const mutationTypes = {
  registerStart: '[auth] register start',
  registerSuccess: '[auth] register success',
  registerFailure: '[auth] register failure',

  loginStart: '[auth] login start',
  loginSuccess: '[auth] login success',
  loginFailure: '[auth] login failure',

  fetchUserProfileStart: '[auth] fetch user profile start',
  fetchUserProfileSuccess: '[auth] fetch user profile success',
  fetchUserProfileFailure: '[auth] fetch user profile failure',

  logoutStart: '[auth] logout start',
  logoutSuccess: '[auth] logout success',
  logoutFailure: '[auth] logout failure',
}

export const actionsTypes = {
  fetchUserProfile: '[auth] fetch user profile',
  register: '[auth] register',
  login: '[auth] login',
  logout: '[auth] logout',
}

export const gettersTypes = {
  userName: '[auth] user name',
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.fetchUserProfileStart]() {},
  [mutationTypes.fetchUserProfileSuccess](state, payload) {
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.fetchUserProfileFailure]() {},

  [mutationTypes.logoutStart]() {},
  [mutationTypes.logoutSuccess](state, payload) {
    state.currentUser = payload
    state.isLoggedIn = null
  },
  [mutationTypes.logoutFailure]() {},
}

const actions = {
  async [actionsTypes.fetchUserProfile]({ commit }, user) {
    commit(mutationTypes.fetchUserProfileStart)
    try {
      const { email } = fb.auth.currentUser
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      commit(mutationTypes.fetchUserProfileSuccess, {
        ...userProfile.data(),
        email,
      })
    } catch ({ message }) {
      commit(mutationTypes.fetchUserProfileFailure)
    }
  },

  async [actionsTypes.register]({ commit }, { name, email, password }) {
    commit(mutationTypes.registerStart)
    try {
      // создание пользователя в Firebase
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        email,
        password
      )
      // создание объекта профиля пользователя в userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: name,
      })
      // set user profile in state.currentUser
      commit(mutationTypes.registerSuccess, {
        name: user.name,
        email,
      })
    } catch ({ message }) {
      commit(mutationTypes.registerFailure, message)
    }
  },

  async [actionsTypes.login]({ commit }, { email, password }) {
    commit(mutationTypes.loginStart)
    try {
      await fb.auth.signInWithEmailAndPassword(email, password)
      commit(mutationTypes.loginSuccess)
    } catch ({ message }) {
      commit(mutationTypes.loginFailure, message)
    }
  },

  async [actionsTypes.logout]({ commit }) {
    commit(mutationTypes.logoutStart)
    try {
      await fb.auth.signOut()
      commit(mutationTypes.logoutSuccess, null)
    } catch ({ message }) {
      commit(mutationTypes.logoutFailure, message)
    }
  },
}

export default {
  state,
  mutations,
  actions,
}
