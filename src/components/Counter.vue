<template>
  <svg :width="this.UNITS" :height="this.UNITS"> 
    <path 
      :d="outline" 
      fill="none" 
      :stroke="stroke" 
      :stroke-width="strokeWidth" 
      :stroke-dasharray="dashArray"
    />    
    <path 
      :d="outlineActive" 
      fill="none" 
      :stroke="activeStroke" 
      :stroke-width="strokeWidth" 
      :stroke-dasharray="activeArray"
    />
    {{this.activeCount}}
  </svg>
</template>

<script>
export default {
  beforeCreate() {
    this.UNITS = 100;
  },
  mounted(){
  },
  props: {
    strokeWidth: {type: Number, default: 2},
    stroke: {type: String, default: 'lightgrey'},
    activeStroke: {type: String, default: 'dodgerblue'},
    dashCount: {type: Number, default: 8},
    activeCount: {type: Number, default: 5},
    dashSpacing: {type: Number, default: 1/6},
    start: {type: Number, default: -135},
    end: {type: Number, default: 135},
  },
  data: function () {
    return {
      outline: this.describeArc(this.UNITS/2, this.UNITS/2, this.getRadius(), this.start, this.end),
      dashArray: this.getDashArray(this.dashCount),
      outlineActive: this.describeArc(this.UNITS/2, this.UNITS/2, this.getRadius(), this.start, this.activeEnd()),
      activeArray: this.getDashArray(this.activeCount),
    }
  },
  methods: {
    activeEnd(){
      const angle = this.start > this.end ? this.end-this.start+360 : this.end-this.start;
      return this.start + angle*(this.activeCount*this.dashPerc() + (this.activeCount-1)*this.spacePerc())
    },
    getDashArray(count){
      return Array(count).fill(this.getLengths()).flat().slice(0,-1).join(" ")
    },
    getLengths(){
      return [this.getArcLength()*this.dashPerc(), this.getArcLength()*this.spacePerc()]
    },
    spacePerc(){
      return this.dashSpacing / (this.dashCount-this.dashSpacing);
    },
    dashPerc(){
      return (1-this.dashSpacing) / (this.dashCount-this.dashSpacing);
    },
    getArcLength(){
      if (this.start > this.end){
        return ((this.end-this.start+360)/360)*2*Math.PI*this.getRadius()
      } else {
        return ((this.end-this.start)/360)*2*Math.PI*this.getRadius()
      }
    },
    getRadius(){
      return (this.UNITS-this.strokeWidth)/2
    },
    polarToCartesian(cx, cy, radius, degrees) {
      const radians = (degrees-90) * Math.PI / 180.0;
      return {
        x: cx + (radius * Math.cos(radians)),
        y: cy + (radius * Math.sin(radians))
      };
    },
    describeArc(cx, cy, radius, startDegrees, endDegrees){
      const start = this.polarToCartesian(cx, cy, radius, endDegrees);
      const end = this.polarToCartesian(cx, cy, radius, startDegrees);
      let largeArc;
      if (endDegrees >= startDegrees) {
        largeArc = endDegrees - startDegrees <= 180 ? "0" : "1";
      } else {
        largeArc = (endDegrees + 360.0) - startDegrees <= 180 ? "0" : "1";
      }
      return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`
    },
  }
}
</script>