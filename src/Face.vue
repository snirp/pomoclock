<template>
  <div class="center-column">

    <div class="time-row">
      <button @click="$parent.toggleSound" class="icon-link">
        <icon v-if="playSound" :paths="icons['volume']" title="turn off" fill="currentColor" size="100%" />
        <icon v-else :paths="icons['mute']" title="turn on" fill="currentColor" size="100%" />
      </button>
      <h1>{{formatMinutesAndSeconds(secondsLeft)}}</h1>
      <button @click="$parent.reset" v-if="interval">
        <icon :paths="icons['reset']" title="reset timer" fill="currentColor" size="100%" />
      </button>
      <button @click="$parent.start" v-else>
        <icon :paths="icons['play']" title="start timer" fill="currentColor" size="100%" />
      </button>
    </div>

    <router-link v-for="dial in dials" :key="dial.position" :to="{ name: 'settings', params: { name: dial.name }}">
      <polar height="12%" width="24%" offset="145%" :setstraight="false" :angle="dial.position/8*360">
        <div class="dial" :style="`background-color: ${dial.color};`">
          <div :style="`transform: rotate(${-dial.position/8*360}deg); width: 6vmin;`">
            <icon :paths="icons[dial.icon]" :title="dial.name" fill="white" size="100%"/>
          </div>
          <div :style="`transform: rotate(${-dial.position/8*360}deg);`">{{dial.value}}</div>
        </div>
      </polar>
    </router-link>

    <polar 
      height="3%" 
      width="3%" 
      offset="630%" 
      :angle="getAngle()" 
      :customstyles="{
        backgroundColor: TIMERS[activeTimer].color, 
        borderRadius: '50%',
        transition: 'all 0.5s',
      }"
    />

  </div>
</template>

<script>
import {WORK, LONG, SHORT, TIMERS} from './constants';
import { mapState } from 'vuex';
import Polar from 'vue-polar';

import icons from '@/customIcons'
import Icon from './Icon';

export default {
  created(){
    this.TIMERS = TIMERS;
    this.WORK = WORK;
    this.SHORT = SHORT;
    this.LONG = LONG;
    this.icons = icons;
    this.dials = [
      {
        position: -1,
        name: SHORT,
        value: this.getShort(),
        color: this.TIMERS[SHORT].color,
        icon: 'coffee-small'
      },
      {
        position: -2,
        name: WORK,
        value: this.getWork(),
        color: this.TIMERS[WORK].color,
        icon: 'computer'
      },
      {
        position: -3,
        name: WORK,
        value: this.getLong(),
        color: this.TIMERS[LONG].color,
        icon: 'coffee-large'
      },
      {
        position: 1,
        name: 'sessionCount',
        value: this.sessionCount,
        color: 'gray',
        icon: 'pomodoro'
      },
      {
        position: 2,
        name: 'batchSize',
        value: this.batchSize,
        color: 'gray',
        icon: 'pomany'
      },
      {
        position: 3,
        name: 'volume',
        value: this.volume,
        color: 'gray',
        icon: 'volume'
      }
    ];
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
      'interval',
      'playSound',
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
    getAngle(){
      switch(this.activeTimer) {
        case this.WORK:
          return -90;
        case this.SHORT:
          return -45;
        default:
          return -135;
      }
    }
  },
  components: {Polar, Icon}
}
</script>

<style>
.time-row{
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
}
h1 {
  font-weight: 200;
  margin: 2vmin 0;
  font-size: 8vmin;
}
.dial {
  color: white;
  border-radius: 999rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 6vmin;
  font-weight: 400; 
  width: 100%;
  height: 100%;
  padding: 0 0.25rem;
}
button {
  border: none;
  background-color: transparent;
  outline: none;
  padding: 0;
  margin: 0;
  color: inherit;
  z-index: 99;
  width: 8vmin;
  height: 8vmin;
}
button:hover{
  cursor:pointer;
}
</style>