<template>
  <div id="app">
    <div class="version-info">v{{version}}</div>
    <git-corner href="https://github.com/snirp/pomoclock" size="10vmin"/>
    <div class="face">
      <circle-counter 
        :stroke-width="2" 
        :active-width="2" 
        :dash-spacing="0"
        :dash-count="totalSeconds"
        :active-count="elapsedSeconds"
        :active-stroke="timers[$store.state.activeTimer].color"
      />
      <div class="ROUTER-CONTENT">
        <div class="center-column">
          <div>{{timers[$store.state.activeTimer].display}}</div>
          <div>{{formatMinutesAndSeconds(secondsLeft)}}</div>
          <div>next</div>
        </div>
        <router-link to="">
          <polar v-bind="this.iconPropsObj" :angle="-50">@</polar>
          <polar v-bind="this.dialPropsObj" :angle="-50">{{getLong()}}</polar>
        </router-link>
        <polar v-bind="this.iconPropsObj" :angle="-90">@</polar>
        <polar v-bind="this.dialPropsObj" :angle="-90">{{getWork()}}</polar>

        <polar v-bind="this.iconPropsObj" :angle="-130">@</polar>
        <polar v-bind="this.dialPropsObj" :angle="-130">{{getShort()}}</polar>

        <polar v-bind="this.dialPropsObj" :angle="45">{{sessionCount}}</polar>
        <polar v-bind="this.dialPropsObj" :angle="90">{{batchSize}}</polar>
        <polar v-bind="this.dialPropsObj" :angle="135">{{volume}}</polar>
        <button @click="start">start</button>
        <button @click="reset">reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import {version} from '../package.json';
import {WORK, LONG, SHORT} from './constants'
import GitCorner from '@/GitCorner.vue'
import CircleCounter from 'vue-circle-counter'
import Polar from 'vue-polar'
import { mapState } from 'vuex'

export default {
  created(){
    this.audio = new Audio(require('./assets/beep.mp3'));
    this.timers = {
      [WORK]: {
        display: 'work', 
        message: "Time for a break",
        color: 'green',
      },
      [SHORT]: {
        display: 'short break', 
        message: "Let's get to work!",
        color: 'orange',
      },
      [LONG]: {
        display: 'long break', 
        message: "Let's get to work!",
        color: 'red'
      },
    };
    this.iconPropsObj = {
      width: '10%',
      height: '20%',
      offset: '320%',
      setstraight: false,
      extrarotation: 90,
      customstyles: {
        backgroundColor: 'darkgreen',
        borderRadius: '999rem',
        paddingTop: '10%',
        textAlign: 'center',
        color: 'white',
        fontSize: '6vmin',
      }
    };
    this.dialPropsObj = {
      height: '14%',
      width: '14%',
      offset: '265%',
      customstyles: {
        backgroundColor: 'darkgreen',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '6vmin',
        fontWeight: 400,
      }
    }
  },
  data(){
    return {
      version
    }
  },
  computed: {
    totalSeconds(){
      return this.$store.state[this.$store.state.activeTimer] * 60;
    },
    elapsedSeconds(){
      return this.totalSeconds - this.$store.state.secondsLeft;
    },
    ...mapState([
      'secondsLeft', 
      'activeTimer', 
      'sessionsCompleted', 
      'volume', 
      'interval', 
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
      this.notifyBrowser(this.timers[timer].message);
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
      if (this.$store.state.activeTimer !== WORK) {
        this.$store.commit('setActive', WORK);
      } else {
        this.$store.commit('incrementSessions');
        if (this.$store.state.sessionsCompleted == this.$store.state.sessionCount){
          this.resetTimer();
          return null;
        }
        if (this.$store.state.sessionsCompleted % this.$store.state.batchSize == 0) {
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
    getWork(){ return this[WORK];},
    getLong(){ return this[LONG];},
    getShort(){ return this[SHORT];},
    formatMinutesAndSeconds(seconds){
      return Math.floor(seconds/60)+':'+('0'+seconds % 60).slice(-2)
    },
  },
  components: {
    GitCorner,
    CircleCounter,
    Polar,
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
  background-color: #f5f5f5;
  border-radius: 50%;
  padding: 1vmin;
  box-shadow: 0 5px 40px rgba(0,0,0,0.20), 0 7px 24px rgba(0,0,0,0.15);
}
.center-column{
  position: absolute;
  top: 0;
  width: 60%;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>