<style lang="stylus">
.leftBar
  position fixed
  left 0
  top 0
  height 100%
  width 200px
  background-color #F6F7F8
  overflow hidden
  padding-bottom 50px
  z-index 20
  &:hover
    overflow auto
@media screen and (max-width: 768px)
  .leftBar
    box-shadow 0 0 10px rgba(51,51,51,0.38)

.leftBarMenu
  &.tb-menu
      background-color #f6f7f8
  .tb-menu-label
    background-color transparent
    &.router-link-active
      background-color #f2f2f2
    
  
.leftBarNav
  box-shadow none !important
  width 200px

.efLeft-enter-active
  transition all 0.25s
  opacity 0
  left -200px
.efLeft-enter-to
  opacity 1
  left 0
.efLeft-leave-active
  opacity 1
  left 0
.efLeft-leave-to
  transition all 0.25s
  opacity 0
  left -240px
  
// 主题
.leftBar.lb_indigo, .leftBar.lb_redorange, .leftBar.lb_baby, .leftBar.lb_tuna, .leftBar.lb_dota2, .leftBar.lb_batman
  background-color #5069C4
  .curUser
    background-color transparent
    border-top 1px solid rgba(0,0,0,.08)
    .curUserIfm a
      color #fff
  .logoCon
    background-color transparent
    border-bottom 1px solid rgba(0,0,0,.08)
    .logo span
      color #fff
    .subLogo
      color #fff
  .leftBarNav
    background-color transparent

// indigo
.leftBar.lb_indigo
  background-color #5069C4
  .leftBarMenu
    &.tb-menu
      background-color transparent
    .tb-menu-label
      background-color transparent
      opacity .7
      color #fff
      &:hover
        background-color #455aa8
      &:hover, &:focus
        color #fff
      &.router-link-active
        background-color #455AA8

// redorange
.leftBar.lb_redorange
  background-color #F44336
  .leftBarMenu
    &.tb-menu
      background-color transparent
    .tb-menu-label
      background-color transparent
      opacity .7
      color #fff
      &:hover
        background-color rgba(255,255,255,0.4)
      &:hover, &:focus
        color #fff
      &.router-link-active
        background-color rgba(255,255,255,0.2)

// baby
.leftBar.lb_baby
  background-image url('http://oby88n25g.bkt.clouddn.com/angelababy.jpeg')
  background-position-x -20px
  .leftBarMenu
    &.tb-menu
      background-color transparent
    .tb-menu-label
      background-color transparent
      opacity .7
      color #fff
      &:hover
        background-color rgba(255,255,255,0.4)
      &:hover, &:focus
        color #fff
      &.router-link-active
        background-color rgba(255,255,255,0.2)

// dota2
.leftBar.lb_dota2
  background-image url('http://oby88n25g.bkt.clouddn.com/dota2.jpg')
  background-position-x -700px
  .leftBarMenu
    &.tb-menu
      background-color transparent
    .tb-menu-label
      background-color transparent
      opacity .7
      color #fff
      &:hover
        background-color rgba(255,255,255,0.4)
      &:hover, &:focus
        color #fff
      &.router-link-active
        background-color rgba(255,255,255,0.2)

// tuna
.leftBar.lb_tuna
  background-color #323346
  .leftBarMenu
    &.tb-menu
      background-color transparent
    .tb-menu-label
      background-color transparent
      opacity .7
      color #fff
      &:hover
        background-color rgba(255,255,255,0.4)
      &:hover, &:focus
        color #fff
      &.router-link-active
        background-color rgba(255,255,255,0.2)

// batman
.leftBar.lb_batman
  background-image url('http://oby88n25g.bkt.clouddn.com/batman.jpeg')
  background-position-x -700px
  .leftBarMenu
    &.tb-menu
      background-color transparent
    .tb-menu-label
      background-color transparent
      opacity .7
      color #fff
      &:hover
        background-color rgba(255,255,255,0.4)
      &:hover, &:focus
        color #fff
      &.router-link-active
        background-color rgba(255,255,255,0.2)
</style>

<template>
  <transition name="efLeft">
    <div class="leftBar" :class="leftBarClass" v-if="isLeftFixed">
      <logo-con></logo-con>
      <tb-card class="leftBarNav tb-m-t-20">
        <tb-card-body>
          <tb-menu class="tb-p-b-20 leftBarMenu">
            <tb-menu-item label="首页" :index="1" icon="view-list" :is-router="true" url="/index"></tb-menu-item>
            <tb-menu-item label="表单例子" :index="1" icon="view-list">
              <tb-menu>
                <tb-menu-item label="基础表单" :index="2" :is-router="true" url="/form"></tb-menu-item>
                <tb-menu-item label="数据列表" :index="2" :is-router="true" url="/data"></tb-menu-item>
              </tb-menu>
            </tb-menu-item>
            <tb-menu-item label="个人信息" :index="1" icon="view-list" :is-router="true" url="/profile"></tb-menu-item>
            <tb-menu-item label="登录" :index="1" icon="view-list" :is-router="true" url="/login"></tb-menu-item>
            <tb-menu-item label="404" :index="1" icon="view-list" :is-router="true" url="/404"></tb-menu-item>
          </tb-menu>
        </tb-card-body>
      </tb-card>
      <cur-user></cur-user>
    </div>
  </transition>
</template>

<script>
  import LogoCon from '../logocon/logocon';
  import CurUser from '../curuser/curuser';

  export default {
    props: {
      isLeftFixed: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        pathName: window.location.pathname,
        leftBarClass: ''
      }
    },

    created () {
    },

    methods: {
    },

    components: {
      LogoCon,
      CurUser
    }
  }
</script>