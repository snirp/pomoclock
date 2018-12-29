import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
	beforeCreate() {
		this.$store.commit('initializeStore');
	},
  render: h => h(App)
}).$mount('#app')
