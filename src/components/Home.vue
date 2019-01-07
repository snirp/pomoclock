<template>
  <div>
    <div class="face">
      <progress-bar type="circle" ref="circle" :options="{color: 'dodgerblue', strokeWidth: 0.7}"></progress-bar>
      <div class="face-center">
        <div class="item-name">{{timers[activeTimer].display}}</div>
        <div class="item-digital"  v-html="formatMinutesAndSeconds(secondsLeft)"></div>
         <div class="item-toggle">
          <button @click="pauze" v-if="interval">
            <icon-base><icon-pauze/></icon-base>
          </button>
          <button @click="start" v-else>
            <icon-base name="Play"><icon-play/></icon-base>
          </button>
        </div>
        <div class="item-settings flex-center">
          <router-link to="/settings"><icon-base width="7vmin" height="7vmin"><icon-settings/></icon-base></router-link>
          <div class="round polar deg0  flex-center work-dial">{{getWork()}}</div>
          <div class="round polar deg1-5 flex-center short-dial">{{getShort()}}</div>
          <div class="round polar deg2-5 flex-center long-dial">{{getLong()}}</div>
          <div class="polar deg3-5 flex-center pomo-dial">
            <div class="rel flex-center">
              {{sessionCount}}
              <div class="abs-cover">
                <icon-base fill="darkgray"><icon-pomodoro/></icon-base>
              </div>
            </div>
          </div>
          <div class="polar deg4-5 flex-center pomo-dial">
            <div class="rel flex-center">
              *{{batchSize}}
              <div class="abs-cover">
                <icon-base fill="darkgray"><icon-pomodoro/></icon-base>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="small-dial notify-dial">
        <div class="rel flex-center">
          <progress-bar class="abs-cover" type="circle" ref="notifydial" :options="{color: 'dodgerblue', strokeWidth: 3}" />
          <button @click="toggleSound">
            <icon-base v-if="playSound" width="7vmin" height="7vmin"><icon-volume/></icon-base>
            <icon-base v-else width="7vmin" height="7vmin"><icon-mute/></icon-base>
          </button>
        </div>
      </div>
      <div class="small-dial reset-dial">
        <div class="rel flex-center">
          <counter class="abs-cover" :dashCount="sessionCount" :activeCount="sessionsCompleted+1"/>
          <button @click="reset">
            <icon-base width="7vmin" height="7vmin"><icon-reset/></icon-base>
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
    IconPomodoro
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
button {
  border: none;
  background-color: transparent;
  outline: none;
  padding: 0;
  margin: 0;
  color: inherit;
}
button:hover{
  cursor:pointer;
}
a {
  color: inherit;
}
.face {
  max-width: 90vmin;
  margin: 5vmin auto 0;
  position: relative;
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
.polar {
  position: absolute;
  top: 50%; 
  left: 50%;
  width: 30%; 
  height: 30%;
  margin: -15%;
}
.round {
  border-radius: 50%; 
}
.deg0 { transform: translate(100%); }
.deg1-5 { transform: rotate(72deg) translate(100%) rotate(-72deg); }
.deg2-5 { transform: rotate(144deg) translate(100%) rotate(-144deg); }
.deg3-5 { transform: rotate(216deg) translate(100%) rotate(-216deg); }
.deg4-5 { transform: rotate(288deg) translate(100%) rotate(-288deg); }

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
  z-index: -1;
}
.item-name {
  margin-top: 20%;
  font-size: 4vmin;
}
.item-digital {
  font-size: 8vmin;
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
</style>