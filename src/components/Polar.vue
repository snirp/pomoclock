<template functional>
  <div :style="{
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: props.width,
    height: props.height,
    margin: `
      ${-1*parseFloat(props.height)/2}${props.height.match(/([a-z]*|%)$/)[0]}
      ${-1*parseFloat(props.width)/2}${props.width.match(/([a-z]*|%)$/)[0]}
      `,
    backgroundColor: 'pink',
    transform: `
      rotate(${(props.cardinal-1)/props.total*360+props.zeroAngle}deg) 
      translate(${props.offset}) 
      rotate(-${(props.setStraight && (props.cardinal-1)/props.total*360) + props.zeroAngle + props.extraRotation}deg)`,
  }">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    offset: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '50px'
    },
    width: {
      type: [Number, String],
      default: '100px'
    },
    zeroAngle: {
      // Needs to be positive
      type: Number,
      default: 0
    },
    setStraight: {
      type: Boolean,
      default: false
    },
    extraRotation: {
      type: Number,
      default: 0
    },
    cardinal: {
      type: Number,
      default: 2
    },
    total: {
      type: Number,
      default: 5
    },
    zIndex: {
      type: Number,
      default: 1
    }
  }
}
</script>