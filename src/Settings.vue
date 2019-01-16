<template>
  <div class="center-column">
    <div class="value">{{model}}</div>
    <div>{{ setting.title }}</div>
    <div class="slider">
      <vue-slider 
        v-model="model" 
        :min="setting.min"
        :max="setting.max"
        :interval="setting.step"
        :tooltip="false"
      />
    </div>
    <div class="icon">
      <router-link :to="{ name: 'face'}">
        <icon :paths="icons['close']" title="close" fill="currentColor" size="100%" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { WORK, LONG, SHORT, SETTINGS } from '@/constants'
import vueSlider from 'vue-slider-component'

import icons from '@/customIcons'
import Icon from './Icon';

export default {
  created() {
    this.name = this.$route.params.name;
    this.setting = SETTINGS[this.name];
    this.icons = icons
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
  components: {vueSlider, Icon}
}
</script>

<style scoped>
.center-column{
  position: absolute;
  top: 10%;
  width: 100%;
  height: 80%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 4vmin;
}

.value {
  font-size: 2rem;
}

.slider{
  width: 80%;
}

.icon {
  height: 8vmin;
  width: 8vmin;
}

a {
  color: inherit;
  transition: color 0.3s;
}

a:hover {
  color: #333;
}
</style>