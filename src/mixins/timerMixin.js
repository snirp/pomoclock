import {WORK, LONG, SHORT} from '../constants'

export default {
  computed: {
    playSound: {
      get(){ 
        return this.$store.state.playSound;
      },
      set(value){
        this.$store.commit('updateValue', {name: 'playSound', value})
      }
    },
  },
  methods: {
    switchTimer(){
      if (this.$store.state.activeTimer !== WORK) {
        this.$store.commit('setActive', WORK);
      } else {
        this.$store.commit('incrementSessions');
        if (this.$store.state.sessionsCompleted == this.$store.state.sessionCount){
          this.resetTimer();
          return null;
        }
        if (this.$store.state.sessionsCompleted % this.$store.state.batchSize == 0) {
          this.$store.commit('setActive', LONG);
        } else {
          this.$store.commit('setActive', SHORT);
        }
      }
      this.$store.commit('resetSeconds');
    },
    resetTimer(){ 
      this.$store.commit('stopTimer');
      this.$store.commit('initiateTimer');
      this.$store.commit('resetSeconds');      
    },
  }
}