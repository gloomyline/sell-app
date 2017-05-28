<template>
  <div class="shop-cart">
    <!-- 底部购物车主界面 -->
    <div class="content">
      <!-- 左侧内容区块 -->
      <div class="content-left">
        <!-- 购物车logo -->
        <div class="logo-wrapper">
          <div class="logo" :class="{'has-food': totalCount > 0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <!-- 结算金额 -->
        <div class="price" :class="{'has-food': totalPrice > 0}">&yen;{{totalPrice}}元</div>
        <!-- 描述 -->
        <div class="desc">另需配送费&yen;{{deliveryPrice}}元</div>
      </div>
      <!-- 右侧结算区块 -->
      <div class="content-right">
        <p class="pay" :class="{'has-pay': pay[1] === 3}">{{pay[0]}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      'selectFoods': {
        type: Array,
        default () {
          return [{
            price: 10,
            count: 2
          }]
        }
      },
      'deliveryPrice': {
        type: Number,
        default: 0
      },
      'minPrice': {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food, index) => {
          total += food.price * food.count
        })

        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      pay () {
        if (this.totalPrice === 0) {
          return [`¥${this.minPrice}起送`, 1]
        }
        else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
          return [`还差¥${this.minPrice - this.totalPrice}起送`, 2]
        }
        else {
          return ['去结算', 3]
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"

  .shop-cart
    position fixed
    left 0
    bottom 0
    z-index 5
    width 100%
    height 48px
    .content
      display flex
      font-size 0
      color-shop-cart()
      background #141d27
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          width 56px
          height 56px
          margin 0 18px
          padding 6px
          border-radius 50%
          box-sizing border-box
          background #141d27
          .logo
            width 100%
            height 100%
            text-align center
            border-radius 50%
            background #2b343c
            .icon-shopping_cart
              font-size 24px
              line-height 44px
              color #80858a
            &.has-food
              background rgb(0, 160, 220)
              .icon-shopping_cart
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #fff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, .4)
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, .1)
          font-size 16px
          font-weight 700
          &.has-food
            color #fff
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 12px
          font-weight 400
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          padding 0 8px
          font-size 14px
          font-weight 700
          line-height 48px
          text-align center
          background #2b333b
          &.has-pay
            color #fff
            background #00b43c
</style>
