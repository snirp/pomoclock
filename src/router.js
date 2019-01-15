import Vue from 'vue'
import Router from 'vue-router'
import Face from '@/Face.vue'
import Settings from '@/Settings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'face',
      component: Face,
    },
    {
      path: '/settings/:name',
      name: 'settings',
      component: Settings
    },
  ]
})
