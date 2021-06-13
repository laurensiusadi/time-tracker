<template>
  <div class="flex items-center px-2 w-full h-12 border-b border-gray-200 hover:bg-gray-50">
    <input :value="project.name" @change="onProjectNameChange" @click.stop class="flex-1 pl-2 mr-4 w-full leading-10 text-gray-900 bg-transparent outline-none" placeholder="Session Name">
    <p class="mx-2 tabular-nums leading-10 text-gray-500 select-none" title="Total Time">{{ totalSessions }}</p>
    <button class="flex justify-center items-center w-8 h-8 text-gray-300 rounded-3xl hover:text-green-600 hover:bg-gray-100 focus:outline-none" title="Start Tracking" @click="start" :disabled="buttonDisabled">
      <svg class="ml-px" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.0069 11.5L8 18V5L17.0069 11.5Z" class="fill-current"/>
      </svg>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Project',
  props: ['project'],
  computed: {
    ...mapState(['selectedProject', 'currentSession']),
    ...mapGetters(['projectsWithSessions']),
    totalSessions() {
      return this.projectsWithSessions(this.project.id)
    },
    buttonDisabled() {
      return this.selectedProject && this.currentSession
    }
  },
  methods: {
    start() {
      console.log('start')
      if (!this.selectedProject && !this.currentSession) {
        this.$store.commit('selectProject', this.project.id)
        this.$store.commit('startSession', this.project.id)
      }
    },
    onProjectNameChange(e) {
      if (e.target.value) {
        this.$store.commit('setProjectName', this.project.id, e.target.value)
      }
      console.log(e.target.value)
    }
  }
}
</script>
