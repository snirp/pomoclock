<template>
  <div>
    <div class="center-row">
      <!-- Volume control, only display when running -->
      <template v-if="interval">
        <div class="button-container">
          <div class="behind-button">
            <arc-counter 
              size="100%" 
              :start="-225" 
              :end="45" 
              :dashCount="10" 
              :activeCount="volume"
              :strokeWidth="12"
              :activeWidth="12"
              :dashSpacing="0"
              :activeStroke="getActiveStroke()"
            />
          </div>
          <button @click="$parent.toggleSound" class="icon-link">
            <icon v-if="playSound" :paths="icons['volume']" title="turn off" fill="currentColor" size="100%" />
            <icon v-else :paths="icons['mute']" title="turn on" fill="currentColor" size="100%" />
          </button>
        </div>
      </template>
      <!-- Play button or running time -->
      <h1 v-if="interval">{{formatMinutesAndSeconds(secondsLeft)}}</h1>
      <button v-else @click="$parent.start" class="button-play" v-else>
        <icon :paths="icons['play']" title="start timer" fill="currentColor" size="100%" />
      </button>
      <!-- Reset control, only display when running -->
      <div v-if="interval" class="button-container">
        <div class="behind-button">
          <arc-counter 
            size="100%" 
            :start="225" 
            :end="-45" 
            :dashCount="sessionCount" 
            :activeCount="sessionsCompleted+1"
            :strokeWidth="12"
            :activeWidth="12"
            activeStroke="dodgerblue"
          />
        </div>
        <button @click="$parent.reset" >
          <icon :paths="icons['reset']" title="reset timer" fill="currentColor" size="100%" />
        </button>
      </div>
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
import ArcCounter from 'vue-arc-counter';

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
        name: LONG,
        value: this.getLong(),
        color: this.TIMERS[LONG].color,
        icon: 'coffee-large'
      },
      {
        position: 1,
        name: 'sessionCount',
        value: this.sessionCount,
        color: '#666',
        icon: 'pomodoro'
      },
      {
        position: 2,
        name: 'batchSize',
        value: this.batchSize,
        color: '#666',
        icon: 'pomany'
      },
      {
        position: 3,
        name: 'volume',
        value: this.volume,
        color: '#666',
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
    getActiveStroke(){
      if (this.playSound){
        return 'dodgerblue';
      }
      return 'grey';
    },
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
  components: {Polar, Icon, ArcCounter}
}
</script>

<style>
.center-row{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
h1 {
  font-weight: 300;
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
  width: 6vmin;
  height: 6vmin;
  transition: color 0.3s;
}
.button-play{
  width: 16%;
  height: 16%;
  color: dodgerblue;
}
button:hover{
  cursor: pointer;
  color: #333;
}
.button-container {
  position: relative;
  width: 16%;
  height: 16%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.behind-button{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>