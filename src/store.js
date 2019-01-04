import Vue from 'vue'
import Vuex from 'vuex'

import {WORK, LONG, SHORT} from './constants'
import {version} from '../package.json';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // Semver string from package to invalidate local cache
    version,
    // Total number of pomodoro sessions
    sessionCount: 8,
    // Number of sessions between long breaks
    batchSize: 4,
    // Active timer: WORK / SHORT / LONG
    activeTimer: WORK,
    // Default timer settings in minutes
    [WORK]: 25,
    [SHORT]: 5,
    [LONG]: 15,
    // Initial value of seconds left (derived from WORK)
    // TODO: set to null initially and initialize with proper value if unset
    secondsLeft: 25*60,
    // Incremented when worktimer is finished
    sessionsCompleted: 0,
    // Interval ID of current timer (allowing it to be cleared)
    interval: null,
    playSound: true,
    // Between 0 and 10
    volume: 2,
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
        const store = JSON.parse(localStorage.getItem('store'));
        if(store.version == state.version) this.replaceState(Object.assign(state, store));
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
      state.activeTimer = WORK;
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