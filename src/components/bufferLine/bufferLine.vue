<style lang="stylus">
  .progressTopShow
    position fixed
    top 0
    left 0
    width 100%
    height 4px
    z-index 9000
    transition all 0.5s
    .progress-bar
      width 50%
      height 4px
    
  .showBufferLine-enter
    .progress-bar
      width 0
  
  .showBufferLine-enter-to
    .progress-bar
      transition all 0.5s
      width 50%
      
  .showBufferLine-leave-active
    .progress-bar
      width 50%
  
  .showBufferLine-leave-to
    .progress-bar
      transition all 0.5s
      width 100%

</style>

<template>
  <transition name="showBufferLine">
    <div class="progress progressTopShow" v-if="show">
      <div class="progress-bar" role="progressbar" :style="style">
        
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean
      },
      bgColor: {
        type: String,
        default: '#5A589C'
      }
    },

    computed: {
      style () {
        const ret = [];
        ret.push({
          background: this.bgColor
        });
        return ret;
      }
    },

    data () {
      return {
      }
    }
  }
</script>