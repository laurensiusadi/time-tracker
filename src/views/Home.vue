<template>
  <div class="flex flex-col flex-1">
    <timer/>
    <div class="overflow-y-auto flex-1 no-scrollbar">
      <project v-for="p in projects" :key="p.id" :project="p"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Project from '../components/Project.vue'
import Timer from '../components/Timer.vue'

export default {
  name: 'Home',
  components: { Timer, Project },
  computed: {
    ...mapState(['projects'])
  }
}
</script>
