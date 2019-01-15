<template>
  <div>
    <div>{{TIMERS[$store.state.activeTimer].display}}</div>
    <div>{{formatMinutesAndSeconds(secondsLeft)}}</div>
    <div>next</div>

    <router-link :to="{ name: 'settings', params: { name: WORK }}">
      <polar v-bind="this.iconPropsObj" :angle="-35">@</polar>
      <polar v-bind="this.dialPropsObj" :angle="-35">{{getShort()}}</polar>
    </router-link>


    <polar v-bind="this.iconPropsObj" :angle="-90">@</polar>
    <polar v-bind="this.dialPropsObj" :angle="-90">{{getWork()}}</polar>

    <polar v-bind="this.iconPropsObj" :angle="-145">@</polar>
    <polar v-bind="this.dialPropsObj" :angle="-145">{{getLong()}}</polar>

    <polar v-bind="this.dialPropsObj" :angle="45">{{sessionCount}}</polar>
    <polar v-bind="this.dialPropsObj" :angle="90">{{batchSize}}</polar>
    <polar v-bind="this.dialPropsObj" :angle="135">{{volume}}</polar>
    <button @click="$parent.start">start</button>
    <button @click="$parent.reset">reset</button>
  </div>
</template>

<script>
import {WORK, LONG, SHORT, TIMERS} from './constants';
import { mapState } from 'vuex';
import Polar from 'vue-polar';

export default {
  created(){
    this.TIMERS = TIMERS;
    this.WORK = WORK;
    this.iconPropsObj = {
      width: '10%',
      height: '20%',
      offset: '320%',
      setstraight: false,
      extrarotation: 90,
      customstyles: {
        backgroundColor: 'darkgreen',
        borderRadius: '999rem',
        paddingTop: '10%',
        textAlign: 'center',
        color: 'white',
        fontSize: '6vmin',
      }
    };
    this.dialPropsObj = {
      height: '14%',
      width: '14%',
      offset: '265%',
      customstyles: {
        backgroundColor: 'darkgreen',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '6vmin',
        fontWeight: 400,
      }
    }
  },
  computed: {
    ...mapState([
      'secondsLeft', 
      'activeTimer', 
      'sessionsCompleted', 
      'volume', 
      'interval', 
      'sessionCount', 
      'batchSize',
      SHORT,
      LONG,
      WORK,
    ])
  },
  methods: {
    formatMinutesAndSeconds(seconds){
      return Math.floor(seconds/60)+':'+('0'+seconds % 60).slice(-2)
    },
    getWork(){ return this[WORK];},
    getLong(){ return this[LONG];},
    getShort(){ return this[SHORT];},
  },
  components: {Polar}
}
</script>