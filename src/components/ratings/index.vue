<template>
  <div class="ratings">
    <!-- 评价内容 -->
    <div class="ratings-content">
      <!-- 预览区 -->
      <div class="overview">
        <!-- 预览区左侧信息 -->
        <div class="overview-left">
          <h2 class="score">{{seller.score}}</h2>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <!-- 预览区右侧信息 -->
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split class="split" v-if="ratings"></split>
      <!-- 评价选择标签 -->
      <rating-select :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></rating-select>
      <!-- 评价列表 -->
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in filterRatings" class="rating-item border-1px">
            <!-- item 左侧用户头像 -->
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <!-- item 右侧评价内容 -->
            <div class="content">
              <h2 class="name">{{rating.username}}</h2>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score" class="star"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend-wrapper" v-show="rating.recommend && rating.recommend.length">
                <i class="icon-thumb_up"></i>
                <span v-for="item in rating.recommend" class="recommend">{{item | abbr}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import eventBus from '@/common/js/eventBus'
  import {formatDate} from '@/common/js/date'
  import star from '@/components/star'
  import split from '@/components/split'
  import ratingSelect from '@/components/ratingSelect'

  const ERR_OK = 0
  const ALL = 2

  export default{
    props: {
      seller: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: false
      }
    },
    created () {
      this.selectType = ALL
      this.onlyContent = false
      this.$http.get('/api/ratings').then((res) => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.ratings = res.data

          // 异步更新数据，需要手动更新 DOM ，初始化滚动
          this.$nextTick(() => {
            this._initScroll()
          })
        }
        else {
          console.log(res.msg)
        }
      })
      eventBus.$on('rating-type-select', (selType) => {
        this.selectType = selType
        if (this.bScroll) {
          this.$nextTick(() => {
            this.bScroll.refresh()
          })
        }
      })

      eventBus.$on('rating-content-toggle', (selType) => {
        this.onlyContent = !this.onlyContent
        if (this.bScroll) {
          this.$nextTick(() => {
            this.bScroll.refresh()
          })
        }
      })
    },
    computed: {
      filterRatings () {
        let ratings = this.ratings
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
      _initScroll () {
        this.bScroll = new BScroll(this.$el, { click: true })
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      },
      abbr (str) {
        if (str.length && str.length > 5) {
          return str.substr(0, 5) + '...'
        }
        return str
      }
    },
    beforeDestroyed () {
      eventBus.$off('rating-type-select')
      eventBus.$off('rating-content-toggle')
    },
    components: {
      star,
      split,
      ratingSelect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        position relative
        padding 18px 0
        border-1px(rgba(7, 17, 27, .1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          flex 1
          .name
            line-height 12px
            font-size 10px
            color rgb(7, 17, 27)
            margin-bottom 4px
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              vertical-align top
              margin-right 6px
            .delivery
              display inline-block
              vertical-align top
              line-height 12px
              font-size 10px
              font-weight 200
              color rgb(147, 153, 159)
          .text
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          .recommend-wrapper
            margin-top 8px
            font-size 0
            .icon-thumb_up
              display inline-block
              vertical-align top
              margin-right 8px
              line-height 16px
              font-size 12px
              color rgb(0, 160, 220)
            .recommend
              display inline-block
              vertical-align top
              line-height 16px
              margin-right 8px
              font-size 9px
              border 1px solid rgba(7, 17, 27, .1)
              border-radius 2px
          .time
            position absolute
            top 18px
            right 0
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
</style>
