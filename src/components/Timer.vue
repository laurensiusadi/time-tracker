<template>
  <div class="flex items-center h-16 border-b border-gray-300">
    <div class="flex-1 ml-4">
      <input
        v-model="description"
        placeholder="What are you working on?"
        class="w-full h-16 text-lg bg-transparent border-none outline-none"
        :class="[ running ? 'font-semibold' : 'font-normal' ]"
        :disabled="inputDisabled"
      />
    </div>
    <div v-show="running" class="mr-2 text-lg font-semibold tabular-nums leading-none text-right text-black select-none">
      {{ currentTimer }}
    </div>
    <button class="flex justify-center items-center w-16 h-full hover:bg-gray-50 focus:outline-none" @click="toggleTimer">
      <svg v-if="running" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="text-red-600 fill-current" d="M15 9H9V15H15V9Z"/>
        <path class="text-red-300 fill-current" fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12ZM21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"/>
      </svg>
      <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="text-green-600 fill-current" d="M16 11.9999L10 16.3299V7.66992L16 11.9999Z"/>
        <path class="text-green-200 fill-current" fill-rule="evenodd" clip-rule="evenodd" d="M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21V21ZM12 23C18.075 23 23 18.075 23 12C23 5.925 18.075 1 12 1C5.925 1 1 5.925 1 12C1 18.075 5.925 23 12 23Z"/>
      </svg>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dateDiffToString } from '../utils'

export default {
  data() {
    return {
      ticker: null,
      currentTimer: '00:00:00',
      running: false,
      description: null
    }
  },
  computed: {
    ...mapState(['currentSession', 'selectedProject']),
    inputDisabled() {
      return this.currentSession && this.currentSession.id
    }
  },
  watch: {
    'selectedProject.name'(val) {
      if (val) {
        this.description = val
      }
    },
    'currentSession.start'(val) {
      if (val) {
        this.running = true
        this.ticker = setInterval(() => {
          this.currentTimer = dateDiffToString(new Date(), new Date(this.currentSession.start))
        }, 1000)
      }
    }
  },
  methods: {
    async toggleTimer() {
      if (!this.description) return
      this.running = !this.running
      if (this.running) {
        let valid = false
        if (this.selectedProject?.id) {
          this.$store.commit('startSession', this.selectedProject.id)
          valid = true
        } else if (this.description) {
          await this.$store.dispatch('startNewProject', this.description)
          valid = true
        }
        if (valid && this.currentSession?.start) {
          this.ticker = setInterval(() => {
            this.currentTimer = dateDiffToString(new Date(), new Date(this.currentSession.start))
          }, 1000)
        }
      } else {
        if (this.currentSession) {
          this.$store.commit('endSession')
          this.description = null
        }
        this.currentTimer = '00:00:00'
        clearInterval(this.ticker)
      }
    }
  }
}
</script>
