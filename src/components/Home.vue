<template>
  <div class="container">
    <a href="https://github.com/snirp/pomoclock" class="github-corner" aria-label="View source on GitHub">
      <svg viewBox="0 0 250 250" aria-hidden="true">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
        <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
      </svg>
    </a>
    <div class="face">
      <progress-bar type="circle" ref="circle" :options="{color: 'dodgerblue', strokeWidth: 0.7}"></progress-bar>
      <div class="face-center">
        <div class="item-name">{{timers[activeTimer].display}}</div>
        <div class="item-digital"  v-html="formatMinutesAndSeconds(secondsLeft)"></div>
          <div class="item-toggle">
          <button @click="pauze" v-if="interval">
            <icon-base name="Pauze"><icon-pauze/></icon-base>
          </button>
          <button @click="start" v-else>
            <icon-base name="Play"><icon-play/></icon-base>
          </button>
        </div>
        <div class="item-settings flex-center">
          <router-link to="/settings" class="settings-link icon-link">
            <icon-base name="Settings"><icon-settings/></icon-base>
          </router-link>
          <polar 
            :angle="-90" 
            v-bind="polarPropsObj" 
            :customstyles="Object.assign({border: '0.2vmin solid green', borderRadius: '50%'},polarPropsObj.customstyles)"
          >
            {{getWork()}}
          </polar>
          <polar 
            :angle="1/5*360-90"
            v-bind="polarPropsObj" 
            :customstyles="Object.assign({border: '0.2vmin solid orange', borderRadius: '50%'},polarPropsObj.customstyles)"
          >
            {{getShort()}}
          </polar>
          <polar 
            :angle="4/5*360-90" 
            v-bind="polarPropsObj" 
            :customstyles="Object.assign({border: '0.2vmin solid red', borderRadius: '50%'},polarPropsObj.customstyles)"
          >
            {{getLong()}}
          </polar>
          <polar :angle="2/5*360-90" v-bind="polarPropsObj">
            <div class="abs-back"><icon-base name="Sessions" fill="'#333'"><icon-pomodoro-line/></icon-base></div>
            {{sessionCount}}
          </polar>
          <polar :angle="3/5*360-90" v-bind="polarPropsObj">
            <div class="abs-back"><icon-base name="Batch size" fill="'#333'"><icon-pomodoro-line/></icon-base></div>
            [{{batchSize}}]
          </polar>
        </div>
      </div>
      <div class="small-dial notify-dial">
        <div class="rel flex-center">
          <progress-bar class="abs-cover" type="circle" ref="notifydial" :options="{color: 'dodgerblue', strokeWidth: 3}" />
          <button @click="toggleSound" class="icon-link">
            <icon-base v-if="playSound" name="Turn off"><icon-volume/></icon-base>
            <icon-base v-else name="Turn on"><icon-mute/></icon-base>
          </button>
        </div>
      </div>
      <div class="small-dial reset-dial">
        <div class="rel flex-center">
          <counter class="abs-cover" :dashCount="sessionCount" :activeCount="sessionsCompleted+1"/>
          <button @click="reset" class="icon-link">
            <icon-base name="Reset"><icon-reset/></icon-base>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import timerMixin from '../mixins/timerMixin'
import {WORK, LONG, SHORT} from '../constants'
import Counter from '@/components/Counter.vue'
import Polar from 'vue-polar'
import IconBase from './IconBase.vue'
import IconMute from './icons/IconMute.vue'
import IconReset from './icons/IconReset.vue'
import IconSettings from './icons/IconSettings.vue'
import IconVolume from './icons/IconVolume.vue'
import IconPlay from './icons/IconPlay.vue'
import IconPauze from './icons/IconPauze.vue'
import IconPomodoroLine from './icons/IconPomodoroLine.vue'

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.state.autoRun){
        vm.start();
      }
    })
  },
  created() {
    this.audio = new Audio(require('../assets/beep.mp3'));
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
    this.polarPropsObj = {
      width: '30%',
      height: '30%',
      offset: '100%',
      customstyles: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    };
  },
  mounted() {
    this.$refs.circle.set(this.elapsedSeconds/this.totalSeconds);
    this.$refs.notifydial.set(this.volume/100);
  },
  mixins: [timerMixin],
  components: {
    Counter, 
    Polar,
    IconBase, 
    IconMute, 
    IconReset, 
    IconSettings, 
    IconVolume, 
    IconPlay, 
    IconPauze,
    IconPomodoroLine,
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
  watch: {
    elapsedSeconds(elapsed){
      this.$refs.circle.set(elapsed/this.totalSeconds);
    }
  },
  methods: {
    formatMinutesAndSeconds(seconds){
      const time = Math.floor(seconds/60)+':'+('0'+seconds % 60).slice(-2)
      if (seconds < 600){
        return '&nbsp;'+time
      } else {
        return time
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
    // Minute values for template
    getWork(){ return this[WORK];},
    getLong(){ return this[LONG];},
    getShort(){ return this[SHORT];},
    toggleSound(){
      this.playSound = !this.playSound;
    },
    pauze(){
      this.$store.commit('stopTimer');
    },
    reset(){
      this.resetTimer();
    },
    start(){
      this.$store.dispatch('intervalAsync', this.countDown)
    },
    notify(timer){
      this.notifyBrowser(this.timers[timer].message);
      if (this.playSound) {
        this.audio.volume = this.volume/100;
        this.audio.play();
      }
    },
    countDown(){
      this.$store.commit('decrement');
      if (this.secondsLeft <= 0){
        this.notify(this.activeTimer);
        this.switchTimer();
      }
    }
  },
}
</script>

<style scoped>
button {
  border: none;
  background-color: transparent;
  outline: none;
  padding: 0;
  margin: 0;
  color: inherit;
  z-index: 99;
}
button:hover{
  cursor:pointer;
}
button, a {
  transition: color 0.3s ease-in-out;
}
button:hover, a:hover{
  color: #222;
}
a {
  color: inherit;
}
.container{
  height: 100vh;
  width: 100%;
  display: flex;
}
.face {
  width: 90vmin;
  margin: auto;
  position: relative;
  background-color: #fbfbfb;
  border-radius: 50%;
  padding: 1.5vmin;
  box-shadow: 0 5px 40px rgba(0,0,0,0.20), 0 7px 24px rgba(0,0,0,0.15);
}
.face-center{
  position: absolute;
  top: 0;
  width: 40%;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.small-dial {
  width: 20%;
  height: 20%;
  position: absolute;
  bottom: 25%;
}
.notify-dial {
  left: 10%;
}
.reset-dial {
  right: 10%;
}
.round {
  border-radius: 50%; 
}
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.work-dial{
  border: 0.2vmin solid green;
}
.short-dial{
  border: 0.2vmin solid orange;
}
.long-dial{
    border: 0.2vmin solid red;
}
.pomo-dial{
  color: white;
}
.rel{
  position: relative;
  width: 100%;
  height: 100%;
}
.abs-cover{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.abs-back{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.item-name {
  margin-top: 20%;
  font-size: 4vmin;
}
.item-digital {
  font-size: 8vmin;
  font-weight: 300;
}
.item-toggle svg {
  height: 12vmin;
  width: 12vmin;
}
.item-settings:before{
	content: "";
	display: block;
	padding-top: 100%; 	/* initial ratio of 1:1*/
}
.item-settings {
  position: relative;
  width: 100%;
  border-radius: 50%;
  font-size: 4vmin;
  margin-bottom: 3%;
}
svg {
  vertical-align: middle;
}
.icon-link {
  display: inline-block;
  width: 7vmin;
  height: 7vmin;
}
.github-corner svg {
  fill:#555;
  color:#fff;
  position: absolute;
  top: 0;
  border: 0;
  right: 0;
  width: 10vmin;
  height: 10vmin;
}
.github-corner:hover .octo-arm{
  animation: octocat-wave 560ms ease-in-out
  }
@keyframes octocat-wave{
  0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}
@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}

</style>