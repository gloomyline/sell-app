# sell-app

> A mobile terminal web app powered by Vue2.0

## problems
1. web fonts 在 stylesheet 中无法解析url，需要在js中引入使用
2. 使用文本过长截取并显示省略号效果的时候，字体大小需要指定
3. 使用 better-scroll 插件做滚动效果的时候，传递的第一个参数要求包含 ul 的 dom 节点
```html
<template>
  <div id="wrapper">
    <ul>
      <li>...</li>
      <li>...</li>
      ...
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  new BScroll(this.$el.getElementById('wrapper'));
</script>
```
4. Vue 中由于数据更新是异步的，所以在操作的 DOM 的时候需要特别注意，
需要将这些操作放在 vm.$nextTick() 的回调中去执行
```javascript
this.$nextTick(() => {
  // 此处放对 DOM 的一些操作，例如计算节点的高度
  let height = node.clientHeight
})
```
5. 列表的过渡效果，使用内置组件 <transition-group>
  - 特点
    - 不同于 <transition>,它会以一个真实元素呈现:默认为一个 <span>。
    可以通过 tag 特性更换为其他元素
    - 内部元素 **总是需要** 提供 **唯一** 的 key 属性值
  - 例子
  
    html 代码
    ```html
    <div id="list-demo" class="demo">
      <button v-on:click="add">Add</button>
      <button v-on:click="remove">Remove</button>
      <transition-group name="list" tag="p">
        <span v-for="item in items" v-bind:key="item" class="list-item">
          {{ item }}
        </span>
      </transition-group>
    </div>
    ```
    js 代码
    ```javascript
    new Vue({
      el: '#list-demo',
      data: {
        items: [1,2,3,4,5,6,7,8,9],
        nextNum: 10
      },
      methods: {
        randomIndex: function () {
          return Math.floor(Math.random() * this.items.length)
        },
        add: function () {
          this.items.splice(this.randomIndex(), 0, this.nextNum++)
        },
        remove: function () {
          this.items.splice(this.randomIndex(), 1)
        },
      }
    })
    ```
    css 样式
    ```stylesheet
    .list-item {
      display: inline-block;
      margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
      transition: all 1s;
    }
    .list-enter, .list-leave-active {
      opacity: 0;
      transform: translateY(30px);
    }
    ```
6. 自定义事件 (非父子组件通信)

    有时候两个组件也需要通信(非父子关系)。在简单的场景下，可以使用一个空的 Vue 实例作为中央事件总线：
    ```javascript
    let bus = new Vue()
 
    // 触发组件 A 中的事件
    bus.$emit('id-selected', id)
 
    // 在组件 B 创建的 hook 中监听事件
    bus.$on('id-selected', (id) => {
     // 事件触发回调
     ...
    })
    ```
    在复杂的情况下，我们应该考虑使用专门的[状态管理模式](https://cn.vuejs.org/v2/guide/state-management.html)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
