<template>
  <div class="goods">
    <div class="menu-wrapper">
      <li v-for="good in goods" class="menu-item border-1px">
        <span class="text border-1px"><spot v-show="good.type>0" :spotType="good.type" :size="3" class="spot"></spot>
        {{good.name}}</span>
      </li>
    </div>
    <div class="foods-wrapper">
      <li v-for="good in goods" class="food-list">
        <h1 class="title">{{good.name}}</h1>
        <ul>
          <li v-for="food in good.foods" class="food-item border-1px">
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
            </div>
          </li>
        </ul>
      </li>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import spot from '@/components/spot'

  const ERR_OK = 0

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: []
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((res) => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.goods = res.data
        }
        else {
          console.log(res.msg)
        }
      })
    },
    components: {
      spot
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
            line-height 10px
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
</style>
