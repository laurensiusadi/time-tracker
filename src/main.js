import Vue from 'vue'
import Store from 'electron-store'

import router from './router'
import store from './store'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$storage = new Store()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
