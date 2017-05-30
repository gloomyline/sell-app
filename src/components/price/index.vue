<template>
  <div class="price">
    <span class="cur-price">&yen;{{price.price}}</span>
    <span class="old-price" v-if="price.oldPrice">{{price.oldPrice}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      price: {
        type: Object,
        default () {
          return {
            price: 5,
            oldPrice: 10
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .price
    font-size 0
    height 24px
    line-height 24px
    .cur-price
      margin-right 8px
      font-size 14px
      font-weight 700
      color rgb(240, 20, 20)
    .old-price
      font-size 10px
      font-weight normal
      text-decoration: line-through
      color rgb(147, 153, 159)
</style>
