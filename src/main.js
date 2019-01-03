import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'
import VueProgress from 'vue-progress'
import ToggleButton from 'vue-js-toggle-button'

Vue.use(VueProgress);
Vue.use(ToggleButton);
Vue.prototype.WORK = 'work';
Vue.prototype.SHORT = 'short break';
Vue.prototype.LONG = 'long break'

Vue.config.productionTip = false

new Vue({
  router,
  store,
	beforeCreate() {
		this.$store.commit('initializeStore');
	},
  render: h => h(App)
}).$mount('#app')
