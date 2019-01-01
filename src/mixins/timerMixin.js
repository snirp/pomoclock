export default {
  created: function(){
    //pass
  },
  methods: {
    switchTimer(){
      if (this.$store.state.activeTimer !== 'work') {
        this.$store.commit('setActive', 'work');
      } else {
        this.$store.commit('incrementSessions');
        if (this.$store.state.sessionsCompleted == this.$store.state.sessionCount){
          this.resetTimer();
          return null;
        }
        if (this.$store.state.sessionsCompleted % this.$store.state.batchSize == 0) {
          this.$store.commit('setActive', 'longBreak');
        } else {
          this.$store.commit('setActive', 'shortBreak');
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