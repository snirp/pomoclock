import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Notifications from './components/Notifications.vue'
import Minutes from './components/Minutes.vue'
import Sessions from './components/Sessions.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: Notifications
    },
    {
      path: '/minutes',
      name: 'minutes',
      component: Minutes
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: Sessions
    }
  ]
})
