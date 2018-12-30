<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/notifications">Notifications</router-link>
      <router-link to="/minutes">Minutes</router-link>
      <router-link to="/Sessions">Sessions</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
