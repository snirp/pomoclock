<template>
  <div>
    <p>work</p>
    <vue-slider ref="work" @callback="updateWork" v-model="this.work"/>
    <p>break</p>
    <vue-slider ref="pauze" @callback="updatePauze" v-model="this.pauze"/>
    <p>long break</p>
    <vue-slider ref="break" @callback="updateBreak" v-model="this.break"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vueSlider from 'vue-slider-component'

export default {
  methods: {
    updateWork(val){ this.$store.commit('updateValue', {name: 'work', value: val});},
    updatePauze(val){ this.$store.commit('updateValue', {name: 'pauze', value: val});},
    updateBreak(val){ this.$store.commit('updateValue', {name: 'break', value: val});}
  },
  computed: {
    ...mapState(['work', 'pauze', 'break'])
  },
  components: {
    vueSlider
  },
}
</script>

<style>
</style>
