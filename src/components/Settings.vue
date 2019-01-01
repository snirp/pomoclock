<template>
  <div>
    <p>Work minutes</p>
    <vue-slider ref="work" v-model="work"/>
    <p>Short break minutes</p>
    <vue-slider ref="shortBreak" v-model="shortBreak"/>
    <p>Long break minutes</p>
    <vue-slider ref="longBreak" v-model="longBreak"/>
    <!-- <hr />
    <p>Session count:</p>
    <vue-slider ref="count" v-model="this.sessionCount"/>
    <p>Long break after:</p>
    <vue-slider ref="batch" v-model="this.batchSize"/>
    <hr />
    <p>Sounds</p>
    <toggle-button v-model="this.playSound"/>
    <p>Volume</p>
    <vue-slider ref="volume" v-model="this.volume"/> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vueSlider from 'vue-slider-component'
import timerMixin from '../mixins/timerMixin'

export default {
  mixins: [timerMixin],
  methods: {
    setMinute(value, timer){
      if (this.$store.state.activeTimer == timer){
        const secLeft = this.$store.state.secondsLeft;
        const secOld = this.$store.state[timer]*60;
        const secNew = value*60;
        if (secNew <= secOld-secLeft){
          console.log('switching...')
          this.switchTimer();
        } else {
          console.log('update time...')
          this.$store.commit('updateValue', {name:'secondsLeft', value: secLeft + secNew-secOld})
        }
      }
      this.$store.commit('updateValue', {name: timer, value});
    }
  },
  computed: {
    work: {
      get() { return this.$store.state.work; },
      set(value) { this.setMinute(value, 'work') },
    },
    shortBreak: {
      get() { return this.$store.state.shortBreak; },
      set(value) { this.setMinute(value, 'shortBreak') },
    },
    longBreak: {
      get() { return this.$store.state.longBreak; },
      set(value) { this.setMinute(value, 'longBreak') },
    }
  },
  components: {
    vueSlider,
  }
}
</script>

<style>
</style>
