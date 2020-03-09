<style lang="stylus">
  .curUser
    width 200px
    position fixed
    height 50px
    background-color #f6f7f8
    border-top 1px solid #f2f2f2
    bottom 0
    left 0
    .curUserImg
      width 30px
      height 30px
      border-radius 50px
      overflow hidden
      margin-left 20px
      margin-top 6px
      margin-right 15px
      float left
      img
        width 100%
        height 100%
    .curUserIfm
      float left
      line-height 50px
      a
        color #333
        font-size 12px
        margin-right 15px
</style>
<template>
  <div class="curUser clearfix">
    <div class="curUserImg">
      <img src="http://newblog.tecclass.cn/images/header.jpeg">
    </div>
    <div class="curUserIfm">
      <a href="javascript:void(0)"><tb-icon icon="account" class="tb-m-r-10" size="14px"></tb-icon>止水</a>
      <a href="javascript:void(0)"><tb-icon icon="square-right" class="tb-m-r-10" size="14px"></tb-icon>退出</a>
    </div>
  </div>

  <!-- <ul class="curUser clearfix">
    <li v-if="isLogin">
      <a href="javascript:void(0)"><tb-icon icon="account" class="tb-m-r-10" size="14px"></tb-icon>止水</a>
    </li>
    <li>
      <a href="javascript:void(0)"><tb-icon icon="square-right" class="tb-m-r-10" size="14px"></tb-icon>退出</a>
    </li>
    <li v-if="!isLogin">
      <a href="javascript:void(0)">登录</a>
    </li>
  </ul> -->
</template>

<script>
  export default {
    data () {
      return {
        isLogin: true,
        user: {}
      }
    }
  }
</script>