import * as fb from '../../firebase/firebase'

const state = {
  data: [],
  isLoading: false,
  error: false,
}

export const mutationTypes = {
  fetchTasksStart: '[tasks] fetch tasks start',
  fetchTasksSuccess: '[tasks] fetch tasks success',
  fetchTasksFailure: '[tasks] fetch tasks failure',

  createTaskStart: '[tasks] create task start',
  createTaskSuccess: '[tasks] create task success',
  createTaskFailure: '[tasks] create task failure',

  deleteTaskStart: '[tasks] delete task start',
  deleteTaskSuccess: '[tasks] delete task success',
  deleteTaskFailure: '[tasks] delete task failure',

  editTaskStart: '[tasks] edit task start',
  editTaskSuccess: '[tasks] edit task success',
  editTaskFailure: '[tasks] edit task failure',
}

export const actionsTypes = {
  fetchTasks: '[tasks] fetch tasks',
  createTask: '[tasks] create task',
  deleteTask: '[tasks] delete task',
  editTask: '[tasks] edit task',
}

const mutations = {
  [mutationTypes.fetchTasksStart](state) {
    state.isLoading = true
    state.data = []
  },
  [mutationTypes.fetchTasksSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.fetchTasksFailure](state, payload) {
    state.isLoading = false
    state.data = payload
  },

  [mutationTypes.createTaskStart]() {},
  [mutationTypes.createTaskSuccess](state, payload) {
    state.data.push(payload)
  },
  [mutationTypes.createTaskFailure]() {},

  [mutationTypes.deleteTaskStart]() {},
  [mutationTypes.deleteTaskSuccess](state, payload) {
    state.data = payload
  },
  [mutationTypes.deleteTaskFailure]() {},

  [mutationTypes.editTaskStart]() {},
  [mutationTypes.editTaskSuccess](state, payload) {
    state.data = state.data.map((t) => {
      if (t.id === payload.id) {
        t = payload
        return t
      }
      return t
    })
  },
  [mutationTypes.editTaskFailure]() {},
}

const actions = {
  async [actionsTypes.fetchTasks]({ commit }) {
    commit(mutationTypes.fetchTasksStart)
    try {
      // realtime firebase connection
      await fb.postsCollection
        .orderBy('createdOn')
        .get()
        .then((snapshot) => {
          let postsArray = []
          // logic goes here
          snapshot.forEach((doc) => {
            let post = doc.data()
            post.id = doc.id
            postsArray.push(post)
          })
          commit(mutationTypes.fetchTasksSuccess, postsArray)
        })
    } catch (error) {
      commit(mutationTypes.fetchTasksFailure, error)
    }
  },

  async [actionsTypes.createTask]({ commit, rootState }, task) {
    commit(mutationTypes.createTaskStart)
    try {
      const newTask = {
        createdOn: new Date(),
        ...task,
        userId: fb.auth.currentUser.uid,
        userName: rootState.auth.currentUser.name,
      }
      await fb.postsCollection.add(newTask).then((docRef) => {
        commit(mutationTypes.createTaskSuccess, { ...newTask, id: docRef.id })
      })
    } catch (error) {
      commit(mutationTypes.createTaskFailure)
    }
  },

  async [actionsTypes.deleteTask]({ commit, state }, id) {
    commit(mutationTypes.deleteTaskStart)
    try {
      await fb.postsCollection.doc(id).delete()
      const newArray = state.data.filter((task) => {
        return task.id != id
      })
      commit(mutationTypes.deleteTaskSuccess, newArray)
    } catch (error) {
      commit(mutationTypes.deleteTaskFailure)
    }
  },

  async [actionsTypes.editTask]({ commit }, task) {
    commit(mutationTypes.editTaskStart)
    try {
      await fb.postsCollection.doc(task.id).update({ ...task })
      commit(mutationTypes.editTaskSuccess, task)
    } catch (error) {
      commit(mutationTypes.editTaskFailure)
    }
  },
}

const getters = {
  getTasks: (state) => {
    return state.data
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
