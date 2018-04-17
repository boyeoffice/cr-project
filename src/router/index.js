import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Crypto from '@/views/Comparison'

Vue.use(Router)

export default new Router({
	mode: 'history',
	linkActive: 'active',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
    	path: '/currency',
    	name: 'Crypto',
    	component: Crypto
    }
  ]
})
