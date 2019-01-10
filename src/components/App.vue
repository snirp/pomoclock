<template>
  <div id="app">
    <router-view/>
    <div class="version-info">v{{version}}</div>
  </div>
</template>

<script>
import {version} from '../../package.json';
export default{
  data(){
    return {
      version
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
  color: #555;
  font-family: 'Source Code Pro', monospace;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.version-info{
  position: absolute;
  top: 1%;
  left: 1%;
  font-size: 2vmin;
}
</style>