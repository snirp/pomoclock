<template>
  <svg :width="this.UNITS" :height="this.UNITS"> 
    <path
      :d="this.describeArc(this.UNITS/2, this.UNITS/2, this.getRadius(), this.start, this.end)" 
      fill="none" 
      :stroke="stroke" 
      :stroke-width="strokeWidth" 
      :stroke-dasharray="this.getDashArray(this.dashCount)"
    />    
    <path
      :d="this.describeArc(this.UNITS/2, this.UNITS/2, this.getRadius(), this.start, this.activeEnd())" 
      fill="none" 
      :stroke="activeStroke" 
      :stroke-width="strokeWidth" 
      :stroke-dasharray="this.getDashArray(this.activeCount)"
    />
  </svg>
</template>

<script>
export default {
  beforeCreate() {
    // Arbitrary dimensions of SVG to set up user-space
    this.UNITS = 100;
  },
  props: {
    dashCount: Number,
    activeCount: Number,
    strokeWidth: {
      type: Number, 
      default: 2
    },
    stroke: {
      type: String, 
      default: 'lightgrey'
    },
    activeStroke: {
      type: String,
      default: 'dodgerblue'
    },
    dashSpacing: {
      type: Number,
      default: 1/6
    },
    start: {
      type: Number,
      default: -135
    },
    end: {
      type: Number,
      default: 135
    },
  },
  methods: {
    // Determine the 'end' angle of the path for the active dashes in degrees.
    activeEnd(){
      const angle = this.start > this.end ? this.end-this.start+360 : this.end-this.start;
      return this.start + angle*(this.activeCount*this.dashPerc() + (this.activeCount-1)*this.spacePerc())
    },

    // Generate a string that will be used as value for the stroke-dasharray attribute
    getDashArray(count){
      return Array(count).fill(this.getLengths()).flat().slice(0,-1).join(" ")
    },

    // An array of the length of the dash & the length of the space between dashes
    getLengths(){
      return [this.getArcLength()*this.dashPerc(), this.getArcLength()*this.spacePerc()]
    },

    // The space beween dashes as a percentage of the total length
    spacePerc(){
      return this.dashSpacing / (this.dashCount-this.dashSpacing);
    },

    // The length of a dash as a percentage of the total length
    dashPerc(){
      return (1-this.dashSpacing) / (this.dashCount-this.dashSpacing);
    },

    // The length of the arc (allowing for negative angles)
    getArcLength(){
      if (this.start > this.end){
        return ((this.end-this.start+360)/360)*2*Math.PI*this.getRadius()
      } else {
        return ((this.end-this.start)/360)*2*Math.PI*this.getRadius()
      }
    },

    // Radius of the circle arc
    getRadius(){
      return (this.UNITS-this.strokeWidth)/2
    },

    // SVG path definition requires points in cartesian space
    polarToCartesian(cx, cy, radius, degrees) {
      const radians = (degrees-90) * Math.PI / 180.0;
      return {
        x: cx + (radius * Math.cos(radians)),
        y: cy + (radius * Math.sin(radians))
      };
    },

    // Path definition for clockwise circular arc, allowing for negative angles
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