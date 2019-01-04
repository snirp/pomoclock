<template>
  <div class="about">
    <button @click="toggleSound">
      <icon-base v-if="playSound"><icon-volume/></icon-base>
      <icon-base v-else><icon-mute/></icon-base>
    </button>
    <button @click="reset">
      <icon-base><icon-reset/></icon-base>
    </button>
    <span>
      <button @click="pauze" v-if="interval">
        <icon-base><icon-pauze/></icon-base>
      </button>
      <button @click="start" v-else>
        <icon-base><icon-play/></icon-base>
      </button>
    </span>
    <router-link to="/settings"><icon-base><icon-settings/></icon-base></router-link>
    
    <icon-base><icon-pomodoro/></icon-base>
    <p>{{formatMinutesAndSeconds(secondsLeft)}}</p>
    <p>{{timers[activeTimer].display}}</p>
    <counter :dashCount="sessionCount" :activeCount="sessionsCompleted+1"/>

    
    <!-- <button @click="pauze" v-if="interval">Pauze timer</button>
    <button @click="start" v-else>Start</button> -->
    
    <div class="face">
      <progress-bar type="circle" ref="circle" :options="{color: '#007AFF', strokeWidth: 0.5}"></progress-bar>
    </div>
    <div class="notify-dial">
      <progress-bar type="circle" ref="notifydial" :options="{color: 'orange', strokeWidth: 5}"></progress-bar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import timerMixin from '../mixins/timerMixin'
import {WORK, LONG, SHORT} from '../constants'
import Counter from '@/components/Counter.vue'
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
    this.audio = new Audio(require('../assets/beep.mp3'));
    this.timers = {
      [WORK]: {display: 'work', message: "Time for a break"},
      [SHORT]: {display: 'short break', message: "Let's get to work!"},
      [LONG]: {display: 'long break', message: "Let's get to work!"},
    }
  },
  mounted() {
    this.$refs.circle.set(this.elapsedSeconds/this.totalSeconds);
    this.$refs.notifydial.set(this.volume/10);
  },
  mixins: [timerMixin],
  components: {Counter, IconBase, IconMute, IconReset, IconSettings, IconVolume, IconPlay, IconPauze, IconPomodoro},
  computed: {
    totalSeconds(){
      return this.$store.state[this.$store.state.activeTimer] * 60;
    },
    elapsedSeconds(){
      return this.totalSeconds - this.$store.state.secondsLeft;
    },
    ...mapState(['secondsLeft', 'activeTimer', 'sessionsCompleted', 'volume', 'interval', 'sessionCount'])
  },
  watch: {
    elapsedSeconds(elapsed){
      this.$refs.circle.set(elapsed/this.totalSeconds);
    }
  },
  methods: {
    formatMinutesAndSeconds(seconds){
      return Math.floor(seconds/60)+':'+('0'+seconds % 60).slice(-2);
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
      if (this.secondsLeft == 0){
        this.notify(this.activeTimer);
        this.switchTimer();
      }
    }
  },
}
</script>

<style scoped>
.face {
  max-width: 400px;
  margin: 0 auto;
}
.notify-dial {
  max-width: 100px;
  margin: 0 auto;
}
button {
    border: none;
    background-color: transparent;
    outline: none;
    padding: 0;
    margin: 0;
}
button:hover{ cursor:pointer;}
button:focus{ color:red;}
</style>