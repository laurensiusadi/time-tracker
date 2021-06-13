<template>
  <div class="flex flex-col flex-1">
    <timer/>
    <div class="overflow-y-auto flex-1 no-scrollbar">
      <project v-for="n in 8" :key="n" :project="projects[0]"></project>
    </div>
  </div>
</template>

<script>
import Project from '../components/Project.vue'
import Timer from '../components/Timer.vue'

export default {
  name: 'Home',
  components: { Timer, Project },
  data() {
    return {
      projects: [
        {
          name: 'Project Name'
        }
      ]
    }
  }
}
</script>
