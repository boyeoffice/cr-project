/* eslint-disable no-new */
import './assets/main.css'
import Vue from 'vue'
import App from './App.vue'
window.axios = require('axios')
import { store } from './vuex'
import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)
window.moment = require('moment')
window.currencyFormatter = require('currency-formatter')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store
})
