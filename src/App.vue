<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
     data() {
      return {
        // rouleArr: [{type: 'red', limit: 10}, {type: 'yellow', limit: 3}, {type: 'green', limit: 15}]
      }
    }}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
