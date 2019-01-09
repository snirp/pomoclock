<template>
  <div>
    <div class="face">
      <progress-bar type="circle" ref="circle" :options="{color: 'dodgerblue', strokeWidth: 0.7}"></progress-bar>
      <div class="face-center">
        <div class="item-name">{{timers[activeTimer].display}}</div>
        <div class="item-digital"  v-html="formatMinutesAndSeconds(secondsLeft)"></div>
         <div class="item-toggle">
          <button @click="pauze" v-if="interval">
            <icon-base><icon-pauze name="Pauze"/></icon-base>
          </button>
          <button @click="start" v-else>
            <icon-base name="Play"><icon-play/></icon-base>
          </button>
        </div>
        <div class="item-settings flex-center">
          <router-link to="/settings" class="settings-link">
            <icon-base name="Settings" width="7vmin" height="7vmin"><icon-settings/></icon-base>
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
            <div class="abs-cover"><icon-base name="Sessions" fill="'#333'"><icon-pomodoro-line/></icon-base></div>
            {{sessionCount}}
          </polar>
          <polar :angle="3/5*360-90" v-bind="polarPropsObj">
            <div class="abs-cover"><icon-base name="Batch size" fill="'#333'"><icon-pomodoro-line/></icon-base></div>
            [{{batchSize}}]
          </polar>
        </div>
      </div>
      <div class="small-dial notify-dial">
        <div class="rel flex-center">
          <progress-bar class="abs-cover" type="circle" ref="notifydial" :options="{color: 'dodgerblue', strokeWidth: 3}" />
          <button @click="toggleSound">
            <icon-base v-if="playSound" name="Turn off" width="7vmin" height="7vmin"><icon-volume/></icon-base>
            <icon-base v-else name="Turn on" width="7vmin" height="7vmin"><icon-mute/></icon-base>
          </button>
        </div>
      </div>
      <div class="small-dial reset-dial">
        <div class="rel flex-center">
          <counter class="abs-cover" :dashCount="sessionCount" :activeCount="sessionsCompleted+1"/>
          <button @click="reset">
            <icon-base name="Reset" width="7vmin" height="7vmin"><icon-reset/></icon-base>
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
import IconPomodoro from './icons/IconPomodoro.vue'
import IconPomodoroLine from './icons/IconPomodoroLine.vue'

export default {
  created() {
    let setDial = this.settingDialProps;
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
    this.$refs.notifydial.set(this.volume/10);
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
    IconPomodoro,
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
      };
    },
    notifyBrowser(message) {
      if (Notification.permission === "granted") {
        new Notification(message);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
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
    toggleSound(e){
      this.playSound = !this.playSound;
    },
    pauze(e){
      this.$store.commit('stopTimer');
    },
    reset(e){
      this.resetTimer();
    },
    start(e){
      this.$store.dispatch('intervalAsync', this.countDown)
    },
    notify(timer){
      this.notifyBrowser(this.timers[this.activeTimer].message);
      if (this.playSound) {
        this.audio.volume = this.volume/10;
        this.audio.play();
      };
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
* {
  box-sizing: border-box;
}

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
.face {
  max-width: 90vmin;
  margin: 5vmin auto 0;
  position: relative;
  background-color: #fdfdfd;
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
.settings-link {
  transition: transform .5s ease-in-out;
}
svg {
  vertical-align: middle;
}
.settings-link:hover {
  transform: rotate(270deg)
}
</style>