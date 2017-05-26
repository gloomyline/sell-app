<template>
  <div class="app">
    <v-header class="header"></v-header>
    <div class="tab">
      <div class="tab-item">
        <a v-link="{path: '/goods'}" class="tab-button">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path: '/ratings'}" class="tab-button">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path: '/seller'}" class="tab-button">商家</a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header'

  export default{
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin"

  .app
    .tab
      display flex
      height 40px
      border-1px(rgba(7, 17, 27, .1))
      .tab-item
        flex 1
        line-height 40px
        text-align center
        color rgb(77, 85, 93)
        & > .tab-button
          display block
          &.active
            color rgb(240, 20, 20)
</style>
