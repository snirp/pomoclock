<template>
  <div class="center-column">
    <div>{{model}}</div>
    <div>{{ setting.title }}</div>
    <vue-slider 
      v-model="model" 
      :min="setting.min"
      :max="setting.max"
      :interval="setting.step"
      :tooltip="false"
    />
    <router-link :to="{ name: 'face'}">X</router-link>
  </div>
</template>

<script>
import { WORK, LONG, SHORT, SETTINGS } from '@/constants'
import vueSlider from 'vue-slider-component'

export default {
  created() {
    this.name = this.$route.params.name;
    this.setting = SETTINGS[this.name];
  },
  computed: {
    model: {
      get(){ return this.$store.state[this.name]; },
      set(value){
        switch(this.name) {
          case 'volume':
            this.$store.commit('updateValue', {name:this.name, value});
            this.$parent.audio.volume = value/10;
            this.$parent.audio.play();
          case 'sessionCount':
            if (value <= this.$store.state.sessionsCompleted) this.$parent.reset();
            this.$store.commit('updateValue', {name:this.name, value});
          case 'batchSize':
            this.setBatchSize(value);
          default:
            this.setMinute(value);
        }
      }
    },
  },
  methods: {
    // Common method to set new value for: work / short / long
    setMinute(value){
      if (this.name == this.$store.state.activeTimer){
        const secLeft = this.$store.state.secondsLeft;
        const secOld = this.$store.state[this.name]*60;
        if (value*60 <= secOld-secLeft){
          this.$parent.switchTimer();
        } else {
          this.$store.commit('updateValue', {name:'secondsLeft', value: secLeft + value*60 - secOld})
        }
      }
      this.$store.commit('updateValue', {name: this.name, value});
    },
    setBatchSize(value){
      if (this.$store.state.activeTimer == LONG && this.$store.state.sessionsCompleted % value != 0){
        this.$store.commit('updateValue', {name:'activeTimer', value: SHORT})
      } else if (this.$store.state.activeTimer == SHORT && this.$store.state.sessionsCompleted % value == 0) {
        this.$store.commit('updateValue', {name:'activeTimer', value: LONG})
      }
      this.$store.commit('updateValue', {name:this.name, value})      
    }
  },
  components: {vueSlider}
}
</script>