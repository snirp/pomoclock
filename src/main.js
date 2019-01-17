import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import store from './store'
import (/* webpackPreload: true */ 'typeface-source-code-pro/index.css')
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-132656471-1',
  router
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
	beforeCreate() {
		this.$store.commit('initializeStore');
	},
  render: h => h(App)
}).$mount('#app')
