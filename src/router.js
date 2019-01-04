import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Settings from './components/Settings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
  ]
})
