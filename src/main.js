import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles/base.scss'
Vue.config.productionTip = false

// 数字变成变单位的数字
/*
Vue.filter()
第一个参数  是过滤器的名字
第二个参数  是回调函数,必须有返回值
*/
// 注册全局过滤器
Vue.filter('formatYi', (value) => {
  var Yi = Math.pow(10, 8) // 10,0000,000
  /*eslint-disable */
  if (value > Yi) {
    return `${(value/Yi).toFixed(2)}亿`
  } else {
    return `${(value/Math.pow(10,4)).toFixed(2)}万`
  }
  /* eslint-enable */
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
