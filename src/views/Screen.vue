<template>
  <div :class="['screen', screenType]">
    <strong :class="['screenCounter']">{{ getCounter }}</strong>
   </div>
</template>

<script>
  export default {
    name: 'Screen',
    computed: {
      screenType() {
        return ((this.getCounter < 3) && (this.getCounter % 2 === 0)) ? '' : this.$store.getters.getType;
      },
      getCounter() {
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