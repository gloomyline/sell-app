<template>
  <div class="header">
    <!-- 上部店家信息 -->
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="This is avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">{{seller.description}} / {{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <spot :spotType="seller.supports[0].type" :size="1"></spot>
          <span class="desc">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!-- 公告 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="icon"></span>
      <span class="text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 头部背景 -->
    <div class="bg">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!-- 弹出店家详细信息弹窗 -->
    <transition name="fade">
      <div v-show="detailShow" class="detail-show">
        <!-- 弹窗内容 -->
        <div class="detail-wrapper clearfix">
          <div class="detail-content">
            <h1 class="title">{{seller.name}}</h1>
            <div class="rating-star">
              <star :score="seller.score" :size="48"></star>
            </div>
            <line-title :text="'优惠信息'" :textType="1" class="line-title"></line-title>
            <ul v-if="seller.supports" class="discount-infos">
              <li v-for="support in seller.supports" class="discount-item">
                <!--<span class="icon" :class="classMap[support.type]"></span>-->
                <spot :spotType="support.type" :size="1"></spot>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
            <line-title :text="'商家公告'" :textType="1" class="line-title"></line-title>
            <div class="bulletin-info">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <!-- 弹窗关闭按钮 -->
        <div class="detail-close">
          <i class="icon-close" @click="hideDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '@/components/star'
  import lineTitle from '@/components/line-title'
  import spot from '@/components/spot'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false,
        starType: []
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      showDetail () {
        this.detailShow = !this.detailShow
      },
      hideDetail () {
        this.detailShow = !this.detailShow
      }
    },
    components: {
      star,
      spot,
      'line-title': lineTitle
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"

  .header
    position relative
    overflow hidden // 去除背景加了模糊效果的阴影
    font-size 0
    color #fff
    background rgba(7, 17, 27, .5)
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        vertical-align top
        margin-left 16px
        .title
          font-size 16px
          font-weight bold
          line-height 18px
          .brand
            bg-img('brand')
            inline-icon(30px, 18px)
        .desc
          margin-top 8px
          font-size 12px
          font-weight 200
        .support
          margin-top 10px
          font-size 10px
          font-weight 200
          .icon
            inline-icon(12px, 12px)
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
      .support-count
        position absolute
        right 12px
        bottom 18px
        height 24px
        line-height 24px
        padding 0 8px
        border-radius 14px
        background rgba(0, 0, 0, .2)
        .count
          font-size 10px
          font-weight 200
        .icon-keyboard_arrow_right
          font-size 10px
          margin-left 2px

    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      font-size: 10px // 继承自 header 0px会不显示省略号效果
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7, 17, 27, 0.2)
      .icon
        display: inline-block
        vertical-align: top
        margin-top: 8px
        width: 22px
        height: 12px
        bg-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .text
        vertical-align: top
        margin: 0 4px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .bg
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail-show
      position fixed
      top 0
      left 0
      z-index 99
      width 100%
      height 100%
      overflow auto
      background rgba(7, 17, 27, .8)
      -webkit-backdrop-filter blur(10px)
      &.fade-enter-active
        transition all .5s ease
      &.fade-leave-active
        transition all .3s ease-out
      &.fade-enter, &.fade-leave-to
        opacity 0
        background rgba(7, 17, 27, 0)
      .detail-wrapper
        width 100%
        min-height 90%
        .detail-content
          margin-top 64px
          padding-bottom 64px /* css sticky footer */
          font-size 24px
          .title
            line-height 16px
            text-align center
            font-size 16px
            font-weight 700
          .rating-star
            margin 16px 0 28px
            padding 2px 0
            text-align center
          .line-title
            width 80%
            margin 0 auto 24px auto
          .discount-infos
            width 80%
            margin 0 auto 18px auto
            .discount-item
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .icon
                inline-icon(16px, 16px)
                &.decrease
                  bg-img('decrease_1')
                &.discount
                  bg-img('discount_1')
                &.guarantee
                  bg-img('guarantee_1')
                &.invoice
                  bg-img('invoice_1')
                &.special
                  bg-img('special_1')
              .text
                margin-left 6px
                font-size 12px
                font-weight 200
                line-height 16px
          .bulletin-info
            width 80%
            margin 0 auto
            .content
              padding 0 12px
              font-size 12px
              font-weight 200
              line-height 24px
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
</style>
