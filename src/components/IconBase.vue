<template functional>
  <svg xmlns="http://www.w3.org/2000/svg" 
    :width="props.width" 
    :height="props.height" 
    viewBox="0 0 360 360" 
    :aria-labelledby="props.name" 
    role="presentation"
    :class="props.class"
    :fill="props.fill"
  >
    <title :id="props.name" lang="en">{{props.name}}</title>
      <slot />
  </svg>
</template>

<script>
export default {
  props: {
    class: {
      type: Array,
      default: function () {
        return ['vue-icon']
      }
    },
    name: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '100%'
    },
    fill: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
