<template>
  <div class="about">
    <p>seconds left: {{secondsLeft}}</p>
    <p>active timer: {{activeTimer}}</p>
    <hr>
    <button @click="resetMe">Reset timer</button>
    <button @click="pauzeMe" v-if="interval">Pauze timer</button>
    <button @click="startMe" v-else>Start</button>
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

export default {
  created() {
    this.audio = new Audio(require('../assets/beep.mp3'));
  },
  mounted() {
    this.$refs.circle.set(this.elapsedSeconds/this.totalSeconds);
    this.$refs.notifydial.set(this.volume);
  },
  mixins: [timerMixin],
  computed: {
    totalSeconds(){
      return this.$store.state[this.$store.state.activeTimer] * 60;
    },
    elapsedSeconds(){
      return this.totalSeconds - this.$store.state.secondsLeft;
    },
    ...mapState([
      'sessionCount', 'work', 'shortBreak', 'secondsLeft', 'activeTimer', 
      'sessionsCompleted', 'batchSize', 'interval', 'longBreak', 'playSound',
      'volume'
    ])
  },
  watch: {
    elapsedSeconds(elapsed){
      this.$refs.circle.set(elapsed/this.totalSeconds);
    }
  },
  methods: {
    notifyBrowser(message) {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        var notification = new Notification(message);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            var notification = new Notification(message);
          }
        });
      }
    },
    pauzeMe(e){ 
      this.$store.commit('stopTimer');
    },
    resetMe(e){
      this.resetTimer(); 
    },
    startMe(e){
      this.$store.dispatch('intervalAsync', this.countDown)
    },
    notify(timer){
      this.notifyBrowser(`You finished a ${this.activeTimer} session!`);
      if (this.playSound) {
        this.audio.volume = this.volume;
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
</style>