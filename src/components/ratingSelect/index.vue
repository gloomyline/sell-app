<template>
  <div class="rating-select">
    <!-- 评价标签选择器 -->
    <div class="rating-type border-1px">
      <span class="block positive" :class="{active: selectType === 2}" @click.stop="select(2, $event)">
        {{desc.all}}<span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" :class="{active: selectType === 0}" @click.stop="select(0, $event)">
        {{desc.positive}}<span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative" :class="{active: selectType === 1}" @click.stop="select(1, $event)">
        {{desc.negative}}<span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <!-- 评价根据内容有无筛选 -->
    <div class="switch" :class="{on: onlyContent}" @click="toggleContent">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import eventBus from '@/common/js/eventBus'
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default{
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: true
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      select (selType, event) {
        if (!event._constructed) return
        eventBus.$emit('rating-type-select', selType)
      },
      toggleContent (event) {
        if (!event._constructed) return
        eventBus.$emit('rating-content-toggle')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .rating-select
    .rating-type
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, .1))
      font-size 0
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        line-height 16px
        border-radius 2px
        font-size 12px
        color rgb(77, 85, 93)
        &.active
          color #fff
        .count
          margin-left 2px
          font-size 8px
        &.positive
          background rgba(0, 160, 220, .2)
          &.active
            background rgb(0, 160, 220)
        &.negative
          background rgba(77, 85, 93, .2)
          &.active
            background rgb(77, 85, 93)
    .switch
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7, 17, 27, .1)
      color rgb(147, 153, 159)
      font-size 0
      &.on
        .icon-check_circle
          color #00c850
      .icon-check_circle
        display inline-block
        vertical-align top
        margin-right 4px
        font-size 24px
      .text
        display inline-block
        vertical-align top
        font-size 12px
</style>
