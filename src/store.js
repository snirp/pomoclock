import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    version: '',
    sessionCount: 7,
    batchSize: 4,
    work: 3,
    shortBreak: 1,
    longBreak: 2,
    secondsLeft: 3*60,
    activeTimer: 'work',
    sessionsCompleted: 0,
    interval: null,
    playSound: true,
    volume: 0.2,
  },
  actions: {
    intervalAsync ({ commit }, func ) {
      commit('initInterval', setInterval(() => {
        func();
      }, 20))
    }
  },
  mutations: {
		initializeStore(state) {
			if(localStorage.getItem('store')) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
    },
    updateValue(state, n) {
      state[n.name] = n.value;
    },
    initInterval(state, interval){
      state.interval = interval;
    },
    decrement(state){
      --state.secondsLeft;
    },
    setActive(state, timer){
      state.activeTimer = timer;
    },
    incrementSessions(state){
      ++state.sessionsCompleted;
    },
    stopTimer(state){
      clearInterval(state.interval);
      state.interval = null;
    },
    initiateTimer(state){
      state.activeTimer = 'work';
      state.sessionsCompleted = 0;
    },
    resetSeconds(state){
      state.secondsLeft = state[state.activeTimer]*60;
    },
  }
})

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});


export default store;