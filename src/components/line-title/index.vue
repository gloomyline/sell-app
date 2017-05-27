<template>
  <div class="line-title">
    <div class="line"></div>
    <div class="title" :class="txtType">{{text}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      text: {
        type: String
      },
      textType: {
        type: Number
      }
    },
    computed: {
      txtType () {
        return 'text-' + this.textType
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .line-title
    display flex
    .line
      flex 1
      position relative
      top -6px
      border-bottom 1px solid rgba(255, 255, 255, .2)
    .title
      padding 0 12px
      .text-1
        line-height 14px
        font-size 14px
        font-weight bold
</style>
