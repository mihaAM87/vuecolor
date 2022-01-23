<template>
  <div :class="['screen', screenType]">
    <strong :class="['screenCounter']">{{ getRoule }}</strong>
   </div>
</template>

<script>
  export default {
    name: 'Screen',
    computed: {
      screenType() {
        return this.$route.meta.type;
      },
      getRoule() {
        console.log('getRoule', this.$store.getters.getCounter)
        return this.$store.getters.getCounter;
      }
    }
  }
</script>

<style scoped>

  .screen {
    width: 100px;
    height: 100px;
    border: 2px solid black;
  }

  .red {
    background: red;
  }
  .yellow {
    background: yellow;
  }
  .green {
    background: green;
  }

  .screenCounter {
    font-size: 26pt;
  }
</style>