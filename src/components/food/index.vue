<template>
  <!-- 食物详情弹窗 -->
  <transition name="move-left">
    <div v-show="showFlag" class="food">
      <!-- 弹窗内容 -->
      <div class="food-content">
        <!-- 头部图片 -->
        <div class="img-header">
          <img :src="food.image">
          <div class="back-btn" @click="close">
            <i class="icon-arrow_lift"></i>
            <span class="text">返回</span>
          </div>
        </div>
        <!-- 详情内容 -->
        <div class="content">
          <h2 class="title">{{food.name}}</h2>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <price :price="{price: food.price, oldPrice: food.oldPrice}"></price>
          <!-- 食物加减按钮 -->
          <div class="cart-control-wrapper">
            <cart-control :food="food"></cart-control>
          </div>
          <!-- 加入购物车按钮 -->
          <transition name="fade">
            <div v-show="!food.count || food.count === 0" @click.stop.prevent="addToCart" class="buy">加入购物车</div>
          </transition>
        </div>
        <!-- 商品信息 -->
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h2 class="title">商品介绍</h2>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <!-- 商品评价 -->
        <div class="rating">
          <h2 class="title">商品评价</h2>
          <rating-select :select-type="selectType" :only-content="onlyContent" :desc="desc"
                         :ratings="food.ratings"></rating-select>
          <div class="rating-wrapper">
            <!-- 评价列表 -->
            <ul v-if="food.ratings && food.ratings.length">
              <li v-for="rating in filterRatings" class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" class="avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <i :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></i>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <!-- 暂无评价 -->
            <div class="no-rating" v-else>暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import eventBus from '@/common/js/eventBus'
  import BScroll from 'better-scroll'
  import {formatDate} from '@/common/js/date'

  import price from '@/components/price'
  import cartControl from '@/components/cartcontrol'
  import split from '@/components/split'
  import ratingSelect from '@/components/ratingSelect'

  //  const POSITIVE = 0
  //  const NEGATIVE = 1
  const ALL = 2

  export default{
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    components: {
      price,
      split,
      cartControl,
      ratingSelect
    },
    created () {
      eventBus.$on('rating-type-select', (selType) => {
        this.selectType = selType
        this.$nextTick(() => {
          this.bScroll.refresh()
        })
      })
      eventBus.$on('rating-content-toggle', () => {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.bScroll.refresh()
        })
      })
    },
    computed: {
      filterRatings () {
        let ratings = this.food.ratings
        if (this.onlyContent) {
          let _ratings = ratings.filter((rating) => {
            return rating.text
          })
          if (this.selectType === ALL) {
            return _ratings
          }
          else {
            return _ratings.filter((rating) => {
              return rating.rateType === this.selectType
            })
          }
        }
        else {
          if (this.selectType === ALL) {
            return ratings
          }
          else {
            return ratings.filter((rating) => {
              return rating.rateType === this.selectType
            })
          }
        }
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = false
        this.filterRatings = this.food.ratings
        this.$nextTick(() => {
          if (!this.bScroll) {
            this.bScroll = new BScroll(this.$el, { click: true })
          }
          else {
            this.bScroll.refresh()
          }
        })
      },
      close (event) {
        if (!event._constructed) return
        this.showFlag = false
      },
      addToCart (event) {
        if (!event._constructed) return
        Vue.set(this.food, 'count', 1)
        eventBus.$emit('cart-increase', event)
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    beforeDestroyed () {
      eventBus.$off('rating-type-select')
      eventBus.$off('rating-content-toggle')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    padding-bottom 48px
    background #fff
    color #fff
    transform translate3d(0, 0, 0)
    &.move-left-enter-active
      transition all .4s ease
    &.move-left-leave-active
      transition all .3s ease-out
    &.move-left-enter, &.move-left-leave-active
      opacity 0
      transform translate3d(100%, 0, 0)
    .food-content
      .img-header
        position relative
        width 100%
        height 0
        padding-top 100% /* 根据盒子宽度计算，100% 可以使盒子宽高相等 */
        img
          position absolute
          left 0
          top 0
          width 100%
          height 100%
        .back-btn
          position absolute
          left 0
          top 0
          padding 10px
          .icon-arrow_lift
            display inline-block
            vertical-align top
            font-size 20px
          .text
            display inline-block
            vertical-align top
            font-size 20px
      .content
        position relative
        padding 18px
        .title
          margin-bottom 8px
          line-height 14px
          font-size 14px
          font-weight 700
          color rgb(7, 17, 27)
        .detail
          margin-bottom 18px
          height 10px
          line-height 10px
          .sell-count, .rating
            font-size 10px
            color rgb(147, 153, 159)
          .sell-count
            margin-right 12px
        .cart-control-wrapper
          position absolute
          right 12px
          bottom 12px
        .buy
          position absolute
          right 18px
          bottom 18px
          z-index 10
          height 24px
          line-height 24px
          padding 0 12px
          box-sizing border-box
          border-radius 12px
          font-size 10px
          background rgb(0, 160, 220)
          &.fade-enter-active, &.fade-leave-active
            transition all .2s ease
          &.fade-enter, &.fade-leave-active
            opacity 0
      .info
        padding 18px
        .title
          line-height 14px
          margin-bottom 6px
          font-size 14px
          color rgb(7, 17, 27)
        .text
          line-height 24px
          padding 0 8px
          font-size 12px
          color rgb(77, 85, 93)
      .rating
        padding-top 18px
        .title
          line-height 14px
          margin-left 18px
          font-size 14px
          color rgb(7, 17, 27)
        .rating-wrapper
          padding 0 18px
          .rating-item
            position relative
            padding 16px 0
            border-1px(rgba(7, 17, 27, .1))
            .user
              position absolute
              right 0
              top 16x
              line-height 12px
              font-size 0
              .name
                display inline-block
                vertical-align top
                margin-right 6px
                font-size 10px
                color rgb(147, 153, 159)
              .avatar
                border-radius 50%
            .time
              margin-bottom 6px
              font-size 10px
              line-height 12px
              color rgb(147, 153, 159)
            .text
              line-height 16px
              font-size 12px
              color rgb(7, 17, 27)
              .icon-thumb_up, .icon-thumb_down
                margin-right 4px
                line-height 16px
                font-size 12px
              .icon-thumb_up
                color rgb(0, 160, 220)
              .icon-thumb_down
                color rgb(147, 153, 159)
          .no-rating
            padding 16px 0
            font-size 12px
            color rgb(147, 153, 159)
</style>
