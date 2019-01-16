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
    [WORK]: 2,
    [SHORT]: 1,
    [LONG]: 2,
    // Initial value of seconds left (set on initializeStore)
    secondsLeft: undefined,
    // Incremented when worktimer is finished
    sessionsCompleted: 0,
    // Interval ID of current timer (allowing it to be cleared)
    interval: null,
    playSound: true,
    // Between 0 and 10
    volume: 8,
    autoRun: false,
  },
  actions: {
    intervalAsync ({ commit }, func ) {
      commit('autoRun');
      commit('initInterval', setInterval(() => {
        func();
      }, 1000))
    }
  },
  mutations: {
		initializeStore(state) {
      state.secondsLeft = state.work*60;
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
    pauzeTimer(state){
      clearInterval(state.interval);
      state.interval = null;
    },
    stopTimer(state){
      clearInterval(state.interval);
      state.interval = null;
      state.autoRun = false;
    },
    autoRun(state){
      state.autoRun = true;
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