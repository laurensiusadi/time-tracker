import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import Store from 'electron-store'

import router from './router'
import store from './store'
import db from './db'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(firestorePlugin)
Vue.prototype.$db = db
window.db = db
Vue.prototype.$storage = new Store()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
