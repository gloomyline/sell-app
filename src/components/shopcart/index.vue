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
    <!-- 小球容器 -->
    <div class="balls-container">
      <transition name="drop" v-for="(ball, index) in balls" :key="ball + '-' + index"
                  @before-enter="_beforeEnter"
                  @enter="_enter"
                  @after-enter="_afterEnter">
        <div class="ball" v-show="ball.show">
          <span class="inner"></span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import eventBus from '@/common/js/eventBus'

  export default{
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [{
            price: 10,
            count: 2
          }]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [
          { show: false },
          { show: false },
          { show: false },
          { show: false },
          { show: false }
        ],
        dropBalls: []
      }
    },
    mounted () {
      eventBus.$on('cart-increase', (event) => {
        this.drop(event.target)
      })
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
    },
    methods: {
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      _beforeEnter (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 32)
            el.style.display = ''
            el.style.transform = `translate3d(${x}px, 0, 0)`
            el.style.webkitTransform = `translate3d(${x}px, 0, 0)`
            el.querySelector('.inner').style.transform = `translate3d(0, ${y}px, 0)`
            el.querySelector('.inner').style.webkitTransform = `translate3d(0, ${y}px, 0)`
          }
        }
      },
      _enter (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight // 修改 DOM, 触发 DOM 重绘
        this.$nextTick(() => {
          el.style.transform = 'translate3d(0, 0, 0)'
          el.style.webkitTransform = 'translate3d(0, 0, 0)'
          el.querySelector('.inner').style.transform = `translate3d(0, 0, 0)`
          el.querySelector('.inner').style.webkitTransform = `translate3d(0, 0, 0)`
        })
        el.addEventListener('transitionend', done)
      },
      _afterEnter (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
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
    .balls-container
      .ball
        position fixed
        left 37px
        bottom 22px
        z-index 200
        transition all .5s linear
        .inner
          display inline-block
          width 16px
          height 16px
          border-radius 50%
          background rgb(0, 160, 220)
          transition all .5s cubic-bezier(0.49, -0.29, 0.75, 0.41)
</style>
