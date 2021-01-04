import * as fb from '../../firebase/firebase'

const state = {
  isSubmitting: false,
  user: {},
}

export const mutationTypes = {
  updateUserStart: '[profile] update user start',
  updateUserSuccess: '[profile] update user success',
  updateUserFalure: '[profile] update user falure',
}

export const actionsTypes = {
  updateUser: '[profile] update user',
}

const mutations = {
  [mutationTypes.updateUserStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.updateUserSuccess](state, user) {
    state.isSubmitting = false
    state.user = user
  },
  [mutationTypes.updateUserFalure](state) {
    state.isSubmitting = true
  },
}

const actions = {
  async [actionsTypes.updateUser]({ commit }, user) {
    commit(mutationTypes.updateUserStart)
    try {
      const uid = fb.auth.currentUser.uid
      await fb.usersCollection.doc(uid).update({ ...user })
      commit(mutationTypes.updateUserSuccess, user)
    } catch (error) {
      commit(mutationTypes.updateUserFalure)
    }
  },
}

export default {
  state,
  mutations,
  actions,
}
