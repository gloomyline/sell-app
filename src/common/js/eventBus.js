/**
 * Created by Alan on 2017/5/29.
 */

'use strict'

import Vue from 'vue'

// 为了 shop-cart 和 cart-control 之间实现通信，创建事件总线
const eventBus = new Vue()

export default eventBus
