<template functional>
  <svg 
    :fill="props.fill" 
    viewBox="0 0 360 360" 
    v-html="props.paths+'<title>'+props.title+'</title>'"
    :height="props.size"
    :width="props.size"
  >
  </svg>
</template>

<script>

export default {
  created(){
    this.icons = icons;
  },
  title: {
    title: {
      type: String,
      default: 'icon',
    },
    fill: {
      type: String,
      default: 'black',
    },
    paths: {
      type: String,
    },
    size: {
      type: String,
      default: '2rem'
    }
  }
}
</script>
