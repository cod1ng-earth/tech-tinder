import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import axios from 'axios'
import './assets/scss/app.scss'

Vue.use(Buefy)

Vue.config.productionTip = false

export const axiosInstance = axios.create({
  baseURL: 'https://tech-tinder.now.sh',
  timeout: 10000
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')