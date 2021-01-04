const state = {
  data: {},
  isActive: false,
  dialog: '',
}

export const mutationTypes = {
  callDialogStart: '[dialog] call dialog start',
  callDialogSuccess: '[dialog] call dialog success',
  callDialogFailure: '[dialog] call dialog Failure',

  closeDialogStart: '[dialog] close dialog start',
  closeDialogSuccess: '[dialog] close dialog success',
  closeDialogFailure: '[dialog] close dialog Failure',

  dialogName: '[dialog] dialog name passed',
}
export const actionsTypes = {
  callDialog: '[dialog] call dialog',
  closeDialog: '[dialog] close dialog',
}

const mutations = {
  [mutationTypes.callDialogStart](state) {
    state.data = {}
    state.isActive = false
    state.dialog = ''
  },
  [mutationTypes.callDialogSuccess](state, payload) {
    state.data = payload
    state.isActive = true
  },
  [mutationTypes.callDialogFailure](state) {
    state.isActive = false
  },

  [mutationTypes.closeDialogStart]() {},
  [mutationTypes.closeDialogSuccess](state) {
    state.isActive = false
  },
  [mutationTypes.closeDialogFailure]() {},

  [mutationTypes.dialogName](state, payload) {
    state.dialog = payload
  },
}

const actions = {
  [actionsTypes.callDialog]({ commit }, payload) {
    commit(mutationTypes.callDialogStart)
    try {
      commit(mutationTypes.callDialogSuccess, payload)
    } catch (error) {
      commit(mutationTypes.callDialogFailure)
    }
  },

  [actionsTypes.closeDialog]({ commit }) {
    commit(mutationTypes.closeDialogStart)
    try {
      commit(mutationTypes.closeDialogSuccess)
    } catch (error) {
      commit(mutationTypes.closeDialogFailure)
    }
  },
}

export default {
  state,
  mutations,
  actions,
}
