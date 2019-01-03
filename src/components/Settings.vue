<template>
  <div>
    <p>Work minutes: {{work}}</p>
    <vue-slider v-model="work" v-bind="{min: 1, max: 60, tooltip: false}"/>
    <p>Short break minutes</p>
    <vue-slider v-model="shortBreak" v-bind="{min: 1, max: 15, tooltip: false}"/>
    <p>Long break minutes</p>
    <vue-slider v-model="longBreak" v-bind="{min: 1, max: 45, tooltip: false}"/>
    <hr />
    <p>Session count</p>
    <vue-slider v-model="sessionCount" v-bind="{min: 1, max: 20, tooltip: false}"/>
    <p>Long break after</p>
    <vue-slider v-model="batchSize" v-bind="{min: 1, max: 10, tooltip: false}"/>
    <hr />
    <p>Sounds</p>
    <toggle-button v-model="playSound"/>
    <p>Volume</p>
    <vue-slider v-model="volume" v-bind="{min: 0, max: 1, interval: 0.1, tooltip: false}"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vueSlider from 'vue-slider-component'
import timerMixin from '../mixins/timerMixin'
import {WORK, LONG, SHORT} from '../constants'

export default {
  mixins: [timerMixin],
  methods: {
    setMinute(value, timer){
      if (this.$store.state.activeTimer == timer){
        const secLeft = this.$store.state.secondsLeft;
        const secOld = this.$store.state[timer]*60;
        const secNew = value*60;
        if (secNew <= secOld-secLeft){
          this.switchTimer();
        } else {
          this.$store.commit('updateValue', {name:'secondsLeft', value: secLeft + secNew-secOld})
        }
      }
      this.$store.commit('updateValue', {name: timer, value});
    }
  },
  computed: {
    work: {
      get() { return this.$store.state.work; },
      set(value) { this.setMinute(value, WORK) },
    },
    shortBreak: {
      get() { return this.$store.state.shortBreak; },
      set(value) { this.setMinute(value, SHORT) },
    },
    longBreak: {
      get() { return this.$store.state.longBreak; },
      set(value) { this.setMinute(value, LONG) },
    },
    sessionCount: {
      get() { return this.$store.state.sessionCount; },
      set(value) { 
        if(value <= this.$store.state.sessionsCompleted){
          this.resetTimer();
        }
        this.$store.commit('updateValue', {name:'sessionCount', value})
      }
    },
    batchSize: {
      get() { return this.$store.state.batchSize; },
      set(value) {
        if (this.$store.state.activeTimer == LONG && this.$store.state.sessionsCompleted % this.$store.state.batchSize != 0){
          this.$store.commit('updateValue', {name:'activeTimer', value: SHORT})
        } else if(this.$store.state.activeTimer == SHORT && this.$store.state.sessionsCompleted % this.$store.state.batchSize == 0) {
          this.$store.commit('updateValue', {name:'activeTimer', value: LONG})
        }
        this.$store.commit('updateValue', {name:'batchSize', value})
      }
    },
    playSound: {
      get() { return this.$store.state.playSound; },
      set(value) { this.$store.commit('updateValue', {name:'playSound', value}) }
    },
    volume: {
      get() { return this.$store.state.volume; },
      set(value) { this.$store.commit('updateValue', {name:'volume', value}) }
    },
  },
  components: {
    vueSlider,
  }
}
</script>

<style>
</style>
