<template>
  <div>
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
            this.$parent.audio.volume = value/100;
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
        const secNew = value*60;
        if (secNew <= secOld-secLeft){
          this.$parent.switchTimer();
        } else {
          this.$store.commit('updateValue', {name:'secondsLeft', value: secLeft + secNew - secOld})
        }
      }
      this.$store.commit('updateValue', {name: this.name, value});
    },
    setBatchSize(value){
      const active = this.$store.state.activeTimer;
      const completed = this.$store.state.sessionsCompleted;
      const batch = this.$store.state.batchSize;
      if (active == LONG && completed % batch != 0){
        this.$store.commit('updateValue', {name:'activeTimer', value: SHORT})
      } else if (active == SHORT && completed % batch == 0) {
        this.$store.commit('updateValue', {name:'activeTimer', value: LONG})
      }
      this.$store.commit('updateValue', {name:this.name, value})      
    }
  },
  components: {vueSlider}
}
</script>