<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods" class="tab-button">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" class="tab-button">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" class="tab-button">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header'

  const ERR_OK = 0

  export default {
    name: 'app',
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.$http.get('/api/seller').then(res => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.seller = res.data
        }
        else {
          console.log(res.msg)
        }
      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  #app
    .tab
      display flex
      height 40px
      border-1px(rgba(7, 17, 27, .1))
      .tab-item
        flex 1
        line-height 40px
        .tab-button
          display block
          font-size 14px
          text-align center
          color rgb(77, 86, 93)
          &.active
            color rgb(240, 20, 20)
</style>
