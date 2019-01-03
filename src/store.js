import Vue from 'vue'
import Vuex from 'vuex'

import {WORK, LONG, SHORT} from './constants'
import {version} from '../package.json';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    version,
    sessionCount: 7,
    batchSize: 4,
    [WORK]: 3,
    [SHORT]: 1,
    [LONG]: 2,
    secondsLeft: 3*60,
    activeTimer: WORK,
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