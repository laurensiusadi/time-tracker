<template>
  <div class="flex-1">
    <timer/>
    <session v-for="n in 8" :key="n"></session>
  </div>
</template>

<script>
import Session from '../components/Session.vue'
import Timer from '../components/Timer.vue'

export default {
  name: 'Home',
  components: { Timer, Session }
}
</script>
