<style lang="stylus">
  footer
    color #767676
    text-align center
    margin-left 200px
    padding 40px 60px
    &.fullFooter
      margin-left 0
  @media screen and (max-width: 768px)
    footer
      margin-left 0
</style>
<template>
  <footer :class="{'fullFooter': !isLeftFixed}">
    <p>杭州铜板街互联网金融信息服务有限公司&nbsp;&nbsp;版权所有&nbsp;&nbsp;2012-2016&nbsp;&nbsp;浙B2-20140310&nbsp;&nbsp;浙ICP备12044815号&nbsp;&nbsp;市场有风险，投资需谨慎</p>
  </footer>
</template>

<script>
  export default {
    props: {
      isLeftFixed: {
        type: Boolean,
        default: true
      }
    }
  }
</script>