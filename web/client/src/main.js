// Import Vue Modules
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import Packages
import { io } from 'socket.io-client'

// Init Modules
const socket = io('ws://localhost:3000', { path: '/socket' })
Object.defineProperty(Vue.prototype, '$socket', { value: socket })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
