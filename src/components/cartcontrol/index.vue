<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0"
           @click.stop.prevent="decreaseCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click.stop.prevent="increaseCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import eventBus from '@/common/js/eventBus'

  export default{
    props: {
      food: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    mounted () {
    },
    methods: {
      increaseCart (event) {
        if (!event._constructed) return
        if (!this.food.count) {
          // 通过 Vue 全局接口 Vue.set(ob, defineProp, val) 去添加观察数据的字段
          Vue.set(this.food, 'count', 1)
        }
        else {
          this.food.count++
        }
        event.target.index = this.index
        eventBus.$emit('cart-increase', event)
      },
      decreaseCart (event) {
        if (!event._constructed) return
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cart-control
    font-size 0
    .cart-decrease
      display inline-block
      vertical-align top
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
      &.move-enter-active, &.move-leave-active
        transition all .4s ease
      &.move-enter, &.move-leave-active
        transform translate3d(24px, 0, 0) rotate(180deg)
        opacity 0
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      font-size 10px
      line-height 24px
      text-align center
      color rgb(147, 153, 159)
    .cart-increase
      display inline-block
      vertical-align top
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
</style>
