<template>
  <div class="about">
    <template v-for="(setting, index) in settingsList">
      <label :key="index">{{setting.label}}</label>
      <input :key="index" :value="[setting.entry]" @input="updateSetting" :name="setting.entry">
    </template>
    <p>seconds left: {{secondsLeft}}</p>
    <p>active timer: {{activeTimer}}</p>
    <input :value="work" @input="updateSetting" name="work">
    <hr>
    <button @click="resetTimer">Reset timer</button>
    <button @click="pauzeTimer" v-if="interval">Pauze timer</button>
    <button @click="startTimer" v-else>Start</button>
    <radial-progress-bar 
      :diameter="200"
      :completed-steps="completedSteps"
      :total-steps="totalSteps"
      animateSpeed="500"
      >
    </radial-progress-bar>
    <p>{{totalSteps}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RadialProgressBar from 'vue-radial-progress'

export default {
  created () {
    this.settingsList = [
      { 
        entry: 'work',
        label: "Work minutes" 
      },
      {
        entry: 'sessionCount',
        label: 'Number of pomodoro sessions'
      }
    ]
  },
  computed: {
    totalSteps(){
      return this.$store.state[this.$store.state.activeTimer] * 60;
    },
    completedSteps(){
      return this.totalSteps - this.$store.state.secondsLeft;
    },
    ...mapState([
      'sessionCount', 'work', 'pauze', 'secondsLeft', 'activeTimer', 
      'sessionsCompleted', 'batchSize', 'interval', 'break'
    ])
  },
  methods: {
    updateSetting(e){
      this.$store.commit('updateValue', {name: e.target.name, value: e.target.value});
      this.resetTimer();
    },
    pauzeTimer(e){ this.$store.commit('stopTimer') },
    resetTimer(e){ 
      this.$store.commit('stopTimer');
      this.$store.commit('resetTimer');
      this.$store.commit('resetSeconds');      
     },
    startTimer(e){ this.$store.dispatch('intervalAsync', this.countDown) },
    countDown(){
      this.$store.commit('decrement');
      if (this.secondsLeft == 0){
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
  components: {
    RadialProgressBar
  },
}
</script>