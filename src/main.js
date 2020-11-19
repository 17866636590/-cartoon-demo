import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Notify } from 'vant'
import VueLazyload from 'vue-lazyload'

import './assets/styles/base.scss'
Vue.use(VueLazyload, {
  preLoad: 1.3, // 预加载高度1.3(当前屏幕高度的1.3倍)
  error: require('./assets/logo.png'), // 当加载不出图片时.显示替代的图片
  loading: require('./assets/loading.gif'), // 当加载图片过程中显示的图片
  attempt: 1 // 如果加载失败,尝试加载真实图片的次数
/*
vueLazyload中的坑
error和loading这两个图片的路径,可以使用线上的图片,也可以使用本地的图片格式,但是注意
1.src文件夹中的图片,需要使用require()中引入
2如果将图片放在public文件夹中,可以将public看出/ 拼接url

localhost:8080 访问项目时,实际访问的是dist中的内容
为什么我们在没有打包之前,也能访问呢,webpack将打包成的dist,放在内存里面,并没有生成实际的文件

通过 require 引入图片路径的话,webpack 识别require,将require引入的路径,做一个拷贝,直接将连接指向的资源,打成base64的二进制数据,打包到.js文件中

import 动态引入
require 静态拷贝
*/
})
Vue.config.productionTip = false
// 全局注册
Vue.use(Notify)
// 数字变成变单位的数字
/*
Vue.filter()
第一个参数  是过滤器的名字
第二个参数  是回调函数,必须有返回值
*/
// 注册全局过滤器
Vue.filter('formatYi', (value) => {
  var Yi = Math.pow(10, 8) // 10,0000,000
  if (value > Yi) {
    return `${(value / Yi).toFixed(2)}亿`
  } else {
    return `${(value / Math.pow(10, 4)).toFixed(2)}万`
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
