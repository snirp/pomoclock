<template>
  <div>
    <div class="top-bar">
      <router-link to="/" class="icon-link">
        <icon-base name="Close"><icon-close/></icon-base>
      </router-link>
    </div>
    <div class="menu">

      <div class="settings-item">
        <div class="item-header">
          <p>Work time</p>
          <p>{{work}} minutes</p>
        </div>
        <vue-slider v-model="work" v-bind="{min: 1, max: 60, tooltip: false}"/>
      </div>

      <div class="settings-item">
        <div class="item-header">
          <p>Short break</p>
          <p>{{shortBreak}} minutes</p>
        </div>
        <vue-slider v-model="shortBreak" v-bind="{min: 1, max: 15, tooltip: false}"/>
      </div>

      <div class="settings-item">
        <div class="item-header">
          <p>Long break</p>
          <p>{{longBreak}} minutes</p>
        </div>
        <vue-slider v-model="longBreak" v-bind="{min: 1, max: 45, tooltip: false}"/>
      </div>

      <div class="settings-item">
        <div class="item-header">
          <p>Total pomodoros</p>
          <p>{{sessionCount}} sessions</p>
        </div>
        <vue-slider v-model="sessionCount" v-bind="{min: 1, max: 20, tooltip: false}"/>
      </div>

      <div class="settings-item">
        <div class="item-header">
          <p>Long break after</p>
          <p>{{batchSize}} sessions</p>
        </div>
        <vue-slider v-model="batchSize" v-bind="{min: 1, max: 10, tooltip: false}"/>
      </div>

      <div class="settings-item">
        <div class="item-header">
          <p>Sounds</p>
          <p><toggle-button v-model="playSound"/></p>
        </div>
      </div>

      <div class="settings-item">
        <div class="item-header">
          <p>Volume</p>
          <p>{{volume}} %</p>
        </div>
        <vue-slider v-model="volume" v-bind="{min: 0, max: 100, interval: 5, tooltip: false}"/>
      </div>

    </div>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import timerMixin from '../mixins/timerMixin'
import {WORK, LONG, SHORT} from '../constants'
import IconBase from './IconBase.vue'
import IconClose from './icons/IconClose.vue'

export default {
  mixins: [timerMixin],
  beforeCreate() {
    this.$store.commit('pauzeTimer');
  },
  methods: {
    // Common method to new value for: work / short / long 
    setMinute(value, timer){
      if (timer == this.$store.state.activeTimer){
        const secLeft = this.$store.state.secondsLeft;
        const secOld = this.$store.state[timer]*60;
        const secNew = value*60;
        if (secNew <= secOld-secLeft){
          this.switchTimer();
        } else {
          this.$store.commit('updateValue', {name:'secondsLeft', value: secLeft + secNew - secOld})
        }
      }
      this.$store.commit('updateValue', {name: timer, value});
    }
  },
  computed: {
    work: {
      get(){
        return this.$store.state.work;
      },
      set(value){
        this.setMinute(value, WORK)
      },
    },
    shortBreak: {
      get(){
        return this.$store.state.shortBreak;
      },
      set(value){
        this.setMinute(value, SHORT)
      },
    },
    longBreak: {
      get(){
        return this.$store.state.longBreak;
      },
      set(value){
        this.setMinute(value, LONG)
      },
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
      get(){
        return this.$store.state.volume;
      },
      set(value){
        this.$store.commit('updateValue', {name:'volume', value});
      }
    },
  },
  components: {
    vueSlider,
    IconBase,
    IconClose,
  }
}
</script>

<style>
a {
  color: inherit;
}
.top-bar {
  text-align: right;
  padding: 10px 2%;
}
.menu {
  font-family: Arial, Helvetica, sans-serif;
  max-width: 500px;
  margin: 0 auto;
}
.settings-item {
  margin-bottom: 2rem;
}
.item-header {
  margin: 0 10px;
  display: flex;
  justify-content: space-between;
}
.icon-link {
  display: inline-block;
  width: 6vmin;
  height: 6vmin;
}
</style>
