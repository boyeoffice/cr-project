
import Vue from 'vue'
import App from './App.vue'
window.axios = require('axios')
//import router from './router'
import './lib/css.js'
import { store } from './vuex';
//import VueLocalStorage from 'vue-ls'
//Vue.use(VueLocalStorage)
import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)
// import VueCurrencyFilter from 'vue-currency-filter'
//Vue.use(VueCurrencyFilter,
//{
//  symbol : '$',
  //thousandsSeparator: ',',
  //fractionCount: 2,
  //fractionSeparator: '.',
  //symbolPosition: 'front',
  //symbolSpacing: false
//})

window.moment = require('moment')
window.currencyFormatter = require('currency-formatter')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store
})
