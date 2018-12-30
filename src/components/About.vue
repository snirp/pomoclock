<template>
  <div class="about">
    <p>seconds left: {{secondsLeft}}</p>
    <p>active timer: {{activeTimer}}</p>
    <hr>
    <button @click="resetTimer">Reset timer</button>
    <button @click="pauzeTimer" v-if="interval">Pauze timer</button>
    <button @click="startTimer" v-else>Start</button>
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

export default {
  created() {
    this.audio = new Audio(require('../assets/beep.mp3'));
  },
  mounted() {
    this.$refs.circle.set(this.elapsedSeconds/this.totalSeconds);
    this.$refs.notifydial.set(this.volume);
  },
  computed: {
    totalSeconds(){
      return this.$store.state[this.$store.state.activeTimer] * 60;
    },
    elapsedSeconds(){
      return this.totalSeconds - this.$store.state.secondsLeft;
    },
    ...mapState([
      'sessionCount', 'work', 'pauze', 'secondsLeft', 'activeTimer', 
      'sessionsCompleted', 'batchSize', 'interval', 'break', 'playSound',
      'notifications', 'volume'
    ])
  },
  watch: {
    elapsedSeconds(elapsed){
      this.$refs.circle.set(elapsed/this.totalSeconds);
    }
  },
  methods: {
    updateSetting(e){
      this.$store.commit('updateValue', {name: e.target.name, value: e.target.value});
      this.resetTimer();
    },
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
    pauzeTimer(e){ 
      this.$store.commit('stopTimer') 
    },
    resetTimer(e){ 
      this.$store.commit('stopTimer');
      this.$store.commit('resetTimer');
      this.$store.commit('resetSeconds');      
     },
    startTimer(e){
      this.$store.dispatch('intervalAsync', this.countDown)
    },
    notify(timer){
      if (this.notifications) this.notifyBrowser(`You finished a ${this.activeTimer} session!`);
      if (this.playSound) {
        this.audio.volume = this.volume;
        this.audio.play();
      };
    },
    countDown(){
      this.$store.commit('decrement');
      if (this.secondsLeft == 0){
        this.notify(this.activeTimer);
        if (this.activeTimer !== 'work') {
          this.$store.commit('setActive', 'work');
        } else {
          this.$store.commit('incrementSessions');
          if (this.sessionsCompleted == this.sessionCount){
            this.resetTimer();
            return null;
          }
          if (this.sessionsCompleted % this.batchSize == 0) {
            this.$store.commit('setActive', 'break');
          } else {
            this.$store.commit('setActive', 'pauze');
          }
        }
        this.$store.commit('resetSeconds');
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