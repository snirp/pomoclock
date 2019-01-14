import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import store from './store'
import VueProgress from 'vue-progress'
import ToggleButton from 'vue-js-toggle-button'
import Polar from 'vue-polar'
import (/* webpackPreload: true */ 'typeface-source-code-pro/index.css')

Vue.use(VueProgress);
Vue.use(ToggleButton);
Vue.use(Polar);

Vue.config.productionTip = false

new Vue({
  router,
  store,
	beforeCreate() {
		this.$store.commit('initializeStore');
	},
  render: h => h(App)
}).$mount('#app')
