<template>
  <div class="goods">
    <!-- 左侧菜单栏 -->
    <div class="menu-wrapper">
      <ul>
        <li v-for="(good, index) in goods" class="menu-item border-1px" :class="{'current': currentIndex === index}"
            @click="selectMenu(index, $event)">
          <span class="text border-1px"><spot v-show="good.type>0" :spotType="good.type" :size="3" class="spot"></spot>
          {{good.name}}</span>
        </li>
      </ul>
    </div>
    <!-- 右侧食品栏 -->
    <div class="foods-wrapper">
      <!-- 对应左侧一个菜单下的区块 -->
      <ul class="food-list-hook">
        <li v-for="good in goods" class="food-list">
          <h1 class="title">{{good.name}}</h1>
          <!-- 每个个菜单下的列表 -->
          <ul>
            <li v-for="(food, index) in good.foods" @click="selectFood(food, $event)" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="sell-count">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="cur-price">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food" :index="index"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
               :min-price="seller.minPrice"></shop-cart>
    <food ref="food" :food="selectedFood"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import spot from '@/components/spot'
  import food from '@/components/food'
  import shopcart from '@/components/shopcart'
  import cartcontrol from '@/components/cartcontrol'

  const ERR_OK = 0

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    mounted () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((res) => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.goods = res.data
        }
        else {
          console.log(res.msg)
        }
        // 异步更新数据，需要手动更新 DOM ，初始化滚动
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      })
    },
    computed: {
      currentIndex () {
        let listHeight = this.listHeight
        for (let i = 0; i < listHeight.length; i++) {
          let _curH = listHeight[i]
          let _nextH = listHeight[i + 1]
          if (!_nextH || (this.scrollY >= _curH && this.scrollY < _nextH)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (!!food.count || food.count > 0) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$el.querySelector('.menu-wrapper'), { click: true })

        this.foodsScroll = new BScroll(this.$el.querySelector('.foods-wrapper'), {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$el.querySelector('.food-list-hook')
        let _height = 0
        this.listHeight.push(_height)
        for (let i = 0, children = foodList.children; i < children.length; i++) {
          let item = children[i]
          _height += item.clientHeight
          this.listHeight.push(_height)
        }
      },
      selectMenu (index, event) { // 点击左侧菜单中的 item 监听
        if (!event._constructed) return // 去除浏览器也就是原生点击事件派发的事件干扰，确保在浏览器只触发一次点击事件
        let foodList = this.$el.querySelector('.food-list-hook').children
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      selectFood (food, event) { // 点击右侧食品列表中的 item 监听
        if (!event._constructed) return
        this.selectedFood = food
        this.$refs.food.show()
      }
    },
    components: {
      spot,
      food,
      'shop-cart': shopcart,
      'cart-control': cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"

  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    font-size 0
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        width 56px
        height 54px
        padding 0 12px
        line-height 14px
        border-1px(rgba(7, 17, 27, .1))
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          .text
            border-none()
            font-weight 700
        .text
          display table-cell
          font-size 12px
          font-weight 200
          vertical-align middle
          .spot
            margin-right 2px
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        font-size 12px
        color rgb(147, 153, 159)
        border-left 2px solid #d9dde1
        background #f3f5f7
      .food-item
        display flex
        position relative
        margin 18px
        padding-bottom 18px /* 注意两个元素 margin 重合，这里采用 padding 避免 */
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          border-none
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
          border-radius 2px
        .content
          flex 1
          color rgb(147, 153, 159)
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            font-weight bold
            color rgb(7, 17, 27)
          .desc
            margin-bottom 8px
            line-height 14px
            font-size 10px
          .extra
            font-size 0
            line-height 10px
            margin-bottom 8px
            .sell-count
              display inline-block
              margin-right 12px
              font-size 10px
            .rating
              font-size 10px
          .price
            font-size 0
            line-height 24px
            .cur-price
              display inline-block
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
              font-weight 700
            .old-price
              font-size 10px
              font-weight normal
              text-decoration: line-through
              color rgb(7, 17, 27)
          .cart-control-wrapper
            position absolute
            right 0
            bottom 16px
</style>
