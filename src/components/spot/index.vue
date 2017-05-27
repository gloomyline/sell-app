<template>
  <div class="icon" :class="iconClass">
    <span :class="[classMap[spotType], iconClass]" class="icon"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      spotType: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    computed: {
      iconClass () {
        return 'spot-' + this.size
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .icon
    display inline-block
    background-repeat no-repeat
    vertical-align top
    &.spot-1
      width 12px
      height 12px
      background-size 12px 12px
      &.decrease
        bg-img('decrease_1')
      &.guarantee
        bg-img('guarantee_1')
      &.discount
        bg-img('discount_1')
      &.special
        bg-img('special_1')
      &.invoice
        bg-img('invoice_1')
    &.spot-2
      width 16px
      height 16px
      background-size 16px 16px
      &.decrease
        bg-img('decrease_2')
      &.guarantee
        bg-img('guarantee_2')
      &.discount
        bg-img('discount_2')
      &.special
        bg-img('special_2')
      &.invoice
        bg-img('invoice_2')
    &.spot-3
      width 12px
      height 12px
      background-size 12px 12px
      &.decrease
        bg-img('decrease_3')
      &.guarantee
        bg-img('guarantee_3')
      &.discount
        bg-img('discount_3')
      &.special
        bg-img('special_3')
      &.invoice
        bg-img('invoice_3')
    &.spot-4
      width 16px
      height 16px
      background-size 16px 16px
      &.decrease
        bg-img('decrease_4')
      &.guarantee
        bg-img('guarantee_4')
      &.discount
        bg-img('discount_4')
      &.special
        bg-img('special_4')
      &.invoice
        bg-img('invoice_4')
</style>
