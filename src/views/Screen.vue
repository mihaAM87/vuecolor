<template>
  <div :class="['screen', screenType]">
    <strong :class="['screenCounter']">{{ getRule }}</strong>
   </div>
</template>

<script>
  export default {
    name: 'Screen',
    computed: {
      screenType() {
        return ((this.$store.getters.getCounter < 3) && (this.$store.getters.getCounter % 2 === 0)) ? '' : this.$route.meta.type;
      },
      getRule() {
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