<template>
  <div id="app">
    <div class="version-info">v{{version}}</div>
    <git-corner href="https://github.com/snirp/pomoclock" size="10vmin"/>
    <div class="face">
      <circle-counter 
        :stroke-width="1" 
        :active-width="1" 
        :dash-spacing="0"
        :dash-count="totalSeconds"
        :active-count="elapsedSeconds"
        :active-stroke="TIMERS[activeTimer].color"
      />
      <div class="center-column">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {version} from '../package.json';
import {WORK, LONG, SHORT, TIMERS} from './constants'
import GitCorner from '@/GitCorner.vue'
import CircleCounter from 'vue-circle-counter'
import { mapState } from 'vuex'

export default {
  created(){
    this.TIMERS = TIMERS
    this.audio = new Audio(require('@/assets/beep.mp3'));
  },
  data(){
    return {
      version
    }
  },
  computed: {
    playSound: {
      get(){ 
        return this.$store.state.playSound;
      },
      set(value){
        this.$store.commit('updateValue', {name: 'playSound', value})
      }
    },
    totalSeconds(){
      return this[this.activeTimer] * 60;
    },
    elapsedSeconds(){
      return this.totalSeconds - this.secondsLeft;
    },
    ...mapState([
      'secondsLeft',
      'activeTimer',
      'sessionsCompleted', 
      'volume',
      'sessionCount', 
      'batchSize',
      SHORT,
      LONG,
      WORK,
    ])
  },
  methods: {
    countDown(){
      this.$store.commit('decrement');
      if (this.secondsLeft <= 0){
        this.notify(this.activeTimer);
        this.switchTimer();
      }
    },
    notify(timer){
      this.notifyBrowser(this.TIMERS[timer].message);
      if (this.playSound) {
        this.audio.volume = this.volume/100;
        this.audio.play();
      }
    },
    notifyBrowser(message) {
      if (Notification.permission === "granted") {
        new Notification(message);
      } else if (Notification.permission !== "denied") {
        this.pauze();
        Notification.requestPermission().then((permission) => {
          this.start();
          if (permission === "granted") {
            new Notification(message);
          }
        });
      }
    },
    switchTimer(){
      if (this.activeTimer !== WORK) {
        this.$store.commit('setActive', WORK);
      } else {
        this.$store.commit('incrementSessions');
        if (this.sessionsCompleted == this.sessionCount){
          this.resetTimer();
          return null;
        }
        if (this.sessionsCompleted % this.batchSize == 0) {
          this.$store.commit('setActive', LONG);
        } else {
          this.$store.commit('setActive', SHORT);
        }
      }
      this.$store.commit('resetSeconds');
    },
    start(){
      console.log('clicked start')
      this.$store.dispatch('intervalAsync', this.countDown)
    },
    pauze(){
      this.$store.commit('stopTimer');
    },
    reset(){ 
      this.$store.commit('stopTimer');
      this.$store.commit('initiateTimer');
      this.$store.commit('resetSeconds');      
    },
  },
  components: {
    GitCorner,
    CircleCounter,
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
  color: #555;
  font-family: 'Source Code Pro', monospace;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.version-info{
  position: absolute;
  top: 1%;
  left: 1%;
  font-size: 2vmin;
}
#app{
  height: 100vh;
  width: 100%;
  display: flex;
}
.face {
  width: 90vmin;
  height: 90vmin;
  margin: auto;
  position: relative;
  border-radius: 50%;
}
.center-column{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>