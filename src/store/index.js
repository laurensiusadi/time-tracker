import Vue from 'vue'
import Vuex from 'vuex'
import Store from 'electron-store'
import { diffToSecond, secondsToHhMmSs } from '../utils'

Vue.use(Vuex)

const storage = new Store()

const writeStorage = (state, key, value) => {
  state[key] = value
  storage.set(key, value)
}

export default new Vuex.Store({
  state: {
    projects: storage.get('projects') || [],
    sessions: storage.get('sessions') || []
  },
  getters: {
    projectsWithSessions: state => {
      return state.projects.map(p => {
        const totalSecond = state.sessions
          .filter(s => s.projectId === p.id)
          .reduce((sum, s) => sum + diffToSecond(s.end, s.start), 0)
        p.totalSessions = secondsToHhMmSs(totalSecond)
        return p
      })
    }
  },
  mutations: {
    newProject(state) {
      const p = {
        id: 1,
        name: 'New Project'
      }
      const ps = [...state.projects].push(p)
      writeStorage(state, 'projects', ps)
    },
    newSession(state) {
      const s = {
        projectId: 1,
        name: '',
        start: new Date(),
        end: new Date()
      }
      const ss = [...state.sessions].push(s)
      writeStorage(state, 'sessions', ss)
    }
  },
  actions: {
  },
  modules: {
  }
})
