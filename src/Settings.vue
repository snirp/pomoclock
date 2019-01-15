<template>
  <div>
    {{ setting.title }}
    <!-- <vue-slider 
      v-model="$data[$route.params.name]" 
      :min="setting.min"
      :max="setting.max"
      :interval="setting.step"
      :tooltip="false"
    /> -->
    <input v-model="this[$route.params.name]" />
    {{getComputed()}}
  </div>
</template>

<script>
import { SETTINGS } from '@/constants'
import vueSlider from 'vue-slider-component'

export default {
  data() {
    return {
      item: this[this.$route.params.name],
    }
  },
  created() {
    // Set some convenience properties here
    console.log(this[this.$route.params.name])
    this.setting = SETTINGS[this.$route.params.name];
  },
  computed: {
    work: {
      get(){ return this.$store.state.work; },
      set(value){ console.log('called'); this.setMinute(value, WORK) },
    },
    shortBreak: {
      get(){ return this.$store.state.shortBreak; },
      set(value){ this.setMinute(value, SHORT) },
    },
    longBreak: {
      get(){ return this.$store.state.longBreak; },
      set(value){ this.setMinute(value, LONG) },
    },
    sessionCount: {
      get(){
        return this.$store.state.sessionCount;
      },
      set(value){ 
        if (value <= this.$store.state.sessionsCompleted) this.resetTimer();
        this.$store.commit('updateValue', {name:'sessionCount', value});
      }
    },
    batchSize: {
      get() {
        return this.$store.state.batchSize;
      },
      set(value){
        const active = this.$store.state.activeTimer;
        const completed = this.$store.state.sessionsCompleted;
        const batch = this.$store.state.batchSize;
        if (active == LONG && completed % batch != 0){
          this.$store.commit('updateValue', {name:'activeTimer', value: SHORT})
        } else if (active == SHORT && completed % batch == 0) {
          this.$store.commit('updateValue', {name:'activeTimer', value: LONG})
        }
        this.$store.commit('updateValue', {name:'batchSize', value})
      }
    },
    volume: {
      get(){ return this.$store.state.volume; },
      set(value){ this.$store.commit('updateValue', {name:'volume', value}); }
    },
  },
  methods: {
    getComputed(){
      return this[this.$route.params.name];
    },
    // Common method to set new value for: work / short / long
    setMinute(value, timer){
      if (timer == this.$store.state.activeTimer){
        const secLeft = this.$store.state.secondsLeft;
        const secOld = this.$store.state[timer]*60;
        const secNew = value*60;
        if (secNew <= secOld-secLeft){
          this.$parent.switchTimer();
        } else {
          this.$store.commit('updateValue', {name:'secondsLeft', value: secLeft + secNew - secOld})
        }
      }
      this.$store.commit('updateValue', {name: timer, value});
    }
  },
  components: {vueSlider}
}
</script>