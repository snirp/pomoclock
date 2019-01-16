<template>
  <div id="app">
    <div class="version-info">v{{version}}</div>
    <git-corner href="https://github.com/snirp/pomoclock" size="10vmin"/>
    <div class="face">
      <circle-counter 
        :stroke-width="1.5" 
        :active-width="1.5" 
        :dash-spacing="0"
        :dash-count="totalSeconds"
        :active-count="elapsedSeconds"
        :active-stroke="TIMERS[activeTimer].color"
      />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {version} from '../package.json';
import {WORK, LONG, SHORT, TIMERS} from './constants'
import GitCorner from '@/GitCorner.vue'
import CircleCounter from 'vue-circle-counter'
import { mapState } from 'vuex'
import Favico from 'favico.js'

export default {
  created(){
    this.TIMERS = TIMERS
    this.audio = new Audio(require('@/assets/beep.mp3'));
    // Keep running between refreshes: only reset should kill the counter
    if (this.$store.state.autoRun) this.start();
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
      if (this.secondsLeft % 60 == 0) this.favicon.badge(this.secondsLeft/60);
      this.$store.commit('decrement');
      if (this.secondsLeft <= 0){
        this.notify(this.activeTimer);
        this.switchTimer();
      }
    },
    notify(timer){
      let message;
      if (timer == WORK) {
        if (this.sessionsCompleted + 1 == this.sessionCount){
          message = `Well done! You finished your schedule.`
        } else if ((this.sessionsCompleted + 1) % this.batchSize == 0){
          message = `Time for a long break: ${this[LONG]} minutes`
        } else {
          message = `Take a short break: ${this[SHORT]} minutes`
        }
      } else {
        message = `Time for a ${this[WORK]} minute work session!`
      };
      this.notifyBrowser(message);

      if (this.playSound) {
        this.audio.volume = this.volume/10;
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
          this.reset();
          return null;
        }
        if (this.sessionsCompleted % this.batchSize == 0) {
          this.$store.commit('setActive', LONG);
        } else {
          this.$store.commit('setActive', SHORT);
        }
      }
      this.$store.commit('resetSeconds');
      this.favicon.reset();
      this.favicon = new Favico({
        type : 'rectangle',
        animation:'slide',
        bgColor : this.TIMERS[this.activeTimer].color,
      });
    },
    start(){
      this.$store.dispatch('intervalAsync', this.countDown);
      this.favicon = new Favico({
        type : 'rectangle',
        animation:'slide',
        bgColor: this.TIMERS[this.activeTimer].color,
      });
    },
    pauze(){
      this.$store.commit('stopTimer');
    },
    reset(){ 
      this.$store.commit('stopTimer');
      this.$store.commit('initiateTimer');
      this.$store.commit('resetSeconds');
      this.favicon.reset();    
    },
    toggleSound(){
      this.playSound = !this.playSound;
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

</style>