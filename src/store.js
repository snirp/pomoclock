import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    version: '',
    sessionCount: 2,
    batchSize: 4,
    work: 3,
    pauze: 1,
    break: 2,
    secondsLeft: 3*60,
    activeTimer: 'work',
    sessionsCompleted: 0,
    interval: null,
  },
  actions: {
    intervalAsync ({ commit }, func ) {
      commit('initInterval', setInterval(() => {
        func();
      }, 1000))
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
    resetTimer(state){
      state.activeTimer = 'work';
      state.sessionsCompleted = 0;
    },
    resetSeconds(state){
      state.secondsLeft = state[state.activeTimer]*60;
    },
  }
})

store.subscribe((mutation, state) => {
  // State to save to localStorage
	const store = {
		version: state.version,
    sessionCount: state.sessionCount,
    work: state.work,
    pauze: state.pauze,
    break: state.break,
    batchSize: state.batchSize,
	};

	localStorage.setItem('store', JSON.stringify(store));
});


export default store;