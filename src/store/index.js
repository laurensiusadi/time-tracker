import Vue from 'vue'
import Vuex from 'vuex'
import Store from 'electron-store'
import ObjectID from 'bson-objectid'
import { diffToSecond, secondsToHhMmSs } from '../utils'

Vue.use(Vuex)

const storage = new Store()
// storage.clear()
const saveStorage = (state, key) => {
  storage.set(key, state[key])
}

export default new Vuex.Store({
  state: {
    selectedProject: null,
    currentSession: null,
    projects: storage.get('projects') ?? [],
    sessions: storage.get('sessions') ?? []
  },
  getters: {
    projectsWithSessions: (state) => (id) => {
      const totalSecond = state.sessions
        .filter(s => s.projectId === id && s.start !== null && s.end !== null)
        .reduce((sum, s) => sum + diffToSecond(new Date(s.start), new Date(s.end)), 0)
      return secondsToHhMmSs(totalSecond)
    }
  },
  mutations: {
    selectProject(state, payload) {
      state.selectedProject = state.projects.find(p => p.id === payload)
    },
    setProjectName(state, { id, name }) {
      const i = state.projects.findIndex(p => p.id === id)
      Vue.set(state.projects, i, { ...state.projects[i], name })
      saveStorage(state, 'projects')
    },
    deleteProject(state, payload) {
      state.projects.splice(state.projects.findIndex(p => p.id === payload), 1)
      saveStorage(state, 'projects')
    },
    newProject(state, payload) {
      state.projects.push(payload)
      saveStorage(state, 'projects')
    },
    startSession(state, payload) {
      const s = {
        id: ObjectID().toString(),
        projectId: payload,
        start: new Date().toUTCString(),
        end: null
      }
      state.currentSession = s
      state.sessions.push(s)
      saveStorage(state, 'sessions')
    },
    endSession(state) {
      const i = state.sessions.findIndex(s => s.id === state.currentSession.id)
      if (i !== -1) {
        Vue.set(state.sessions, i, { ...state.sessions[i], end: new Date().toUTCString() })
        state.currentSession = null
        state.selectedProject = null
        saveStorage(state, 'sessions')
      }
    }
  },
  actions: {
    startNewProject({ commit }, payload) {
      const id = ObjectID().toString()
      const project = { id, name: payload }
      commit('newProject', project)
      commit('startSession', id)
      commit('selectProject', id)
    }
  },
  modules: {
  }
})
