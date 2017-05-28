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
